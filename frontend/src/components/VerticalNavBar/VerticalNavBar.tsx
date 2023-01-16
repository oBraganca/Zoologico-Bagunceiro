import React, { Component, useState, useEffect} from 'react'
import Navbar from  "../Navbar/Navbar";
import Image from '../Image/Image';
import IconSettings from '../Icons/IconSettings';
import IconDash from '../Icons/IconDash';
import Logo from '../Icons/Logo';
import styles from '../../css/verticalNavbar.module.css';

import {Link } from "react-router-dom";


import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
 

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
import JoinFullIcon from '@mui/icons-material/JoinFull';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import { useSelector, useDispatch} from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

const VerticalNavBar = () =>{

    const authUser = useSelector((state:any) => state.authUser)  
    const dispatch = useDispatch(); 
    const [like, setLike] = React.useState(null);
    const [match, setMatch] = React.useState(null);
    const [dislike, setDislike] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    console.log(authUser.currentUser.accessType_id)
    useEffect(() => {
        if(authUser.currentUser.accessType_id==2){
            const config = {
                headers: { Authorization: "Bearer "+authUser.currentUser.token }
            };
            
            axios.get('http://127.0.0.1:8000/api/match/data/'+authUser.currentUser.id,config ).then((res) => {
                    let array:any = []
                    // res.data?.map( (x:any) => {
                    //     array.push({
                    //         name:<Comp1 name={x.name} link={x.pictureUser} alt={"Picture "+x.name} />,
                    //         scientificName: x.scientificName,
                    //         ala:x.ala,
                    //         action: <Comp2 id={x.encrypted_id}/>,
                    //         subRows:{
                    //             like:x.like,
                    //             superlike:x.superlike,
                    //             dislike:x.dislike
                    //             }
                    //     })
    
                    // })
                    // console.log(res.data[0])
                    setLike(res.data[0].like)
                    setDislike(res.data[0].dislike)
                    setMatch(res.data[0].match)
                    // setData(array)
                }
            )
        }
    }, [like,match,dislike]);

    const handleLogout = () =>{
        dispatch({
            type: 'NO_HAS_ANIMAL',
            payload:{
            }
        })
        dispatch({
            type: 'NOT_AUTHENTICATED', 
            payload:{
            }
        })
        

    }
        
    const handleClickD = () => {
        setOpenD(!openD);
    };
    return(
        <div>
            <Box sx={{ paddingLeft:'2.5rem', width:'100%',zIndex:'5', height:'2.7rem', position:'fixed', backgroundColor:'white', display:'flex', alignItems:'center'}}>
                <Logo/>
                <p style={{marginLeft:'2rem', fontSize:'1.3rem'}}>Animal Match</p>
            </Box>
            <Navbar class={styles.navbar}>
                        
                {/* <Box component="div" className={styles.headerNav}>
                    <Image class={styles.logo} url={authUser.currentUser.pictureProfile} alt="BigCo Inc. logo"/>
                    <KeyboardTabIcon  sx={{ color:'#383838',backgroundColor: '#E0D9CF', padding: '0.4rem', width: '1rem', height: '1rem', borderRadius: '0.3rem'}} />
                </Box> */}
                <Box component="div" className={styles.navItemProfile}>
                    <Box component="div" className={styles.cardProfile} sx={{whiteSpace: 'nowrap', overflow: 'hidden',textOverflow: 'ellipsis',direction: 'ltr'}}>
                        <Box component="div" sx={{}}>
                            <Image class={styles.profileImage} url={authUser.currentUser.pictureProfile} alt="BigCo Inc. logo"/> 
                        </Box>
                        <Box component="div" className={styles.cardProfileInfo}>
                            <p className={styles.cardProfileName}>{authUser.currentUser.name}</p>
                            <p className={styles.cardProfileEmail}>{authUser.currentUser.email}</p>
                        </Box>
                    </Box>
                </Box>
                <Box component="div" className={styles.navItem} sx={{marginTop: '0.2rem'}}>
                    {authUser.currentUser.accessType_id == 1 ?(
                        <div className={styles.navItem}>

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
                                </Collapse>
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
                                        <Link className={styles.link}  to="/overview-keeper">
                                            <SubjectIcon sx={{ width: "1.2rem", marginRight:"0.5rem"}}/>
                                            Overview
                                        </Link>
                                    </Box>
                                </Collapse>
                            </Box>
                        </div>
                    ):(
                        <div className={styles.navItem}>
                            <Box component="div" sx={{margin:'2rem 0', width:'15rem', display:'flex', justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>
                                <Stack direction="column" spacing={0}>


                                    <Typography  style={{fontSize:'1.2rem', color:'#46c69a'}}>{like == null?  <Skeleton />  : like}</Typography >
                                    <Typography sx={{fontSize:'1rem', width:'3rem'}}>{like == null?  <Skeleton />  : "Likes"}</Typography >
                                </Stack>
                                <Stack direction="column" spacing={0}>
                                    <Typography  style={{fontSize:'1.2rem', color:'#46c69a'}}>{dislike == null?  <Skeleton />  : dislike}</Typography >
                                    <Typography sx={{fontSize:'1rem', width:'3rem'}}>{dislike == null?  <Skeleton />  : "Dislike"}</Typography >
                                </Stack>
                                <Stack direction="column" spacing={0}>
                                    <Typography  style={{fontSize:'1.2rem', color:'#46c69a'}}>{match == null?  <Skeleton />  : match}</Typography >
                                    <Typography sx={{fontSize:'1rem', width:'3rem'}}>{match == null?  <Skeleton />  : "Match"}</Typography >
                                </Stack>
                            </Box>

                            <Box component="div" className={styles.linkItem}>
                                <Link className={styles.link+" "+styles.active}  to="/">
                                    <FavoriteIcon sx={{  width: '1rem', height: '1rem',marginRight:"0.5rem"}} className={styles.icon}/>
                                    Match dos animais
                                </Link>
                            </Box>

                            <Box component="div" className={styles.linkItem}>
                                <Link className={styles.link}  to="/">
                                    <JoinFullIcon sx={{  width: '1rem', height: '1rem',marginRight:"0.5rem"}} />
                                    Matched
                                </Link>
                            </Box>
                        </div>

                    )}
                    
                    <hr style={{marginTop:'0.7rem'}} />
                    <Box component="div" style={{marginTop:'0.7rem'}} className={styles.navItem}>
                        <Box component="div" style={{marginTop:'0.7rem'}} className={styles.linkItem}>
                            <Link className={styles.link}  to="/settings">
                                <IconSettings className={styles.icon}/>
                                Settings
                            </Link>
                        </Box>
                        <Box component="div" style={{marginTop:'0.7rem'}} className={styles.linkItem}>
                            <Link to='' className={styles.link}  onClick={handleLogout}>
                                <LogoutIcon  sx={{  width: '1rem', height: '1rem',marginRight:"0.5rem"}} className={styles.icon}/>
                                Logout
                            </Link>
                        </Box>
                    </Box>
                    
                </Box>
                
                {/* <Box component="div" className={styles.navItem+" "}>

                    <Box component="div" className={styles.card+" "}>
                        <Box component="div" className={styles.cardPeople+" "}>
                            {authUser.currentUser.accessType_id == 1 ? 'ZELADORES' : 'MATCHS'}

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
                    <Box component="div" className={styles.cardProfile} sx={{whiteSpace: 'nowrap', overflow: 'hidden',textOverflow: 'ellipsis',direction: 'ltr'}}>
                        <Image class={styles.profileImage} url={authUser.currentUser.pictureProfile} alt="BigCo Inc. logo"/> 
                                
                        <Box component="div" className={styles.cardProfileInfo}>
                            <p className={styles.cardProfileName}>{authUser.currentUser.email}</p>
                            <p className={styles.cardProfileEmail}>{authUser.currentUser.name}</p>
                        </Box>
                    </Box>
                </Box> */}

            </Navbar>
        </div>
    )
}

export default VerticalNavBar