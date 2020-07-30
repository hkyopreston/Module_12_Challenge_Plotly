function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

function optionChanged(newSample) {
  console.log(newSample);
}

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    var str1 = "id: ";
    var res = str1.concat(result.id);
    PANEL.append("h6").text(res);

    var str2 = "ethnicity: ";
    var res2 = str2.concat(result.ethnicity);
    PANEL.append("h6").text(res2);

    var str3 = "gender: ";
    var res3 = str3.concat(result.gender);
    PANEL.append("h6").text(res3);

    var str4 = "age: ";
    var res4 = str4.concat(result.age);
    PANEL.append("h6").text(res4);

    var str5 = "location: ";
    var res5 = str5.concat(result.location);
    PANEL.append("h6").text(res5);

    var str6 = "bbtype: ";
    var res6 = str6.concat(result.bbtype);
    PANEL.append("h6").text(res6);

    var str7 = "wfreq: ";
    var res7 = str7.concat(result.wfreq);
    PANEL.append("h6").text(res7);
  });
}

function graph(ID){
  console.log("graph: " + ID)

  // Create variables for charts

  var sample_values = data.samples.filter(object => object.id == ID)[0]

  var otu_ids = sample_values.otu_ids
  var sample_values = sample_values.sample_values
  var otu_labels = sample_values.otu_labels

  // Create bar chart. I tried to isolate the top 10 but can't figure out how to do that

  var trace1 = {

      x: sample_values, // .slice(0,10),
      y: otu_ids, // .slice(0,10),
      text: otu_labels, // .slice(0,10),
      type: "bar",
      orientation: "h"
  
    };
  
    // data
    var chartData = [trace1];
  
    // Render the plot
    Plotly.newPlot("bar", chartData);


    // Create bubblechart

    var trace2 = {

      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
          color: otu_ids,
          size: sample_values
      }
  
    };
  
    // data
    var bubbleData = [trace2];
  
    // Render the plot
    Plotly.newPlot("bubble", bubbleData); 
   }

// Import Data
d3.json("samples.json").then(function(response){
  console.log(response)
  data=response
  dropdown()
})