import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props) => {
    const { src, fallbackSrc,alt, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            className="w-full rounded-t-[31px]"
            width={300}
            height={300}
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
            alt={alt}
            
        />
    );
};

export default ImageWithFallback;