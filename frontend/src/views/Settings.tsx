import React, { Component, useState, useEffect } from 'react'
import styles from '../css/settings.module.css';

import Container from '../components/Container/Container';  
import { useSelector, useDispatch} from 'react-redux';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';
import InputFile from '../components/InputFile/InputFile';
import Box from '@mui/material/Box'
import useAuthCheck from '../hooks/useAuthCheck';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const Settings = () =>{
    
    const authUser = useSelector((state:any) => state.authUser) 
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)
    useEffect(() => {
        checkToken()
    }, []);
    return(
        <Container class={styles.container}>
            <VerticalNavBar/>
            <Box component="div" sx={{height:'100%', marginLeft: '17.5rem', padding: '1.5rem', display:'flex', flexDirection:'column',color:'black'}}>
                <Divider light sx={{width: '65rem'}}/>
                <Grid container spacing={2} sx={{ marginTop: '1.5rem', display:'flex', justifyContent:'center', flexDirection:'row'}}>
                    <Grid item xs={12} sx={{marginTop: '1.5rem', display:'flex', flexDirection:'row'}}>
                        <Grid item sx={{marginLeft:'4rem'}}>
                            {/* Picture */}
                            <Avatar
                                alt="Remy Sharp"
                                src={authUser.currentUser.pictureProfile}
                                sx={{ width: 140, height: 140, border:'0.3rem white solid'}}
                            />
                        </Grid >
                        <Grid item xs={7} sx={{marginLeft:2,display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <h1>Profile</h1>
                            <h3>Atualize sua foto de perfil e seu dados de perfil</h3>
                        </Grid>
                        <Grid item xs={3} sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            
                            <Button type="submit" sx={{borderRadius:2, border:'.1rem solid black',color:'#31352E', maxWidth:'6rem', maxHeight:'2.5rem', padding:'.5rem', marginBottom:"0.5rem", fontSize:'.7rem'}} variant="outlined">
                                Cancelar
                            </Button>
                            <Button type="submit" sx={{ borderRadius:2, border:'.1rem solid #31352E' , maxWidth:'3rem', padding:'.5rem', maxHeight:'2.5rem', backgroundColor: "#31352E", marginBottom:"0.5rem", marginLeft:"0.5rem", fontSize:'.7rem'}} variant="contained">
                                Salvar
                            </Button>
                        </Grid>
                    
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',flexDirection:'row', alignItems:'start', marginTop:'2rem', marginLeft:'3rem'}}>
                        <InputLabel style={{ borderRadius: 10, width:'30%', }} htmlFor="standard-adornment-password">Nome</InputLabel>
                        <TextField
                            sx={{width:'45%'}}
                            InputProps={{ 
                                style:{backgroundColor:'#FFFFFF', borderRadius: 7,maxHeight:"2.5rem", marginBottom:"1rem"}
                            }}
                            type={'text'}
                            name={'name'}
                            
                        />
                    </Grid>
                    <Divider light sx={{width: '65rem'}}/>
                    <Grid item xs={12} sx={{display:'flex',flexDirection:'row', alignItems:'start', marginTop:'2rem', marginLeft:'3rem'}}>
                        <InputLabel style={{ borderRadius: 10, width:'30%', }} htmlFor="standard-adornment-password">Nome Cientifico</InputLabel>
                        <TextField
                            sx={{width:'45%'}}
                            InputProps={{ 
                                style:{backgroundColor:'#FFFFFF', borderRadius: 7,maxHeight:"2.5rem", marginBottom:"1rem"}
                            }}
                            type={'text'}
                            name={'name'}
                            
                        />
                    </Grid>
                    <Divider light sx={{width: '65rem'}}/>
                    <Grid item xs={12} sx={{display:'flex',flexDirection:'row', alignItems:'start', marginTop:'2rem', marginLeft:'3rem', marginBottom:'1.3rem'}}>
                        <InputLabel style={{ borderRadius: 10, width:'30%', }} htmlFor="standard-adornment-password">Sua foto</InputLabel>
                        <Grid item xs={5.4}>
                        <InputFile className={""} accept={""} onChange={""} message={""} name={""}/>
                        </Grid>
                    </Grid>
                    <Divider light sx={{width: '65rem'}}/>
                    <Grid item xs={12} sx={{display:'flex',flexDirection:'row', alignItems:'start', marginTop:'2rem', marginLeft:'3rem'}}>
                        <InputLabel style={{ borderRadius: 10, width:'30%', }} htmlFor="standard-adornment-password">Nome Cientifico</InputLabel>
                            <TextField
                            sx={{width:'45%'}}
                            InputProps={{ 
                                style:{backgroundColor:'#FFFFFF', borderRadius: 7,maxHeight:"2.5rem", marginBottom:"1rem"}
                            }}
                            type={'text'}
                            name={'name'}
                            
                        />
                    </Grid>
                    <Divider light sx={{width: '65rem'}}/>
                </Grid>
            </Box>
            {/* {authUser.currentUser.accessType_id == 1? 
            null
            
            :<HomeAppAnimal/>} */}
            

        </Container>

    )
}
export default Settings
