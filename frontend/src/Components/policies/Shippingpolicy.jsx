import React from "react";
import "./Policy.css";

const ShippingPolicy = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">SHIPPING POLICY</h1>

      <div className="terms-content">
        <section>
          <p className="section-text important">
            It's important to start by clarifying to customers that your order
            processing times are separate from the shipping times they see at
            checkout.
          </p>
          <p className="section-text">
            All orders are processed within X to X business days (excluding
            weekends and holidays) after receiving your order confirmation
            email. You will receive another notification when your order has
            shipped.
          </p>
          <p className="section-text">
            Include any other pertinent information towards the beginning, such
            as potential delays due to a high volume of orders or postal service
            problems that are outside of your control.
          </p>
        </section>

        <section>
          <h2 className="section-title">
            Domestic Shipping Rates and Estimates
          </h2>
          <p className="section-text important">
            For calculated shipping rates: Shipping charges for your order will
            be calculated and displayed at checkout.
          </p>
          <p className="section-text important">
            For simple flat rate shipping: We offer $X flat rate shipping to
            [list countries].
          </p>
          <p className="section-text ">
            You can also emphasize any free shipping thresholds you offer (e.g.
            free shipping for orders over $75). For multiple shipping options,
            you can list carrier options, prices, and delivery times in a table.
          </p>

          <div className="table-container">
            <table className="shipping-table">
              <thead>
                <tr>
                  <th>Shipping Option</th>
                  <th>Estimated Delivery</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard Shipping</td>
                  <td>5-7 business days</td>
                  <td>$4.99</td>
                </tr>
                <tr>
                  <td>Express Shipping</td>
                  <td>2-3 business days</td>
                  <td>$9.99</td>
                </tr>
                <tr>
                  <td>Next Day Delivery</td>
                  <td>1 business day</td>
                  <td>$19.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="section-title">Local Delivery</h2>
          <p className="section-text">
            Free local delivery is available for orders over $50 within Jaipur
            city limits. For orders under $50, we charge a flat rate of $5 for
            local delivery.
          </p>
          <p className="section-text">
            Deliveries are made from 10:00 AM to 6:00 PM, Monday through
            Saturday. We will contact you via text message with delivery
            updates.
          </p>
          <div className="delivery-areas">
            <h3 className="subsection-title">Delivery Areas Covered</h3>
            <ul className="list-items">
              <li>Malviya Nagar (302017)</li>
              <li>Vaishali Nagar (302021)</li>
              <li>C-Scheme (302001)</li>
              <li>Mansarovar (302020)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="section-title">In-store Pickup</h2>
          <p className="section-text">
            Skip shipping fees with free local pickup at our Manglam store
            location.
          </p>
          <p className="section-text important">
            Pickup hours: Monday to Saturday, 10:00 AM to 7:00 PM
          </p>
          <p className="section-text">
            Your order will be ready for pickup within 24 hours. Please bring
            your order confirmation email and a valid ID.
          </p>
        </section>

        <section>
          <h2 className="section-title">International Shipping</h2>
          <p className="section-text">
            We ship to most countries worldwide. International shipping rates
            are calculated based on destination and package weight.
          </p>

          <div className="table-container">
            <table className="shipping-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Estimated Delivery</th>
                  <th>Starting Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Asia Pacific</td>
                  <td>7-14 business days</td>
                  <td>$15.99</td>
                </tr>
                <tr>
                  <td>Europe</td>
                  <td>10-20 business days</td>
                  <td>$24.99</td>
                </tr>
                <tr>
                  <td>North America</td>
                  <td>12-21 business days</td>
                  <td>$29.99</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="section-text important">
            Note: International orders may be subject to customs duties and
            taxes, which are the responsibility of the recipient.
          </p>
        </section>

        <section>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-text">
            For any shipping-related queries, please contact us at{" "}
            <span className="contact-info">santdesigner.batala@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
