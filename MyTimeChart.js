(function(window){

  window.MyTimeChart = {
    setDatePrototype: function(){
      Date.prototype.getFormatedTime = function(){
        var hours = (this.getUTCHours()<10?'0':'') + this.getUTCHours();
        var minutes = (this.getUTCMinutes()<10?'0':'') + this.getUTCMinutes();
        var seconds = (this.getUTCSeconds()<10?'0':'') + this.getUTCSeconds();
        return hours + ':' + minutes + ':' + seconds;
      };
    },

    getEventTime: function(hours, minutes, seconds) {
      return new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));
    },

    getDataList: function(events) {
      var dataList = [];
      events.filter(function(event){
        dataList.push(event.time.getTime());
      });
      return dataList;
    },

    getLabelList: function(events) {
      var labelList = [];
      events.filter(function(event){
        labelList.push(event.name);
      });
      return labelList;
    },

    getScaleLabel: function(value) {
      var hours = value / (60 * 60 * 1000);
      return (hours<10?'0':'') + hours + ':00:00'; 
    },

    getTooltip: function(label, value) {
      return (label ? label : '') +': ' + new Date(value).getFormatedTime();
    },

    chartOptions: {
        responsive: true,
        scaleLabel : "<%= window.MyTimeChart.getScaleLabel(value) %>",
        tooltipTemplate: "<%= window.MyTimeChart.getTooltip(label, value) %>", 
        scaleOverride : true,
        scaleSteps : 3,
        scaleStepWidth : 3600000,
        scaleStartValue : 0
    },

    chartData: function(events) {
      return {
        labels: window.MyTimeChart.getLabelList(events),
          datasets: [
            {
              label: "My events",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: window.MyTimeChart.getDataList(events)
            }
          ]
      };
    },

    init: function(canvasId, events) {
      this.setDatePrototype();
      var ctx = document.getElementById(canvasId).getContext("2d");
      return new window.Chart(ctx).Line(window.MyTimeChart.chartData(events), window.MyTimeChart.chartOptions);
    }
  };

})(window);
