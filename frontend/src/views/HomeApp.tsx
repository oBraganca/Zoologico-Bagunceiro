import React, { Component } from 'react'
import styles from '../css/homeApp.module.css';

import Navbar from  "../components/Navbar/Navbar";
// import Link from '../components/Link/Link';
import Container from '../components/Container/Container';
import Image from '../components/Image/Image';

import {Link } from "react-router-dom"


import Box from '@mui/material/Box'

import { useSelector, useDispatch} from 'react-redux';




import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BugReportIcon from '@mui/icons-material/BugReport';
import BrushIcon from '@mui/icons-material/Brush';
import SettingsIcon from '@mui/icons-material/Settings';

import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import OutlinedInput from '@mui/material/OutlinedInput'




const HomeApp = () =>{
    
    const authentication = useSelector((state:any) => state.authUser) 

    return(
        <Container class={styles.container}>
            <Navbar class={styles.navbar}>
                
                <Box component="div" className={styles.headerNav}>
                    <Image class={styles.logo} url={window.location.origin + "/images/logo2.png"} alt="BigCo Inc. logo"/>
                    <KeyboardTabIcon  sx={{ color:'#383838',backgroundColor: '#E0D9CF', padding: '0.4rem', width: '1rem', height: '1rem', borderRadius: '0.3rem'}} />
                </Box>
                <Box component="div" className={styles.navItem} sx={{marginTop: '1.5rem'}}>
                    <Box component="div" className={styles.linkItem+" "+styles.active}>
                        <BarChartIcon sx={{ width: "1.2rem" }}/>
                        <Link className={styles.link}  to="/">Dashboard</Link>
                    </Box>
                    
                    <Box component="div" className={styles.linkItem}>
                        <GroupIcon sx={{ width: "1.2rem" }}/>
                        <Link className={styles.link} to="/">Team</Link>
                    </Box>
                    
                    <Box component="div" className={styles.linkItem}>
                        <CalendarMonthIcon sx={{ width: "1.2rem" }}/>
                        <Link className={styles.link} to="/">Calendar</Link>
                    </Box>
                    
                    <Box component="div" className={styles.linkItem}>
                        <InsertDriveFileIcon sx={{ width: "1.2rem" }}/>
                        <Link className={styles.link} to="/">Documents</Link>
                    </Box>
                    {authentication.loggedIn}
                    <Box component="div" className={styles.linkItem}>
                        <BugReportIcon sx={{ width: "1.2rem" }}/>
                        <Link className={styles.link} to="/">Bugs</Link>
                    </Box>
                    <hr />
                    <Box component="div" className={styles.linkItem}>
                        <BrushIcon sx={{ width: "1.2rem" }}/>
                        <Link className={styles.link} to="/">Signatures</Link>
                    </Box>
                    
                    <Box component="div" className={styles.linkItem}>
                        <SettingsIcon sx={{ width: "1.2rem" }}/>
                        <Link className={styles.link} to="/">Settings</Link>
                    </Box>
                </Box>

                <Box component="div" className={styles.navItem+" "}>

                    <Box component="div" className={styles.card+" "}>
                        <Box component="div" className={styles.cardPeople+" "}>
                            ZELADORES

                        </Box>
                        <Box component="div" className={styles.cardContent+" "}>
                            <Box component="div" className={styles.cardContentItem+" "}>
                                <Image class={styles.cardContentItemImage} url={window.location.origin + "/images/Avatar.png"} alt="BigCo Inc. logo"/> 
                                Nadine Eckhard
                            </Box>

                            <Box component="div" className={styles.cardContentItem+" "}>
                                <Image class={styles.cardContentItemImage} url={window.location.origin + "/images/Avatar3.png"} alt="BigCo Inc. logo"/> 
                                Nadine Eckhard
                            </Box>

                            <Box component="div" className={styles.cardContentItem+" "}>
                                <Image class={styles.cardContentItemImage} url={window.location.origin + "/images/Portrait2.png"} alt="BigCo Inc. logo"/> 
                                Nadine Eckhard
                            </Box>

                        </Box>
                    </Box>
                </Box>
                
                <Box component="div" className={styles.navItem}>


                </Box>

            </Navbar>
        </Container>

    )
}
export default HomeApp
