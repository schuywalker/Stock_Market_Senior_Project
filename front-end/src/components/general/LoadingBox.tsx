import { Box } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";

export default function LoadingBox(props: {height:number|string,width:number|string}){
    const [animationFrame, setAnimationFrame] = useState(1)
    const [time, setTime] = useState(Date.now());
    const[reverseAnimation,setReverseAnimation] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 115);
            return () => {
                clearInterval(interval);
            };
        
    }, []);

    useEffect(()=>{
        setAnimationFrame((reverseAnimation?animationFrame-1:animationFrame+1))
        if(reverseAnimation && animationFrame == 2)setReverseAnimation(false)
        else if(!reverseAnimation && animationFrame==9)setReverseAnimation(true)
        
    },[time])

    return(
        <React.Fragment>
            <Box sx={[{borderRadius: 2, height: props.height, width: props.width},
            animationFrame===1&&{background:"#808080"},
            animationFrame===2&&{background:"#838383"},
            animationFrame===3&&{background:"#868686"},
            animationFrame===4&&{background:"#898989"},
            animationFrame===5&&{background:"#8B8B8B"},
            animationFrame===6&&{background:"#8E8E8E"},
            animationFrame===7&&{background:"#919191"},
            animationFrame===8&&{background:"#949494"},
            animationFrame===9&&{background:"#979797"},
            animationFrame===10&&{background:"#9A9A9A"},
            
            ]}>
            </Box>
        </React.Fragment>
    )
}