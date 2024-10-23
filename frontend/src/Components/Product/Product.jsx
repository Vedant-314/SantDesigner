import React, { useEffect, useState } from "react";
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
  const user = useSelector((state) => state.user.user);

  const [product, setProduct] = useState(null); // Product state
  const [productImages, setProductImages] = useState(null); // Product state
  const [loading, setLoading] = useState(true); // Loading state
  const [isPlaying, setIsPlaying] = useState(false); // State to track if video is playing

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/products/sku/${id}`
        );
        const data = await response.json();

        if (data) {
          setProduct(data);
          console.log(product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {

    const fetchProductImages = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/Gurshaan-1/photos/contents/assets/${id}`,
        
        );
        const data = await response.json();

        // Check if data is an array and map it to get image/video URLs
        if (Array.isArray(data)) {
          const media = data.map((item) => item.download_url); // Extracting URLs
          setProductImages(media);
          console.log("Fetched media:", media); // Log fetched media URLs
        } else {
          console.error("Expected an array but received:", data);
          setProductImages(null);
        }
      } catch (error) {
        console.error("Error fetching product media:", error);
        setProductImages(null); // Set to null on error
      } finally {
        setLoading(false);
      }
    };

    fetchProductImages(); // Fetch images for the product
  }, [id]);

  // Check if loading or product is null
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>; // Handle case where product data is not found
  }

  const handleVideoClick = () => {
    setIsPlaying(true); // Set playing state to true when video is clicked
  };

  const handleVideoEnd = () => {
    setIsPlaying(false); // Reset playing state when video ends
  };

  return (
    <div className="product-container">
      <Swiper
        spaceBetween={30}
        slidesPerView={3} // Change to 1 for better visibility of images/videos
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
        {/* Ensure productImages exists and is not empty */}
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
            <p>{product.Description}</p>
            <small>
              <MdCurrencyExchange /> Easy returns and exchange
            </small>
          </div>
        </div>
        <div className="desc-right">
          <div className="desc-content">
            <h2>
              <i>{product.Title}</i>
            </h2>
            <p>
              <h4>
                {" "}
                <b>Price :</b> ₹ {product["Selling Price"]}
              </h4>
              <h4>
                <b>Size :</b> {product.Size}
              </h4>
              <h4>
                <b>Color :</b> {product.Color}
              </h4>
              <h4>
                <b>Fabric :</b> {product.Material}
              </h4>
              <h4>
                <b>Gender :</b> {product.Gender}
              </h4>
              <h4>
                <b>Dimensions :</b> {product["Product Size"]}
              </h4>
            </p>
            {user ? (
              <button
                onClick={() =>
                  addItem({
                    name: product.Title,
                    price: product["Selling Price"], // Ensure you're using the right property
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
