import React, { Component, useState, useEffect } from 'react'
import styles from '../css/homeApp.module.css';

import Container from '../components/Container/Container';

import { useSelector, useDispatch} from 'react-redux';


import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

const HomeApp = () =>{
    
    const authentication = useSelector((state:any) => state.authUser) 
    return(
        <Container class={styles.container}>
           <VerticalNavBar/>

        </Container>

    )
}
export default HomeApp
