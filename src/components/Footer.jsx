import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src="https://landing-page-images10.s3.ap-south-1.amazonaws.com/public/Home/appicon.png"
            alt="Mom Pharmacy"
          />
          <p>@2026 mompharmacy</p>
          <p>all rights reserved</p>
        </div>

        <div className="footer-contact">
          <h3>contact info</h3>
          <p>+91 7387719822</p>
          <p>hr@mompharmacy.com</p>
        </div>

        <div className="footer-location">
          <h3>our location</h3>
          <p>100 Feet Rd, opp. biryani times, vip hills</p>
          <p>silicon valley, madhapur, hyderabad, telangana 500081</p>
        </div>

        <div className="footer-newsletter">
          <h3>stay in the loop!</h3>
          <p>
            Subscribe to our newsletter and never miss updates, special
            promotions, or tips.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="enter your email" />
            <button>submit</button>
          </div>
          <div className="social-icons">follow us on • fb • in • ig</div>
        </div>
      </div>

      <div className="footer-bottom-links">
        <a href="/">terms & conditions</a>
        <a href="/">privacy policy</a>
        <a href="/">cookies settings</a>
      </div>
    </footer>
  );
}

export default Footer;
