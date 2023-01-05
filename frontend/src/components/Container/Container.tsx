import React from 'react';

const Container = (props: { 
        class: string, children: React.ReactNode 
    }) => {
    return( 
        <div className={props.class}>
            {props.children}
        </div>
    )
}

export default Container;