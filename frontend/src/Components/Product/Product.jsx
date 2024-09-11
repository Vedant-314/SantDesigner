import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import "swiper/css/pagination";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import { BsCart } from "react-icons/bs";
import { MdCurrencyExchange } from "react-icons/md";

import "./product.css";

function Product() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-container">
      <Swiper
        spaceBetween={30}
        // effect={'fade'}
        slidesPerView={3}
        navigation={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: true,
        }}
        loop={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
      </Swiper>
      <div className="desc-container">
        <div className="desc-left">
          <div className="desc-content">
            <h2>name</h2>
            <h3>Price</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque,
              minima? Qui odit dolorem velit quod, delectus eos magnam hic
              laudantium dignissimos dolores consequuntur pariatur sequi!
            </p>
            <small>
              <MdCurrencyExchange /> Easy returns and exchange
            </small>
          </div>
        </div>
        <div className="desc-right">
          <div className="desc-content">
            <button>
              <BsCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
