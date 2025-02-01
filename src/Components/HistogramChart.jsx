import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import histogramBellCurve from "highcharts/modules/histogram-bellcurve";

// Initialize the histogram module (this is important!)
if (typeof histogramBellCurve === "function") {
    histogramBellCurve(Highcharts);
}

function options(data) {
    return {
        title: {
            text: 'Duration Histogram'
        },

        xAxis: [{
            title: { text: 'Data' },
            alignTicks: false
        }, {
            title: { text: 'Histogram' },
            alignTicks: false,
            opposite: true
        }],

        yAxis: [{
            title: { text: 'Data' }
        }, {
            title: { text: 'Histogram' },
            opposite: true
        }],

        plotOptions: {
            histogram: {
                accessibility: {
                    point: {
                        valueDescriptionFormat: '{index}. {point.x:.3f} to ' +
                            '{point.x2:.3f}, {point.y}.'
                    }
                }
            }
        },

        series: [{
            name: 'Histogram',
            type: 'histogram',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 's1',
            zIndex: -1
        }, {
            name: 'Duration',
            type: 'scatter',
            data: data || [],
            visible: false,
            id: 's1',
            marker: {
                radius: 1.5
            }
        }]
    };
}

function HistogramChart (props) {
    return <HighchartsReact highcharts={Highcharts} options={options(props.histogramChart)} />
}

export default HistogramChart;
