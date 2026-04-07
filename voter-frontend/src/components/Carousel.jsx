import { useState, useEffect } from "react";
import "../styles/carousel.css";

import img1 from "../assets/images/banner1.jpg";
import img2 from "../assets/images/banner2.avif";
import img3 from "../assets/images/banner3.webp";

function Carousel() {
  const images = [img1, img2, img3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <img src={images[index]} alt="banner" />
    </div>
  );
}

export default Carousel;