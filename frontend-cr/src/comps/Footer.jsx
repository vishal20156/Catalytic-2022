const Footer = () => {
  const footerstyles = {marginTop:"180px"}
  return (
    <>
      <footer style={footerstyles}>
        <div className="wrap-container me-4">
          <div className="wrapper-row">
            <div className="footer-col-2">

              <span className="brand-title text-uppercase">
                Catalytic Rasoi
              </span>

            </div>
            <div className="footer-col-1">
              <h3>Download Our App</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi non dicta consequuntur a alias, cumque velit. Ullam
                commodi soluta aliquam dolor sequi quis!
              </p>
            </div>

            <div className="footer-col-3">
              <h3>Useful Links</h3>
              <ul>
                <li>Link1</li>
                <li>Link2</li>
                <li>Link3</li>
                <li>Link4</li>
              </ul>
            </div>
            <div className="footer-col-4">
              <h3>Follow us</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Youtube</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
