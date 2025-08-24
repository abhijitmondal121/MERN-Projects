import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../component/Carousel.css"; 

const Carousel = () => {
  const images = [
    "https://picsum.photos/id/1018/1920/600",
    "https://picsum.photos/id/1024/1920/600",
    "https://picsum.photos/id/1039/1920/600",
    "https://picsum.photos/id/1043/1920/600",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Slide every 3 sec
    arrows: true, // Next/Prev buttons
    pauseOnHover: true,
  };
  return (
    <div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
      <Slider {...settings} className="w-full">
        {images.map((src, i) => (
          <div key={i}>
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-screen h-[100px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
