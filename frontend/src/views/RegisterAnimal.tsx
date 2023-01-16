import React, { Component, useEffect } from 'react'
import styles from "../css/createAnimal.module.css"
import Container from '../components/Container/Container';
import FormAnimal from '../components/FormAnimal/FormAnimal';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';




const RegisterAnimal = () =>{

    useEffect(() => {
        document.title = 'Register Animal';
    })

    return(
        <Container class={styles.container}>
           <VerticalNavBar/>
           <FormAnimal/>
        </Container>

    )
}
export default RegisterAnimal;
