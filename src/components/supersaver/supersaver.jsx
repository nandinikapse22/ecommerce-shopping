import { useRef } from "react";
import "./SuperSaver.css";

import p1 from "../../assets/products/p1.jpg";
import p2 from "../../assets/products/p2.jpg";
import p3 from "../../assets/products/p3.jpg";
import p4 from "../../assets/products/p4.jpg";
import p5 from "../../assets/products/p5.jpg";
import p6 from "../../assets/products/p6.jpg";
import p7 from "../../assets/products/p7.jpg";
import p8 from "../../assets/products/p8.jpg";

const products = [
  { id: 1, image: p1, title: "Women Top", offer: "Up to 40% OFF" },
  { id: 2, image: p2, title: "Hand Bag", offer: "Up to 50% OFF" },
  { id: 3, image: p3, title: "Cosmetics", offer: "Flat 30% OFF" },
  { id: 4, image: p4, title: "Men Shirt", offer: "Up to 45% OFF" },
  { id: 5, image: p5, title: "Jeans", offer: "Up to 35% OFF" },
  { id: 6, image: p6, title: "Footwear", offer: "Up to 60% OFF" },
  { id: 7, image: p7, title: "Accessories", offer: "Min 25% OFF" },
  { id: 8, image: p8, title: "Watches", offer: "Up to 55% OFF" },
];

const SuperSaver = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="super-saver">
      <h2 className="section-title">Super Saver</h2>

      <div className="slider-container">
        {/* Left Arrow */}
        <button className="nav-arrow left" onClick={scrollLeft}>
          &#8249;
        </button>

        {/* Cards */}
        <div className="slider-wrapper" ref={sliderRef}>
          {products.map((item) => (
            <div className="card" key={item.id}>
              <div className="image-box">
                <img src={item.image} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.offer}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="nav-arrow right" onClick={scrollRight}>
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default SuperSaver;