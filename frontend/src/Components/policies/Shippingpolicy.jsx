import React from "react";
import "./Policy.css";

const ShippingPolicy = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">SHIPPING POLICY</h1>

      <div className="terms-content">
        <section>
          <p className="section-text important">
          The product will generally be  shipped between 12-16 working days.
          </p>
          <p className="section-text">
            We ship from our batala office and shipping is free within India.
            Once your item has been processed & dispatched it is usually
            delivered within the ‘Estimated arrival time’ mentioned on the
            product page. For international orders, we use FedEx and DHL for
            delivery. Shipping times are to be used as a guide only and are
            based on time from order. www.santdesigner.com cannot take
            responsibility for delays due to customs clearance or payment
            transaction. If your order has multiple products with different
            delivery dates, all products are shipped as one shipment, once all
            products in your order are ready. In the event of a problem in
            processing your order, you will receive an email detailing the issue
            and possibly requesting further information. You will receive
            regular updates on the delivery status of your order. Please note
            that santdesigner.com does not deliver to P.O. Box or Drop Box
            addresses. Customers are requested to provide full addresses with
            the postal code / zip code. We are also unable to redirect orders
            once your items have been dispatched. Therefore, please ensure you
            provide a suitable shipping address so that we can deliver as per
            the specified delivery times.
          </p>
        </section>

        <section>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-text">
            In case it’s an emergency please contact us at
            <span className="contact-info">santbespoke23@gmail.com</span>
            for assistance.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
