import * as React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { Box, Button, Link, Modal, TextField, Typography, styled } from '@mui/material';
import {getUserData,alterUsername,alterUserFirstName,alterUserLastName,alterUserEmail} from '../config/WebcallAPI'
import {deleteUser} from '../config/WebcallAPI'
import { Sidebar, sidebarClasses } from 'react-pro-sidebar';

const cookies = new Cookies();
const CustomModal = styled(Modal)({
    '.MuiBackdrop-root': {
      display: 'fixed',
      top: '0%',
      height: "100vh",
      width: "100vw",
      backgroundColor: 'rgba(125,125,125,0.2)'//Grey backdrop with 20% opacity
    }
  });

  type ModalFieldProps={
    open: boolean
    onClose: VoidFunction
    sidebarDisplay: (value:boolean) => void
    loginFunction: (value:boolean) => void
}
const ConfirmationModal: React.FunctionComponent<ModalFieldProps>=({
    open,onClose,sidebarDisplay, loginFunction
    
})=>{
    const style = {
        position: 'absolute' as 'absolute',
        top: '40%',
        left:'25%',
        pt: 2,
        px: 2,
        color: '#ff0000', 
        
      };
    return(
        <React.Fragment>
            <CustomModal
            sx = {style}
            open= {open}
            onClose={onClose}
            
            >
                    <Box sx={{display:'inline-block', flexdirection:'row',border:'1px solid white', background:'black', width:'fit-content',padding:1,}}>
                        
                        <Typography sx={{fontSize: 40}}>BobbyMcBobson did this once? Will you?</Typography>
                        <Button sx={{alignSelf: 'center', fontSize:20, alignContent:'center', display: 'flex', justifyContent:'center', margin: 'auto', background: 'black',
                            color: 'white', '&:hover': {
                                background: 'black',
                                color: 'grey',
                            },
                                    }} onClick={() => {
                                            sidebarDisplay(false)
                                            let user = cookies.get('user')
                                            cookies.remove('user')
                                            cookies.remove('password')
                                            cookies.remove("user_id");
                                            loginFunction(false)
                                            axios.post(deleteUser(user))
                                            onClose()
                                        }}>Confirm</Button>
                        
                        
                    </Box>

            </CustomModal>
        </React.Fragment>
    )
}
export default ConfirmationModal