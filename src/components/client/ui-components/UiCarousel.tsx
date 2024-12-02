import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from "swiper/modules";

interface Image {
  imgPath: string;
  label: string;
  redirectURL: string;
}

interface SwiperComponentProps {
  images: Image[];
}

export default function SwiperComponent({ images }: SwiperComponentProps) {
  return (
    <>
   <Swiper 
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ dynamicBullets: true, clickable: true }}
      modules={[Autoplay, Pagination]}
      className="h-swiper w-swiper"
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={`${image.label}-${index}`}
          className="object-cover"
        >
          <a href={image.redirectURL}>
            <img
              src={image.imgPath}
              alt={image.label}
              className="block w-full h-full object-cover"
            />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
    
    </>

    
  );
}


