function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  var sampledata = `/metadata/${sample}`;
  d3.json(sampledata).then(sample => {
    // var samplemeta = d3.select("#sample-metadata");
    var tbody = d3.select("tbody");

    // Use `.html("") to clear any existing metadata
    tbody.html("");

    var count = 0;
    var row = tbody.append("tr");
    Object.entries(sample).forEach(([key, value]) => {
      // console.log(key, value);
      if (count < 6) {
        var cell = row.append("td");
        cell.text(value);
        count += 1;
      }
    });
  });
}
//-------------------------------------------------------------

//@TODO - create chart funtions

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var plotdata = `/samples/${sample}`;
  d3.json(plotdata).then(data => {
    // @TODO: Build a Bubble Chart using the sample data
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
    Plotly.newPlot("bubble", trace, layout);

    //----------------------------------------------------

    // @TODO: Build a Pie Chart
    let sample_values = data.sample_values;
    let otu_ids = data.otu_ids;
    let otu_labels = data.otu_labels;
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

function buildGauge(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var gauge = `/metadata/${sample}`;
  console.log(gauge);
  d3.json(gauge).then(freq => {
    console.log(freq);

    let washingFreq = freq.WFREQ;
    console.log(washingFreq);
    let data_gauge = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washingFreq,
        title: { text: "washing freq." },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9], tick0: 0, dtick: 1 },
          bar: { color: "darkgray" },
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 3], color: "red" },
            { range: [3, 6], color: "yellow" },
            { range: [6, 9], color: "green" }
          ]
        }
      }
    ];

    var layout = { margin: { t: 1, b: 1 } };
    Plotly.newPlot("gauge", data_gauge, layout);
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
    buildGauge(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  buildGauge(newSample);
}

// Initialize the dashboard
init();
