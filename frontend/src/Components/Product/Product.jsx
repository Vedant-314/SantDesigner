import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import { BsCart } from "react-icons/bs";
import { MdCurrencyExchange } from "react-icons/md";
import { CiLogin } from "react-icons/ci";

import "./product.css";
import { useCart } from "../../../utils/context"; 
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (item) => {
    addItem(item);
  };

  const user = useSelector((state) => state.user.user);

  return (
    <div className="product-container">
      {console.log(id)}
      <Swiper
        spaceBetween={30}
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
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="nature-1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            alt="nature-2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt="nature-3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt="nature-4"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            alt="nature-5"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            alt="nature-6"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-7.jpg"
            alt="nature-7"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-8.jpg"
            alt="nature-8"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-9.jpg"
            alt="nature-9"
          />
        </SwiperSlide>
      </Swiper>

      <div className="desc-container">
        <div className="desc-left">
          <div className="desc-content">
            <h2>Product Name</h2>
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
            {user ? (
              <button
                onClick={() =>
                  handleAddToCart({
                    name: "Sample Product",
                    price: 100,
                    quantity: 1,
                    id: id,
                    truth: true,
                  })
                }
              >
                <BsCart /> Add to Cart
              </button>
            ) : (
              <button onClick={() => navigate("/login")}>
                <CiLogin /> Login To Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
