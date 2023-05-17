import {useEffect} from 'react'
import background from '../img/backgroundimage.png'
import { abortRequest } from '../config/WebcallAPI'

export default function LandingPage() {
    useEffect(()=>{
        abortRequest()
    },[])
    return (
        <div>
            <img src={background} alt="background" />
        </div>
    )
}
