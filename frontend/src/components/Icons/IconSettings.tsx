import React from 'react';

const IconSetting = (props: { 
        className: string,
    }) => {
    return( 
        <svg className={props.className} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.30957 15.4814H8.69043C9.25781 15.4814 9.70215 15.1328 9.83203 14.5928L10.1123 13.3828L10.29 13.3145L11.3428 13.9639C11.8213 14.2646 12.3818 14.1895 12.7783 13.7861L13.7354 12.8291C14.1455 12.4258 14.2139 11.8652 13.9131 11.3936L13.2637 10.3477L13.3252 10.1768L14.5352 9.89648C15.0684 9.75977 15.4238 9.31543 15.4238 8.75488V7.4082C15.4238 6.84766 15.0752 6.40332 14.5352 6.2666L13.3389 5.97949L13.2705 5.80176L13.9199 4.75586C14.2207 4.28418 14.1455 3.73047 13.7422 3.31348L12.7852 2.35645C12.3887 1.95996 11.8281 1.88477 11.3564 2.17871L10.3037 2.82129L10.1123 2.74609L9.83203 1.53613C9.70215 0.996094 9.25781 0.647461 8.69043 0.647461H7.30957C6.73535 0.647461 6.29785 0.996094 6.16797 1.53613L5.8877 2.74609L5.69629 2.82129L4.64355 2.17871C4.16504 1.88477 3.60449 1.95996 3.20801 2.35645L2.25098 3.31348C1.84766 3.73047 1.77246 4.28418 2.07324 4.75586L2.72949 5.80176L2.6543 5.97949L1.46484 6.2666C0.917969 6.40332 0.576172 6.84766 0.576172 7.4082V8.75488C0.576172 9.31543 0.924805 9.75977 1.46484 9.89648L2.66797 10.1768L2.73633 10.3477L2.08008 11.3936C1.7793 11.8652 1.85449 12.4258 2.25781 12.8291L3.21484 13.7861C3.61816 14.1895 4.17871 14.2646 4.65039 13.9639L5.70312 13.3145L5.8877 13.3828L6.16797 14.5928C6.29785 15.1328 6.73535 15.4814 7.30957 15.4814ZM7.47363 14.2441C7.35742 14.2441 7.30273 14.1895 7.28223 14.0869L6.87891 12.4053C6.44141 12.3027 6.03125 12.1318 5.69629 11.9199L4.21973 12.8291C4.1377 12.8838 4.05566 12.877 3.9668 12.7949L3.24219 12.0703C3.16699 11.9951 3.16016 11.9131 3.22168 11.8242L4.13086 10.3477C3.93945 10.0264 3.75488 9.61621 3.65234 9.18555L1.96387 8.78223C1.86133 8.76172 1.81348 8.70703 1.81348 8.59082V7.56543C1.81348 7.44238 1.86133 7.39453 1.96387 7.36719L3.65234 6.9707C3.75488 6.5127 3.95312 6.08887 4.11719 5.79492L3.21484 4.3252C3.15332 4.22949 3.15332 4.14746 3.23535 4.06543L3.95996 3.34766C4.04883 3.27246 4.11719 3.25879 4.21973 3.31348L5.68945 4.20898C5.99707 4.02441 6.44824 3.83301 6.87891 3.72363L7.28223 2.04199C7.30273 1.93945 7.35742 1.88477 7.47363 1.88477H8.52637C8.64258 1.88477 8.69727 1.93262 8.71094 2.04199L9.12109 3.7373C9.56543 3.83984 9.96875 4.02441 10.3037 4.21582L11.7734 3.32031C11.876 3.26562 11.9443 3.27246 12.0264 3.35449L12.7578 4.07227C12.8398 4.14746 12.8398 4.22949 12.7783 4.3252L11.876 5.79492C12.04 6.08887 12.2451 6.5127 12.3477 6.9707L14.0293 7.36719C14.1387 7.39453 14.1865 7.44238 14.1865 7.56543V8.59082C14.1865 8.70703 14.1318 8.76172 14.0293 8.78223L12.3408 9.18555C12.2383 9.61621 12.0537 10.0264 11.8691 10.3477L12.7715 11.8242C12.8262 11.9131 12.8262 11.9951 12.751 12.0635L12.0264 12.7949C11.9375 12.877 11.8555 12.8838 11.7734 12.8291L10.2969 11.9199C9.96191 12.1318 9.57227 12.3027 9.12109 12.4053L8.71094 14.0869C8.69727 14.1963 8.64258 14.2441 8.52637 14.2441H7.47363ZM8 10.6621C9.42188 10.6621 10.5908 9.49316 10.5908 8.06445C10.5908 6.64941 9.42188 5.48047 8 5.48047C6.57812 5.48047 5.40234 6.64941 5.40234 8.06445C5.40234 9.49316 6.57129 10.6621 8 10.6621ZM8 9.49316C7.2207 9.49316 6.57812 8.85059 6.57812 8.06445C6.57812 7.29199 7.2207 6.65625 8 6.65625C8.76562 6.65625 9.40137 7.29199 9.40137 8.06445C9.40137 8.84375 8.76562 9.49316 8 9.49316Z" fill="black"/>
        </svg>

    )
}

export default IconSetting;