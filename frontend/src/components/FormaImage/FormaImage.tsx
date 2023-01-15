import React from 'react';

const FormaImage = (props: { 
        className: string,
        url:string
    }) => {
    return( 
        // <svg width="100%" height="416" viewBox="0 0 388 416" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <defs>
        //         <pattern id="image-pattern" height="1" width="1" >
                    
        //             <image xlinkHref={props.url} height="100%" x="-100" y="0" />
                
        //         </pattern>
        //     </defs>
        //     <path d="M0 0H688V372.323C618.066 372.323 42.2125 322.394 0 372.323V0Z" fill="url(#image-pattern)"/>
        // </svg>

        <div>
            <svg style={{position:'absolute', width: 0, height: 0}}>
                <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
                    <path d="M0,0 H1 V1 C0.898,1,0.061,0.866,0,1 V0" x="-100" y="-100"></path>
                </clipPath>
            </svg>

            <div style={{borderRadius:'.8rem 0.8rem 0rem 0', width: '47rem', height: '350px',background: `turquoise url(${props.url})`, backgroundSize: 'cover', clipPath: 'url(#my-clip-path)'}}>
            </div>
        </div>

    )
}

export default FormaImage;