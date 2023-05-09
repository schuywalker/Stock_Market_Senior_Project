import React from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {useState, useEffect} from 'react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const TestGraph = () => {
    const [data, setData] = useState([])
    const [date, setDate] = useState([])
    const [open, setOpen] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = fetch('http://localhost:8080/getStockDataAAPL')
            const json = await (await response).json()
            setData(json)
            setDate(json.map((item: {date: string}) => item.date))
            setOpen(json.map((item: {open: number}) => item.open))
        }
        fetchData()
    }, [])
    // want to get the data from the backend with keys date and open and have labels for the date and the data for the open.
    const chartData = {
        labels: date,
        datasets: [
            {
                label: 'Open',
                data: open,
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
