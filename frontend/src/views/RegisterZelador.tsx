import React, { Component } from 'react'

import styles from "../css/createZelador.module.css"
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

import TextField from '@mui/material/TextField';

const stylePicture = {
    backgroundColor:" #E0D9CF",
    borderRadius: ".5rem",
    width:'100%' ,
    marginBottom:"1rem",
    border:'.5px grey dashed ',
    height:'7rem',
}


const getBase64 = (file: any) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const baseURL = reader.result;
        resolve(baseURL);
      };
    });
};
const RegisterZelador = () =>{
    
    const authentication = useSelector((state:any) => state.authUser)
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        file: '',
        accessType_id: '1',
    });

    const [file, setFile] = useState<any>();
    
    const [validName, setValidName] = useState<any>(null);
    const [validEmail, setValidEmail] = useState<any>(null);
    const [validPassword, setValidPassword] = useState<any>(null);

    const valid = {
        name: validName,
        email: validEmail,
        password: validPassword,
    };

    const [fieldValidationErrors, setFieldValidationErrors ] = useState({
        name: '',
        email: '',
        password: '',
        file: '',
    })
    
    const [showPassword, setShowPassword] = React.useState(false);

    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
    };


    
    function validateField (fieldName:string, value:any){
        var objValidate = {
            name: {
                validate: () =>{
                    const bool = value.length >= 2
                    setValidName(bool)
                    fieldValidationErrors[fieldName as keyof typeof fieldValidationErrors] = bool ? '': 'O nome deve ser maior que 2 letras'
                }
            },
            email: {
                validate: () =>{
                    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                    const bool = expression.test(value)
                    setValidEmail(bool)
                    fieldValidationErrors[fieldName as keyof typeof fieldValidationErrors] = bool ? '': 'O email digitado não corresponde ao padrão email';
                }
            },
            password:{
                validate: () =>{
                    const bool = value.length >= 6
                    setValidPassword(bool)
                    fieldValidationErrors[fieldName as keyof typeof fieldValidationErrors] = bool ? '': 'A senha é muito curta';
                }
            },
            file: {
                validate: () =>{
                    console.log('a')
                    const bool = value.length >= 1
                    fieldValidationErrors[fieldName as keyof typeof fieldValidationErrors] = bool ? '': 'A foto do animal não foi escolhida';
                }
            },
        }
        objValidate[fieldName as keyof typeof objValidate]?.validate()
    }
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        const file = e.target.files?.[0];
        if(name == 'file'){
            getBase64(file)
            .then(result => {
                setFile(result);
            })
        }else{
            setState({
                ...state, 
              [name]: value
            });
        }
        validateField(name, value);
        
    }  

    const setVisualError = (x:string, bool:boolean) =>{
        if(!valid[x as keyof typeof valid]  || valid[x as keyof typeof valid] == null){
            let input = document.querySelector('input[name="'+x+'"]');
            console.log(input)
            validateField(x, '');
            
            bool = false;
        }
        return bool

    }
    const checkValid = () => {
        let bool = true;
        
        bool = setVisualError('name', bool)
        bool = setVisualError('email', bool)
        bool = setVisualError('password', bool)
        
        return bool;
    }

    const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) => {
        checkValid()
        
        // if(checkValid()){
        //     var form = new FormData();
        //     const fileReplaced = file.replace("data:image/jpeg;base64,", "");
        //     console.log(fileReplaced)
        //     form.append('pictureZoo',fileReplaced);
        //     form.append('email',state.email);
        //     form.append('password',state.password);
        //     form.append('accessType_id',state.accessType_id);
    
            
        //     try {
        //         axios.post('http://127.0.0.1:8000/api/register-animals',form).then((res) => {
        //             console.log(res)
        //             }
        //         )
                
        //     } catch (error) {
        //         console.log(error)
        //     } finally {
        //     }

        // }else{
        //     console.log()
        // }
        e.preventDefault();
    }


    return(
        <Container class={styles.container}>
           <VerticalNavBar/>

            <Box component="div" sx={{height:'100%', marginLeft: '17.5rem', padding: '1.5rem', display:'flex', backgroundColor: "#f5f5f5    ", justifyContent:'center', alignItems:"center"}}>
                <form onSubmit={handleSubmit} style={{ boxShadow: '-0.51em 0.7em 1em #9a9a9a', borderRadius:'0.5rem',  justifyContent:' center',  padding: '0rem 5rem', width: '40rem' , display:'flex',flexDirection: 'column',backgroundColor: "#FFFFFF"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{marginTop:'3rem'}}>
                            <h1>Keeper Personal Data</h1>
                            <p>Todos os campos são obrigatorios</p>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Nome</InputLabel>
                            <TextField  onChange={handleChange}
                                style={{ backgroundColor:'#FFFFFF', borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                error={valid['name'] === false}
                                helperText={fieldValidationErrors['name']}
                                type={'text'}
                                name={'name'}
                                
                            />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <InputFile className={""} name={'file'} accept={""} onChange={handleChange} message={"Somente aquivos JPEG, JPG e PNG."}/> 
                        </Grid>
                            
                        <Grid item xs={12} sx={{marginTop:'3rem'}}>
                            <h1>Keeper Auth Data</h1>
                            <p>Todos os campos são obrigatorios</p>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Email</InputLabel>
                            <TextField  onChange={handleChange}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                type={'email'}
                                name={'email'}
                                helperText={fieldValidationErrors['email']}
                                error={valid['email'] == false}
                            /> 
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Senha</InputLabel>
                            <TextField onChange={handleChange}
                                name={'password'}
                                error={valid['password'] == false}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"3rem"}}
                                type={showPassword ? 'text' : 'password'}
                                helperText={fieldValidationErrors['password']}
                                InputProps={{
                                    endAdornment:
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                }}
                            />  
                            
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex', marginBottom:'1.5rem', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                            <Button type="submit" style={{ borderRadius: 10, width:'50%', padding:'1rem', backgroundColor: "#31352E", marginBottom:"0.5rem"}} variant="contained">Criar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
           

        </Container>

    )
}
export default RegisterZelador;