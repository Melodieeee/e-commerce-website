import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '@/style.css'; // Ensure this includes Swiper styles
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

interface SwiperProductImageProps {
    productPics: string[];
}

const SwiperProductImage: React.FC<SwiperProductImageProps> = ({ productPics }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null); // Use `any` for compatibility

    if (!productPics || productPics.length === 0) {
        return <p>No product images available.</p>;
    }

    return (
        <>
            <Swiper
                loop
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="upSwiper"
            >
                {productPics.map((pic, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={pic}
                            alt={`Product image ${index + 1}`}
                            
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper} // Directly set swiper instance
                loop
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="downSwiper"
            >
                {productPics.map((pic, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={pic}
                            alt={`Thumbnail image ${index + 1}`}
                            
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SwiperProductImage;
