import { useEffect } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Importez votre CSS personnalisé si nécessaire

const Carousel = () => {
  useEffect(() => {
    // Initialisation de slick carousel une fois que le composant est monté
    $(".js-slick-carousel").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }, []);

  return (
    <div className="container">
      <div className="js-slick-carousel u-slick u-slick-zoom u-slick--gutters-3">
        <div className="js-slide card border-0 shadow-sm mb-3">
          <div className="position-relative">
            <img
              className="card-img-top"
              src="../../assets/img/500x550/img14.jpg"
              alt="Image Description"
            />
            <header className="position-absolute top-0 right-0 left-0 p-5">
              <a className="media align-items-center text-white" href="#">
                <div className="u-avatar mr-2">
                  <img
                    className="img-fluid rounded-circle"
                    src="../../assets/img/100x100/img1.jpg"
                    alt="Image Description"
                  />
                </div>
                <div className="media-body">
                  <span>Maria Muszynska</span>
                </div>
              </a>
            </header>
            <div className="position-absolute right-0 bottom-0 left-0 p-5">
              <span className="h4 text-white">$455,000</span>
            </div>
          </div>

          <div className="card-body p-5">
            <h4 className="h6">
              <a href="#">Abbots Way, North Shields</a>
            </h4>
            <span className="fas fa-map-marker-alt text-danger mr-2"></span>
            <a className="text-secondary" href="#">
              London, England
            </a>
          </div>
        </div>

        {/* Ajoutez ici plus de slides comme dans l'exemple HTML */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Carousel;
