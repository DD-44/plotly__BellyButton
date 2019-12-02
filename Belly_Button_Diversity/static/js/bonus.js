// function buildGauge(sample) {
//   // @TODO: Use `d3.json` to fetch the sample data for the plots
//   var gauge = `/metadata/${sample}`;
//   console.log(gauge);
//   d3.json(gauge).then(freq => {
//     console.log(freq);

//     let washingFreq = freq.WFREQ;
//     console.log(washingFreq);
//     let data_gauge = [
//       {
//         domain: { x: [0, 1], y: [0, 1] },
//         value: washingFreq,
//         title: { text: "washing freq." },
//         type: "indicator",
//         mode: "gauge+number",
//         gauge: {
//           axis: { range: [null, 9], nticks: 9 },
//           bar: { color: "darkgray" },
//           borderwidth: 2,
//           bordercolor: "gray",
//           steps: [
//             { range: [0, 3], color: "red" },
//             { range: [3, 6], color: "yellow" },
//             { range: [6, 9], color: "green" }
//           ]
//         }
//       }
//     ];

//     var layout = { margin: { t: 1, b: 1 } };
//     Plotly.newPlot("gauge", data_gauge, layout);
//   });
// }

// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");
//   // Use the list of sample names to populate the select options
//   d3.json("/names").then(sampleNames => {
//     // console.log(sampleNames);
//     sampleNames.forEach(sample => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//       //   console.log(sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildGauge(firstSample);
//   });
// }

// function optionChanged(newSample2) {
// var selector2 = d3.select("#selDataset");
// selector2.on("change", function(newSample2) {
//   // Fetch new data each time a new sample is selected
//   console.log(newSample2);
//   buildGauge(newSample2);
// });
// }

// // Initialize the dashboard
// init();
