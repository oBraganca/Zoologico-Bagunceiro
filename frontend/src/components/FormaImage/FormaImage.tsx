import React from 'react';

const FormaImage = (props: { 
        className: string,
        url:string
    }) => {
    return( 
        <svg width="100%" height="416" viewBox="0 0 388 416" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="image-pattern" height="1" width="1" >
                    
                    <image xlinkHref={props.url} height="100%" x="-100" y="0" />
                
                </pattern>
            </defs>
            <path d="M0 0H388V415.615C348.56 415.615 23.8059 359.88 0 415.615V0Z" fill="url(#image-pattern)"/>
        </svg>



    )
}

export default FormaImage;