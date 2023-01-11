import React, { Component, useState } from 'react'
import Navbar from  "../Navbar/Navbar";
import Image from '../Image/Image';
import IconSettings from '../Icons/IconSettings';
import IconDash from '../Icons/IconDash';
import styles from '../../css/verticalNavbar.module.css';

import {Link } from "react-router-dom";


import Box from '@mui/material/Box';


import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BugReportIcon from '@mui/icons-material/BugReport';
import BrushIcon from '@mui/icons-material/Brush';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import OutlinedInput from '@mui/material/OutlinedInput'

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PetsIcon from '@mui/icons-material/Pets';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import SubjectIcon from '@mui/icons-material/Subject';

const VerticalNavBar = () =>{
    // const authentication = useSelector((state:any) => state.authUser) 

    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
        
    const handleClickD = () => {
        setOpenD(!openD);
    };
    return(
        <Navbar class={styles.navbar}>
                    
            <Box component="div" className={styles.headerNav}>
                <Image class={styles.logo} url={window.location.origin + "/images/logo2.png"} alt="BigCo Inc. logo"/>
                <KeyboardTabIcon  sx={{ color:'#383838',backgroundColor: '#E0D9CF', padding: '0.4rem', width: '1rem', height: '1rem', borderRadius: '0.3rem'}} />
            </Box>
            <Box component="div" className={styles.navItem} sx={{marginTop: '0.8rem'}}>
                <Box component="div" className={styles.linkItem}>
                    <Link className={styles.link+" "+styles.active}  to="/">
                        <IconDash className={styles.icon}/>
                        Dashboard
                    </Link>
                </Box>
                
                <Box component="div" className={styles.linkItem}>
                    
                    <Link className={styles.link} onClick={handleClick} to="">
                        <PetsIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                        Animals
                        
                        {open ? <ExpandLess sx={{ width: "2rem", marginLeft:"7.5rem"}} /> : <ExpandMore sx={{ width: "2rem", marginLeft:"7.5rem"}} />}
                    </Link>
                    
                </Box>

                <Box component="div" className={styles.fatherLinkItem}>
                    <Collapse in={open}  timeout="auto" unmountOnExit>
                
                        <Box component="div" className={styles.linkSubItem}>
                            <Link className={styles.link}  to="/add-animal">
                                <AppRegistrationOutlinedIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                                Register Animals
                            </Link>
                        </Box>
                        
                        <Box component="div" className={styles.linkSubItem}>
                            <Link className={styles.link}  to="/overview-animal">
                                <SubjectIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                                Overview
                            </Link>
                        </Box>
                        
                        {/* <Box component="div" className={styles.linkSubItem}>
                            <Link className={styles.link}  to="/">
                                <CalendarMonthIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                                Calendar
                            </Link>
                        </Box> */}
                    </Collapse>
                </Box>
                
                
                <Box component="div" className={styles.linkItem}>
                    <Link className={styles.link}  to="/">
                        <CalendarMonthIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                        Calendar
                    </Link>
                </Box>
                <Box component="div" className={styles.linkItem}>
                    <Link className={styles.link} onClick={handleClickD} to="">
                        <GroupIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                        Team
                        
                        {openD ? <ExpandLess sx={{ width: "2rem", marginLeft:"8.45rem"}} /> : <ExpandMore sx={{ width: "2rem", marginLeft:"8.45rem"}} />}
                    </Link>
                </Box>
                <Box component="div" className={styles.fatherLinkItem}>
                    <Collapse in={openD} timeout="auto" unmountOnExit>
                
                        <Box component="div" className={styles.linkSubItem}>
                            <Link className={styles.link}  to="/add-keeper">
                                <AppRegistrationOutlinedIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                                Register Zeladores
                            </Link>
                        </Box>
                        
                        <Box component="div" className={styles.linkSubItem}>
                            <Link className={styles.link}  to="/">
                                <SubjectIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                                Overview
                            </Link>
                        </Box>
                        
                        {/* <Box component="div" className={styles.linkSubItem}>
                            <Link className={styles.link}  to="/">
                                <CalendarMonthIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                                Calendar
                            </Link>
                        </Box> */}
                    </Collapse>
                </Box>
                <hr style={{marginTop:'0.7rem'}} />
                <Box component="div" style={{marginTop:'0.7rem'}} className={styles.linkItem}>
                    <Link className={styles.link}  to="/">
                        <IconSettings className={styles.icon}/>
                        Settings
                    </Link>
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
                <Box component="div" className={styles.cardProfile}>
                    <Image class={styles.profileImage} url={window.location.origin + "/images/Portrait2.png"} alt="BigCo Inc. logo"/> 
                            
                    <Box component="div" className={styles.cardProfileInfo}>
                        <p className={styles.cardProfileName}>Alicia Ferrara</p>
                        <p className={styles.cardProfileEmail}>hola@alicia.ferrara</p>
                    </Box>
                </Box>
            </Box>

        </Navbar>
    )
}

export default VerticalNavBar