const weather = () => {
    APIkey="24ae9b2bc4544e1babc52a4a421f0b47"
    loc="Bandung"
    URL1="http://api.openweathermap.org/geo/1.0/direct?q="+loc+"&limit=5&appid="+APIkey
    document.getElementById("loc").innerHTML=loc

    fetch(URL1)
    .then(response => response.json())
    .then(data => {
        lat=data[0].lat
        lon=data[0].lon
        document.getElementById("lon_temp").innerHTML=lon
        document.getElementById("lat_temp").innerHTML=lat
        URL2="https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIkey
        URL3="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIkey
        fetch(URL2)
        .then(response => response.json())
        .then(data => {
            for(let i=1;i<=5;i++){
                index=i*8-1
                if(i!=1){
                    let date = new Date()
                    let nextdate = new Date(date)
                    nextdate.setDate(nextdate.getDate() + i)
                    time(Day(nextdate.getDay()),nextdate.getDate(),Month(nextdate.getMonth()+1),"tomorrow"+i)
                }
                conditionpart(data.list[index].weather[0].main,"weather-tomorrow"+i,data.list[index].weather[0].description)
                minmax(data.list[index].main.temp_min,data.list[index].main.temp_max,"temp-min"+i,"temp-max"+i)
            }

        });

        fetch(URL3)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            condition(data.weather[0].main,"indication",data.weather[0].description,"status")
            temp(data.main.temp,"temp-now")
            let date=new Date()
            time(Day(date.getDay()),date.getDate(),Month(date.getMonth()+1),"year")
            humidity(data.main.humidity)
            wind(data.wind.speed,data.wind.deg)
            visibility(data.visibility)
            pressure(data.main.pressure)
        });

    });
};

weather()

const restart = () => {
    Celcius()
    APIkey="24ae9b2bc4544e1babc52a4a421f0b47"
    lat=document.getElementById("lat").textContent
    lon=document.getElementById("lon").textContent
    
    lon_temp=document.getElementById("lon_temp").textContent
    lat_temp=document.getElementById("lat_temp").textContent

    if (lon_temp!=lon && lat_temp!=lat){
        lon_temp=lon
        document.getElementById("lon_temp").innerHTML=lon_temp
        lat_temp=lat
        document.getElementById("lat_temp").innerHTML=lat_temp
        reset()
    }

    URL1="http://api.openweathermap.org/geo/1.0/reverse?lat="+lat+"&lon="+lon+"&limit=1&appid="+APIkey
    fetch(URL1)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data[0].name)
        document.getElementById("loc").innerHTML=data[0].name
    })

    URL2="https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIkey
    URL3="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIkey
    fetch(URL2)
    .then(response => response.json())
    .then(data => {
        for(let i=1;i<=5;i++){
            index=i*8-1
            if(i!=1){
                let date = new Date()
                let nextdate = new Date(date)
                nextdate.setDate(nextdate.getDate() + i)
                time(Day(nextdate.getDay()),nextdate.getDate(),Month(nextdate.getMonth()+1),"tomorrow"+i)
            }
            conditionpart(data.list[index].weather[0].main,"weather-tomorrow"+i,data.list[index].weather[0].description)
            minmax(data.list[index].main.temp_min,data.list[index].main.temp_max,"temp-min"+i,"temp-max"+i)
        }

    });

    fetch(URL3)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        condition(data.weather[0].main,"indication",data.weather[0].description,"status")
        temp(data.main.temp,"temp-now")
        let date=new Date()
        time(Day(date.getDay()),date.getDate(),Month(date.getMonth()+1),"year")
        humidity(data.main.humidity)
        wind(data.wind.speed,data.wind.deg)
        visibility(data.visibility)
        pressure(data.main.pressure)
    });

};


function condition(data,path,secondary,path2){
    if (data=="Clouds"){
        if (secondary=="few clouds"){
            document.getElementById(path).src="weather/LightCloud.png"
            document.getElementById(path2).innerHTML="Light Clouds"
        }
        else if (secondary=="scattered clouds"){
            document.getElementById(path).src="weather/LightCloud.png"
            document.getElementById(path2).innerHTML="Clouds"
        }
        else if (secondary=="broken clouds"){
            document.getElementById(path).src="weather/HeavyCloud.png"
            document.getElementById(path2).innerHTML="Clouds"
        }
        else if (secondary=="overcast clouds"){
            document.getElementById(path).src="weather/HeavyCloud.png"
            document.getElementById(path2).innerHTML="Heavy Clouds"
        }
    }

    else if(data=="Clear"){
        document.getElementById(path).src="weather/Clear.png"
        document.getElementById(path2).innerHTML=data
    }
    else if(data=="Rain"){
        if(secondary=="light rain"){
            document.getElementById(path).src="weather/LightRain.png"
            document.getElementById(path2).innerHTML="Light Rain"
        }
        else if (secondary=="moderate rain"){
            document.getElementById(path).src="weather/HeavyRain.png"
            document.getElementById(path2).innerHTML="Rain"
        }
        else if (secondary=="heavy intensity rain"){
            document.getElementById(path).src="weather/HeavyRain.png"
            document.getElementById(path2).innerHTML="Heavy Rain"
        }
    }
    else if(data=="Haze"){
        document.getElementById(path).src="weather/HeavyCloud.png"
        document.getElementById(path2).innerHTML=data
    }
}

function temp(temp,path){
    temp-=273.15
    let tempp=temp.toFixed(0)
    document.getElementById(path).innerHTML=tempp
}

function time(day,date,month,path){
    let string=day+", "+date+" "+month
    document.getElementById(path).innerHTML=string
}

function humidity(humidity){
    document.getElementById("humidity-val").innerHTML=humidity.toFixed(0)
    document.getElementById("humidity-range").style.background="linear-gradient(to right, #FFEC65 "+humidity+"%, #E7E7EB 0%)"
}

function wind(speed,deg){
    now=String(speed.toFixed(1))
    let fix = []
    for(let i=0;i<now.length;i++){
        if (now[i]=="."){
            fix+=","
        }
        else{
            fix+=now[i]
        }
    }
    document.getElementById("speed").innerHTML=fix
    document.getElementById("direction").style.transform="rotate("+deg+"deg)"
    let direction="unknown"
    if ((deg>=0 && deg<3) || (deg<=360 && deg>357)){
        direction="North"
    }
    else if (deg>=3 && deg<=87){
        direction="North West"
    }
    else if((deg>87 && deg<93)){
        direction="East"
    }
    else if((deg>=93 && deg<=177)){
        direction="South East"
    }
    else if((deg>177 && deg<183)){
        direction="South"
    }
    else if((deg>=183 && deg<=267)){
        direction="South West"
    }
    else if((deg>267 && deg<273)){
        direction="South"
    }
    else if((deg>=273 && deg<=357)){
        direction="North West"
    }
    document.getElementById("dir").innerHTML=direction
}

function visibility(visibility){
    now=(visibility/1000)*0.621
    now=String(now.toFixed(1))
    let fix = []
    for(let i=0;i<now.length;i++){
        if (now[i]=="."){
            fix+=","
        }
        else{
            fix+=now[i]
        }
    }
    document.getElementById("visibility").innerHTML=fix
}

function pressure(pressure){
    document.getElementById("pressure").innerHTML=pressure.toFixed(0)
}

function conditionpart(data,path,secondary){
    if (data=="Clouds"){
        if (secondary=="few clouds"){
            document.getElementById(path).src="weather/LightCloud.png"
        }
        else if (secondary=="scattered clouds"){
            document.getElementById(path).src="weather/LightCloud.png"
        }
        else if (secondary=="broken clouds"){
            document.getElementById(path).src="weather/HeavyCloud.png"
        }
        else if (secondary=="overcast clouds"){
            document.getElementById(path).src="weather/HeavyCloud.png"
        }
    }

    else if(data=="Clear"){
        document.getElementById(path).src="weather/Clear.png"
    }
    else if(data=="Rain"){
        if(secondary=="light rain"){
            document.getElementById(path).src="weather/LightRain.png"
        }
        else if (secondary=="moderate rain"){
            document.getElementById(path).src="weather/HeavyRain.png"
        }
        else if (secondary=="heavy intensity rain"){
            document.getElementById(path).src="weather/HeavyRain.png"
        }
    }
    else if(data=="Haze"){
        document.getElementById(path).src="weather/HeavyCloud.png"
    }
}

function minmax(min,max,path,path2){
    document.getElementById(path).innerHTML=(min-273.15).toFixed(0)
    document.getElementById(path2).innerHTML=(max-273.15).toFixed(0)
}

function Month(month){
    if(month==1){
        return "Jan"
    }
    else if(month==2){
        return "Feb"
    }
    else if(month==3){
        return "Mar"
    }
    else if(month==4){
        return "Apr"
    }
    else if(month==5){
        return "May"
    }
    else if(month==6){
        return "Jun"
    }
    else if(month==7){
        return "Jul"
    }
    else if(month==8){
        return "Aug"
    }
    else if(month==9){
        return "Sep"
    }
    else if(month==10){
        return "Oct"
    }
    else if(month==11){
        return "Nov"
    }
    else if(month==12){
        return "Dec"
    }
}

function Day(day){
    if(day==1){
        return "Mon"
    }
    else if(day==2){
        return "Tue"
    }
    else if(day==3){
        return "Wed"
    }
    else if(day==4){
        return "Thu"
    }
    else if(day==5){
        return "Fri"
    }
    else if(day==6){
        return "Sat"
    }
    else if(day==0){
        return "Sun"
    }
}

function search(){
    let loading = document.getElementById("hidden");
    let keyFrames = document.createElement("style");
    keyFrames.innerHTML = `
      @keyframes search {
        0% {transform: translate(-450px,0); opacity: 1;}
        100% {transform: translate(0px,0); opacity: 1;}
      }
    
      #hidden {
        display:block;
        animation: search 1s forwards;
      }
    `;
    
    loading.appendChild(keyFrames);
}

function closing(){
    let loading = document.getElementById("hidden");
    let keyFrames = document.createElement("style");
    keyFrames.innerHTML = `
      @keyframes closing {
        0% {transform: translate(0px,0); opacity: 1;}
        100% {transform: translate(-450px,0); opacity: 1;}
      }
    
      #hidden {
        display:block;
        animation: closing 1s forwards;
      }
    `;
    
    loading.appendChild(keyFrames);
}

function Fahrenheit(){
    document.querySelector(".F").style.color="#110E3C"
    document.querySelector(".F").style.background="#E7E7EB"
    document.querySelector(".F").disabled = true
    document.querySelector(".C").style.color="#E7E7EB"
    document.querySelector(".C").style.background="#585676"
    document.querySelector(".C").disabled = false
    let Temp=document.querySelectorAll(".temperature")
    Temp.forEach(temp => {
        T=temp.textContent
        T=(T*9/5)+32
        temp.innerHTML=T.toFixed(0)
    });
    unit=document.querySelectorAll(".units")
    unit.forEach(x =>{
        x.innerHTML="°F"
    })

}

function Celcius(){
    document.querySelector(".C").style.color="#110E3C"
    document.querySelector(".C").style.background="#E7E7EB"
    document.querySelector(".C").disabled = true
    document.querySelector(".F").style.color="#E7E7EB"
    document.querySelector(".F").style.background="#585676"
    document.querySelector(".F").disabled = false
    let Temp=document.querySelectorAll(".temperature")
    Temp.forEach(temp => {
        T=temp.textContent
        T=(T-32)*5/9
        temp.innerHTML=T.toFixed(0)
    });
    unit=document.querySelectorAll(".units")
    unit.forEach(x =>{
        x.innerHTML="°C"
    })
}

function reset_animation(id) {
    var el = document.getElementById(id);
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null; 
}

function reset_animation2(querySelector) {
    var el = document.querySelectorAll(querySelector)
    el.forEach(x=>{
        x.style.animation = 'none';
        x.offsetHeight; /* trigger reflow */
        x.style.animation = null; 
    })
}

function reset(){
    reset_animation("weather")
    reset_animation("cloud")
    reset_animation("temp")
    reset_animation("status")
    reset_animation("date")
    reset_animation("location")
    reset_animation("degree")
    reset_animation("loc-icon")

    for(let i=1;i<6;i++){
        reset_animation("tomorrow"+i)
        reset_animation("weather-tomorrow"+i)
        reset_animation("temp-tomorrow"+i)
    }
    reset_animation2(".highlight-label")
    reset_animation2(".humidity-label")
    reset_animation2("input[type=range]")
    reset_animation2(".percentage")
    reset_animation2(".wind-direction")
    reset_animation2(".highlight-val")
    reset_animation2(".title-highlight")
}

function searching(){
    Celcius()
    let val=document.getElementById("container-input").value
    // document.getElementById("loc").innerHTML=val
    let len=val.length
    let place=[]
    for (let i=0;i<len;i++){
        if (val[i]!=","){
            place+=val[i]
        }
        else{
            break
        }
    }
    document.getElementById("loc").innerHTML=place
    console.log(place)
    lat=document.getElementById("lat_temp").textContent
    lon=document.getElementById("lon_temp").textContent
    
    APIkey="24ae9b2bc4544e1babc52a4a421f0b47"
    reset()

    URL2="https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIkey
    URL3="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIkey
    fetch(URL2)
    .then(response => response.json())
    .then(data => {
        for(let i=1;i<=5;i++){
            index=i*8-1
            if(i!=1){
                let date = new Date()
                let nextdate = new Date(date)
                nextdate.setDate(nextdate.getDate() + i)
                time(Day(nextdate.getDay()),nextdate.getDate(),Month(nextdate.getMonth()+1),"tomorrow"+i)
            }
            conditionpart(data.list[index].weather[0].main,"weather-tomorrow"+i,data.list[index].weather[0].description)
            minmax(data.list[index].main.temp_min,data.list[index].main.temp_max,"temp-min"+i,"temp-max"+i)
        }

    });

    fetch(URL3)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        condition(data.weather[0].main,"indication",data.weather[0].description,"status")
        temp(data.main.temp,"temp-now")
        let date=new Date()
        time(Day(date.getDay()),date.getDate(),Month(date.getMonth()+1),"year")
        humidity(data.main.humidity)
        wind(data.wind.speed,data.wind.deg)
        visibility(data.visibility)
        pressure(data.main.pressure)
    });
    closing()
}

// MAP API

var center = [107.6204,-6.8865];
var popup = new tt.Popup({
    offset: 35
});
var map = tt.map({
    key: "G2jZ7NhXQ2rsXDpGEzbyiFBQHzkMRBp1",
    container: 'map',
    center: center,
    zoom: 8
});
map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());

var marker = new tt.Marker({
    draggable: true
}).setLngLat(center).addTo(map);

function onDragEnd() {
  var lngLat = marker.getLngLat();
  lngLat = new tt.LngLat((lngLat.lng).toFixed(2),(lngLat.lat).toFixed(2));
  popup.setHTML(lngLat.toArray());
  popup.setLngLat(lngLat);
  marker.setPopup(popup);
  marker.togglePopup();

  document.getElementById("lon").innerHTML=lngLat.lng
  document.getElementById("lat").innerHTML=lngLat.lat
}
map.on('load', onDragEnd)
marker.on('dragend', onDragEnd);

function gps(){
    document.getElementById("map").style.display="block"
    let loading = document.getElementById("map");
    let keyFrames = document.createElement("style");
    keyFrames.innerHTML = `
      @keyframes gps {
        0% {transform: translate(0,-1024px); opacity: 0;}
        100% {transform: translate(0,0px); opacity: 1;}
      }
    
      #map {
        display:block;
        animation: gps 1s forwards;
      }
    `;
    
    loading.appendChild(keyFrames);
    document.querySelector(".gps").style.background="#FFFFFF"
    document.querySelector(".gps img").src="icon/gpsh.svg"
}

function closemap(){
    let loading = document.getElementById("map");
    let keyFrames = document.createElement("style");
    keyFrames.innerHTML = `
      @keyframes closemap {
        0% {transform: translate(0,0); opacity: 1;}
        100% {transform: translate(0,-1024px); opacity: 0;}
      }
    
      #map {
        display:block;
        animation: closemap 1s forwards;
      }
    `;
    
    loading.appendChild(keyFrames)
    document.querySelector(".gps").style.background="#6E707A"
    document.querySelector(".gps img").src="icon/gps.svg"
    
    restart()
}

let click=0

function countclick(){
    click+=1
    if (click%2==1){
        gps()
    }
    else{
        closemap()
    }
}

// SEARCH BOX API

function addressAutocomplete(containerElement, callback, options) {

    const MIN_ADDRESS_LENGTH = 3;
    const DEBOUNCE_DELAY = 300;

    // create container for input element
    const inputContainerElement = document.createElement("div");
    inputContainerElement.setAttribute("class", "input-container");
    containerElement.appendChild(inputContainerElement);

    // create input element
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", options.placeholder);
    inputElement.setAttribute("id", "container-input");
    // inputElement.setAttribute("required");
    inputContainerElement.appendChild(inputElement);
    document.getElementById("container-input").required=true
    document.getElementById("container-input").autocomplete="off"

    // add input field clear button
    const clearButton = document.createElement("div");
    clearButton.classList.add("clear-button");
    addIcon(clearButton);
    clearButton.addEventListener("click", (e) => {
      e.stopPropagation();
      inputElement.value = '';
      callback(null);
      clearButton.classList.remove("visible");
      closeDropDownList();
    });
    inputContainerElement.appendChild(clearButton);

    /* We will call the API with a timeout to prevent unneccessary API activity.*/
    let currentTimeout;

    /* Save the current request promise reject function. To be able to cancel the promise when a new request comes */
    let currentPromiseReject;

    /* Focused item in the autocomplete list. This variable is used to navigate with buttons */
    let focusedItemIndex;

    /* Process a user input: */
    inputElement.addEventListener("input", function(e) {
      const currentValue = this.value;

      /* Close any already open dropdown list */
      closeDropDownList();


      // Cancel previous timeout
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }

      // Cancel previous request promise
      if (currentPromiseReject) {
        currentPromiseReject({
          canceled: true
        });
      }

      if (!currentValue) {
        clearButton.classList.remove("visible");
      }

      // Show clearButton when there is a text
      clearButton.classList.add("visible");

      // Skip empty or short address strings
      if (!currentValue || currentValue.length < MIN_ADDRESS_LENGTH) {
        return false;
      }

      /* Call the Address Autocomplete API with a delay */
      currentTimeout = setTimeout(() => {
        currentTimeout = null;

        /* Create a new promise and send geocoding request */
        const promise = new Promise((resolve, reject) => {
          currentPromiseReject = reject;

          // The API Key provided is restricted to JSFiddle website
          // Get your own API Key on https://myprojects.geoapify.com
          const apiKey = "6dc7fb95a3b246cfa0f3bcef5ce9ed9a";

          var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&format=json&limit=5&apiKey=${apiKey}`;

          fetch(url)
            .then(response => {
              currentPromiseReject = null;

              // check if the call was successful
              if (response.ok) {
                response.json().then(data => resolve(data));
              } else {
                response.json().then(data => reject(data));
              }
            });
        });

        promise.then((data) => {
          // here we get address suggestions
          currentItems = data.results;

          /*create a DIV element that will contain the items (values):*/
          const autocompleteItemsElement = document.createElement("div");
          autocompleteItemsElement.setAttribute("class", "autocomplete-items");
          inputContainerElement.appendChild(autocompleteItemsElement);

          /* For each item in the results */
          data.results.forEach((result, index) => {
            /* Create a DIV element for each element: */
            const itemElement = document.createElement("div");
            /* Set formatted address as item value */
            itemElement.innerHTML = result.formatted;
            autocompleteItemsElement.appendChild(itemElement);

            /* Set the value for the autocomplete text field and notify: */
            itemElement.addEventListener("click", function(e) {
              inputElement.value = currentItems[index].formatted;
              callback(currentItems[index]);
              /* Close the list of autocompleted values: */
              closeDropDownList();
            });
          });

        }, (err) => {
          if (!err.canceled) {
            console.log(err);
          }
        });
      }, DEBOUNCE_DELAY);
    });

    /* Add support for keyboard navigation */
    inputElement.addEventListener("keydown", function(e) {
      var autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
      if (autocompleteItemsElement) {
        var itemElements = autocompleteItemsElement.getElementsByTagName("div");
        if (e.keyCode == 40) {
          e.preventDefault();
          /*If the arrow DOWN key is pressed, increase the focusedItemIndex variable:*/
          focusedItemIndex = focusedItemIndex !== itemElements.length - 1 ? focusedItemIndex + 1 : 0;
          /*and and make the current item more visible:*/
          setActive(itemElements, focusedItemIndex);
        } else if (e.keyCode == 38) {
          e.preventDefault();

          /*If the arrow UP key is pressed, decrease the focusedItemIndex variable:*/
          focusedItemIndex = focusedItemIndex !== 0 ? focusedItemIndex - 1 : focusedItemIndex = (itemElements.length - 1);
          /*and and make the current item more visible:*/
          setActive(itemElements, focusedItemIndex);
        } else if (e.keyCode == 13) {
          /* If the ENTER key is pressed and value as selected, close the list*/
          e.preventDefault();
          if (focusedItemIndex > -1) {
            closeDropDownList();
          }
        }
      } else {
        if (e.keyCode == 40) {
          /* Open dropdown list again */
          var event = document.createEvent('Event');
          event.initEvent('input', true, true);
          inputElement.dispatchEvent(event);
        }
      }
    });

    function setActive(items, index) {
      if (!items || !items.length) return false;

      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("autocomplete-active");
      }

      /* Add class "autocomplete-active" to the active element*/
      items[index].classList.add("autocomplete-active");

      // Change input value and notify
      inputElement.value = currentItems[index].formatted;
      callback(currentItems[index]);
    }

    function closeDropDownList() {
      const autocompleteItemsElement = inputContainerElement.querySelector(".autocomplete-items");
      if (autocompleteItemsElement) {
        inputContainerElement.removeChild(autocompleteItemsElement);
      }

      focusedItemIndex = -1;
    }

    function addIcon(buttonElement) {
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      svgElement.setAttribute('viewBox', "0 0 24 24");
      svgElement.setAttribute('height', "24");

      const iconElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      iconElement.setAttribute("d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
      iconElement.setAttribute('fill', 'currentColor');
      svgElement.appendChild(iconElement);
      buttonElement.appendChild(svgElement);
    }

    /* Close the autocomplete dropdown when the document is clicked. 
      Skip, when a user clicks on the input field */
    document.addEventListener("click", function(e) {
      if (e.target !== inputElement) {
        closeDropDownList();
      } else if (!containerElement.querySelector(".autocomplete-items")) {
        // open dropdown list again
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        inputElement.dispatchEvent(event);
      }
    });
    }

    addressAutocomplete(document.getElementById("autocomplete-container"), (data) => {
    // console.log("Selected option: ");
    console.log(data,data.name,data.lat.toFixed(2),data.lon.toFixed(2));
    document.getElementById("lat_temp").innerHTML=data.lat.toFixed(2)
    document.getElementById("lon_temp").innerHTML=data.lon.toFixed(2)
    }, {
    placeholder: "search location"
    });

