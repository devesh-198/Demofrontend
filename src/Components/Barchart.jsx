import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

function options(data) {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Bar charts for the acoustics and tempo value'
        },
        // subtitle: {
        //     text:
        //         'Source: <a target="_blank" ' +
        //         'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
        // },
        xAxis: {
            categories: data?.categories || [],
            crosshair: true,
            accessibility: {
                description: 'acoustics and tempo'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'acoustics and tempo'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Acousticness',
                data: data?.acousticness,
            },
            {
                name: 'Tempo',
                data: data?.tempo,
            },
        ],
    };
}

function Barchart(props) {
    console.log(props);
    
    return <HighchartsReact highcharts={Highcharts} options={options(props.barchart)}/>;
}

export default Barchart;