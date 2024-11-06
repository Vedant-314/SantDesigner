import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../../utils/context";
import axios from "axios";
import { CiLogin } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
import { MdCurrencyExchange } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";

function ShoeProd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const user = useSelector((state) => state.user.user);

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const token = "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";

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/prodsku/${id}`);
        const data = response.data; // Access the product data in response.data
        setProduct(data); // Set the actual product data
        console.log(data); // Log the product data for verification
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/Gurshaan-1/photos/contents/HBS/${id}`,
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        const data = response.data;

        if (Array.isArray(data)) {
          const media = data.map((item) => item.download_url);
          setProductImages(media);
          console.log("Fetched media:", media);
        } else {
          console.error("Expected an array but received:", data);
          setProductImages(null);
        }
      } catch (error) {
        console.error("Error fetching product media:", error);
        setProductImages(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductImages();
  }, [id]);

  const handleAddToCart = () => {
    addItem({
      name: product.Title,
      price: product["Selling Price"],
      quantity: 1,
      id: id,
      size: true,
    });
    toast.success(`${product.Title} has been added to your cart!`);
  };

  const parseSizes = (sizeRange) => {
    const matches = sizeRange.match(/UK(\d+)-UK(\d+)/);
    if (!matches) return []; 

    const minSize = parseInt(matches[1], 10); // Extracts 6
    const maxSize = parseInt(matches[2], 10); // Extracts 12

    return Array.from({ length: maxSize - minSize + 1 }, (_, i) => `UK${minSize + i}`);
  };

  const sizeOptions = product?.Size ? parseSizes(product.Size) : [];

  

  console.log(sizeOptions);

  return (
    <div className="product-container">
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
        {productImages && productImages.length > 0 ? (
          productImages.map((media, index) => (
            <SwiperSlide key={index}>
              {media.endsWith(".MP4") ? (
                <div className="video-container">
                  <video
                    width="100%"
                    autoplay
                    loop
                    controls
                    muted
                    disableOnInteraction
                  >
                    <source src={media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <img src={media} alt={`Product Image ${index + 1}`} />
              )}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>No Media Available</p>
          </SwiperSlide>
        )}
      </Swiper>

      <div className="desc-container">
        <div className="desc-left">
          <div className="desc-content">
            <h2>Description</h2>
            <p>{product?.Description}</p>
            <small>
              <MdCurrencyExchange /> Easy returns and exchange
            </small>
          </div>
        </div>
        <div className="desc-right">
          <div className="desc-content">
            <h2>
              <i>{product?.Title}</i>
            </h2>
            <p>
              <h4>
                <b>Price :</b> ₹ {product ? product["Selling Price"] : "N/A"}
              </h4>
              <h4>
                <b>Size :</b>{" "}
                <select>
                    
                  {sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {console.log(sizeOptions)}
                      {size}
                    </option>
                  ))}
                </select>
              </h4>
              <h4>
                <b>Color :</b> {product?.Color}
              </h4>
              <h4>
                <b>Material :</b> {product?.Material}
              </h4>
              <h4>
                <b>Delivery Period :</b>{" "}
                {product ? product["DELIVERY PERIOD"] : "N/A"}
              </h4>
              <h4>
                <b>Dimensions :</b> {product ? product["Product Size"] : "N/A"}
              </h4>
            </p>
            {user ? (
              <button onClick={handleAddToCart}>
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

export default ShoeProd;
