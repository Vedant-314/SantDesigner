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
          <h2 className="section-title">Refund Process (If Applicable)</h2>
          <p className="section-text">
            We are unable to accept returns on any products. Only in exceptional
            cases where the garment gets damaged in transit or a wrong order is
            delivered, a 'return' request along with photograph of damaged
            product(s) at santbespoke23@gmail.com can be sent. The request will
            be reviewed at our end and communicated to you via email. Upon
            authorization of returns, we will gladly offer you an exchange or
            refund. Items that may have been damaged, defective or sent by error
            will be fully refunded. Once your return is received and inspected,
            we will send you an email to notify you that we have received your
            returned item. We will also notify you of the approval or rejection
            of your refund. <br />
            <br /> If you are approved, then your refund will be processed, and
            a credit will automatically be applied to your credit card or
            original method of payment, within a certain amount of days.
          </p>

          <h3 className="subsection-title">
            Late or Missing Refunds (If Applicable)
          </h3>
          <ol className="numbered-list">
            <li>
              If you haven't received a refund yet, first check your bank
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
              If you've done all of this and you still have not received your
              refund yet, please contact us at{" "}
              <span className="contact-info">santbespoke23@gmail.com</span>.
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
          <h2 className="section-title">Shipping Returns</h2>
          <p className="section-text">
            To return your product, you should mail your product to: Chakri
            Bazaar, Inside Nehru Gate Batala Punjab 143505 , India.{" "}
            <p className="section-text important">
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are non-refundable. If you
              receive a refund, the cost of return shipping will be deducted
              from your refund.
            </p>{" "}
            Depending on where you live, the time it may take for your exchanged
            product to reach you, may vary.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
