import React, { useMemo, useRef, useState, useEffect }from 'react';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';
import Container from '../components/Container/Container';
import styles from '../css/homeApp.module.css'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useSelector, useDispatch} from 'react-redux';
import useAuthCheck from '../hooks/useAuthCheck';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"

const Comp1 = (props:{
    link:string,
    name:string,
    alt:string
}) =>{
    return(
        <Grid container spacing={1} sx={{display:'flex', alignItems:'center'}}>
            <Grid item>
                <Avatar sx={{ width: 50, height: 50, }} alt={props.alt} src={props.link}></Avatar>
            </Grid>
            <Grid item>
                {props.name}
            </Grid>
        </Grid>
    )
}
const Comp2 = (props:{
    id:string
}) =>{
    return(
        <Grid container spacing={0} sx={{display:'flex', alignItems:'center'}}>
            <Grid item >
                <Link to={'/edit-animal/'+props.id}>
                    <IconButton aria-label="delete" size="large">
                        <EditIcon  id={props.id} sx={{color:"#1da4ec"}} fontSize="inherit" />
                    </IconButton>
                </Link>
            </Grid>
            <Grid item>
                
            <IconButton aria-label="delete" size="large">
                <DeleteIcon id={props.id} sx={{ color: '#ff4242' }} fontSize="inherit" /> </IconButton>
            </Grid>
        </Grid>
    )
}



<IconButton aria-label="delete" size="large">
<DeleteIcon fontSize="inherit" />
</IconButton>
const AnimalOverview = () => {
    const [data2, setData2] = useState([]);
    const [data, setData] = useState([]);
    const authUser = useSelector((state:any) => state.authUser)
    
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)
    
    useEffect(() => {
        checkToken()

        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };
        
        axios.get('http://127.0.0.1:8000/api/animals',config ).then((res) => {
                let array:any = []
                console.log(res.data)
                res.data?.map( (x:any) => {
                    array.push({
                        name:<Comp1 name={x.name} link={x.pictureUser} alt={"Picture "+x.name} />,
                        scientificName: x.scientificName,
                        ala:x.ala,
                        action: <Comp2 id={x.encrypted_id}/>,
                        subRows:{
                            like:x.like,
                            superlike:x.superlike,
                            dislike:x.dislike
                            }
                    })

                }) 
                setData(array)
            }
        )
    }, []);


    
    const columns =  useMemo<MRT_ColumnDef[]>(
        () => [
            {
                accessorKey: 'name', //simple recommended way to define a column
                header: 'Name',
                maxSize: 140,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell}:any) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorKey: 'scientificName', //simple recommended way to define a column
                header: 'Cientifico',
                maxSize: 110,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell}:any) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorKey: 'ala', //simple recommended way to define a column
                header: 'Ala',
                maxSize: 120,
                muiTableHeadCellProps: { sx: { color: 'green', width:'5rem'} }, //optional custom props
                Cell: ({ cell}:any) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorKey: 'action', //simple recommended way to define a column
                header: 'Ação',
                maxSize: 110,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell}:any) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
        ],
        [],
    );

    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        
    }, [rowSelection]);

    const tableInstanceRef = useRef(null);

    return(
        
        <Container class={styles.container}>
           <VerticalNavBar/>

            <Box component="div" sx={{height:'92.5vh', marginLeft: '17.5rem', padding: '1.5rem', display:'flex', justifyContent:'center', alignItems:"center"}}>
                
                <Box  component="div" style={{height:'100%', borderRadius:'0.5rem', marginTop: '3rem',  justifyContent:' center',  padding: '0rem 5rem', width: '57rem' , display:'flex',flexDirection: 'column',backgroundColor: "#FFFFFF"}}>
                <MaterialReactTable 
                    columns={columns} 
                    data={data} 
                    state={{ rowSelection, isLoading: !(data.length > 0), }} //manage your own state, pass it back to the table (optional)
                    manualPagination
                    enableColumnOrdering //enable some features
                    enableExpanding

                    renderDetailPanel={( props:{row:any} ) => (
                        
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent:'center',
                            flexDirection:'column',
                            width: '60rem',
                          }}
                        >
                          <Typography sx={{padding:'.5rem 0rem'}}>Like: {props.row.original.subRows.like}</Typography>
                          <Typography sx={{padding:'.5rem  0rem'}}>Super Like: {props.row.original.subRows.superlike}</Typography>
                          <Typography sx={{padding:'.5rem  0rem'}}>Dislike: {props.row.original.subRows.dislike}</Typography>
                        </Box>
                    )}
                    enableColumnResizing
                    columnResizeMode="onChange"
                    enablePagination={false} //disable a default feature
                    onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
                    
                    tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
                    defaultColumn={{
                        minSize: 10, //allow columns to get smaller than default
                        maxSize: 901, //allow columns to get larger than default
                        size: 260, //make columns wider by default
                      }}
                />
                </Box>
            </Box>
           

        </Container>
    )
}

export default AnimalOverview;


