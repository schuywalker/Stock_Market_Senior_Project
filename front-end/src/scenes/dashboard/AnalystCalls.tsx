import {useTheme} from '@mui/material'
import {useEffect, useState} from 'react'
import AnalystCallTable from '../../components/table/AnalystCallTable'
import { abortRequest } from '../../config/WebcallAPI'

const AnalystCalls = () => {
    const theme = useTheme()
    const [displayAC, setDisplayAC] = useState(false)
    useEffect(()=>{
        abortRequest()
        setDisplayAC(true)
    },[])
    if(displayAC){
        return (
            <div>
                <AnalystCallTable />
            </div>
        )
    }
    else{
        return(
            <>
            </>
        )
    }
}

export default AnalystCalls
