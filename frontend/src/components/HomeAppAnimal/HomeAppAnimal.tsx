import React, { Component, useState, useEffect } from 'react'
import styles from '../../css/homeAppAnimal.module.css';

import Container from '../Container/Container';
import FormaImage from '../FormaImage/FormaImage';
import IconMLike from '../Icons/IconMLike';
import IconSuperlike from '../Icons/IconSuperlike';
import IconX from '../Icons/IconX';
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';


import Box from '@mui/material/Box'
import VerticalNavBar from '../VerticalNavBar/VerticalNavBar';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/IconButton';


const HomeAppAnimal = () =>{
    
    const authUser = useSelector((state:any) => state.authUser)
    const mathUser = useSelector((state:any) => state.math) 
    const dispatch = useDispatch();
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)
    console.log(mathUser)

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    function getUsers(){
        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };
        axios.get('http://127.0.0.1:8000/api/match',config ).then((res) => {
            if(res.data.status == 200){
                dispatch({
                    type: 'HAS_ANIMAL', 
                    payload:{
                        wing:res.data.ala, 
                        nickname:res.data.nickname,
                        nome:res.data.nome, 
                        pictureUser:res.data.pictureUser,
                        message:res.data.message,
                        code:res.data.code,
                        
                    }
                });
        
            }else{
                dispatch({
                    type: 'NO_HAS_ANIMAL', 
                    payload:{
                        message:res.data.message
                    }
                });
            }
        }
        )
    }



    const handleClick = (e:React.SyntheticEvent<HTMLButtonElement>) => {
        handleToggle()
        const vote_id = (e.target as HTMLButtonElement).id
        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };

        axios.post('http://127.0.0.1:8000/api/match',{
            voted_animal_id:mathUser.animal.code,
            vote_id:vote_id,
        } ,config ).then((res) => {
            if(res.data.status == 200){
                getUsers()
            }
        })
        handleClose()

    }

    useEffect(() => {
        checkToken()
        if(!mathUser.asAnimal){
            getUsers()
        }
    }, []);


    return(
        <Box component="div" sx={{height:'100%', marginLeft: '1.0rem', display:'flex',justifyContent:'center'}}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {mathUser.animal.message && !mathUser.asAnimal ?(
                <h1 style={{height:'100vh'}}>{mathUser.animal.message}</h1>
            ):(
                <Box sx={{borderRadius:'.8rem',marginTop:'5.5rem',height:'34rem', display:'flex',flexDirection: 'row', alignItems:"center",}}>
                    <Box component="div" className={styles.card} sx={{borderRadius:'.8rem',marginTop:'5.5rem',height:'34rem', display:'flex',flexDirection: 'column', backgroundColor: "#FFFFFF", alignItems:"center",width: '100%',}}>
                        <FormaImage url={mathUser.animal.pictureUser} className={""}/>
                        
                        <Box sx={{borderRadius:'.8rem',marginTop:'0.5rem',height:'4rem', width: '100%',display:'flex',flexDirection: 'row', backgroundColor: "#FFFFFF", alignItems:"center",}}>
                            <Box component="div" sx={{width:'90%',margin:'1.5rem'}}>
                                <h1 style={{color:"#272727", fontSize:'2rem'}}>{mathUser.animal.nickname}</h1>
                                <h4 style={{color:"#4B4B4B", fontSize:'1.2rem'}}>{mathUser.animal.nome}</h4>
                                <h4 style={{color:"#4B4B4B", fontSize:'1.0rem'}}>{mathUser.animal.wing} do zoologico</h4>
                            </Box>
                            <Box component="div" sx={{ display:'flex',height:'5rem',justifyContent:"center", alignItems:"center",}} className={styles.card_buttom}>
                                <Button onClick={handleClick} sx={{margin:"0 .5rem", backgroundColor:'#E2EAFF', padding:'.8rem',borderRadius:'.8rem'}} id='1'>
                                    <IconX id='1'/>
                                </Button>

                                <Button onClick={handleClick} sx={{margin:"0 .5rem", backgroundColor:'#E2EAFF',borderRadius:'.8rem'}} id='3'>
                                        <IconSuperlike id='2'/>
                                </Button>
                                
                                <Button onClick={handleClick} sx={{ margin:"0 .5rem", backgroundColor:'#E2EAFF', padding:'.8rem',borderRadius:'.8rem'}} id='3'>
                                    <IconMLike id='3'/>
                                </Button>
                            </Box>
                        </Box>
                        <Box></Box>
                    </Box>
                    
                    <Box>
                            aaaaaa
                        </Box>
                </Box>

            )}
            
        </Box>

    )
}
export default HomeAppAnimal
