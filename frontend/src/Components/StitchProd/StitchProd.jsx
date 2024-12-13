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
import toast from "react-hot-toast";

import "./stitchprod.css";

function StitchProd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const user = useSelector((state) => state.user.user);

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null); // State to manage selected color
  const token = import.meta.env.VITE_TOKEN;

  // Mapping color names to hex codes
  const colorNameHexMap = {
    black: "#000000",
    blue: "#0000FF",
    green: "#008000",
    wine: "#722F37",
    maroon: "#800000",
    "dark grey": "#A9A9A9",
    "light grey": "#D3D3D3",
    cream: "#FFFDD0",
    beige: "#F5F5DC",
    brown: "#A52A2A",
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/stitchedsku/${id}`);
        const data = response.data;
        setProduct(data);

        // Fetch product images after determining the category
        if (data && data.Category) {
          fetchProductImages(data.Category);
        }
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductImages = async (category) => {
      try {
        const categoryFolderMap = {
          BasicSuits: "BS",
          DesignSuits: "DS",
          sherwani: "IW",
          JodhSuits: "JS",
        };

        const folderName = categoryFolderMap[category];
        const response = await axios.get(
          `https://api.github.com/repos/Gurshaan-1/photos/contents/${folderName}/${id}`,
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
        } else {
          setProductImages(null);
        }
      } catch (error) {
        setProductImages(null);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    addItem({
      name: product["product title"],
      category: product.Category,
      price: product.price,
      quantity: 1,
      id: id,
      size: true,
      color: selectedColor, // Add selected color to cart
    });
    toast.success(`${product["product title"]} has been added to your cart!`);
  };

  const sizeOptions = Array.from({ length: 5 }, (_, i) => 32 + i * 2);

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
            <p>
              {product ? product["bullet point"] : "N/A"}
              {product ? product["bullet point "] : "N/A"}
            </p>
            <small>
              <MdCurrencyExchange /> Easy returns and exchange
            </small>
          </div>
        </div>
        <div className="desc-right">
          <div className="desc-content">
            <h2>
              <i>{product ? product["product title"] : "N/A"}</i>
            </h2>
            <p>
              <h4>
                <b>Price :</b> ₹ {product ? product.price : "N/A"}
              </h4>
              <h4>
                <b>Size :</b>{" "}
                <select>
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </h4>
              <h4>
                <b>Color :</b> {product?.colour}
              </h4>
              <h4>
                <b>Color Options:</b>
                <div className="color-options">
                  {product && product["colour options"]
                    ? product["colour options"]
                        .split(", ")
                        .map((color, index) => (
                          <div
                            key={index}
                            className={`color-circle ${
                              selectedColor === color ? "selected" : ""
                            }`}
                            style={{
                              backgroundColor: colorNameHexMap[color] || "#000",
                            }}
                            title={color}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))
                    : "N/A"}
                </div>
                {selectedColor && (
                  <small className="selected-color-text">
                    Selected Color: {selectedColor}
                  </small>
                )}
              </h4>
              <h4>
                <b>Delivery Period :</b>{" "}
                {product ? product["delivery time"] : "N/A"}
              </h4>
              <h4>
                <b>Includes :</b> {product ? product.includes : "N/A"}
              </h4>
              {product &&
                (product.Category === "sherwani" ||
                  product.Category === "JodhSuits" ||
                  product.Category === "DesignSuits") && (
                  <h4>
                    <b>Pant Options :</b> {product["pant option"] || "N/A"}
                  </h4>
                )}
              {product && product.Category === "BasicSuits" && (
                <h4>
                  <b>Button Options :</b> {product["buttons options"] || "N/A"}
                </h4>
              )}
              {product && product.Category === "DesignSuits" && (
                <h4>
                  <b>Embroidery Color Options :</b>{" "}
                  {product["embroidery colour options"] || "N/A"}
                </h4>
              )}
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

export default StitchProd;
