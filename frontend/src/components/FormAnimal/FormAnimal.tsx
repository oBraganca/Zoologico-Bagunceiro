import React, { Component } from 'react'

import styles from "../css/createAnimal.module.css"
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FormHelperText from '@mui/material/FormHelperText';
import Divider from '@mui/material/Divider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
// import Container from '@mui/material/Container';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { Link } from "react-router-dom"
import FormGroup from '@mui/material/FormGroup';

import Navbar from  "../Navbar/Navbar";
// import Link from '../Link/Link';
import Container from '../Container/Container';
import Image from '../Image/Image';
// import Form from '../Form/Form';
import {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import VerticalNavBar from '../VerticalNavBar/VerticalNavBar';
import InputFile from '../InputFile/InputFile';
import useAuthCheck from '../../hooks/useAuthCheck';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



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


const FormAnimal = () =>{
    
    const authUser = useSelector((state:any) => state.authUser)
    const dispatch = useDispatch();



    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)
    
    const [wing, setWing] = useState<any>([]);

    function getWings(){
        var data = []
        
        axios.get('http://127.0.0.1:8000/api/data/wing').then((res) => {
            if(res.data.status == 200){
                setWing(res.data.data);
            }
        })
    }

    useEffect(() => {
        checkToken()
        getWings()

    }, []);

    const [state, setState] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        file: '',
        zooWing: '',
        accessType_id: '2',
    });

    

    const [file, setFile] = useState<any>();
    
    const [validName, setValidName] = useState<any>(null);
    const [validNickname, setValidNickname] = useState<any>(null);
    const [validEmail, setValidEmail] = useState<any>(null);
    const [validPassword, setValidPassword] = useState<any>(null);
    const [validZooWing, setValidZooWing] = useState<any>(null);

    const valid = {
        name: validName,
        nickname: validNickname,
        email: validEmail,
        password: validPassword,
        zooWing: validZooWing,
        file: file,
    }

    const [fieldValidationErrors, setFieldValidationErrors ] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        file: '',
        zooWing: '',
    })
    
    const [showPassword, setShowPassword] = React.useState(false);
    const [wingName, setWingName] = useState<any>("");

    
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
            zooWing:{
                validate: () =>{
                    const bool = value != ""
                    setValidZooWing(bool)
                    fieldValidationErrors[fieldName as keyof typeof fieldValidationErrors] = bool ? '': 'A ala do zoologico deve ser valida';
                }

            },
            file: {
                validate: () =>{
                    const bool = value.length >= 1
                    fieldValidationErrors[fieldName as keyof typeof fieldValidationErrors] = bool ? '': 'A foto do animal não foi escolhida';
                }
            },
        }
        objValidate[fieldName as keyof typeof objValidate]?.validate()
    }
    
    const handleChange = (e:/*React.ChangeEvent<HTMLInputElement | SelectChangeEvent>*/any) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name == "zooWing"){
            setWingName(value)
        }
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
            validateField(x, '');
            
            bool = false;
        }
        return bool

    }
    const checkValid = () => {
        let bool = true;
        
        bool = setVisualError('name', bool)
        bool = setVisualError('nickname', bool)
        bool = setVisualError('email', bool)
        bool = setVisualError('password', bool)
        bool = setVisualError('zooWing', bool)
        bool = setVisualError('file', bool)
        
        console.log(bool)
        return bool;
    }

    const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        let checked = checkValid()
        
        if(checked){
            var form = new FormData();
            const fileReplaced = file.replace("data:image/jpeg;base64,", "");
            form.append('pictureUser',fileReplaced);
            form.append('scientificName',state.name);
            form.append('name',state.nickname);
            form.append('zooWing_id',state.zooWing);
            form.append('email',state.email);
            form.append('password',state.password);
            form.append('accessType_id',state.accessType_id);
    
            
            try {
                axios.post('http://127.0.0.1:8000/api/animals',form).then((res) => {
                    console.log(res)
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
        <Box component="div" sx={{height:'100%', marginLeft: '17rem', padding: '1.0rem', display:'flex', justifyContent:'center', flexDirection:'column',alignItems:"center", width:'66.5rem'}}>
            <form onSubmit={handleSubmit} style={{ marginTop:'3rem', borderRadius:'0.5rem',  justifyContent:' center', width: '60rem' , height: '100%',display:'flex',padding:'1.5rem',flexDirection: 'column',backgroundColor: "#FFFFFF"}}>
                {/* <Grid container spacing={1}>
                    <Grid xs={12}>
                    </Grid>
                </Grid> */}
                <Grid container spacing={1}>
                    
                    <Grid item xs={12} style={{display:'flex'}}>
                        <Grid item xs={6} sx={{display:'flex',flexDirection: 'column'}}>
                            <Breadcrumbs  aria-label="breadcrumb">
                                <Link color="inherit" to=".">
                                    Animals
                                </Link>
                                <Typography color="text.primary">New Animal</Typography>
                            </Breadcrumbs>
                            <Typography sx={{marginTop:'0.7rem'}} variant="h5" color="text.primary">New Animal</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{display:'flex', justifyContent:'end', flexDirection:'row', alignItems:'center'}}>
                            <Button type="submit" style={{ borderRadius: 20, height:'2.5rem',width:'8rem', padding:'1rem', color:'grey',backgroundColor: "#FFFFFF", boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)', textTransform:'capitalize', justifyContent:'space-around'}} variant="contained"><CloseIcon/>Cancel</Button>
                            <Button type="submit" style={{ borderRadius: 20, height:'2.5rem',width:'8rem', padding:'1rem', backgroundImage: "linear-gradient(180deg, #434343 0%, #000000 100%)", textTransform:'capitalize', justifyContent:'space-around'}} variant="contained"><DoneIcon/>Publish</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',flexDirection: 'column'}}>
                        <Divider sx={{width:'100%'}}/>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',flexDirection: 'row', marginTop:'1.5rem'}}>
                        <Grid item xs={5.4} sx={{}}>
                            <Grid item xs={12} sx={{ display:'flex', marginBottom:'1.5rem'}}>
                                <Box sx={{color:'white',  display:'flex', justifyContent:'center', flexDirection:'row', alignItems:'center',width:'2rem', height:'2rem', backgroundColor:"black", borderRadius:'100rem'}}>1</Box>
                                <h1>Personal Information</h1>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Nome Cientifico</InputLabel>
                                <TextField  onChange={handleChange}
                                    style={{ backgroundColor:'#FFFFFF', borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                    error={valid['name'] === false}
                                    InputProps={{ 
                                        style:{borderRadius: 7,maxHeight:"2.8rem"}
                                    }}
                                    helperText={fieldValidationErrors['name']}
                                    type={'text'}
                                    name={'name'}
                                    
                                />
                                
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Apelido</InputLabel>
                                <TextField  onChange={handleChange}
                                    style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                    type={'text'}
                                    name={'nickname'}
                                    InputProps={{ 
                                        style:{borderRadius: 7,maxHeight:"2.8rem"}
                                    }}
                                    helperText={fieldValidationErrors['nickname']}
                                    error={valid['nickname'] == false}
                                />  
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Ala do zoológico</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={wingName}
                                    label="Age"input={<OutlinedInput />}
                                    onChange={handleChange}
                                    name={'zooWing'}
                                    style={{ borderRadius: 8, 
                                        width:'100%', maxHeight:"2.8rem"}}
                                    error={valid['zooWing'] == false}>
                                    {wing?.map((w:any) => (
                                        <MenuItem
                                        key={w.id}
                                        value={w.id}
                                        >
                                        {w.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText sx={{ color:'#d32f2f', marginBottom:"1rem"}}>{fieldValidationErrors['zooWing']}</FormHelperText>
                            </Grid>

                            <Grid item xs={12}>
                                <InputFile className={""} name={'file'} accept={""} onChange={handleChange} message={"Somente aquivos JPEG, JPG e PNG."}/> 
                                <FormHelperText sx={{ color:'#d32f2f', marginBottom:"1rem"}}>{fieldValidationErrors['file']}</FormHelperText>
                            </Grid>

                        </Grid>

                        <Grid item xs={0.2} sx={{marginRight:'1.4rem', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Divider orientation="vertical" sx={{height:'100%'}}/>
                        </Grid>
                        <Grid item xs={5.4}>
                            <Grid item xs={12} sx={{display:'flex', marginBottom:'1.5rem'}}>
                                <Box sx={{color:'white',  display:'flex', justifyContent:'center', flexDirection:'row', alignItems:'center',width:'2rem', height:'2rem', backgroundColor:"black", borderRadius:'100rem'}}>1</Box>
                                <h1>User Information</h1>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ borderRadius: 10}} htmlFor="standard-adornment-password">Email</InputLabel>
                                <TextField  onChange={handleChange}
                                    style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                    type={'text'}
                                    name={'email'}
                                    InputProps={{ 
                                        style:{borderRadius: 7,maxHeight:"2.8rem"}
                                    }}
                                    helperText={fieldValidationErrors['email']}
                                    error={valid['email'] == false}
                                    /> 
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Senha</InputLabel>
                                <TextField onChange={handleChange}
                                    name={'password'}
                                    error={valid['password'] == false}
                                    style={{ borderRadius: 8, width:'100%' , marginBottom:"3rem"}}
                                    type={showPassword ? 'text' : 'password'}
                                    helperText={fieldValidationErrors['password']}
                                    InputProps={{
                                        style:{borderRadius: 7,maxHeight:"2.8rem"},
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
                            
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>

    )
}
export default FormAnimal;
