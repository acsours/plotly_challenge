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
        var otu_ids=data["samples"][0]['otu_ids'] //.slice(0,10).toString()
        // var otu_string_list=otu_ids.toString()
        
        var bact_values=data["samples"][0]['sample_values'] //.slice(0,10);
        console.log(`OTU id numbers ${otu_ids}`);
        console.log(`Bacteria values ${bact_values}`);
        // console.log(`OTU string list ${otu_string_list}`);
        var data1 = [{
        'type': 'bar',
        'y': otu_ids.slice(0,10).reverse(),
        'x': bact_values.slice(0,10).reverse(),
        'orientation': 'h',
        // text: otu_ids.map(each_id=>each_id.toString())
        }]

        // var data = [trace1]

        var layout1 = {
            'title': 'Top 10 OTUS of subject 940',
            yaxis: {
                type: 'category',
                title: 'OTU ID'
            }
        }

        Plotly.newPlot(graphDiv, data1, layout1)
//************* Bubble Graph Testing ************/
        var trace2={
            'y': bact_values,//.reverse(),
            'x':otu_ids,
            mode: 'markers',
            marker: {
                size: 40,
                sizemode: 'area',
                opacity: 0.4
            }
        };
        var data2=[trace2];
        var layout2 = {
            title: 'OTU Values', 
            showlegend: false,
            height: 800,
            width: 800
        };
        Plotly.newPlot('bubble', data2, layout2)
/************************************** */

    });

  };

init();

d3.selectAll("#selDataset").on("change", optionChanged);
// when the dropdown menu switches, pull the value from the element and use that to filter through the data, then build the plot
function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    var id_number=dropdownMenu.property("value");
    console.log('waiting for changed data')
    console.log(dropdownMenu);
    console.log(`chosen_dataset is: ${id_number}`);

    d3.json("../samples.json").then((data) => {
        // use id_number to sort through the data
        // go through each element in samples and check if id value matches dropdowm menu value
 
        var sample_list = data['samples']
        // console.log(`sample list is: ${sample_list[0]["id"]}`)
        for (i=0; i<sample_list.length; i++) {
            if (id_number == sample_list[i]["id"]){
                console.log(`match found at ${id_number}`);
                var otu_ids=sample_list[i]['otu_ids']//.slice(0,10).reverse().toString();
                var bact_values=sample_list[i]['sample_values']//.slice(0,10).reverse()
                var otu_labels=sample_list[i]['otu_labels']//.slice(0,10).reverse().toString();
                console.log(otu_ids);
                var trace1 = {
                    'type': 'bar',
                //     'y': //otu_ids,
                    'y': otu_ids.slice(0,10).reverse(),
                //     'x': //sample_values,
                    'x': bact_values.slice(0,10).reverse(),
                    'orientation': 'h'
                //     'text'://an array of string values[],
                //     // 'marker': {color: }
                };
                
                var data = [trace1]
                // adding test comment
                var layout= {
                    'title': `Top OTUS of ${id_number}`,
                    yaxis: {
                        type: 'category',
                        title: 'OTU ID'
                    },
                    xaxis: {
                        title: 'Sample Value'
                    }
                    // xaxis: {
                    //     autotick: false,
                    // }                
                }
                // Plotly.restyle('bar', 'y', [otu_ids.slice(0,10).reverse()])
                // Plotly.restyle('bar', 'x', [bact_values.slice(0,10).reverse()])
                // Plotly.relayout('bar', layout_update)
                Plotly.newPlot("bar", data, layout)

                var bubbleDiv = document.getElementById('bubble')
                var desired_maximum_marker_size = 40;
                var size = [200, 400, 600, 800, 1000]
                var trace5={
                    'y': bact_values,//.slice(0,5),//.reverse(),
                    'x':otu_ids, //.slice(0,5),
                    text: otu_labels,//['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
                    mode: 'markers',
                    marker: {
                        color: otu_ids,
                        size: size,
                        sizeref: 2.0 * Math.max(size) / (desired_maximum_marker_size**2),
                        sizemode: 'area',
                        opacity: 0.4
                    }
                };
                var data2=[trace5];
        
                var layout2 = {
                    title: 'OTU Values', 
                    showlegend: false,
                    height: 800,
                    width: 800,
                    xaxis: {
                        title: "OTU ID Number",
                        autorange: true,
                    },
                    yaxis: {
                        title: "Sample Value",
                        autorange: true
                    }
                };
                Plotly.newPlot(bubbleDiv, data2, layout2)

                // console.log(`otu_ids ${otu_ids}`);
                // console.log(`bact_values ${bact_values}`);
                // console.log(`otu_labels ${otu_labels}`);

            }
            // console.log(`sample is: ${sample_list[i]["id"]}`)
        }
        // sample_list.forEach(sample=> function(sample){
        // // if it matches, pull the otus and populate graph
        //     console.log(`sample is: ${sample["id"]}`);

        //     // switch(id_number){
        //     //     case (sample["id"]):
        //     //         console.log('sample found');
        //     //         break;
        //     //     default:
        //     //         console.log('NO SAMPLE FOUND');
        //     // };
        // //     if (value == sample["id"]) {
        // //         var otu_ids=sample['otu_ids'].slice(0,10);
        // //         var bact_values=sample['sample_values'].slice(0,10);
        // //         console.log(`otu_ids ${otu_ids}`)
                // var trace1 = {
                //     'type': 'bar',
                // //     'y': //otu_ids,
                //     'y': otu_ids,
                // //     'x': //sample_values,
                //     'x': bact_values,
                //     'orientation': 'h'
                // //     'text'://an array of string values[],
                // //     // 'marker': {color: }
                // };
                
                // var data = [trace1]
                
                // var layout = {
                //     'title': 'Top 10 OTUS by individual'
                // }
                
                // Plotly.newPlot('bar', data, layout)
        // //     }
        // });

    

    // };
    });
};

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