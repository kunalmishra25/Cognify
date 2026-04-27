import React from 'react';
import cognifyLogo from '../assets/cognify-logo.png';

const Logo = ({
    className = 'h-12 w-auto',
    alt = 'Cognify logo',
    src = cognifyLogo,
    brainOnly = false,
}) => (
    brainOnly ? (
        <span className={`${className} inline-flex items-start justify-center overflow-hidden`}>
            <img
                src={src}
                alt={alt}
                className="h-auto w-full object-cover object-top"
            />
        </span>
    ) : (
        <img
            src={src}
            alt={alt}
            className={`${className} object-contain`}
        />
    )
);

export default Logo;
