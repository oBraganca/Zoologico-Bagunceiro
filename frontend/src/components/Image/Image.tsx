import React from 'react';
import Link from '../Link/Link';

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