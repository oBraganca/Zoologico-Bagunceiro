import React from 'react';
import Link from '../Link/Link';

const Content: React.FC<{ 
        class: string,
        children: React.ReactNode
    }> = (props: { 
        class: string, children: React.ReactNode 
    }) => {
    return( 
        <div className={props.class}>
            {props.children}
        </div>
    )
}

export default Content;