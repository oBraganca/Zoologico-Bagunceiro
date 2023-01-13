
import React from 'react';

const IconSuperlike = (props: { 
        id:string
    }) => {
    return( 
        <svg width="70" id={props.id} height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="70" height="70" rx="35" fill="#4A88FF"/>
        <path id={props.id} d="M23.8581 22.7709L32.549 6.85781C35.2762 1.71406 35.2762 1.71407 38.0034 6.85781L46.6942 22.7709L66.1298 25.3384C70.9651 26.2731 70.9651 26.2731 67.8121 30.0274L53.7508 42.4055L57.0692 59.8922C57.0692 63.834 57.0692 63.834 52.6561 62.7897L35.2762 54.529L17.8961 62.7897C12.9706 64.5564 12.9706 64.5564 12.9706 61.6671L16.8013 42.4055L2.74043 30.0274C-1.15631 26.2731 -1.15631 26.2731 4.42262 25.3384L23.8581 22.7709Z" fill="url(#paint0_radial_133_531)"/>
        <path id={props.id} d="M30.2249 31.1028L33.9496 24.5811C35.1184 22.473 35.1184 22.473 36.2871 24.5811L40.0118 31.1028L48.3413 32.1551C50.4136 32.5382 50.4136 32.5382 49.0623 34.0768L43.0361 39.1498L44.4582 46.3165C44.4582 47.932 44.4582 47.932 42.5669 47.504L35.1184 44.1184L27.6698 47.504C25.5588 48.228 25.5588 48.228 25.5588 47.0439L27.2006 39.1498L21.1745 34.0768C19.5044 32.5382 19.5044 32.5382 21.8954 32.1551L30.2249 31.1028Z" fill="white"/>
        <defs>
        <radialGradient id="paint0_radial_133_531" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(35 33.5) rotate(90) scale(30.5 35)">
        <stop stopColor="white" stopOpacity="0.49"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
        </radialGradient>
        </defs>
        </svg>

    )
}

export default IconSuperlike;