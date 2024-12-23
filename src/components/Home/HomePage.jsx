import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of the latest iPhone 16 with our most Pro camera ever."
        link="/product/6754c8ef64b9833c130ebf87"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the Pro setup"
        subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini."
        link="/product/6754c8ef64b9833c130ebf8f"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
