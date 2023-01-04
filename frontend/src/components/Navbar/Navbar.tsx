import React from 'react';

const Navbar: React.FC<{ 
        class: string,
        children: React.ReactNode
    }> = (props: { 
        class: string, children: React.ReactNode 
    }) => {
    return( 
        <nav className={props.class}>
            {props.children}
        </nav>
    )
}

export default Navbar;