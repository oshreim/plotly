init();

// ==================================================
function init() {
  d3.json("./assets/data/samples.json").then(data => {
    data.names.forEach((name) => {
      d3.select("select").append("option").text(name).attr("value", name);
    });

    showMetadata(data.names[0]);
    showBubble(data.names[0]);
    showBar(data.names[0]);
  });
};

function optionChanged(name) {
    showMetadata(name);
    showBubble(name);
}

function showMetadata(name) {
  d3.json("./assets/data/samples.json").then(data => {
    var metadata = data.metadata.filter((obj) => obj.id == name)[0];
    var panel = d3.select("#sample-metadata");

    panel.html('');

    Object.entries(metadata).forEach(([key,value]) => {
        panel.append('h6').text(key.toUpperCase() + ': ' + value);
    })
  });
};

function showBar(name) {
    d3.json("./assets/data/samples.json").then(data => { 
        var sample = data.samples.filter(obj => obj.id == name)[0];
        var BarData = [
            {
                y: sample.otu_ids.slice(0,10).map(otu_ID => `OTU ${otu_ID}`).reverse(),
                x: sample.sample_values.slice(0,10).reverse(),
                text: sample.otu_labels.slice(0,10).reverse(),
                type: 'bar',
                orientation: 'h'    
            }
        ];

        var BarLayout = {
            title: 'Top 10 Bacteria Cultures Found',
            margin: {t:30,l:150},
        };

        Plotly.newPlot('bar', BarData, BarLayout);
    });
};
function showBubble(name) {
    d3.json("./assets/data/samples.json").then(data => { 
        var sample = data.samples.filter(obj => obj.id == name)[0];
        var bubbleData = [
            {
                x: sample.otu_ids,
                y: sample.sample_values,
                text: sample.otu_labels,
                mode: 'markers',
                marker:{
                    size: sample.sample_values,
                    color: sample.otu_ids,
                    colorscale: 'Earth'
                }
            }
        ];

        var bubbleLayout = {
            title: 'Bacteria Cultures per Sample',
            margin: {t:0},
            hovermode: 'closest',
            xaxis: {title: 'OTU ID'},
            margin: {t:30}
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
};
