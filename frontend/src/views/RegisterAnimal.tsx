import React, { Component } from 'react'

import styles from "../css/createAnimal.module.css"
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
// import Container from '@mui/material/Container';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import {Link } from "react-router-dom"
import FormGroup from '@mui/material/FormGroup';

import Navbar from  "../components/Navbar/Navbar";
// import Link from '../components/Link/Link';
import Container from '../components/Container/Container';
import Image from '../components/Image/Image';
// import Form from '../components/Form/Form';
import {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';
import InputFile from '../components/InputFile/InputFile';

const stylePicture = {
    backgroundColor:" #E0D9CF",
    borderRadius: ".5rem",
    width:'100%' ,
    marginBottom:"1rem",
    border:'.5px grey dashed ',
    height:'7rem',
}
const RegisterAnimal = () =>{
    
    const authentication = useSelector((state:any) => state.authUser)
    const dispatch = useDispatch();

    // const [scientificName, setScientificName] = useState("");
    // const [nickname, setNickname] = useState("");
    // const [wingZoo, setWingZoo] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [file, setFile] = useState("");

    const [state, setState] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        file: '',
        nameValid:false,
        nicknameValid:false,
        emailValid:false,
        passwordValid:false,
        fileValid:false,
    });

    var fieldValidationErrors = {
        name: '',
        nickname: '',
        email: '',
        password: '',
        file: '',
    }
    
    const [showPassword, setShowPassword] = React.useState(false);

    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
    };


    
    
    const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) => {
        var form = new FormData();

        form.append('pictureAnimal', state.file);
        
        try {
            axios.post('http://127.0.0.1:8000/api/login',{
                "email":state.email,
                "password":state.password,
            }).then((res) => {
                dispatch({
                    type: 'AUTHENTICATED', 
                    payload:{
                        token:res.data.token, 
                        accessType_id:res.data.access_type,
                    }
                    });
                }
            )
            
        } catch (error) {
            console.log(error)
        } finally {
        }
        e.preventDefault();
    }

    
    function validateField (fieldName:string, value:any){
        let fieldValidationsErrors = ""
        var objValidate = {
            name: {
                validate: () =>{
                    setState({
                        ...state, 
                        ['nameValid']: value.length >= 2,
                    });
                    fieldValidationErrors.name = state.nameValid ? 'Nome não pode ser vazio': 'a' ;
                    console.log(value.length >= 2,fieldValidationErrors.name, state['name'])
                }
            },
            nickname:{
                validate: () =>{
                    setState({...state, nicknameValid: value.length >= 1});
                    fieldValidationErrors.nickname = state.nicknameValid ? '': 'Apelido não pode ser vazio';
                }
            },
            email: {
                validate: () =>{
                    setState({...state, emailValid: value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)});
                    fieldValidationErrors.email = state.emailValid ? '': 'O email digitado não corresponde ao padrão email';
                }
            },
            password:{
                validate: () =>{
                    setState({...state, passwordValid: value.length >= 6});
                    fieldValidationErrors.password = state.passwordValid ? '': ' is too short';
                }
            },
            file: {
                validate: () =>{
                    setState({...state, fileValid: value.length >= 1});
                    fieldValidationErrors.file = state.fileValid ? '': 'A foto do animal não foi escolhida';
                }
            },
        }
        objValidate[fieldName as keyof typeof objValidate]?.validate()
    }
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        validateField(name, value)
        setState({
            ...state,
          [name]: value
        });
    }
    return(
        <Container class={styles.container}>
           <VerticalNavBar/>

            <Box component="div" sx={{height:'100%', marginLeft: '17.5rem', padding: '1.5rem', display:'flex', backgroundColor: "#f5f5f5    ", justifyContent:'center', alignItems:"center"}}>
                <form onSubmit={handleSubmit} style={{ boxShadow: '-0.51em 0.7em 1em #9a9a9a', borderRadius:'0.5rem',  justifyContent:' center',  padding: '0rem 5rem', width: '40rem' , display:'flex',flexDirection: 'column',backgroundColor: "#FFFFFF"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{marginTop:'3rem'}}>
                            <h1>Animal Personal Data</h1>
                            <p>Todos os campos são obrigatorios</p>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Nome Cientifico</InputLabel>
                            <OutlinedInput  onChange={handleChange}
                                style={{ backgroundColor:'#FFFFFF', borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                type={'text'}
                                name={'name'}
                            />
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">
                                {fieldValidationErrors.name}
                            </InputLabel>
                            
                        </Grid>

                        
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Apelido</InputLabel>
                            <OutlinedInput  onChange={handleChange}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                type={'text'}
                            />  
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Ala do zoológico</InputLabel>
                            <OutlinedInput  onChange={handleChange}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                type={'text'}
                            /> 
                        </Grid>

                        <Grid item xs={12}>
                            <InputFile className={""} accept={""} onChange={handleChange} message={"Somente aquivos JPEG, JPG e PNG."}/> 
                        </Grid>
                            
                        <Grid item xs={12} sx={{marginTop:'3rem'}}>
                            <h1>Animal Auth Data</h1>
                            <p>Todos os campos são obrigatorios</p>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Email</InputLabel>
                            <OutlinedInput  onChange={handleChange}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                type={'email'}
                            /> 
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Senha</InputLabel>
                            <OutlinedInput onChange={handleChange}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"3rem"}}
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
                            
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                            <Button type="submit" style={{ borderRadius: 10, width:'50%', padding:'1rem', backgroundColor: "#31352E", marginBottom:"0.5rem"}} variant="contained">Criar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
           

        </Container>

    )
}
export default RegisterAnimal;
