import React, {useEffect, useState} from 'react'
import {getChart} from '../../../config/WebcallAPI'
import {Button} from '@mui/material'
import ReactApexChart from 'react-apexcharts'

// https://yahooquery.dpguthrie.com/guide/ticker/historical/
// https://apexcharts.com/react-chart-demos/candlestick-charts/basic/

interface Props {
    ticker?: string
}

interface OHLC {
    date: string
    open: number
    high: number
    low: number
    close: number
    volume: number
}

function ChartInfo(props: Props) {
    const [prices, setPrices] = useState<OHLC[]>()

    let chartExample = {
        series: [
            {
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6629.81, 6650.5, 6623.04, 6633.33],
                    },
                    {
                        x: new Date(1538780400000),
                        y: [6632.01, 6643.59, 6620, 6630.11],
                    },
                    {
                        x: new Date(1538782200000),
                        y: [6630.71, 6648.95, 6623.34, 6635.65],
                    },
                    {
                        x: new Date(1538784000000),
                        y: [6635.65, 6651, 6629.67, 6638.24],
                    },
                    {
                        x: new Date(1538785800000),
                        y: [6638.24, 6640, 6620, 6624.47],
                    },
                    {
                        x: new Date(1538787600000),
                        y: [6624.53, 6636.03, 6621.68, 6624.31],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6624.61, 6632.2, 6617, 6626.02],
                    },
                    {
                        x: new Date(1538791200000),
                        y: [6627, 6627.62, 6584.22, 6603.02],
                    },
                    {
                        x: new Date(1538793000000),
                        y: [6605, 6608.03, 6598.95, 6604.01],
                    },
                    {
                        x: new Date(1538794800000),
                        y: [6604.5, 6614.4, 6602.26, 6608.02],
                    },
                    {
                        x: new Date(1538796600000),
                        y: [6608.02, 6610.68, 6601.99, 6608.91],
                    },
                    {
                        x: new Date(1538798400000),
                        y: [6608.91, 6618.99, 6608.01, 6612],
                    },
                    {
                        x: new Date(1538800200000),
                        y: [6612, 6615.13, 6605.09, 6612],
                    },
                    {
                        x: new Date(1538802000000),
                        y: [6612, 6624.12, 6608.43, 6622.95],
                    },
                    {
                        x: new Date(1538803800000),
                        y: [6623.91, 6623.91, 6615, 6615.67],
                    },
                    {
                        x: new Date(1538805600000),
                        y: [6618.69, 6618.74, 6610, 6610.4],
                    },
                    {
                        x: new Date(1538807400000),
                        y: [6611, 6622.78, 6610.4, 6614.9],
                    },
                    {
                        x: new Date(1538809200000),
                        y: [6614.9, 6626.2, 6613.33, 6623.45],
                    },
                    {
                        x: new Date(1538811000000),
                        y: [6623.48, 6627, 6618.38, 6620.35],
                    },
                    {
                        x: new Date(1538812800000),
                        y: [6619.43, 6620.35, 6610.05, 6615.53],
                    },
                    {
                        x: new Date(1538814600000),
                        y: [6615.53, 6617.93, 6610, 6615.19],
                    },
                    {
                        x: new Date(1538816400000),
                        y: [6615.19, 6621.6, 6608.2, 6620],
                    },
                ],
            },
        ],
        options: {
            chart: {
                type: 'candlestick',
                height: 350,
            },
            title: {
                text: 'CandleStick Chart',
                align: 'left',
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
            },
        },
    }

    useEffect(() => {
        console.log(props)

        const fetchData = async () => {
            if (!props.ticker) {
                console.log('null ticker')
                return
            }
            const response = await fetch(getChart(props.ticker, '1y'))
            const resJson: OHLC[] = await response.json()
            setPrices(resJson)
        }

        fetchData().catch((err) => console.log(err))
    }, [props])

    return (
        <>
            <div>
                <div>chart Info</div>
                <Button sx={{bgcolor: 'white'}} onClick={() => console.log(prices ? prices : 'undef')}>
                    Show state of prices
                </Button>
                <div>{prices ? prices[0].close : 'undef'}</div>
                <div id="chart">
                    <ReactApexChart options={chartExample} series={chartExample.series} type="candlestick" height={350} />
                </div>
            </div>
        </>
    )
}

export default ChartInfo
