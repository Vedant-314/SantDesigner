import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import "./customconcept.css";
import axios from "axios";

function CustomConcept() {
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      setIsLoading(true); // Start loading

      const formDataImage = new FormData();
      formDataImage.append("file", image);
      formDataImage.append("upload_preset", "santDesignerPreset");

      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/dxbblgwsj/image/upload";

      try {
        const response = await axios.post(cloudinaryUrl, formDataImage);

        const imageUrl = response.data.secure_url;

        const templateParams = {
          name: formData.name,
          email: formData.email,
          description: formData.description,
          imageUrl: imageUrl,
        };

        await emailjs.send(
          "service_9jobl1m",
          "template_k4lzyi8",
          templateParams,
          "1lCzdB5OZ-uf0KoCQ"
        );

        setIsSubmitted(true); // Set submitted state to true
      } catch (error) {
        console.error("Error uploading image or sending email:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      alert("Please attach an image before submitting.");
    }
  };

  return (
    <div className="background-container">
      <div className="form-overlay">
        <h3>
          If you have any concept reference in your mind. Send your concept
          image and description by providing the required information in the
          given form below and get the price quote E - Mail from us within 24
          hours.
        </h3>
        <hr />
        {isSubmitted ? (
          <p>Thank you! Your form has been submitted.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Product Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Attach Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}

        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Uploading and Sending...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomConcept;
