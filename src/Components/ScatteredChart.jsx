import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

Highcharts.setOptions({
    colors: ['rgba(5,141,199,0.5)']
});

const options = {
    chart: {
        type: 'scatter',
        zooming: {
            type: 'xy'
        }
    },
    title: {
        text: 'Danceability Scattered chart'
    },
    // subtitle: {
        // text: "Danceability Scattered chart."
    // },
    xAxis: {
        title: {
            text: 'Danceability'
        },
        labels: {
            format: '{value}'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Danceability'
        },
        labels: {
            format: '{value}'
        }
    },
    legend: {
        enabled: true
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 2.5,
                symbol: 'circle',
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            jitter: {
                x: 0.005
            }
        }
    },
    tooltip: {
        pointFormat: 'Danceability: {point.x}'
    },
    series: [{
        name: 'Danceability',
        id: 'danceability',
        marker: {
            symbol: 'circle'
        },
        data: [],
    }]
};

function ScatteredChart(props) {

    options.series[0].data = props.scatteredChart;

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

export default ScatteredChart;