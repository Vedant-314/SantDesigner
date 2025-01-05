import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../../utils/context";
import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
import { MdCurrencyExchange } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import chart from "../../assets/sizeChart.jpg";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import toast from "react-hot-toast";

import "./stitchprod.css";
import { Tooltip } from "antd";

function StitchProd() {
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const user = useSelector((state) => state.user.user);

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedEmb, setSelectedEmb] = useState(null);
  const [selectedPant, setSelectedPant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(36);
  const [selectedPantType, setSelectedPantType] = useState(false);
  const token = import.meta.env.VITE_TOKEN;

  // Mapping color names to hex codes
  const colorNameHexMap = {
    black: "#000000",
    blue: "#0d1543",
    green: "#023121",
    wine: "#320442",
    maroon: "#380005",
    "dark grey": "#2f3237",
    "light grey": "#D3D3D3",
    cream: "#fcecd3",
    beige: "#dec09a",
    brown: "#3f2413",
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/stitchedsku/${id}`);
        const data = response.data;
        setProduct(data);

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
      price: selectedPantType ? product.price - 1000 : product.price,
      quantity: 1,
      id: id,
      size: selectedSize,
      color: selectedColor,
      button: selectedButton,
      embroidery: selectedEmb,
      pant: selectedPant,
      pantType: selectedPantType,
    });
    toast.success(`${product["product title"]} has been added to your cart!`);
  };

  const sizeOptions = Array.from({ length: 8 }, (_, i) => 36 + i * 2);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="product-container">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
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
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
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
                <img
                  src={media}
                  alt={`Product Image ${index + 1}`}
                  onClick={() => handleImageClick(media)}
                />
              )}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>No Media Available</p>
          </SwiperSlide>
        )}
      </Swiper>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged product" />
          </div>
        </div>
      )}

      <div className="desc-container">
        <div className="desc-left">
          <div className="desc-content">
            <h2>Description</h2>
            <ul>
              <li>{product ? product["bullet point"] : "N/A"}</li>
              <li>{product ? product["bullet point "] : "N/A"}</li>
            </ul>
            <small>
              <MdCurrencyExchange /> Easy returns and exchange
            </small>
            <div className="return-policy">
              <p>
                This is an individually crafted piece; thus, the brand does not
                offer returns on it. 
                <ul>
                  <li>In the unlikely event that the merchandise
                you ordered is not received in good condition or is
                damaged/defective.</li>
                  <li>You may return the merchandise unused in its
                original packaging along with original tags.You can reach out
                to customer Care for such requests at @santbespoke23@gmail.com</li>
                  <li>
                  Made-to-Order pieces are artisanal and crafted using traditional
                techniques individually. Hence, it may take longer duration than
                regular products.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className="desc-right">
          <div className="desc-content">
            <h2>
              <span>
                {product ? product["product title"].toUpperCase() : "N/A"}
              </span>
            </h2>

            <p>
              <div className="center-items">
              <h3>
                <b>Price :</b> ₹{" "}
                {product ? (
                  <b>
                    {selectedPantType ? product.price - 1000 : product.price}
                  </b>
                ) : (
                  "N/A"
                )}
              </h3>
              <h4>
                <b>Size :</b>{" "}
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(Number(e.target.value))}
                >
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span
                  onClick={() => handleImageClick(chart)}
                  className="size-span"
                >
                  Size chart
                </span>
              </h4>
              <h4>
                <b>Color :</b> {product?.colour.toUpperCase()}
              </h4>
              </div>
              <h4>
                <b>Color Options:</b>
                <div className="color-options">
                  {product && product["colour options"]
                    ? product["colour options"]
                        .split(",")
                        .map((color, index) => (
                          <div
                            key={index}
                            className={`color-circle ${
                              selectedColor === color ? "selected" : ""
                            }`}
                            style={{
                              backgroundColor:
                                colorNameHexMap[color.trim()] || "#000",
                            }}
                            title={color}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))
                    : "N/A"}
                </div>
                {selectedColor && (
                  <small className="selected-color-text">
                    Selected Color: {selectedColor.toUpperCase()}
                  </small>
                )}
              </h4>
              <h4>
                <b>Delivery Period :</b>{" "}
                {product ? product["delivery time"] : "N/A"}
              </h4>
              <h4>
                <b>Includes :</b>{" "}
                {product ? product.includes.toUpperCase() : "N/A"}
              </h4>
              <b>Pant Type: </b>{" "}
                    <div className="color-options">
                      {product ? (
                        <div
                          className={`pant-text ${
                            selectedPantType === true ? "selected" : ""
                          }`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap: "5px",
                            position: "relative",
                          }}
                          onClick={() => setSelectedPantType(!selectedPantType)}
                        >
                          <span>Unstitched ( - Rs 1000)</span>
                          <Tooltip title="1.4 meters of unstitched pant fabric will be provided">
                            <AiOutlineInfoCircle
                              style={{ fontSize: "16px", color: "#007bff" }}
                            />
                          </Tooltip>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </div>
              {product &&
                (product.Category === "sherwani" ||
                  product.Category === "JodhSuits" ||
                  product.Category === "DesignSuits") && (
                  <h4>
                    <b>Pant Options :</b>{" "}
                    <div className="color-options">
                      {product && product["pant option"]
                        ? product["pant option"]
                            .split(/,| or /)
                            .map((color, index) => (
                              <div
                                key={index}
                                className={`color-text ${
                                  selectedPant === color ? "selected" : ""
                                }`}
                                title={color}
                                onClick={() => setSelectedPant(color)}
                              >
                                {color.trim().toUpperCase()}
                              </div>
                            ))
                        : "N/A"}
                    </div>
                  </h4>
                )}
              {product && product.Category === "BasicSuits" && (
                <h4>
                  <b>Button Options :</b>{" "}
                  <div className="color-options">
                    {product && product["buttons options"]
                      ? product["buttons options"]
                          .split(" or ")
                          .map((color, index) => (
                            <div
                              key={index}
                              className={`color-text ${
                                selectedButton === color ? "selected" : ""
                              }`}
                              title={color}
                              onClick={() => setSelectedButton(color)}
                            >
                              {color.trim().toUpperCase()}
                            </div>
                          ))
                      : "N/A"}
                  </div>
                </h4>
              )}
              {product && product.Category === "DesignSuits" && (
                <h4>
                  <b>Embroidery Color Options :</b>{" "}
                  <div className="color-options">
                    {product && product["embroidery colour options"]
                      ? product["embroidery colour options"]
                          .split(",")
                          .map((color, index) => (
                            <div
                              key={index}
                              className={`color-text ${
                                selectedEmb === color ? "selected" : ""
                              }`}
                              title={color}
                              onClick={() => setSelectedEmb(color)}
                            >
                              {color.trim().toUpperCase()}
                            </div>
                          ))
                      : "N/A"}
                  </div>
                </h4>
              )}
            </p>
            {user ? (
              <button onClick={handleAddToCart}>
                <BsCart /> Add to Cart
              </button>
            ) : (
              <div className="guest-buying">
                <button onClick={() => navigate("/login")}>
                  <CiLogin /> Login To Buy
                </button>
                <button onClick={handleAddToCart}>
                  Continue Buying as Guest
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StitchProd;
