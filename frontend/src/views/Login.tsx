import React, { Component } from 'react'

import styles from "../css/login.module.css"
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
// import Container from '@mui/material/Container';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import {Link } from "react-router-dom"

import Navbar from  "../components/Navbar/Navbar";
// import Link from '../components/Link/Link';
import Container from '../components/Container/Container';
import Image from '../components/Image/Image';

interface Props {
    children: React.ReactElement
  }

const HomePage: React.FC<{}> = () =>{
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    return(
        <Container class={styles.container}>
            <Box component="div" sx={{width: '100%'}}>
                <Image class={styles.florest} url={window.location.origin + "/images/florest.png"} alt="BigCo Inc. logo"/>
            </Box>
            <Box component="div" sx={{width: '100%' , display:'flex',  justifyContent: 'center',flexDirection: 'column', height: "100vh", alignItems: 'center'}}>

                    <Image class={styles.logo} url={window.location.origin + "/images/logo.png"} alt="BigCo Inc. logo"/>
            
                    <InputLabel style={{ borderRadius: 50, width:'45%'}} htmlFor="standard-adornment-password">Email</InputLabel>
                    <OutlinedInput
                        style={{ borderRadius: 50, width:'50%' , marginBottom:"1rem"}}
                        type={'email'}
                    /> 

                    <InputLabel style={{ borderRadius: 50, width:'45%' }} htmlFor="standard-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        style={{ borderRadius: 50, width:'50%' , marginBottom:"3rem"}}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />  
                    
                    <Button style={{ borderRadius: 50, width:'50%', padding:'1rem', backgroundColor: "#83626D", marginBottom:"0.5rem"}} variant="contained">Log in</Button>
                    <Link style={{ display:'flex',justifyContent:'center' ,textDecoration:'none', color:'white', borderRadius: 50, width:'50%', padding:'0.5rem 0', backgroundColor: "#83626D"}} to="/"><Button style={{ boxShadow: "none", backgroundColor: "transparent"}} variant="contained"><ArrowCircleLeftOutlinedIcon/>Voltar para o inicio</Button></Link>
            </Box>
        </Container>

    )
}
export default HomePage
