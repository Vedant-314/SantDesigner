import React from "react";
import "./Policy.css";

const RefundPolicy = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">REFUND POLICY</h1>

      <div className="terms-content">
        <section>
          <h2 className="section-title">Returns</h2>
          <p className="section-text important">
            Our policy lasts 30 days. If 30 days have gone by since your
            purchase, unfortunately we can't offer you a refund or exchange.
          </p>
          <p className="section-text">
            To be eligible for a return, your item must be unused and in the
            same condition that you received it. It must also be in the original
            packaging.
          </p>
        </section>

        <section>
          <h2 className="section-title">Non-Returnable Items</h2>
          <p className="section-text">
            Several types of goods are exempt from being returned:
          </p>
          <ul className="list-items">
            <li>Perishable goods (food, flowers, newspapers or magazines)</li>
            <li>Intimate or sanitary goods</li>
            <li>Hazardous materials</li>
            <li>Flammable liquids or gases</li>
          </ul>

          <p className="section-text">Additional non-returnable items:</p>
          <ul className="list-items">
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Some health and personal care items</li>
          </ul>
        </section>

        <section>
          <p className="section-text">
            To complete your return, we require a receipt or proof of purchase.
            Please do not send your purchase back to the manufacturer. There are
            certain situations where only partial refunds are granted: (if
            applicable) Book with obvious signs of use CD, DVD, VHS tape,
            software, video game, cassette tape, or vinyl record that has been
            opened. Any item not in its original condition, is damaged or
            missing parts for reasons not due to our error. Any item that is
            returned more than 30 days after delivery
          </p>
        </section>

        <section>
          <h2 className="section-title">Refund Process (If Applicable)</h2>
          <p className="section-text">
            Once your return is received and inspected, we will send you an
            email to notify you that we have received your returned item. We
            will also notify you of the approval or rejection of your refund.{" "}
            <br />
            <br /> If you are approved, then your refund will be processed, and
            a credit will automatically be applied to your credit card or
            original method of payment, within a certain amount of days.
          </p>

          <h3 className="subsection-title">
            Late or Missing Refunds (If Applicable)
          </h3>
          <ol className="numbered-list">
            <li>
              If you haven’t received a refund yet, first check your bank
              account again. Then contact your credit card company, it may take
              some time before your refund is officially posted.{" "}
            </li>
            <li>
              Then contact your credit card company, it may take some time
              before your refund is officially posted.
            </li>
            <li>
              Next contact your bank. There is often some processing time before
              a refund is posted.
            </li>
            <li>
              If you’ve done all of this and you still have not received your
              refund yet, please contact us at{" "}
              <span className="contact-info">
                santdesigner.batala@gmail.com
              </span>
              .
            </li>
          </ol>
        </section>

        <section>
          <h2 className="section-title">Sale Items (If Applicable)</h2>
          <p className="section-text">
            Only regular priced items may be refunded, unfortunately sale items
            cannot be refunded.
          </p>
        </section>
        <section>
          <h2 className="section-title">Exchange Items (If Applicable)</h2>
          <p className="section-text">
            We only replace items if they are defective or damaged. If you need
            to exchange it for the same item, send us an email at{" "}
            <span className="contact-info">santdesigner.batala@gmail.com </span>
            and send your item to: 622 Manglam Electronic Market Jaipur
            Rajasthan India 302001.
          </p>
        </section>
        <section>
          <h2 className="section-title">Gifts</h2>
          <p className="section-text">
            If the item was marked as a gift when purchased and shipped directly
            to you, you’ll receive a gift credit for the value of your return.
            Once the returned item is received, a gift certificate will be
            mailed to you. If the item wasn’t marked as a gift when purchased,
            or the gift giver had the order shipped to themselves to give to you
            later, we will send a refund to the gift giver and he will find out
            about your return.
          </p>
        </section>

        <section>
          <h2 className="section-title">Shipping Returns</h2>
          <p className="section-text">
            To return your product, you should mail your product to: 622 Manglam
            Electronic Market Jaipur Rajasthan India 302001.{" "}
            <p className="section-text important">
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are non-refundable. If you
              receive a refund, the cost of return shipping will be deducted
              from your refund.
            </p>{" "}
            Depending on where you live, the time it may take for your exchanged
            product to reach you, may vary. If you are shipping an item over
            $75, you should consider using a trackable shipping service or
            purchasing shipping insurance. We don’t guarantee that we will
            receive your returned item.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
