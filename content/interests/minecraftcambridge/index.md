---
title: "Minecraft Cambridge"
date: 2025-07-05
tags: ["Minecraft"]
author: "Eric Taylor"
description: "Alongside my studies, I have been slowly recreating Cambridge's colleges in Minecraft. So far, I have built Pembroke, King's, John's, Corpus, and Queens'." 
summary: "Alongside my studies, I have been slowly recreating Cambridge's colleges in Minecraft. So far, I have built Pembroke, King's, John's, Corpus, and Queens' colleges." 
cover:
    image: "images/gown.jpeg"
    alt: "Minecraft Graduation"
    relative: true
# editPost:
#     URL: "https://github.com/pmichaillat/hugo-website"
#     Text: "Course portal"
showToc: true
disableAnchoredHeadings: false

---


<figure style="position: relative; display: inline-block; margin: 0; border-radius: 12px; overflow: hidden;">
  <img src="images/gown.jpeg" alt="Minecraft King's College" style="display: block; width: 100%; height: auto; border-radius: 12px;">
</figure>

## About the project

I've always enjoyed recreating the world around me in Minecraft. Cambridge is simply begging to be Minecraft-ified. What started as a small project of recreating my college, Pembroke, over the winter vacation, quickly became a project of recreating as much of the city as possible. Check out my Instagram page ([@cambridgeinminecraft](https://www.instagram.com/cambridgeinminecraft/)).

## Colleges

> [Pembroke College](#pembroke) <br>
> [St John's College](#st-johns) <br>

### Pembroke

<div class="carousel" id="gallery">
  <div class="carousel-track">
    <figure class="carousel-slide">
      <img src="images/pembroke1.jpeg" alt="Old Court" loading="lazy">
      <figcaption class="carousel-caption">Old Court</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="images/pembroke2.jpeg" alt="Bowling Green and New Court" loading="lazy">
      <figcaption class="carousel-caption">Bowling Green and New Court</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="images/pembroke3.jpeg" alt="Library Lawn and Old Court" loading="lazy">
      <figcaption class="carousel-caption">Library Lawn and Old Court</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="images/pembroke4.jpeg" alt="Foundress Court" loading="lazy">
      <figcaption class="carousel-caption">Foundress Court</figcaption>
    </figure>
  </div>
  <button class="prev" aria-label="Previous">&#10094;</button>
  <button class="next" aria-label="Next">&#10095;</button>
</div>

### St John's

<div class="carousel" id="gallery">
  <div class="carousel-track">
    <figure class="carousel-slide">
      <img src="images/johns1.jpeg" alt="New Court" loading="lazy">
      <figcaption class="carousel-caption">New Court</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="images/johns2.jpeg" alt="Bridge of Sighs" loading="lazy">
      <figcaption class="carousel-caption">Bridge of Sighs</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="images/johns3.jpeg" alt="St John's Chapel" loading="lazy">
      <figcaption class="carousel-caption">St John's Chapel</figcaption>
    </figure>
  </div>

  <button class="prev" aria-label="Previous">&#10094;</button>
  <button class="next" aria-label="Next">&#10095;</button>
</div>


<style>
  .carousel {
    position: relative;
    max-width: 720px;
    margin: 1rem auto;
    border-radius: 12px;
    overflow: hidden;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.6s ease;
  }

  .carousel-slide {
    min-width: 100%;
    position: relative;
  }

  .carousel-slide img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    object-fit: cover;

  }

  .carousel-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 6px 10px;
    font-size: 0.95rem;
    color: white !important;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  .carousel button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.4);
    border: none;
    color: #fff;
    font-size: 1.8rem;
    padding: 0.3em 0.6em;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.3s;
    z-index: 5;
  }
  .carousel button:hover { background: rgba(0,0,0,0.65); }
  .carousel .prev { left: 10px; }
  .carousel .next { right: 10px; }
</style>

<script>
(function() {
  document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");

    let currentIndex = 1;

    // Clone first/last
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.id = "first-clone";
    lastClone.id = "last-clone";
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = Array.from(track.children);
    let slideWidth = allSlides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    function moveToIndex(index) {
      track.style.transition = "transform 0.6s ease";
      track.style.transform = `translateX(-${slideWidth * index}px)`;
      currentIndex = index;
    }

    function handleTransitionEnd() {
      const currentSlide = allSlides[currentIndex];
      if (currentSlide.id === "first-clone") {
        track.style.transition = "none";
        currentIndex = 1;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      }
      if (currentSlide.id === "last-clone") {
        track.style.transition = "none";
        currentIndex = allSlides.length - 2;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      }
    }

    nextButton.addEventListener("click", () => {
      if (currentIndex >= allSlides.length - 1) return;
      moveToIndex(currentIndex + 1);
    });

    prevButton.addEventListener("click", () => {
      if (currentIndex <= 0) return;
      moveToIndex(currentIndex - 1);
    });

    track.addEventListener("transitionend", handleTransitionEnd);

    window.addEventListener("resize", () => {
      slideWidth = allSlides[0].getBoundingClientRect().width;
      track.style.transition = "none";
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    });
  });
})();
</script>
