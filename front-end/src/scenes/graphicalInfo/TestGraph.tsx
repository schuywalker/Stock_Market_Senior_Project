import React from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {useState, useEffect} from 'react'
import axios from 'axios'

interface financialsInterface {
    data: [string, any][] | null | undefined
    date: [string, any][] | null | undefined
    open: [number, any][] | null | undefined
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const TestGraph = () => {
    const [data] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8080/getStockDataAAPL')
                console.log(response.data)
                const result = filterData(response.data)

                console.log(typeof data)
                console.log(typeof response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    const filterData = (json: any) => {
        const date = json.map((item: {date: string}) => item.date)
        const open = json.map((item: {open: number}) => item.open)
    }

    // want to get the data from the backend with keys date and open and have labels for the date and the data for the open.
    const chartData = {
        labels: data.map((item: {date: any}) => item.date),
        datasets: [
            {
                label: 'Open',
                data: data.map((item: {open: any}) => item.open),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    return (
        <div>
            <Line data={chartData} />
        </div>
    )
}

export default TestGraph
function entry(value: never, index: number, array: never[]): unknown {
    throw new Error('Function not implemented.')
}
