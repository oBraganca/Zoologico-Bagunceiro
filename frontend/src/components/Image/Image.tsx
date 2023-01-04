import React from 'react';
const Image: React.FC<{ 
        class: string,
        url:string,
        alt:string,
    }> = (props: { 
        class: string,
        url:string,
        alt:string,
    }) => {
    return( 
        <img src={props.url} className={props.class} alt={props.alt}/>
    )
}

export default Image;