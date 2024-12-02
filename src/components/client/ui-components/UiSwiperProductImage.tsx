import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '@/style.css'


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

interface SwiperProductImageProps {
    productPics: string[];
}

const SwiperProductImage: React.FC<SwiperProductImageProps> = ( { productPics } ) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
    <Swiper
        style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="upSwiper"
    >
        {productPics.map((pic, index) => (
          <SwiperSlide key={index}>
            <img src={pic} alt={`img${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="downSwiper"
    >
        {productPics.map((pic, index) => (
          <SwiperSlide key={index}>
            <img src={pic} alt={`img${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperProductImage;