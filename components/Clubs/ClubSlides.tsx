"use client";
import { A11y, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ClubCard from "./ClubCard";
import "swiper/css";
import "swiper/css/scrollbar";

export default function ClubSlides() {
  return (
    <Swiper
      modules={[A11y, Scrollbar]}
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: false }}
    >
      <SwiperSlide>
        <div className="mb-4">
          <ClubCard />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="mb-4">
          <ClubCard />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="mb-4">
          <ClubCard />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
