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
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';
import InputFile from '../components/InputFile/InputFile';
import useAuthCheck from '../hooks/useAuthCheck';

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
const EditAnimal = () =>{
    
    const authUser = useSelector((state:any) => state.authUser)
    const dispatch = useDispatch();
    
    const {id} = useParams()
    
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)
    const [data, setData] = useState([])

    const [state, setState] = useState({
        name: '',
        nickname: '',
        zooWing: '',
        email:'',
    });

    const [file, setFile] = useState<any>(null);
    
    const [validName, setValidName] = useState<any>(null);
    const [validNickname, setValidNickname] = useState<any>(null);
    const [validZooWing, setValidZooWing] = useState<any>(null);


    const [fieldValidationErrors, setFieldValidationErrors ] = useState({
        name: '',
        nickname: '',
        file: '',
        zooWing: '',
    })
    const valid = {
        name: validName,
        nickname: validNickname,
        zooWing: validZooWing,
    }

    useEffect(() => {
        checkToken()

        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };
        
        axios.get('http://127.0.0.1:8000/api/animals/'+id,config ).then((res) => {
                setValidName(res.data[0]?.scientificName)

                setValidNickname(res.data[0]?.name)

                setValidZooWing(res.data[0]?.ala)

                setState({...state, name:res.data[0]?.scientificName, nickname:res.data[0]?.name, zooWing:res.data[0]?.ala, email:res.data[0]?.email})

                
            }
        )
    }, []);


    
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
            nickname:{
                validate: () =>{
                    const bool = value.length >= 2
                    setValidNickname(bool)
                    fieldValidationErrors[fieldName as keyof typeof fieldValidationErrors] = bool ? '': 'O apelido deve ser maior que 2 letras'
                }
            },
            zooWing:{
                validate: () =>{
                    const bool = value.length >= 1
                    setValidZooWing(bool)
                    fieldValidationErrors[fieldName as keyof typeof fieldValidationErrors] = bool ? '': 'A ala do zoologico deve ser valida';
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

            validateField(x, input?.getAttribute('value'));
            
            bool = false;
        }
        return bool

    }
    const checkValid = () => {
        let bool = true;
        
        bool = setVisualError('name', bool)
        bool = setVisualError('nickname', bool)
        bool = setVisualError('zooWing', bool)
        
        return bool;
    }

    const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        let checked = checkValid()
        console.log(state)
        if(checked){
            const fileReplaced = file == null ? "" : file.replace("data:image/jpeg;base64,", "");
            const data = {
                pictureUser:fileReplaced,
                scientificName:state.name,
                name:state.nickname,
                zooWing_id:state.zooWing

            }
            
            const config = {
                headers: { Authorization: "Bearer "+authUser.currentUser.token,
                "Content-Type": "application/x-www-form-urlencoded",
                }
            };
            try {
                axios.put('http://127.0.0.1:8000/api/animals/'+id,data, config).then((res) => {
                    }
                )
                
            } catch (error) {
                console.log(error)
            } finally {
            }

        }else{
            console.log()
        }
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
                            <TextField  onChange={handleChange}
                                style={{ backgroundColor:'#FFFFFF', borderRadius: 8, width:'100%' , marginBottom:"1rem"}}           value={state.name}
                                error={valid['name'] === false}
                                helperText={fieldValidationErrors['name']}
                                type={'text'}
                                name={'name'}
                                
                            />
                            
                        </Grid>

                        
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Apelido</InputLabel>
                            <TextField  onChange={handleChange}
                                value={state.nickname}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                type={'text'}
                                name={'nickname'}
                                helperText={fieldValidationErrors['nickname']}
                                error={valid['nickname'] == false}
                            />  
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Ala do zoológico</InputLabel>
                            <TextField  onChange={handleChange}
                            
                                value={state.zooWing}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                type={'text'}
                                name={'zooWing'}
                                helperText={fieldValidationErrors['zooWing']}
                                error={valid['zooWing'] == false}
                            /> 
                        </Grid>

                        <Grid item xs={12}>
                            <InputFile className={""} name={'file'} accept={""} onChange={handleChange} message={"Somente aquivos JPEG, JPG e PNG."}/> 
                        </Grid>
                            
                        <Grid item xs={12} sx={{marginTop:'3rem'}}>
                            <h1>Animal Auth Data</h1>
                            <p>Todos os campos são obrigatorios</p>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Email</InputLabel>
                            <TextField  onChange={handleChange}
                            disabled
                            
                            value={state.email}
                                style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                type={'text'}
                                name={'email'}
                                /> 
                        </Grid>
                        
                        <Grid item xs={12} sx={{display:'flex', marginBottom:'1.5rem', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                            <Button type="submit" style={{ borderRadius: 10, width:'50%', padding:'1rem', backgroundColor: "#31352E", marginBottom:"0.5rem"}} variant="contained">Atualizar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
           

        </Container>

    )
}
export default EditAnimal
