import React, {useEffect, useState} from 'react'
import {getChart} from '../../../config/WebcallAPI'

// https://yahooquery.dpguthrie.com/guide/ticker/historical/
// https://apexcharts.com/react-chart-demos/candlestick-charts/basic/

interface Props {
    ticker?: string
}

function ChartInfo(props: Props) {
    const [priceData, setPriceData] = useState<any>()

    useEffect(() => {
        console.log(props)

        const fetchData = async () => {
            if (!props.ticker) {
                console.log('null ticker')
                return
            }
            const response = await fetch(getChart(props.ticker, '1y'))
            const resJson: Promise<any> | void | any = await response.json()
            console.log(resJson)
            setPriceData(Object.entries(resJson))
        }

        fetchData().catch((err) => console.log(err))
    }, [props])

    return (
        <>
            <div>chartInfo</div>
        </>
    )
}

export default ChartInfo
