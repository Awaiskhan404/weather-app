Vue.use(VueFusionCharts);
var segment = "today";
var len = 5;
var tempUnit = "C";
var p_color,s_color,maxF,maxC,minC,minF, lat, long;
var count = 0;
var imgCount = 0;

if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
  
      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

//text color has been stored as value of key weather type
var colorPalette = JSON.parse(localStorage.getItem('palette'));
//creating the left nav panel
var nav = new Vue({
    el: '#navpanel',
    beforeMount() {
        //before mount get the data for New York location
        lat  = 40.71;
        long = -74.00;
        fetchData(lat, long);
    },
    updated(){
        //on update, focus search option
        this.focusInput();
        if(count==0){
            renderContent();
            count++;
        }
        
    },
    data: {
        posts:null,
        dataReady: false,
        styleObject: {
        },
        weather_icon:null,
    },
    methods: {
        //focus the search bar
        focusInput(){
            var elem = nav.$refs.input;
            var input = document.getElementById('input');
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.addListener('place_changed', function() {
            var loc = input.value;
                findLatLong(loc);
            });
            elem.addEventListener("keyup", function(event) {
            event.preventDefault();
            var enterKeyCode = 13;
                if (event.keyCode === enterKeyCode) {
                    var loc = elem.value;
                    findLatLong(loc);
                }
            })
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, error);
                function error(err) {
                  console.warn(`ERROR(${err.code}): ${err.message}`);
                }

                function showPosition(position) {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                    fetchData(lat,long);
                }
            }
        }

    }

});
//looking for the input as location name and will get executed on pressing enter key
function findLatLong(loc){
    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode({'address': loc}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            long = results[0].geometry.location.lng();
            fetchData(lat,long);
          } else {
            console.log("Something got wrong " + status);
          }
    });
};
//get wind staus and weather condition, from weatherbit
function fetchData(lat,long) {
    var link1 = "https://csm.fusioncharts.com/files/assets/wb/wb-data.php?src=weatherbit&lat=" + lat + "&long=" + long ;
    var link2 = "https://csm.fusioncharts.com/files/assets/wb/wb-data.php?src=openweathermap&lat=" + lat + "&long=" + long ;
    var link3 = "https://csm.fusioncharts.com/files/assets/wb/wb-data.php?src=darksky&lat=" + lat + "&long=" + long ;
    var link4 = "https://csm.fusioncharts.com/files/assets/wb/wb-data.php?src=waqi&lat=" + lat + "&long=" + long ;
    
    axios.all([axios.get(link1),
           axios.get(link2),
           axios.get(link3),
           axios.get(link4)
           ])
    .then(axios.spread((response1,response2,response3, response4) => {
        if (response1 === null || response2 === null || response3 === null || response4 === null || response4.data.data === null) {
            fetchData(lat,long);
        }
        else{
            getWindSpeed(response1);
            getTemp(response2);
            getUVIndex(response3);
            getAirQuality(response4);
        }
        var input = document.getElementById('input');
        input.value = "";
    }))
    .catch(()=>{
        var input = document.getElementById('input');
        input.value = "";
    })
};
function getWindSpeed(response){
    var windData = response.data;
    var temp = windData.data[0].temp;
    var dataTimezone = windData.data[0].timezone;
    var time = moment.tz(dataDate, dataTimezone).format('MMM D, YYYY h:mm A');
    var displayDate = moment.tz(dataDate, dataTimezone).format('MMM D, YYYY');
    var displayTime = moment.tz(dataDate, dataTimezone).format('h:mm A');

    var tempInC = temp;
    var tempInF = Math.ceil((temp+32)*9/5);
    var city = windData.data[0].city_name + ", " + windData.data[0].country_code;

    //fetching the weather condition from the API
    var weatherType = windData.data[0].weather.description;
    //fetching the pod from the API
    var pod = windData.data[0].pod;
    //converting it to lowercase
    var bgVal = weatherType.split(' ').join().replace(/\,|\/+/g,"").toLowerCase();
    //adding the pod as a prefix
    var bgimg = pod+"_"+bgVal+".svg";
    //now assigning the image path to my vue app(i.e. nav panel)
    nav.styleObject.backgroundImage  = 'url("img/bgimage/' + bgimg + '")';

    //data for sunrise sunset chart
    var dataDate = windData.data[0].datetime;
    dataDate = dataDate.substring(0, dataDate.indexOf(':'));
    var dataTimezone = windData.data[0].timezone;
    moment.tz.setDefault('Africa/Abidjan');

    var dataSunrise = moment(dataDate + " " +windData.data[0].sunrise).tz(dataTimezone).format('h:mm A');
    localStorage.setItem("dataSunrise",dataSunrise);
    var dataSunset = moment(dataDate + " " + windData.data[0].sunset).tz(dataTimezone).format('h:mm A'); 
    localStorage.setItem("dataSunset",dataSunset);  

    var dataSunrise_hrs = moment(dataDate + " " + windData.data[0].sunrise).tz(dataTimezone).format('Hmm');
    localStorage.setItem("dataSunrise_hrs",dataSunrise_hrs);
    var dataSunset_hrs = moment(dataDate + " " + windData.data[0].sunset).tz(dataTimezone).format('Hmm');
    localStorage.setItem("dataSunset_hrs",dataSunset_hrs);
    
    var outerRadius = 80;
    var innerRadius = 90;

    p_color = colorPalette["p_"+pod+"_"+bgVal];
    s_color = colorPalette["s_"+pod+"_"+bgVal];

    var dataDate = windData.data[0].datetime;
    dataDate = dataDate.substring(0, dataDate.indexOf(':'));

    var dir   = windData.data["0"].wind_cdir_full;
    var speed = windData.data["0"].wind_spd;
    var  windDataObj  = {"dir" : dir, "speed":speed};
    localStorage.setItem("windStatus",JSON.stringify(windDataObj));
    var navTemp ={"dataInF":tempInF,"dataInC":tempInC}

    localStorage.setItem("navTemp",JSON.stringify(navTemp));
    nav.weather_icon = "img/bgicon/"+bgVal+".svg";
    nav.posts = {"tempInC":tempInC,"tempUnit":tempUnit, "description":weatherType, "city":city, "time":time, "displayDate":displayDate, "displayTime": displayTime};
    nav.dataReady= true;
    //making the content display block
    document.getElementById("content-holder").style.display="block";
    //chnging the color of active botton color
    var el1 = document.getElementsByClassName('active')[0];
        el1.style.borderBottomColor=p_color;
    var el2 = document.getElementsByClassName('current');
        el2[0].style.backgroundColor=p_color;
    var el3 = document.getElementsByClassName('inactive');
        el3[0].style.backgroundColor=s_color;
    var el4 = document.getElementsByClassName('segment-active');
        el4[0].style.background = p_color;
        el4[1].style.background = p_color;
    var el5 = document.getElementById('btnparent');
        el5.style.backgroundColor = s_color;
}
//get temp from openweathermap
function getTemp(response){
    const currentDay = parseInt(moment().format('D'));
    let todayArrC = [];
    let todayArrF = [];
    let weekArrC = [];
    let weekArrF = [];
    let tempArrC = []; 
    let tempArrF = []; 
    var arrF =[];
    var arrC =[];
    //creating object for today 
    response.data.list.forEach(element => {
        if (parseInt(moment(element.dt_txt).format('D')) === currentDay) {
            todayArrC.push({"time": moment(element.dt_txt).format('h:mm A'), "temp": element.main.temp});
            arrC.push(element.main.temp);
            let temp =  (element.main.temp+ 32) * 9 / 5;
            arrF.push(temp);
            todayArrF.push({"time": moment(element.dt_txt).format('h:mm A'), "temp": temp});
        };
    }); 
    //creating object for week   
    for(var i=1; i<=5; i++){
        response.data.list.forEach(element => {
            if (parseInt(moment(element.dt_txt).format('D')) === currentDay+i) {
                tempArrC.push(element.main.temp);
                arrC.push(element.main.temp);
                let temp =  (element.main.temp+ 32) * 9 / 5;
                arrF.push(temp);
                tempArrF.push(temp);
            }

        });
        weekArrC.push({ "time": moment().add(i, 'day').format('MMM D'), "min_temp": Math.min(...tempArrC), "max_temp": Math.max(...tempArrC) });
        weekArrF.push({ "time": moment().add(i, 'day').format('MMM D'), "min_temp": Math.min(...tempArrF), "max_temp": Math.max(...tempArrF) });
        emptyTemp();
    }

    
    function emptyTemp() {
        let tempArrC = []; 
        let tempArrF = []; 
    }
    var data = {"todayData":{"todayArrC":todayArrC, "todayArrF":todayArrF}, "weekData":{"weekArrC":weekArrC,
    "weekArrF":weekArrF}};
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("data",JSON.stringify(data));
    }
    else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}
function getUVIndex(response){
        var visibility = response.data.currently.visibility;
        var humidity = response.data.currently.humidity*100;
        var uvIndex = response.data.currently.uvIndex;
        localStorage.setItem("uvIndex",uvIndex);
        localStorage.setItem("humidity",humidity);
        localStorage.setItem("visibility",visibility);                                              
};
function getAirQuality(response){
        let airQualityObj ={};
        let description;
        // let aqiVal = response.aqi;
        let aqiVal = response.data.data.aqi;
        if(aqiVal>=0 && aqiVal<=50){
            description = "Good Air Quality";
        }
        else if(aqiVal>=51 && aqiVal<=100) {
            description = "Moderate Air Quality";
        }
        else if(aqiVal>=101 && aqiVal<=150) {
            description = "Unhealthy for Sensitive Groups";
        }
        else if(aqiVal>=151 && aqiVal<=200) {
            description = "Unhealthy Air Quality";
        }
        else if(aqiVal>=201 && aqiVal<=300) {
            description = "Very Unhealthy Air Quality";
        }
        else if(aqiVal>=301) {
            description = "Hazardous Air Quality";
        }
        else{
            console.log("Please provide proper value for AQI!")
        }
        airQualityObj.aqi = aqiVal;
        airQualityObj.description = description;
        localStorage.setItem("airQualityObj",JSON.stringify(airQualityObj));
        setTemp(segment,tempUnit);
        setAQI();
        setUVIndex();
        setWindStatus();
        setSunrise_Sunset();
        setVisibility();
        setHumidity();
        setIconColor();
}

//it will render the content
function renderContent(){
    window.content = new Vue({
        // el: '#content',
        data:{
            tempChart: setTemp(segment,tempUnit),
            windStatusChart:setWindStatus(),
            uvIndexChart:setUVIndex(),
            humidityChart:setHumidity(),
            visibility:setVisibility(),
            sunrise_sunset:setSunrise_Sunset(),
            aqi:setAQI(),
            dataReady:false,
            ulStyle:{
                "display": "inline",
                "float": "left"
            },
            liStyle:{
                "display": "inline"
            },
        },
        methods:{
            //get fired when today option will get selected.
            showTempChart: function(e){
                if(e.currentTarget.getAttribute('segment')=='today' && tempUnit == "C"){
                    makeActive(e);
                    segment = "today";
                    setTemp(segment,tempUnit);
                }
                else if(e.currentTarget.getAttribute('segment')=='week' && tempUnit == "C"){
                    makeActive(e);
                    segment = "week";
                    setTemp(segment,tempUnit);
                }
                else if(e.currentTarget.getAttribute('segment')=='week' && tempUnit == "F"){
                    makeActive(e);
                    segment = "week";
                    setTemp(segment,tempUnit);
                }
                else{
                    makeActive(e);
                    segment = "today";
                    setTemp(segment,tempUnit);
                } 
            },
            //get fired when unit change option will get selected.
            changeTempUnit: function(e){
                if(e.currentTarget.getAttribute('unit')=='C' && segment == "today"){
                    toggle(e);
                    tempUnit = "C";
                    setTemp(segment,tempUnit);
                }
                else if(e.currentTarget.getAttribute('unit')=='C' && segment == "week"){
                    toggle(e);
                    tempUnit = "C";
                    setTemp(segment,tempUnit);
                }
                else if(e.currentTarget.getAttribute('unit')=='F' && segment == "week"){
                    toggle(e);
                    tempUnit = "F";
                    setTemp(segment,tempUnit);
                }
                else{
                    toggle(e);
                    tempUnit = "F";
                    setTemp(segment,tempUnit);
                }
            }
        }
    });
    
    function toggle(e) {
        var toggle_class = 'current';
        var parent = e.currentTarget.parentElement;
        var elements = document.getElementsByClassName(toggle_class);
            elements[0].style.backgroundColor = s_color;
            $(elements[0]).addClass("inactive");
        $(parent).find('.btn').removeClass(toggle_class);
        $(parent).find('.btn').removeClass("btn-primary");
        $(e.currentTarget).removeClass("inactive");
        $(e.currentTarget).addClass("btn-primary");
        $(e.currentTarget).addClass(toggle_class);
        var el_2 = document.getElementsByClassName('current');
            el_2[0].style.backgroundColor=p_color;
    }
    function makeActive(e){
        var parent = e.currentTarget.parentElement;
        var elements = parent.getElementsByClassName('active');
        while(elements.length > 0){
                elements[0].style.removeProperty('borderBottomColor');
                elements[0].classList.remove('active');
        }
        e.currentTarget.setAttribute("class", "active");

        var el = document.getElementsByClassName('active');
        for (var i=0; i<el.length; i++) {
            el[i].style.borderBottomColor=p_color;
        }
    }
    //to make it async used setTimeout to mount the right panel
    setTimeout(function(){
        document.getElementById("content-holder").style.display="block";
        content.$mount("#content");
    },1000)
};

//spline chart will get render with data in C
function setTemp(segment,unit){   
    var masterData = JSON.parse(localStorage.getItem('data'));
    var data = masterData[segment+"Data"][segment+"Arr"+unit];
    let max,min;
    var categories = [];
    var category = [];
    var dataset = [];
    var data1 = []; var data2 = []; var data3 = [];
    var seriesName1 = "Today temperature";
    var seriesName2 = "Min";
    var seriesName3 = "Max";
    
    for(var i = 0; i<data.length; i++){
        let obj = {};
        obj.label = data[i].time;
        category.push(obj);
        if (segment=="week") {
            annotations.groups[0].items[i].text = moment(data[i].time).format("ddd");
        }
    }
    categories[0] = {};
    categories[0].category = category;
    if (segment=='today') {
        let tempArr = [];
        for(var i = 0; i<data.length; i++){
            let obj = {};
            obj.value = data[i].temp.toFixed(2);
            tempArr.push(data[i].temp.toFixed(2));
            data1.push(obj);
        }
        let obj = {};
        obj.seriesname = seriesName1;
        obj.data = data1;
        dataset.push(obj);
        max = Math.max(...tempArr);
        min = Math.min(...tempArr);
        tempChartData.annotations = "";
        tempChartData.chart.chartBottomMargin = "20";
    }
    else if(segment=='week'){
        let tempArr1= [] ,tempArr2 = [];
        for(var i = 0; i<data.length; i++){
            let obj1 = {}; let obj2 ={};
            obj1.value = data[i].min_temp.toFixed(2);
            tempArr1.push(data[i].min_temp.toFixed(2));
            obj2.value = data[i].max_temp.toFixed(2);
            tempArr2.push(data[i].min_temp.toFixed(2));
            data2.push(obj1);
            data3.push(obj2);
        }
        dataset.push({
            seriesname: seriesName2,
            data: data2
        });
        dataset.push({
            seriesname: seriesName3,
            data: data3
        });
        min = Math.min(...tempArr1);
        max = Math.max(...tempArr2);
        tempChartData.annotations = annotations;
        tempChartData.chart.chartBottomMargin = "40";
        tempChartData.chart.plotToolText = "$label: $dataValue ($seriesName)";
    }
    else{
        console.log("Wrong segment");
    }
    //Adding suffix as per temperature unit
    if(unit == "F"){
        tempChartData.chart.numberSuffix="°F"
    }else if(unit == "C"){
        tempChartData.chart.numberSuffix="°C"
    }
    else{
        console.log("Wrong unit!");
    }

    tempChartData.chart.yAxisMaxValue = max.toFixed(2);
    tempChartData.chart.yAxisMinValue = min.toFixed(2)-1;
    tempChartData.chart.paletteColors = p_color;
    tempChartData.categories = categories;
    tempChartData.dataset = dataset;
    var dataForChart = JSON.parse(localStorage.getItem('dataForSplineChart'));
    dataForChart.dataSource = tempChartData;
    var temp = JSON.parse(localStorage.getItem('navTemp'))["dataIn"+unit];
    nav.posts.tempInC = temp;
    nav.posts.tempUnit = tempUnit;
    return dataForChart;
};

function setWindStatus(){
    var directionCode = JSON.parse(localStorage.getItem('windStatus')).dir.split('-').join().replace(/\,/g,'').toUpperCase();
    var windSpeed = JSON.parse(localStorage.getItem('windStatus')).speed;
    let directionVal;
    let directionDisplay;
    let colorRangeArr = [
        { "minValue": "0",   "maxValue": "30",  "code": p_color}, // s - south
        { "minValue": "30",  "maxValue": "45",  "code": s_color}, // ssw - south south west
        { "minValue": "45",  "maxValue": "75",  "code": s_color}, // sw - south west
        { "minValue": "75",  "maxValue": "90",  "code": s_color}, // wsw - west south west
        { "minValue": "90",  "maxValue": "120", "code": s_color}, // w - west
        { "minValue": "120", "maxValue": "135", "code": s_color}, // wnw - west north west
        { "minValue": "135", "maxValue": "165", "code": s_color}, // nw - north west
        { "minValue": "165", "maxValue": "180", "code": s_color}, // nnw - north north west
        { "minValue": "180", "maxValue": "210", "code": s_color}, // n - north
        { "minValue": "210", "maxValue": "225", "code": s_color}, // nne - north north east
        { "minValue": "225", "maxValue": "255", "code": s_color}, // ne - north east
        { "minValue": "255", "maxValue": "270", "code": s_color}, // ene - east north east
        { "minValue": "270", "maxValue": "300", "code": s_color}, // e - east
        { "minValue": "300", "maxValue": "315", "code": s_color}, // ese - east south east
        { "minValue": "315", "maxValue": "345", "code": s_color}, // se - south east
        { "minValue": "345", "maxValue": "360", "code": s_color}, // sse - south south east
    ];
    switch (directionCode) {
        case ("SOUTH"):
            {
                // south
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 0) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "15";
                directionDisplay = "↓  S";
            }
            break;

        case ("SOUTHSOUTHWEST"):
            {
                // south south west
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 1) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "37.5";
                directionDisplay = "↙ SSW";
            }
            break;

        case ("SOUTHWEST"):
            {
                // south west
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 2) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "60";
                directionDisplay = "↙ SW";
            }
            break;

        case ("WESTSOUTHWEST"):
            {
                // west south west
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 3) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "82.5";
                directionDisplay = "↙ WSW";
            }
            break;

        case ("WEST"):
            {
                // west
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 4) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "105";
                directionDisplay = "← W";
            }
            break;

        case ("WESTNORTHWEST"):
            {
                // west north west
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 5) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "127.5";
                directionDisplay = "↖ WNW";
            }
            break;

        case ("NORTHWEST"):
            {
                // north west
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 6) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "150";
                directionDisplay = "↖ NW";
            }
            break;

        case ("NORTHNORTHWEST"):
            {
                // north north west
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 7) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "172.5";
                directionDisplay = "↖ NNW";
            }
            break;

        case ("NORTH"):
            {
                // north
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 8) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "195";
                directionDisplay = "↑ N";
            }
            break;

        case ("NORTHNORTHEAST"):
            {
                // north north east
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 9) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "217.5";
                directionDisplay = "↗ NNE";
            }
            break;

        case ("NORTHEAST"):
            {
                // north east
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 10) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "240";
                directionDisplay = "↗ NE";
            }
            break;

        case ("EASTNORTHEAST"):
            {
                // east north east
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 11) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "262.5";
                directionDisplay = "↗ ENE";
            }
            break;

        case ("EAST"):
            {
                // east
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 12) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "285";
                directionDisplay = "→ E";
            }
            break;

        case ("EASTSOUTHEAST"):
            {
                // east south east
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 13) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "307.5";
                directionDisplay = "↘ ESE";
            }
            break;

        case ("SOUTHEAST"):
            {
                // south east
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 14) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "330";
                directionDisplay = "↘ SE";
            }
            break;

        case ("SOUTHSOUTHEAST"):
            {
                // south south east
                for (let i = 0; i < colorRangeArr.length; i++) {
                    if (i === 15) { colorRangeArr[i].code = p_color }
                    else { colorRangeArr[i].code = s_color }
                }
                directionVal = "352.5";
                directionDisplay = "↘ SSE";
            }
            break;

        default:
            alert("Please pass valid parameters");
            break;
    }
        windStausChartData.colorRange.color = colorRangeArr;
        windStausChartData.annotations.groups[0].items[0].text = windSpeed.toFixed(2)+ " km/h";
        windStausChartData.annotations.groups[0].items[0].color = p_color;
        windStausChartData.annotations.groups[0].items[1].text = directionDisplay;
        windStausChartData.annotations.groups[0].items[1].color = p_color;
        windStausChartData.dials.dial[0].value = directionVal;
        windStausChartData.trendpoints.point[0].startValue = directionVal;
        windStausChartData.trendpoints.point[0].color = p_color;
        windStausChartData.trendpoints.point[0].borderColor = p_color;
        var data = JSON.parse(localStorage.getItem('dataForWindChart'));
        data.dataSource = windStausChartData;
        return data;
};

function setUVIndex(){
    var val = localStorage.getItem("uvIndex");
    uvIndexData.colorRange.color[0].maxValue = val;
    uvIndexData.colorRange.color[0].code = p_color;
    uvIndexData.colorRange.color[1].minValue = val;
    uvIndexData.colorRange.color[1].code=s_color;
    uvIndexData.dials.dial[0].value = val;
    uvIndexData.chart.valueFontColor = p_color;
    var data = JSON.parse(localStorage.getItem('dataForUVIndex'));
    data.dataSource = uvIndexData;
    return data;
}

function setHumidity(){
    var val = localStorage.getItem("humidity");
    humidityData.colorRange.color[0].maxValue = val;
    humidityData.colorRange.color[0].code = p_color;
    humidityData.colorRange.color[1].minValue = val;
    humidityData.colorRange.color[1].code= s_color;
    humidityData.chart.gaugeFillColor=s_color;
    humidityData.value = val;
    var data = JSON.parse(localStorage.getItem('dataForHumidity'));
    data.dataSource = humidityData;
    return data;
}

function setVisibility(){
    var val = localStorage.getItem('visibility');
    if(val == "undefined"){
        val = "No data available";
        return val;
    }
    var num = val * 1.60934;
    var factor = Math.pow(10, 1);
    var tempNumber = num * factor;
    var roundedTempNumber = Math.round(tempNumber);
    // return roundedTempNumber / factor;
    window.content.visibility = roundedTempNumber / factor+"km";
    return roundedTempNumber / factor+"km";
}

function setAQI(){
    var data = JSON.parse(localStorage.getItem('airQualityObj'));
    window.content.aqi = data;
    return data;
}
function setSunrise_Sunset(){
    var dataSunrise_hrs = localStorage.getItem('dataSunrise_hrs');
    var dataSunset_hrs = localStorage.getItem('dataSunset_hrs');
    var dataSunrise = localStorage.getItem('dataSunrise');
    var dataSunset = localStorage.getItem('dataSunset');
    sunriseSunsetData.colorRange.color[0].maxValue = dataSunrise_hrs;
    sunriseSunsetData.colorRange.color[1].minValue = dataSunrise_hrs;
    sunriseSunsetData.colorRange.color[1].maxValue = dataSunset_hrs;
    sunriseSunsetData.colorRange.color[2].minValue = dataSunset_hrs;
    sunriseSunsetData.trendpoints.point[0].startValue = dataSunrise_hrs;
    sunriseSunsetData.trendpoints.point[0].displayValue = "Sunrise{br} " + dataSunrise;
    sunriseSunsetData.trendpoints.point[1].startValue = dataSunset_hrs;
    sunriseSunsetData.trendpoints.point[1].displayValue = "Sunset{br} " + dataSunset;
    sunriseSunsetData.dials.dial[0].value = dataSunrise_hrs;
    sunriseSunsetData.dials.dial[1].value = dataSunset_hrs;
    sunriseSunsetData.colorRange.color[0].code = s_color;
    sunriseSunsetData.colorRange.color[1].code = p_color;
    sunriseSunsetData.colorRange.color[2].code = s_color;
    var data = JSON.parse(localStorage.getItem('dataForSunriseSunset'));
    data.dataSource = sunriseSunsetData;
    return data;
}
function setIconColor(){
    if (imgCount==0) {
        document.querySelectorAll('img.svg').forEach(function(img){
            var imgID = img.id;
            var imgClass = img.className;
            var imgURL = img.src;

            fetch(imgURL).then(function(response) {
                return response.text();
            }).then(function(text){

               var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(text, "text/xml");

                // Get the SVG tag, ignore the rest
                var svg = xmlDoc.getElementsByTagName('svg')[0];
                svg.setAttribute('style','height:26px; width:28px;');

                svg.setAttribute('class', 'replaced-svg');

                var path;
                if(svg.children[3].children[0].children[0].children[0]){
                    path = svg.children[3].children[0].children[0].children[0];
                }
                else{
                    path = svg.children[3].children[0].children[0]
                }
                path.setAttribute('style','opacity:1 !important; fill:'+p_color+';');
                // Replace image with new SVG
                img.parentNode.replaceChild(svg, img);
                
            });
        })
        imgCount++;
    }
    else{
        document.querySelectorAll('.replaced-svg path').forEach(function(path){
            path.setAttribute('style','opacity:1 !important; fill:'+p_color+';');
        })
    }
    
}