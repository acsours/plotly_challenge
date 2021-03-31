/* ***************************************** */
// Pulling the names and populating the dropdown menu with these values
function populateDropdown() {

    d3.json("../samples.json").then((data) => {
        // access the data["names"] and save as an array
            var id_list=data["names"]
            console.log(`id_list ${id_list}`);
            // select the html object
            var dropdownMenu=d3.select('#selDataset')
            // console.log(dropdownMenu);
            id_list.forEach(id=> dropdownMenu.append('option').attr("value", id).text(id));
        // for each item in the id_list array, add an item to the dropdown list
        // that matches in value and text
        
    });
};

populateDropdown();

// Initializes the page with a default plot
function init() {
    d3.json("../samples.json").then((data) => {
        var graphDiv = document.getElementById('bar')
        var otu_ids=data["samples"][0]['otu_ids'].slice(0,10).toString()
        // var otu_string_list=otu_ids.toString()
        
        var bact_values=data["samples"][0]['sample_values'].slice(0,10);
        console.log(`OTU id numbers ${otu_ids}`);
        console.log(`Bacteria values ${bact_values}`);
        // console.log(`OTU string list ${otu_string_list}`);
        var trace1 = {
        'type': 'bar',
    //     'y': //otu_ids,
        'y': otu_ids,
    //     'x': //sample_values,
        'x': bact_values,
        'orientation': 'h'
    //     'text'://an array of string values[],
    //     // 'marker': {color: }
        }

        var data = [trace1]

        var layout = {
            'title': 'Top 10 OTUS Sample Graph'
        }

        Plotly.newPlot(graphDiv, data, layout)
    });

  };

init();

d3.selectAll("#selDataset").on("change", optionChanged);
// when the dropdown menu switches, pull the value from the element and use that to filter through the data, then build the plot
// function optionChanged() {
//     // var dropdownMenu = d3.select("#selDataset");
//     // var id_number=dropdownMenu.property("value");

//     d3.json("../samples.json").then((data) => {
//         // use id_number to sort through the data
//         // go through each element in samples and check if id value matches dropdowm menu value
//         var sample_list = data['samples']
//         sample_list.forEach(sample=> function(sample){
//         // if it matches, pull the otus and populate graph
//             if (value == sample["id"]) {
//                 var otu_ids=sample['otu_ids'].slice(0,10);
//                 var bact_values=sample['sample_values'].slice(0,10);
//                 console.log(`otu_ids ${otu_ids}`)
//                 // var trace1 = {
//                 //     'type': 'bar',
//                 // //     'y': //otu_ids,
//                 //     'y': otu_ids,
//                 // //     'x': //sample_values,
//                 //     'x': bact_values,
//                 //     'orientation': 'h'
//                 // //     'text'://an array of string values[],
//                 // //     // 'marker': {color: }
//                 // };
                
//                 // var data = [trace1]
                
//                 // var layout = {
//                 //     'title': 'Top 10 OTUS by individual'
//                 // }
                
//                 // Plotly.newPlot('bar', data, layout)
//             }
//         });

    

//     });
// };

// // // Use the D3 library to read in samples.json.
// d3.json("../samples.json").then((data) => {
//     // console.log(data['names']);
//     // I want to get from data to a list of dictionaries
//     var sample_list = data["samples"];
//     var otu_ids_test=sample_list[0]['otu_ids'];
//     console.log(otu_ids_test)
//     var top_10_otus=otu_ids_test.slice(0,10);
//     console.log(top_10_otus);
//     // // slice first 10 objects for plotting
//     // // pull id of subject to match dropdown
//     var id_test=sample_list[0]['id'];
//     console.log(id_test.slice(0,10));
//     // // use map() to build array of otu IDs (lables)
//     // var otu_ids = samples['otu_ids'];
//     // console.log(otu_ids[0]);
//         // [pull  array of sample values
//     var sample_values_test=sample_list[0]['sample_values'];
//     console.log(sample_values_test.slice(0,10));
// });





/* ***************************************** */


// // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// // Use sample_values as the values for the bar chart.

// // Use otu_ids as the labels for the bar chart.

// // Use otu_labels as the hovertext for the chart.

// // // horizontal bar chart (from 15-2-6 example)
// var trace1 = {
//     'type': 'bar',
// //     'y': //otu_ids,
//     'y': otu_ids_test.slice(0,10),
// //     'x': //sample_values,
//     'x': sample_values_test.slice(0,10),
//     'orientation': 'h'
// //     'text'://an array of string values[],
// //     // 'marker': {color: }
// }

// var data = [trace1]

// var layout = {
//     'title': 'Top 10 OTUS by individual'
// }

// Plotly.newPlot('bar', data, layout)

init();