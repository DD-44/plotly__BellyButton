function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  var sampledata = `/metadata/${sample}`;
  d3.json(sampledata).then(sample => {
    var samplemeta = d3.select("#sample-metadata");
    var tbody = d3.select("tbody");

    // Use `.html("") to clear any existing metadata
    tbody.html("");

    var count = 0;
    var row = tbody.append("tr");
    Object.entries(sample).forEach(([key, value]) => {
      console.log(key, value);
      if (count < 6) {
        var cell = row.append("td");
        cell.text(value);
        count += 1;
      }
    });
  });
}
// Hint: Inside the loop, you will need to use d3 to append new

// tags for each key-value in the metadata.

// BONUS: Build the Gauge Chart
// buildGauge(data.WFREQ);

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var plotdata = `/samples/${sample}`;
  d3.json(plotdata).then(data => {
    var datafigures = data.sample_values;
    var colors = data.otu_ids;
    var trace = [
      {
        x: data.otu_ids,
        y: data.sample_values,
        mode: "markers",
        marker: { size: datafigures, color: colors }
      }
    ];
    var layout = {
      xaxis: { title: "OTU - ID" },
      yaxis: { title: "Sample Volume" }
    };
    // @TODO: Build a Bubble Chart using the sample data
    Plotly.newPlot("bubble", trace, layout);

    let sample_values = data.sample_values;
    let otu_ids = data.otu_ids;
    let otu_labels = data.otu_labels;

    // @TODO: Build a Pie Chart
    let trace1 = {
      values: sample_values.slice(0, 10),
      labels: otu_ids.slice(0, 10),
      type: "pie",
      hovertext: otu_labels.slice(0, 10)
    };
    let data_pie = [trace1];
    Plotly.newPlot("pie", data_pie);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then(sampleNames => {
    sampleNames.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
