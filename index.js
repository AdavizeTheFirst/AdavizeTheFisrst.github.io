let focusCountry = "Nigeria";
function getJson(url, cb) {
 let request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
 request.open('GET', url, true); 
 request.onreadystatechange = function () {
       if (request.readyState == 4 && request.status == "200") {
          cb(JSON.parse(request.responseText))  
       }
 };
 request.send(null);  
}

let data
function storeData (x){
 data = x
}
getJson("./data.json", storeData)
function Output(time) {
 this.time = document.getElementById("time"),
 this.date = document.getElementById("date"),
 this.country = document.getElementById("country"),
 this.setValue = function (element, value) {
       element.innerText = value;
 }
 this.setState = function (timeString) {
     timeString = timeString.split(" ");
     this.setValue(this.date, timeString[0]);
      this.setValue(this.country, `The time in ${focusCountry} is`);
      let time = timeString[1].split(":")
      if(time[0]>12){
            this.setValue(this.time , `${time[0] - 12}:${time[1]} PM`)
      }
      else {
            this.setValue(this.time, `${time[0]}:${time[1]} AM`)
      }
 }
}
const output = new Output;
function setUI(res){
      output.setState(res.formatted)
}
document.getElementById("search").addEventListener("keyup", function(e){
 let searchString = e.target.value.toLowerCase();
 let suggestList = document.getElementById("suggestList")
 suggestList.innerHTML = '';
 data.forEach(function(x) {  
  let country = x.country
  if((country.toLowerCase().indexOf(searchString) != -1) && (searchString.length >= 2)){  
      let item = document.createElement('li')
      item.className = 'suggest'
      item.id = data.indexOf(x)
      item.innerText =  country;    
      suggestList.appendChild(item)
  }
 })
})
document.getElementById("search").addEventListener("change", function(e){
      let searchString = e.target.value.toLowerCase();
      let suggestList = document.getElementById("suggestList")
      suggestList.innerHTML = '';
      data.forEach(function(x) {  
       let country = x.country
       if((country.toLowerCase().indexOf(searchString) != -1) && (searchString.length >= 2)){  
           let item = document.createElement('li')
           item.className = 'suggest'
           item.id = data.indexOf(x)
           item.innerText =  country;    
           suggestList.appendChild(item)
       }
      })
     })
document.getElementById("container").addEventListener("click", function(e){
      if(e.target.className.includes("suggest")){
            focusCountry = e.target.innerText;
            getJson(`http://api.timezonedb.com/v2.1/get-time-zone?key=3Q1CMQJGIFQW&format=json&by=zone&zone=${data[e.target.id].zone}&fields=formatted`, setUI)
            e.target.parentElement.innerHTML = ''
      }
})
getJson(`http://api.timezonedb.com/v2.1/get-time-zone?key=3Q1CMQJGIFQW&format=json&by=zone&zone=Africa/Lagos&fields=formatted`, setUI)