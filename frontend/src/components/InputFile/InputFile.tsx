import React from 'react';
import InputLabel from '@mui/material/InputLabel'
import PersonIcon from '@mui/icons-material/Person';

const mystyle = {
    display:'none',
};

const labelStyle ={
    width: '100%',
    padding: "1rem",
    display:'flex',
}
const divStyle = {
    display:'flex',
    width: '100%',
    border:"0.2rem dashed grey",
    height: '100%',
}

const divItem ={
    width:"6rem",
    height:"6rem",
    backgroundColor:"#ccdfff",
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:'50rem',
}
const divItemText ={
    width:' 30rem',
    height: '4rem',
    marginLeft: '2rem',
    color: 'rgb(90, 90, 90)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
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
                <div style={divItem}>                
                    <PersonIcon sx={{width:'2.5rem', height:'2.5rem', color:"#0081eb",}}/>
                </div>
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