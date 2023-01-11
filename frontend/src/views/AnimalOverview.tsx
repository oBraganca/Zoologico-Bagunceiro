import React, { useMemo, useRef, useState, useEffect }from 'react';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';
import Container from '../components/Container/Container';

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

const Comp1 = () =>{
    return(
        <Grid container spacing={1} sx={{display:'flex', alignItems:'center'}}>
            <Grid item sm={2}>
                <Avatar alt="Remy Sharp" src="https://i.imgur.com/HjvOz6E.jpg"></Avatar>
            </Grid>
            <Grid item>
                Rei da floresta
            </Grid>
        </Grid>
    )
}

const data = [
    {
        name: <Comp1/>,
        age: 30,
    },
    {
        name: 'Sara',
        age: 25,
    },
]

const AnimalOverview = () => {
    // const [data, setData] = useState(empList)

    const columns =  useMemo<MRT_ColumnDef[]>(
        () => [
            {
                accessorKey: 'name', //simple recommended way to define a column
                header: 'Name',
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell}:any) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorFn: (row:any) => row.age, //alternate way
                id: 'age', //id required if you use accessorFn instead of accessorKey
                header: 'Age',
                Header: () => <i>Age</i>, //optional custom header render
            },
        ],
        [],
    );

    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        //do something when the row selection changes
    }, [rowSelection]);

    const tableInstanceRef = useRef(null);

    return(
        
        <Container class={''}>
           <VerticalNavBar/>

            <Box component="div" sx={{height:'100vh', marginLeft: '17.5rem', padding: '1.5rem', display:'flex', backgroundColor: "#f5f5f5", justifyContent:'center', alignItems:"center"}}>
                
                <Box  component="div" style={{height:'100%', borderRadius:'0.5rem',  justifyContent:' center',  padding: '0rem 5rem', width: '70rem' , display:'flex',flexDirection: 'column',backgroundColor: "#FFFFFF"}}>
                <MaterialReactTable 
                    columns={columns} 
                    data={data} 
                    enableColumnOrdering //enable some features
                    enableRowSelection 
                    enablePagination={false} //disable a default feature
                    onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
                    state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
                    tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
                />
                </Box>
            </Box>
           

        </Container>
    )
}

export default AnimalOverview;


