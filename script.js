

function convertLatLngStringToObj(LatLngString) {
  const array = LatLngString.split(',');
  return {
    lat: Number(array[0]),lng:Number(array[1])
  }
}
function mysql_real_escape_string (str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
          case "\0":
              return "\\0";
          case "\x08":
              return "\\b";
          case "\x09":
              return "\\t";
          case "\x1a":
              return "\\z";
          case "\n":
              return "\\n";
          case "\r":
              return "\\r";
          case "\"":
          case "'":
          case "\\":
          case "%":
              return "\\"+char; // prepends a backslash to backslash, percent,
                                // and double/single quotes
          default:
              return char;
      }
  });
}
const STATE_LIST = ['All',"Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
const INDUSTRY_LIST = ['All',
'Agriculture, Forestry, Fishing & Hunting',
'Mining',
'Utilities',
'Construction',
'Manufacturing',
'Wholesale Trade',
'Retail Trade',
'Transportation and Warehousing',
'Real Estate and Rental and Leasing',
'Professional, Scientific and Technical Services',
'Management of Companies and Enterprises',
'Administrative and Support and Waste Management',
'Educational Services',
'Information',
'Finance and Insurance',
'Health Care and Social Assistance',
'Arts, Entertainment and Recreation',
'Accommodation and Food Services',
'Other Services (except Public Administration)',
'Central Administrative Office Activity',
'Public Administration']
const WORKER_DEMAND = ['All','Pay','Healthcare','COVID-19 protocols','Health and safety','First contract','Racial justice','$15 minimum wage','Staffing']


function formatDate(d) {
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
const tableDict = {
  "Employer": {
    "name": "Employer",
    "type": "string"
  },
  "Labor Organization": {
    "name": "Labor_Organization",
    "type": "string"
  },
  "Union Local": {
    "name": "Union_Local",
    "type": "string"
  },
  "Industry": {
    "name": "Industry",
    "type": "string",
    "filter": filterIndustry
  },
  "Bargaining Unit Size": {
    "name": "Bargaining_Unit_Size",
    "type": "number"
  },
  "Number of Strike Location": {
    "name": "Number_of_Strike_Location",
    "type": "number"
  },
  "Latitude, Longitude": {
    "name": "Latitude_Longitude",
    "type": "string"
  },
  "Address": {
    "name": "Address",
    "type": "string",
  },
  "City": {
    "name": "City",
    "type": "string"
  },
  "State": {
    "name": "State",
    "type": "string",
    "filter": filterStates
  },
  "Zip Code": {
    "name": "Zip_Code",
    "type": "string"
  },
  "Strike or Protest or Lockout": {
    "name": "Strike_or_Protest_or_Lockout",
    "type": "string",
    "filter": filterType
  },
  "Approximate  Number of Employees": {
    "name": "Approximate_Number_of_Employees",
    "type": "number"
  },
  "Start Date": {
    "name": "Start_Date",
    "type": "date",
    "filter": filterDate
  },
  "End Date": {
    "name": "End_Date",
    "type": "date"
  },
  "Duration Amount": {
    "name": "Duration_Amount",
    "type": "number"
  },
  "Duration Unit": {
    "name": "Duration_Unit",
    "type": "string"
  },
  "Authorized": {
    "name": "Authorized",
    "type": "string",
    "filter": filterAuthorized
  },
  "Threat": {
    "name": "Threat",
    "type": "string"
  },
  "Worker Demands": {
    "name": "Worker_Demands",
    "type": "string",
    "filter": filterWorkerDemands
  },
  "Source": {
    "name": "source",
    "type": "string"
  },
  "positionId": {
    "name": "positionId",
    "type": "string"
  }
}
function filterDate(params) {
  
}
function filterType(params) {
  
}
function filterIndustry(params) {
  let filterString = '';
  if(params.industryValue !== 'All'){
    filterString = `AND Industry LIKE '%${params.industryValue}%'`
  }
  return filterString
}
function filterStates(params) {
  let filterString = '';
  if(params.stateValue !== 'All'){
    filterString = `AND State LIKE '%${params.stateValue}%'`
  }
  return filterString
}
function filterWorkerDemands(params) {
  let filterString = '';
  if(params.workerDemandsValue !== 'All'){
    filterString = `AND Worker_Demands LIKE '%${params.workerDemandsValue}%'`
  }
  return filterString
}
function filterAuthorized(params) {
  let filterString = '';
  if(params.Authorized !== 'on'){
    filterString = `AND State LIKE '%${params.industryValue}%'`
  }
  return filterStrin
}
async function createTableAndInsertValues(){
  let createTableColStringAndType = ''
  let createTableColString = ''
  const tableDictArray = Object.keys(tableDict);
  const tableDictArrayLength = tableDictArray.length
  tableDictArray.forEach((key, index) => {
    createTableColString += `${tableDict[key].name} `
    createTableColStringAndType += `${tableDict[key].name} ${tableDict[key].type}`
    if(index !== tableDictArrayLength-1){
      createTableColString += `, `
      createTableColStringAndType+= ', '
    }
  })
  let valuesString = '';
  let queryString = `CREATE TABLE geodata (${createTableColStringAndType},  PRIMARY KEY (positionId))`
  await alasql.promise(queryString);
  const geodatalen = window.geodata.length;
  console.log(geodatalen)
  window.geodata.forEach((obj, geoindex) => {
    
    const strikeNumber = Number(obj['Number of Strike Location']) || 1
    if(strikeNumber > 1){
      const latlngArray = obj['Latitude, Longitude'].split(';')
      const addressArray = obj['Address'].split(';')
      const cityArray = obj['City'].split(';')
      const stateArray = obj['State'].split(';')
      const zipCodeArray = obj['Zip Code'].split(';')
      const latlngArrayLength = latlngArray.length - 1;
      const addressArrayLength = addressArray.length;
      const cityArrayLength = cityArray.length;
      const stateArrayLength = stateArray.length;
      const zipCodeArrayLength = zipCodeArray.length;
      if((latlngArrayLength === strikeNumber) && (addressArrayLength === strikeNumber) && (cityArrayLength === strikeNumber) && (stateArrayLength === stateArrayLength) && (strikeNumber === zipCodeArrayLength)){
        const singleEventArray = []
        for (let index = 0; index < strikeNumber; index++) {
          singleEventArray.push({
            ...obj,
            connectedRow: obj['positionId'],
            'positionId': obj['positionId']+'.'+index,
            'Latitude, Longitude': latlngArray[index],
            'Address': addressArray[index],
            'City': cityArray[index],
            'State': stateArray[index],
            'Zip Code': zipCodeArray[index],
          })
        }
        singleEventArray.forEach((singleEvent, i) => {
          let singleValueString = '';
          tableDictArray.forEach((key, index) => {
            if(tableDict[key].type==='string' || tableDict[key].type==='date'){
              singleValueString += `'${singleEvent[key]?mysql_real_escape_string(String(singleEvent[key])):''}'`
            }
            else if(tableDict[key].type==='number'){
              console.log(singleEvent[key],key)
              singleValueString += Number(singleEvent[key]) && !isNaN(Number(singleEvent[key]))?(Number(singleEvent[key])):0
            }
            if(index !== tableDictArrayLength-1){
              singleValueString += `,  `
            }
          })
          
          valuesString += `(${singleValueString})`
          
          if(!((i === strikeNumber-1) && (geoindex === geodatalen-1))){
            valuesString += `,`
          }
        })
      }else{
        console.log('Length', obj['positionId'])
        console.log(strikeNumber)
        console.log(latlngArrayLength)
      console.log(addressArrayLength)
      console.log(cityArrayLength)
      console.log(stateArrayLength)
      console.log(zipCodeArrayLength)
        console.error('Mismatch')
      }
    }else if(strikeNumber === 1){
      let singleValueString = '';
      tableDictArray.forEach((key, index) => {
        if(tableDict[key].type==='string' || tableDict[key].type==='date'){
          singleValueString += `'${obj[key]?mysql_real_escape_string(String(obj[key])):''}'`
        }
        else if(tableDict[key].type==='number'){
          singleValueString += Number(obj[key]) && !isNaN(Number(obj[key]))?(Number(obj[key])):0
        }
        if(index !== tableDictArrayLength-1){
          singleValueString += `,  `
        }
      })
      
      valuesString += `(${singleValueString})`
      if(geoindex !== geodatalen-1){
        valuesString += `,`
      }
    }
  })
  await alasql.promise(`INSERT INTO geodata (${createTableColString}) VALUES ${valuesString}`)
  const res = await alasql.promise(`SELECT * from geodata WHERE Start_Date != '' AND Strike_or_Protest_or_Lockout LIKE '%Strike%' ORDER BY Start_Date  `)
  initMap(res)
  res.forEach((e,i) => {
    if(e.Employer === 'Reith Riley Construction Company'){
      console.log(e)
    }
  })
}
window.addEventListener('load',async ()=> {
  await createTableAndInsertValues();
  // DATES
  const fromDate = document.getElementById('fromDate') 
  const endDate = document.getElementById('endDate') 
  const approvedCheckBox = document.getElementById('approved') 
  const toggleProtestCheckBox = document.getElementById('togglechk') 
  const stateSelect = document.getElementById('states') 
  const industrySelect = document.getElementById('industry') 
  const workerDemandSelect = document.getElementById('workerDemand') 
  const unitSizeRange = document.getElementById('unitSize') 
  const NoOfEmpRange = document.getElementById('NoOfEmp') 
  const filterButton = document.getElementById('filterButton') 
  const minMaxDateObj = await alasql.promise(`SELECT MIN(Start_Date) as fromDate, MAX(Start_Date) as endDate from geodata where Start_Date != ''`);
  const minMaxUnitSizeObj = await alasql.promise(`SELECT MAX(Bargaining_Unit_Size) as maxUnitSize, MIN(Bargaining_Unit_Size) as minUnitSize from geodata`);
  const minMaxNoOfEmpObj = await alasql.promise(`SELECT MAX(Approximate_Number_of_Employees) as maxNoOfEmpRange, MIN(Approximate_Number_of_Employees) as minNoOfEmpRange from geodata`);
  console.log(JSON.stringify(minMaxNoOfEmpObj))
  fromDate.value = minMaxDateObj[0].fromDate
  endDate.value = minMaxDateObj[0].endDate
  // STATES
  STATE_LIST.forEach((val) => {
    var option = document.createElement("option");
    option.value = val;
    option.text = val
    stateSelect.appendChild(option);
  });
  // INDUSTRY
  INDUSTRY_LIST.forEach((val) => {
    var option = document.createElement("option");
    option.value = val;
    option.text = val
    industrySelect.appendChild(option);
  });
  // WORKER DEMAND
  WORKER_DEMAND.forEach((val) => {
    var option = document.createElement("option");
    option.value = val;
    option.text = val
    workerDemandSelect.appendChild(option);
  });
  // UNIT SIZE RANGE
  unitSizeRange.setAttribute('min',minMaxUnitSizeObj[0].minUnitSize)
  unitSizeRange.setAttribute('max',minMaxUnitSizeObj[0].maxUnitSize)
  unitSizeRange.value = minMaxUnitSizeObj[0].maxUnitSize
  document.getElementById('maxUnitSizeLabel').innerHTML = minMaxUnitSizeObj[0].maxUnitSize
  document.getElementById('minUnitSizeLabel').innerHTML = minMaxUnitSizeObj[0].minUnitSize
  // NO OF EMPLYEES
  NoOfEmpRange.setAttribute('min',minMaxNoOfEmpObj[0].minNoOfEmpRange)
  NoOfEmpRange.setAttribute('max',minMaxNoOfEmpObj[0].maxNoOfEmpRange)
  NoOfEmpRange.value = minMaxNoOfEmpObj[0].maxNoOfEmpRange
  document.getElementById('maxNoOfEmpLabel').innerHTML = minMaxNoOfEmpObj[0].maxNoOfEmpRange
  document.getElementById('minNoOfEmpLabel').innerHTML = minMaxNoOfEmpObj[0].minNoOfEmpRange
  console.log(fromDate.value,'<-----------------fromDate.value')
  console.log(endDate.value,'<-----------------endDate.value')
  filterButton.onclick  = async (event) => {
    console.log(fromDate.value,'<-----------------fromDate.value')
    console.log(endDate.value,'<-----------------endDate.value')
    console.log(approvedCheckBox.checked,'<-----------------approvedCheckBox.value')
    console.log(stateSelect.value,'<-----------------stateSelect.value')
    let statesQueryString = '';
    if(stateSelect.value !== 'All'){
      statesQueryString = `AND State LIKE '%${stateSelect.value}%'`
    }
    let approvedQueryString = '';
    if(approvedCheckBox.checked){
      approvedQueryString = `AND Authorized='N'`
    }
    strikeOrProtestQueryString = `AND Strike_or_Protest_or_Lockout LIKE '%Strike%'`
    if(toggleProtestCheckBox.checked){
      strikeOrProtestQueryString =`AND Strike_or_Protest_or_Lockout LIKE '%Protest%'`
    }
    const queryString = `SELECT * from geodata WHERE Start_Date >= '${fromDate.value}' and Start_Date <= '${endDate.value}' ${statesQueryString} ${strikeOrProtestQueryString} ${approvedQueryString} ORDER BY Start_Date`
    const res  = await alasql.promise(queryString);
    initMap(res)
  }

})



// Initialize and add the map
function initMap(geodata) {
  let infowindow = null
  let currWindow =false; 
  const listDiv = document.getElementById('list-box');
  listDiv.innerHTML = '';
  function createInfoWindow(strike, marker){
    if(infowindow){
      infowindow.close();
    }
    infowindow = new google.maps.InfoWindow({
      content: createContentString(strike),
    });
    infowindow.open(map, marker);
  }
  function createCard(strike, marker){
    const card = document.createElement('div');
    const chkinput = document.createElement('input');
    const chklabel = document.createElement('label');
    card.setAttribute("class", "tab");
    chklabel.setAttribute("class", "tab-label");
    chklabel.setAttribute("for", strike.positionId);
    chkinput.setAttribute("type", "checkbox");
    chkinput.setAttribute("id", strike.positionId);
    chkinput.setAttribute("class", 'hidechk');
    const cardBody = document.createElement('div');
    cardBody.setAttribute("class", "tab-content");
    cardBody.innerHTML = createContentString(strike)
    chklabel.innerHTML = `${strike.Employer} - ${strike.Labor_Organization} -  ${strike.Start_Date}`;
    card.append(chkinput);
    card.append(chklabel);
    card.append(cardBody);
    chkinput.addEventListener('change',(e) => {
      if(e.target.checked){
        const strikePosition = convertLatLngStringToObj(strike['Latitude_Longitude']);
        map.setZoom(15);
        map.panTo(strikePosition);
        createInfoWindow(strike,marker)
      }

    })
 
    return card
  }
  function createContentString(strike) {
    let htmlString = ''
    Object.keys(tableDict).forEach((keyName) => {
      // console.log(strike[keyName]) 
      const colObj = tableDict[keyName];
      if(colObj.name =='source'){
        let sourceString = strike[colObj.name];
        if(sourceString.indexOf('1. ') === -1){
          htmlString += `<strong>${keyName}</strong> : <a href="${sourceString} target="_blank" rel="noopener noreferrer" ">Source</a> </br>`
        }else{
          let finalString = ''
          let sourceStringArray = sourceString.split('\\n')
          let count = 0
          sourceStringArray.forEach((string,index)=> {
            if(string){
              count = count+1
              finalString += ` <a href="${string.replace(`${count}.`,'').trim()}" target="_blank" rel="noopener noreferrer">Source ${count}</a> `
            }
            
          })
          htmlString += `<strong>${keyName}</strong> : ${finalString} </br>`
        }
      }else if(strike[colObj.name] && colObj.name!=='positionId'){
        htmlString += `<strong>${keyName}</strong> : ${strike[colObj.name]} </br>`
      }
     
  })
  return htmlString
  }
  // The location of Uluru
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom:4,
      // center: convertLatLngStringToObj(geodata[0]['Latitude_Longitude'])
      center: {lat: 39.7427825897816, lng: -101.69676383031963}
  });
  const markerArray = []
  // The marker, positioned at Uluru
  geodata.forEach((strike,index) => {

    if(strike['Latitude_Longitude']){
      const strikePosition = convertLatLngStringToObj(strike['Latitude_Longitude'])
      const marker = new google.maps.Marker({
        position: strikePosition,
        map: map,
        title: strike.City
      });
      markerArray.push(marker)
      const card = createCard(strike, marker)
      listDiv.append(card);
        marker.addListener("click", () => {
          createInfoWindow(strike,marker)
        });
    }

  })
  new MarkerClusterer(map, markerArray, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}