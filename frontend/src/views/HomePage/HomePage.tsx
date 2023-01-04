import React, { Component } from 'react'
import styles from './homePage.module.css';

import Navbar from  "../../components/Navbar/Navbar";
import Link from '../../components/Link/Link';
import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';
import Image from '../../components/Image/Image';
import IconLike from '../../components/Icons/IconLike';
import IconLogin from '../../components/Icons/IconLogin';
import IconResponsive from '../../components/Icons/IconResponsive';

import background from '../../../public/images/homeBackground.jpg';

const HomePage: React.FC<{}> = () =>{
    return(
        <Container class={styles.background}>
            <Image class={styles.homeComponent} url={window.location.origin + "/images/homeComponent.png"} alt="BigCo Inc. logo"/>
            <Navbar class={styles.navbar}>
                <Link class={styles.link} title="INICIO" url="/"/>
                <Link class={styles.link} title="SERVIÇOS" url="/"/>
                <Link class={styles.link} title="FALE CONOSCO" url="/"/>
                <Link class={styles.link} title="LOGIN" url="/"/>
            </Navbar>
            <Content class={styles.content}>
                <Image class={styles.homeBackground} url={window.location.origin + "/images/homeBackground.jpg"} alt="BigCo Inc. logo"/>
            </Content>
            
            <Content class={styles.content}>
                <Content class={styles.content_title}>
                    <h1 className="">Match dos animais</h1>
                        <p> 
                            <strong>Match dos animais</strong> é usado para os animaizinhos saibam
                        </p> 
                        <p>
                            quem gostam e desgostam entre sí.
                        </p> 
                </Content>
                <Content class={styles.content_icons}>
                    <Content class={""}>
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
                    </Content>

                    <Content class={""}>
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
                    </Content>

                    <Content class={""}>
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
                    </Content>
                </Content>
                <Content class={styles.card}>
                    <Content class={styles.card_content}>
                        <Image class={styles.card_content_image} url={window.location.origin + "/images/friends.jpg"} alt="BigCo Inc. logo"/>
                        <Content class={styles.card_content_text}>

                            <h1 className="">Nossa Historia</h1>
                            <p>
                                Os animais tem muitas semelhanças, com isso muitas vezes amizades inesperadas podem ser formadas.
                            </p>
                            <p>  
                                Foi com a iniciativa do Zoológico Bagunceiro que foi desenvolvida, juntamente com a Codificar,  o Match dos animais. Desse modo, esses animaizinhos podem encontrar novas amizades.</p>

                        </Content>
                    </Content>
                </Content>
            </Content>
        </Container>

    )
}
export default HomePage
