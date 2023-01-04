import React from 'react';
const Link: React.FC<{title:string, class:string, url:string}> = (props) =>{
    return( 
        <a href={props.url} className={props.class}>{props.title}</a>
    )
}

export default Link;