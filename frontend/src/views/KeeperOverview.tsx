import React, { useMemo, useRef, useState, useEffect }from 'react';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';
import Container from '../components/Container/Container';

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
import { Link } from "react-router-dom"

const Comp1 = (props:{
    link:string,
    name:string,
    alt:string
}) =>{
    return(
        <Grid container spacing={1} sx={{display:'flex', alignItems:'center'}}>
            <Grid item sm={4}>
                <Avatar sx={{ width: 50, height: 50 }} alt={props.alt} src={props.link}></Avatar>
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
                <Link to={'/edit-keeper/'+props.id}>
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
const KeeperOverview = () => {
    const [data2, setData2] = useState([]);
    const [data, setData] = useState([]);
    const authUser = useSelector((state:any) => state.authUser)
    
    const [isTokenValid, checkToken] = useAuthCheck(authUser.currentUser.token)
    
    useEffect(() => {
        
        document.title = 'Overview';

        checkToken()

        const config = {
            headers: { Authorization: "Bearer "+authUser.currentUser.token }
        };
        
        axios.get('http://127.0.0.1:8000/api/keepers',config ).then((res) => {
                let array:any = []
                console.log(res.data)
                res.data?.map( (x:any) => {
                    array.push({
                        name:<Comp1 name={x.name} link={x.pictureUser} alt={"Picture "+x.name} />,
                        email: x.email,
                        action: <Comp2 id={x.encrypted_id}/>
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
                maxSize: 190,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell}:any) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorKey: 'email', //simple recommended way to define a column
                header: 'Email',
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell}:any) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorKey: 'action', //simple recommended way to define a column
                header: 'Ação',
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
        
        <Container class={''}>
           <VerticalNavBar/>

            <Box component="div" sx={{height:'100vh', marginLeft: '17.5rem', padding: '1.5rem', display:'flex', backgroundColor: "#f5f5f5", justifyContent:'center', alignItems:"center"}}>
                
                <Box  component="div" style={{height:'100%', borderRadius:'0.5rem',  justifyContent:' center',  padding: '0rem 5rem', width: '57rem' , display:'flex',flexDirection: 'column',backgroundColor: "#FFFFFF"}}>
                <MaterialReactTable 
                    columns={columns} 
                    data={data} 
                    enableColumnOrdering //enable some features
                    enableRowSelection 
                    enablePagination={false} //disable a default feature
                    onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
                    state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
                    tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance
                    enableColumnResizing
                    columnResizeMode="onChange"
                />
                </Box>
            </Box>
           

        </Container>
    )
}

export default KeeperOverview;


