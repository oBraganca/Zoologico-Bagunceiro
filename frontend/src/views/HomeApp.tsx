import React, { Component, useState, useEffect } from 'react'
import styles from '../css/homeApp.module.css';

import Container from '../components/Container/Container';
import HomeAppAnimal from '../components/HomeAppAnimal/HomeAppAnimal';
import HomeAppKeeper from '../components/HomeAppKeeper/HomeAppKeeper';

import { useSelector, useDispatch} from 'react-redux';


import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import useAuthCheck from '../hooks/useAuthCheck';

const HomeApp = () =>{
    
    const authUser = useSelector((state:any) => state.authUser) 
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)

    useEffect(() => {
        console.log(authUser)
        checkToken()
    }, []);
    return(
        <Container class={styles.container}>
           <VerticalNavBar/>
            {authUser.currentUser.accessType_id == 1? 
            <HomeAppKeeper/>
            
            :<HomeAppAnimal/>}
            

        </Container>

    )
}
export default HomeApp
