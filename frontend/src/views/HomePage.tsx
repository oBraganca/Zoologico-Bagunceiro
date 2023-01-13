import React, { Component } from 'react'
import styles from '../css/homePage.module.css';

import Navbar from  "../components/Navbar/Navbar";
// import Link from '../components/Link/Link';
import Container from '../components/Container/Container';
import Image from '../components/Image/Image';
import IconLike from '../components/Icons/IconLike';
import IconLogin from '../components/Icons/IconLogin';
import IconResponsive from '../components/Icons/IconResponsive';

import {Link } from "react-router-dom"


import Box from '@mui/material/Box'


import background from '../../public/images/homeBackground.jpg';

const HomePage = () =>{
    return(
        <Container class={styles.background}>
            <Image class={styles.homeComponent} url={window.location.origin + "/images/homeComponent.png"} alt="BigCo Inc. logo"/>
            <Navbar class={styles.navbar}>

                <Link className={styles.link} to="/">INICIO</Link>
                <Link className={styles.link} to="/">SERVIÇOS</Link>
                <Link className={styles.link} to="/">FALE CONOSCO</Link>
                <Link className={styles.link} to="/login">LOGIN</Link>
                <Link className={styles.link} to="/register">REGISTER</Link>
            </Navbar>
            <Box className={styles.content}>
                <Image class={styles.homeBackground} url={window.location.origin + "/images/homeBackground.jpg"} alt="BigCo Inc. logo"/>
            </Box>
            
            <Box className={styles.content} >
                <Box className={styles.content_title}>
                    <h1 className="">Match dos animais</h1>
                        <p> 
                            <strong>Match dos animais</strong> é usado para os animaizinhos saibam
                        </p> 
                        <p>
                            quem gostam e desgostam entre sí.
                        </p> 
                </Box>
                <Box className={styles.content_icons}>
                    <Box className={""}>
                        <IconLike/>
                        <h3 className="">Like/Dislike</h3>
                        <small>
                            <p>
                                Permite que os animaizinhos
                            </p> 
                            <p>
                                possam demonstrar suas
                            </p>
                             afinidades
                        </small>
                    </Box>

                    <Box className={""}>
                        <IconResponsive/>
                        <h3 className="">Responsividade</h3>
                        <small>
                            <p>
                                Pode ser acessado por
                            </p> 
                            <p>
                                smartphone e tablets sem
                            </p>
                                problemas
                        </small>
                    </Box>

                    <Box className={""}>
                        <IconLogin/>
                        <h3 className="">Tela de login</h3>
                        <small>
                            <p>
                                Onde o animalzinho pode 
                            </p> 
                            <p>
                                entrar na sua conta para 
                            </p>
                            interagir com os outros.
                        </small>
                    </Box>
                </Box>
                <Box className={styles.card}>
                    <Box className={styles.card_content}>
                        <Image class={styles.card_content_image} url={window.location.origin + "/images/friends.jpg"} alt="BigCo Inc. logo"/>
                        <Box className={styles.card_content_text}>

                            <h1 className="">Nossa Historia</h1>
                            <p>
                                Os animais tem muitas semelhanças, com isso muitas vezes amizades inesperadas podem ser formadas.
                            </p>
                            <p>  
                                Foi com a iniciativa do Zoológico Bagunceiro que foi desenvolvida, juntamente com a Codificar,  o Match dos animais. Desse modo, esses animaizinhos podem encontrar novas amizades.</p>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>

    )
}
export default HomePage
