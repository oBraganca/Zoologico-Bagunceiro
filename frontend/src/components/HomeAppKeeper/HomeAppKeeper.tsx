import React, { Component, useState, useEffect } from 'react'
import styles from '../../css/homeAppAnimal.module.css';

import Avatar from '@mui/material/Avatar';
import Container from '../Container/Container';
import FormaImage from '../FormaImage/FormaImage';
import IconMLike from '../Icons/IconMLike';
import IconSuperlike from '../Icons/IconSuperlike';
import IconX from '../Icons/IconX';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';


import Box from '@mui/material/Box'
import VerticalNavBar from '../VerticalNavBar/VerticalNavBar';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/IconButton';


const HomeAppKeeper = () =>{
    
    const authUser = useSelector((state:any) => state.authUser)
    const mathUser = useSelector((state:any) => state.math) 
    const dispatch = useDispatch();
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)

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
        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };
    }, []);


    return(
        <Box component="div" sx={{height:'100%', marginLeft: '29rem', display:'flex'}}>
            
            <Box sx={{borderRadius:'.8rem',marginTop:'3.5rem',height:'36rem', display:'flex',flexDirection: 'column', alignItems:"center",justifyContent:'center',width:'45rem', background: '#FFFFFF'}}>
                <h1>Bem Vindo, {authUser.currentUser.name}</h1>
                <p>Att, Animal Match</p>
            </Box>
        </Box>

    )
}
export default HomeAppKeeper
