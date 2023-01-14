import React from 'react';
import InputLabel from '@mui/material/InputLabel'
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'

const mystyle = {
    display:'none',
};

const labelStyle ={
    width: '100%',
    padding: "1rem",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
}
const divStyle = {
    display:'flex',
    width: '100%',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    height: '7rem',
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='11' ry='11' stroke='grey' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
    
}

const divItem ={
    width:"6rem",
    height:"6rem",
    backgroundColor:"#dbdbdb",
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:'50rem',
}
const divItemText ={
    width:' 100%',
    height: '100%',
    marginLeft: '2rem',
    color: 'rgb(90, 90, 90)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
}



const InputFile =  (props: { 
        className: string,
        accept: string,
        onChange:any;
        message:string;
        name:string,
    }) => {

    const [data, setData] = React.useState<any | null>(null);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0)?.name;
        setData(file)
        props.onChange(e)
    }
    return(
        
        <div style={divStyle} >
            <label style={labelStyle} htmlFor="inputFile">
                <Avatar style={divItem}/>
                <div style={divItemText as React.CSSProperties}>                
                    <h3>Jogue sua foto aqui ou escolha o arquivo</h3>
                    <InputLabel>{ data == null ? props.message : data}</InputLabel>
                </div>
            </label>
            <input id="inputFile" type="file" onChange={handleChange} className={props.className} name={props.name} accept={props.accept} style={mystyle}/>
        </div>
    ) 
}

export default InputFile;