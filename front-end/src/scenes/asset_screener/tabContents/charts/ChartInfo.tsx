import React, {useEffect, useState} from 'react'
import {getChart} from '../../../../config/WebcallAPI'
import {Button, Typography} from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import {OHLC} from './OHLC'
import {ApexCustomFormat} from './ApexCustomFormat'
import {ApexOptions} from 'apexcharts'
import {textAlign} from '@mui/system'
// import {mapCategories} from './chart_utils'

// https://yahooquery.dpguthrie.com/guide/ticker/historical/
// https://apexcharts.com/react-chart-demos/candlestick-charts/basic/

// https://apexcharts.com/docs/react-charts/
// open high low close

interface Props {
    ticker?: string
}

function ChartInfo(props: Props) {
    const [prices, setPrices] = useState<OHLC[]>()
    const [OHLCformatted, setOHLCformatted] = useState<{}>()
    useEffect(() => {
        // console.log(props)

        const fetchData = async () => {
            if (!props.ticker) {
                return
            }
            const response = await fetch(getChart(props.ticker, '1y'))
            const resJson: OHLC[] = await response.json()
            setPrices(resJson)
        }

        fetchData().catch((err) => console.log(err))
    }, [props.ticker])

    // seriesData, setSeriesData, then messs with combo settings from API demo. Problem is probably in our date format.

    const [apexBarChart, setApexBarChart] = useState<ApexCustomFormat>()
    // const [apexBarChart, setApexBarChart] = useState<ReactApexChart | undefined | {series:{},options:{}}>(undefined)

    useEffect(() => {
        if (!prices) {
            console.log('null prices')
            return
        }
        let handleBarChartUpdate = {
            series: [
                {
                    data: prices.map((price) => {
                        return {
                            x: new Date(price.date).toLocaleDateString(),
                            y: [price.open, price.high, price.low, price.close],
                        }
                    }),
                },
            ],

            options: {
                chart: {
                    type: 'candlestick',
                    // height: 700,
                },
                title: {
                    text: `${props.ticker?.toUpperCase()} <Period / Interval>`,
                    align: 'center',
                    color: 'white',
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function (val: Date) {
                            return val.toLocaleString()
                        },
                    },
                },

                yaxis: {
                    tooltip: {
                        enabled: false,
                    },
                },
            },
        }
        setApexBarChart(handleBarChartUpdate)
        console.log(apexBarChart)
    }, [prices])

    return (
        <>
            <div>
                <Typography variant="h3" sx={{color: 'white', textAlign: 'center'}}>
                    {props.ticker?.toUpperCase() + ' Candlestick Chart'}
                </Typography>
                {apexBarChart ? (
                    <div id="chart">
                        <ReactApexChart options={apexBarChart} series={apexBarChart.series} type="candlestick" height={1000} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}

export default ChartInfo
