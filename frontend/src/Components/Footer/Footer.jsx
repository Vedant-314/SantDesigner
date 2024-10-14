import React from "react";
import { FaInstagram } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa6";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contactUs">
      <div className="footer-upper">
        <div className="footer-left">
          <h2 className="company-name">Sant Designers</h2>
          <p className="website-info">
            <h3>The Premier Destination for Custom Tailoring</h3> Since 1950, we
            have proudly served the tailoring industry, earning the trust of our
            valued customers through exceptional craftsmanship and unparalleled
            customer service. For over 70 years, our dedication to excellence
            has kept us at the forefront of the tailoring world. Now in our
            third generation, our family continues to uphold the tradition of
            delivering bespoke tailoring that meets the highest standards of
            quality and style.
          </p>
        </div>

        <div className="footer-right">
          <div className="Footer-info">
            <div className="contact-heading">
              {" "}
              <h3>Contact Us </h3>
              <IoMdContact size={27} />
            </div>
            <p>Chakri Bazaar, Inside Nehru Gate Batala</p>
            <p>Punjab 143505 , India</p>
            <p>Email: santdesigner.batala@gmail.com</p>
            <p>Phone: (+91)-9876543250 , (+91)-6284768586</p>
            <br />
            <div className="business-heading">
              <h3>Business Hours</h3>
              <FaBusinessTime size={25} />
            </div>
            <p>Mon - Fri : 11:00 AM - 8:00 PM</p>
            <p>Sat : 11:00 AM - 7:30 PM</p>
            <p>Sun : Closed</p>
          </div>

          <div className="map-container">
            <h3>
              Locate Us <FaLocationDot />
            </h3>
            <br />
            <iframe
              class="gmap_iframe"
              width="100%"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=466&height=224&hl=en&q=Sant Designer&t=&z=13&ie=UTF8&iwloc=B&output=embed"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-media">
          <a
            href="https://instagram.com/sant_designer?igshid=NTc4MTIwNjQ2YQ=="
            target="_blank"
            rel="noopener noreferrer"
            style={{
              cursor: "pointer",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <FaInstagram size={20} />
          </a>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Sant Designer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
