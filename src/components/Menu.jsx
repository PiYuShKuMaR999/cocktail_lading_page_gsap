"use client";

import { allCocktails } from "../../constants/index.js";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCocktails = allCocktails.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };
  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

        <div className="content">
<div className="arrows absolute top-[12.5%] w-full flex justify-between items-center px-6 z-20">
                <button
                    className="text-left"
                    onClick={() => goToSlide(currentIndex - 1)}
                >
                    <span>{prevCocktail.name}</span>
                    <img
                    src="/images/right-arrow.png"
                    alt="right-arrow"
                    aria-hidden="true"
                    />
                </button>

                <button
                    className="text-left"
                    onClick={() => goToSlide(currentIndex + 1)}
                >
                    <span>{nextCocktail.name}</span>
                    <img
                    src="/images/left-arrow.png"
                    alt="left-arrow"
                    aria-hidden="true"
                    />
                </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" />
        </div>
        <div className="recipe absolute md:top-1 md:left-10 md:z-10">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details pr-10 max-w-[450px] mt-20">
            <h2>{currentCocktail.title}</h2>
            <p className="">{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Menu;
