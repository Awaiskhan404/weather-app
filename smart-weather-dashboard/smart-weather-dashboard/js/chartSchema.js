//chart attribute for rendering chart
var annotations = {
    "groups": [{
      "id": "day_name",
      "fontSize":"14.5",
      "font":"Source Sans Pro SemiBold",
      "color":"#878787",
      "items": [{
          "type": "text",
          "text": "Label-1",
          "bold":"1",
          "x": "$xaxis.label.0.x",
          "y": "$xaxis.label.0.y+20"
        },
        {
          "type": "text",
          "text": "Label-2",
          "bold":"1",
          "x": "$xaxis.label.1.x",
          "y": "$xaxis.label.1.y+20"
        },
        {
          "type": "text",
          "text": "Label-3",
          "bold":"1",
          "x": "$xaxis.label.2.x",
          "y": "$xaxis.label.2.y+20"
        },
        {
          "type": "text",
          "text": "Label-4",
          "bold":"1",
          "x": "$xaxis.label.3.x",
          "y": "$xaxis.label.3.y+20"
        },
        {
          "type": "text",
          "text": "Label-5",
          "bold":"1",
          "x": "$xaxis.label.4.x",
          "y": "$xaxis.label.4.y+20"
        }
      ]
  }]
};

var tempChartData={
"chart": {
  "theme": "fint",
  "paletteColors": "#979ACD",
  "divLineAlpha": "0",
  "showYAxisValues": "0",
  "showXAxisLine": "0",
  "showValues": "0",
  "showZeroPlane": "0",
  "numberSuffix": "°C",
  "bgColor":"#ffffff",
  "bgAlpha":"0",
  "baseFont": "Source Sans Pro Light",
  "baseFontSize": "16",
  "labelFontSize": "14",
  "labelFontColor":"#878787",
  "chartBottomMargin":"20",
  "showLabels": "1",
  "showLegend": "0",
  "anchorRadius":"4",
  "anchorBorderThickness":"2.5",
  "lineThickness":"3",
  "crossLineAlpha":"70",
  "drawCrossLine": "1",
  "plotToolText": "$label: $dataValue",
  "chartTopMargin": "0",
  "canvasTopMargin": "15",
  "chartBottomMargin": "20",
  "canvasBottomMargin": "20",
  "canvasRightMargin": "10",
  "canvasLeftMargin": "10",
  "chartRightMargin": "10",
  "chartLeftMargin": "10",
  "plotColorinTooltip": "0"
}
};
var windStausChartData = {
    "chart": {
        "bgColor":"#ffffff",
        "bgAlpha":"0",
        "manageresize": "1",
        "gaugeStartAngle": "285",
        "gaugeEndAngle": "-75",
        "upperLimit": "360",
        "lowerLimit": "0",
        "gaugeFillMix": "{light+0}",
        "showShadow": "0",
        "showGaugeBorder": "0",
        "showTickValues": "0",
        "majorTMAlpha": "0",
        "minorTMAlpha": "0",
        "pivotRadius": "0",
        "pivotBorderThickness": "0",
        "gaugeInnerRadius":"65",
        "gaugeOuterRadius":"80",
        "baseFont":"Source Sans Pro Light",
        "baseFontSize":"14",
        "baseFontBold": "1",
        "gaugeFillAlpha": "10",
        "showBorder": "0",
        "showToolTip": "0"
    },

    "colorRange": {
        "color": ""
    },

    "annotations": {
        "groups": [{
            "items": [{
                "id": "speeddesc",
                "type": "text",
                "text": "",
                "x": "$gaugeCenterX",
                "y": "$gaugeCenterY - 15",
                "color": "",
                "bold": "0",
                "fontSize": "16",
                "font": "Source Sans Pro Regular"
            }, {
                "id": "speeddir",
                "type": "text",
                "text": "",
                "x": "$gaugeCenterX",
                "y": "$gaugeCenterY + 10",
                "color": "",
                "bold": "0",
                "fontSize": "16",
                "font": "Source Sans Pro Light"
            }]
        }]
    },

    "dials": {
        "dial": [
            {
                "value": "",
                "baseWidth": "0",
                "borderThickness": "0",
                "radius": "0",
                "baseRadius": "0"
            }
        ]
    },

    "trendpoints": {
        "point": [
            {
                "startValue": "",
                "displayValue": " ",
                "color": "",
                "borderColor": "",
                "thickness": "4.5",
                "alpha": "100",
                "useMarker": "1",
                "valueInside": "0",
                "innerRadius": "75",
                "markerRadius": "-7"
            }
        ]
    }
};
var sunriseSunsetData={
"chart": {
    "lowerLimitDisplay": "Low",
    "upperLimitDisplay": "High",
    "showTickValues":"0",
    "gaugeInnerRadius":"85",
    "gaugeOuterRadius":"100",
    "showValue": "0",
    "valueBelowPivot": "0",
    "pivotRadius": "0",
    "placeTicksInside":"1",
    "majorTMAlpha":"0",
    "bgColor":"#ffffff",
    "bgAlpha":"0",
    "baseFont":"Source Sans Pro Light",
    "baseFontSize":"16",
    "theme": "fint",
    "bgcolor":"#F8F8F8",
    "showGaugeBorder": "0",
    "gaugeoriginy": "150",
    "chartLeftMargin": "0",
    "chartRightMargin": "0",
    "showToolTip": "0"
},
"colorRange": {
  "color": [{
      "minValue": "0",
      "maxValue": "",
      "code": "#74808A",
      "borderAlpha": "0"
  }, {
      "minValue": "",
      "maxValue": "",
      "code": "#73AFFF",
      "borderAlpha": "0"
  }, {
      "minValue": "",
      "maxValue": "2359",
      "code": "#74808A",
      "borderAlpha": "0"
  }]
},

"trendpoints": {
  "point": [
      {
          "startValue": "",
          "displayValue": "",
          "color": "#74808A",
          "thickness": "1",
          "innerRadius": "80",
          "alpha": "0"
      }, {
          "startValue": "",
          "displayValue": "",
          "color": "#74808A",
          "thickness": "1",
          "innerRadius": "80",
          "alpha": "0"
      }
  ]
},

"dials": {
  "dial": [
      { "value": "", "borderAlpha": "0", "baseRadius": "0", "alpha": "0" },
      { "value": "", "borderAlpha": "0", "baseRadius": "0", "alpha": "0" }
  ]
}
}
var uvIndexData = {
  "chart": {
    "lowerLimitDisplay": "Low",
    "upperLimitDisplay": "High",
    "showTickValues":"1",
    "gaugeInnerRadius":"80",
    "gaugeOuterRadius":"95",
    "showValue": "0",
    "valueBelowPivot": "0",
    "pivotRadius": "0",
    "placeTicksInside":"1",
    "majorTMAlpha":"0",
    "minorTMAlpha": "0",
    "bgColor":"#ffffff",
    "bgAlpha":"0",
    "baseFont":"Source Sans Pro Light",
    "baseFontSize":"14",
    "baseFontColor": "#74808A",
    "theme": "fint",
    "showGaugeBorder": "0",
    "bgcolor":"#F8F8F8",
    "showValue":"1",
    "gaugeoriginy": "150",
    "chartLeftMargin": "0",
    "chartRightMargin": "0",
    "autoAlignTickValues": "1",
    "valueFontColor": "",
    "valueFont": "Source Sans Pro Regular",
    "showToolTip": "0"
  },
  "colorRange": {
    "color": [{
        "minValue": "0",
        "maxValue": "7",
        "code": "#7FB8FF"
      },
      {
        "minValue": "7",
        "maxValue": "15",
        "code": "#D9EDFF"
      }
    ]
  },
  "dials": {
    "dial": [{
      "value": "6",
      "bordercolor": "FFFFFF",
      "bgcolor": "bebcb0, f0efea, bebcb0",
      "borderalpha": "0",
      "basewidth": "0",
      "topwidth": "0"
    }]
  }
};
var humidityData = {
    "chart": {
      "animation":"0",
      "showBorder": "0",
      "valueFontBold":"1",
      "valueFontSize":"20",
      "subcaptionFontBold": "0",
      "lowerLimit": "0",
      "upperLimit": "100",
      "numberSuffix":"%",
      "borderAlpha": "0",
      "showValue": "1",
      "gaugeFillColor":"#D9EDFF",
      "showTickValues":"0",
      "showGaugeBorder": "0",
      "majorTMAlpha": "0",
      "ledGap": "0",
      "bgColor": "#ffffff",
      "bgAlpha":"0",
      "showShadow": "0",
      "chartTopMargin":"3",
      "chartBottomMargin":"10",
      "baseFont":"Source Sans Pro SemiBold",
      "baseFontSize":"14",
      "bgcolor":"#F8F8F8",
      "showToolTip": "0"
    },
    "colorRange": {
      "color": [{
          "minValue": "0",
          "maxValue": "70",
          "code": "#7FB8FF"
        },
        {
          "minValue": "70",
          "maxValue": "100",
          "code": "#D9EDFF"
        }
      ]
    },
    "value": "70"
  };
var dataForSunriseSunset={
type: 'angulargauge',
renderAt: 'chart',
width: '100%',
height: '100%',
containerBackgroundOpacity:'0.8',
creditLabel: false,
dataFormat: 'json',
dataSource: sunriseSunsetData
}
localStorage.setItem("dataForSunriseSunset",JSON.stringify(dataForSunriseSunset));
var dataForHumidity={
type: 'hled',
width: '100%',
height: '100%',
containerBackgroundOpacity:'0.8',
dataFormat: 'json',
creditLabel: false,
dataSource: humidityData
}
localStorage.setItem('dataForHumidity', JSON.stringify(dataForHumidity));
var dataForUVIndex ={
type: 'angulargauge',
renderAt: 'chart',
width: '100%',
height: '100%',
containerBackgroundOpacity:'0.5',
creditLabel: false,
dataFormat: 'json',
dataSource: uvIndexData
};
localStorage.setItem('dataForUVIndex',JSON.stringify(dataForUVIndex));
var dataForTempChart = { 
type: 'msline',
width: '100%',
height: '100%',
containerBackgroundOpacity:'0.8',
dataFormat: 'json',
creditLabel: false,
dataSource: tempChartData
};
localStorage.setItem('dataForSplineChart',JSON.stringify(dataForTempChart));
var dataForWindStatusChart ={
type: 'angulargauge',
width: '100%',
height: '100%',
containerBackgroundOpacity:'0.8',
dataFormat: 'json',
renderAt: 'chart-container',
creditLabel: false,
dataSource: windStausChartData
}
localStorage.setItem('dataForWindChart',JSON.stringify(dataForWindStatusChart));