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

import Navbar from  "../components/Navbar/Navbar";
// import Link from '../Link/Link';
import Container from '../components/Container/Container';
import Image from '../components/Image/Image';
// import Form from '../Form/Form';
import {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';
import FormAnimal from '../components/FormAnimal/FormAnimal';
import useAuthCheck from '../hooks/useAuthCheck';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useParams } from 'react-router-dom';
import InputFile from '../components/InputFile/InputFile';
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

const EditKeeper = () =>{
    const authUser = useSelector((state:any) => state.authUser)
    const dispatch = useDispatch();
    
    const {id} = useParams()
    
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)
    
    const [wing, setWing] = useState<any>([]);
    const [wingName, setWingName] = useState<any>("");

    const [data, setData] = useState([])

    const [state, setState] = useState({
        name: '',
        email:'',
    });

    const [file, setFile] = useState<any>(null);
    
    const [validName, setValidName] = useState<any>(null);


    const [fieldValidationErrors, setFieldValidationErrors ] = useState({
        name: '',
        file: '',
    })
    const valid = {
        name: validName,
    }

    useEffect(() => {
        document.title = 'Editar Zelador';
        checkToken()
        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };
        console.log(authUser)
        
        axios.get('http://127.0.0.1:8000/api/keepers/'+authUser.currentUser.id,config ).then((res) => {
                setValidName(res.data.name)
    
                setState({...state, name:res.data.name})
    
                
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
        }
        objValidate[fieldName as keyof typeof objValidate]?.validate()
    }
    
    const handleChange = (e:any) => {
        const name = e.target.name;
        const value = e.target.value;
        const file = e.target.files?.[0];
        if(name == "zooWing"){
            setWingName(value)
        }
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
                name:state.name,

            }
            
            const config = {
                headers: { Authorization: "Bearer "+authUser.currentUser.token,
                "Content-Type": "application/x-www-form-urlencoded",
                }
            };
            try {
                axios.put('http://127.0.0.1:8000/api/keepers/settings/'+authUser.currentUser.id,data, config).then((res) => {
                    dispatch({
                        type: 'AUTHENTICATED', 
                        payload:{
                            token:authUser.currentUser.token, 
                            accessType_id:res.data.access_type,
                            email:res.data.email, 
                            name:res.data.name,
                            id:res.data.id,
                            pictureProfile:res.data.pictureProfile,
                        }
                        });
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
            <Box component="div" sx={{height:'100vh', marginLeft: '17rem', padding: '1.0rem', display:'flex', justifyContent:'center', flexDirection:'column',alignItems:"center", width:'66.5rem'}}>
                <form onSubmit={handleSubmit} style={{ marginTop:'3rem', borderRadius:'0.5rem',  justifyContent:' space-between', width: '60rem' , height: '100%',display:'flex',padding:'1.5rem',flexDirection: 'column',backgroundColor: "#FFFFFF"}}>
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
                        <Grid item xs={12} style={{display:'flex',flexDirection: 'column',}}>
                            <Divider style={{width:'50rem', }}/>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',flexDirection: 'row', marginTop:'1.5rem'}}>
                            <Grid item xs={5.4} sx={{}}>
                                <Grid item xs={12} sx={{ display:'flex', marginBottom:'1.5rem'}}>
                                    <Box sx={{color:'white',  display:'flex', justifyContent:'center', flexDirection:'row', alignItems:'center',width:'2rem', height:'2rem', backgroundColor:"black", borderRadius:'100rem'}}>1</Box>
                                    <h1>Personal Information</h1>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Apelido</InputLabel>
                                    <TextField  onChange={handleChange}
                                        style={{ borderRadius: 8, width:'100%' , marginBottom:"1rem"}}
                                        type={'text'}
                                        name={'name'}
                                        value={state['name'] || ''}
                                        InputProps={{ 
                                            style:{borderRadius: 7,maxHeight:"2.8rem"}
                                        }}
                                        helperText={fieldValidationErrors['name']}
                                        error={valid['name'] == false}
                                    />  
                                </Grid>

                                <Grid item xs={12}>
                                    <InputFile className={""} name={'file'} accept={""} onChange={handleChange} message={"Somente aquivos JPEG, JPG e PNG."}/> 
                                    <FormHelperText sx={{ color:'#d32f2f', marginBottom:"1rem"}}>{fieldValidationErrors['file']}</FormHelperText>
                                </Grid>

                            </Grid>

                            <Grid item xs={0.2} sx={{marginRight:'1.4rem', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <Divider orientation="vertical" sx={{height: '27rem'}}/>
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
                                        disabled
                                        name={'email'}
                                        // value={state['email']}
                                        InputProps={{ 
                                            style:{borderRadius: 7,maxHeight:"2.8rem"}
                                        }}
                                        /> 
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel style={{ borderRadius: 10, width:'45%' }} htmlFor="standard-adornment-password">Senha</InputLabel>
                                    <TextField onChange={handleChange}
                                        name={'password'}
                                        disabled
                                        style={{ borderRadius: 8, width:'100%' , marginBottom:"3rem"}}
                                        type={showPassword ? 'text' : 'password'}
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
            </Box >

        </Container>

    )
}
export default EditKeeper
