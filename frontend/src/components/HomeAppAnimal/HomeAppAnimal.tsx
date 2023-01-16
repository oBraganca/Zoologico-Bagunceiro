import React, { Component, useState, useEffect } from 'react'
import styles from '../../css/homeAppAnimal.module.css';

import Avatar from '@mui/material/Avatar';
import Container from '../Container/Container';
import FormaImage from '../FormaImage/FormaImage';
import IconMLike from '../Icons/IconMLike';
import IconSuperlike from '../Icons/IconSuperlike';
import IconX from '../Icons/IconX';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';


import Box from '@mui/material/Box'
import VerticalNavBar from '../VerticalNavBar/VerticalNavBar';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/IconButton';


const HomeAppAnimal = () =>{
    
    const authUser = useSelector((state:any) => state.authUser)
    const mathUser = useSelector((state:any) => state.math) 
    const dispatch = useDispatch();
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    function getUsers(){
        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };
        axios.get('http://127.0.0.1:8000/api/match',config ).then((res) => {
            if(res.data.status == 200){
                dispatch({
                    type: 'HAS_ANIMAL', 
                    payload:{
                        wing:res.data.ala, 
                        nickname:res.data.nickname,
                        nome:res.data.nome, 
                        pictureUser:res.data.pictureUser,
                        message:res.data.message,
                        code:res.data.code,
                        
                    }
                });
        
            }else{
                dispatch({
                    type: 'NO_HAS_ANIMAL', 
                    payload:{
                        message:res.data.message
                    }
                });
            }
        }
        )
    }



    const handleClick = (e:React.SyntheticEvent<HTMLButtonElement>) => {
        handleToggle()
        const vote_id = (e.target as HTMLButtonElement).id
        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };

        axios.post('http://127.0.0.1:8000/api/match',{
            voted_animal_id:mathUser.animal.code,
            vote_id:vote_id,
        } ,config ).then((res) => {
            if(res.data.status == 200){
                getUsers()
            }
        })
        handleClose()

    }

    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        
        
        checkToken()
        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };

        axios.get('http://127.0.0.1:8000/api/match/history/'+authUser.currentUser.id,config ).then((res) => {
            
            let array:any = []
            let array1:any = []
            res.data?.map((x:any) =>{
                console.log(x)
                if(x.vote_id == 2 || x.vote_id == 3){
                    array.push({
                        pictureUser:x.pictureUser,
                        name:x.name,
                        message:x.message,
                    })
                }else if(x.vote_id == 1){
                    array1.push({
                        pictureUser:x.pictureUser,
                        name:x.name,
                        message:x.message,
                    })
                }
            })

            setLikes(array);
            setDislikes(array1);
            setLoading(false)

        })

        if(!mathUser.asAnimal){
            getUsers()
        }
    }, []);


    return(
        <Box component="div" sx={{height:'100%', /*marginLeft: '1.0rem',*/ display:'flex',justifyContent:'end'}}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            <Box sx={{borderRadius:'.8rem',marginTop:'3.5rem',height:'36rem', display:'flex',flexDirection: 'row', alignItems:"center",justifyContent:'space-between',width:'67rem'}}>
            {mathUser.animal.message && !mathUser.asAnimal ?(
                <Box className={styles.card} sx={{borderRadius:'.8rem',height:'36rem', display:'flex',flexDirection: 'column',backgroundColor: "#FFFFFF", alignItems:"center",width: '46rem',}}>
                    <h1 >{mathUser.animal.message}</h1>
                </Box>
            ):(
                <Box component="div" className={styles.card} sx={{borderRadius:'.8rem',height:'36rem', display:'flex',flexDirection: 'column', backgroundColor: "#FFFFFF", alignItems:"center",width: '46rem',}}>
                    <FormaImage url={mathUser.animal.pictureUser} className={""}/>
                    
                    <Box sx={{borderRadius:'.8rem',marginTop:'0.5rem',height:'4rem', width: '100%',display:'flex',flexDirection: 'row', backgroundColor: "#FFFFFF", alignItems:"center",}}>
                        <Box component="div" sx={{width:'90%',margin:'1.5rem'}}>
                            <h1 style={{color:"#272727", fontSize:'2rem'}}>{mathUser.animal.nickname}</h1>
                            <h4 style={{color:"#4B4B4B", fontSize:'1.2rem'}}>{mathUser.animal.nome}</h4>
                            <h4 style={{color:"#4B4B4B", fontSize:'1.0rem'}}>{mathUser.animal.wing} do zoologico</h4>
                        </Box>
                        <Box component="div" sx={{ display:'flex',height:'5rem',justifyContent:"center", alignItems:"center",}} className={styles.card_buttom}>
                            <Button onClick={handleClick} sx={{margin:"0 .5rem", backgroundColor:'#E2EAFF', padding:'.8rem',borderRadius:'.8rem'}} id='1'>
                                <IconX id='1'/>
                            </Button>

                            <Button onClick={handleClick} sx={{margin:"0 .5rem", backgroundColor:'#E2EAFF',borderRadius:'.8rem'}} id='3'>
                                    <IconSuperlike id='2'/>
                            </Button>
                            
                            <Button onClick={handleClick} sx={{ margin:"0 .5rem", backgroundColor:'#E2EAFF', padding:'.8rem',borderRadius:'.8rem'}} id='3'>
                                <IconMLike id='3'/>
                            </Button>
                        </Box>
                    </Box>
                    <Box></Box>
                </Box>
            )}
                
                <Box sx={{height:'36rem', marginRight:'1rem', width:'19rem',display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <Box sx={{borderRadius:3,backgroundColor:'white', height:'16rem',}}>
                            
                        <Box sx={{padding:'1rem', borderBottom:'.1rem solid black', textAlign:'center'}}>
                            <p style={{color:'#5876ff', fontSize:'1.4rem'}}>Likes</p>
                        </Box>
                        <Stack direction="column" spacing={2} sx={{height:'13rem', display:'flex', justifyContent:'start',padding:'1rem 0', margin:'0 1.5rem'}}>
                            <div>
                            {loading ? <Skeleton variant="rectangular" width={257} height={160}/> : (likes.length <= 0 ? <p>Sem likes no momento</p> :
                            (likes.map((data:any)=>{
                                return(
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{ bgcolor: 'green[500]' }} variant="rounded" src={data?.pictureUser}>
                                    </Avatar>
                                    <Stack direction="column" spacing={0}>
                                        <p style={{fontSize:'1.2rem'}}>{data.name}</p>
                                        <Box>
                                            <Stack direction="row" spacing={2} sx={{fontSize:'.83rem'}}>
                                                <p>Liked you </p>
                                                <p>{data.message}</p>
                                            </Stack>
                                        </Box>
                                    </Stack>

                                </Stack>)
                            })))}
                            </div>
                        </Stack>
                    </Box>
                    <Box sx={{borderRadius:3,backgroundColor:'white', height:'16rem'}}>
                        <Box sx={{padding:'1rem', borderBottom:'.1rem solid black', textAlign:'center'}}>
                            <p style={{color:'#f88484', fontSize:'1.4rem'}}>Dislike</p>
                        </Box>
                        <Stack direction="column" spacing={2} sx={{height:'13rem', display:'flex', justifyContent:'start',padding:'1rem 0', margin:'0 1.5rem'}}>
                            <div>
                            {loading ? <Skeleton variant="rectangular" width={257} height={160}/> : (dislikes.length <= 0 ? <p>Sem dislikes no momento</p>:
                            (dislikes.map((data:any)=>{
                                return(
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{ bgcolor: 'green[500]' }} variant="rounded" src={data?.pictureUser}>
                                    </Avatar>
                                    <Stack direction="column" spacing={0}>
                                        <p style={{fontSize:'1.2rem'}}>{data.name}</p>
                                        <Box>
                                            <Stack direction="row" spacing={2} sx={{fontSize:'.83rem'}}>
                                                <p>Liked you </p>
                                                <p>{data.message}</p>
                                            </Stack>
                                        </Box>
                                    </Stack>

                                </Stack>)
                            })))}
                            </div>
                            {/* <Stack direction="row" spacing={2}>
                                <Avatar sx={{ bgcolor: 'green[500]' }} variant="rounded" src="/static/images/avatar/1.jpg">
                                </Avatar>
                                <Stack direction="column" spacing={0}>
                                    <p style={{fontSize:'1.2rem'}}>Collizinho</p>
                                    <p>
                                        <Stack direction="row" spacing={2} sx={{fontSize:'.83rem'}}>
                                        <p>Dislike you</p>
                                        <p>2h ago</p>
                                        </Stack>
                                    </p>
                                </Stack>

                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Avatar sx={{ bgcolor: 'green[500]' }} variant="rounded" src="/static/images/avatar/1.jpg">
                                </Avatar>
                                <Stack direction="column" spacing={0}>
                                    <p style={{fontSize:'1.2rem'}}>Collizinho</p>
                                    <p>
                                        <Stack direction="row" spacing={2} sx={{fontSize:'.83rem'}}>
                                        <p>Dislike you</p>
                                        <p>2h ago</p>
                                        </Stack>
                                    </p>
                                </Stack>

                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Avatar sx={{ bgcolor: 'green[500]' }} variant="rounded" src="/static/images/avatar/1.jpg">
                                </Avatar>
                                <Stack direction="column" spacing={0}>
                                    <p style={{fontSize:'1.2rem'}}>Collizinho</p>
                                    <p>
                                        <Stack direction="row" spacing={2} sx={{fontSize:'.83rem'}}>
                                        <p>Dislike you</p>
                                        <p>2h ago</p>
                                        </Stack>
                                    </p>
                                </Stack>

                            </Stack> */}
                        </Stack>
                            
                    </Box>
                </Box>
            </Box>

            
            
        </Box>

    )
}
export default HomeAppAnimal
