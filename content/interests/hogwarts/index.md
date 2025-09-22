---
title: "Minecraft Hogwarts"
date: 2025-09-10
# aliases: 
#     - /courses/course2/slides4.pdf
#     - /courses/course2/slides1.pdf
#     - /courses/course2/slides3.pdf
#     - /courses/course2/slides2.pdf
#     - /courses/course2/notes3.pdf
#     - /courses/course2/notes4.pdf
#     - /courses/course2/ps3.pdf
#     - /courses/course2/ps4.pdf
#     - /courses/course1/quiz1.pdf
#     - /courses/course1/quiz2.pdf
#     - /courses/course2/quiz3.pdf
#     - /courses/course2/quiz4.pdf
#     - /courses/course1/ps1.pdf
tags: ["Minecraft"]
author: "Eric Taylor"
description: "I have been recreating Hogwarts in Minecraft since 2019." 
summary: "I have been recreating Hogwarts in Minecraft since 2019." 
cover:
    image: "hogwarts.jpg"
    alt: "Minecraft Hogwarts"
    relative: true
# editPost:
#     URL: "https://github.com/pmichaillat/hugo-website"
#     Text: "Course portal"
showToc: true
disableAnchoredHeadings: false

---

<video 
  src="images/cinematic-2.mov" 
  poster="images/hogwarts_air.jpg"
  controls 
  playsinline 
  style="width: 100%; aspect-ratio: 18/9; object-fit: cover; display: block; margin: 1rem auto; border-radius: 12px; overflow: hidden;">
</video>



## About the project

Since March 2019, I have been recreating Hogwarts Castle from *Harry Potter* in Minecraft. The project combines research into the castle’s architectural design with detailed reconstruction and interior accuracy.

Command blocks, data packs, and custom textures and models help bring the castle to life.

Alongside Hogwarts, I have built the Ministry of Magic, Azkaban, Malfoy Manor, and the Burrow.

I documented this journey on YouTube, where my channel has grown to over 38,000 subscribers and 7.5 million views. I have also produced a 34-episode tutorial series guiding viewers through the castle’s construction.


## The Castle

<div class="carousel" id="gallery">
  <div class="carousel-track">
    <figure class="carousel-slide">
      <img src="images/hogwarts_flower.jpg" alt="Minecraft Hogwarts Castle" loading="lazy">
    </figure>
    <figure class="carousel-slide">
      <img src="images/hogwarts_forest.jpg" alt="Forbidden Forest and Clock Tower" loading="lazy">
    </figure>
    <figure class="carousel-slide">
      <img src="images/hogwarts_quidditch.jpg" alt="Quidditch Pitch" loading="lazy">
    </figure>
    <figure class="carousel-slide">
      <img src="images/hogwarts_braided.jpeg" alt="Quidditch Pitch" loading="lazy">
    </figure>
  </div>
  <button class="prev" aria-label="Previous">&#10094;</button>
  <button class="next" aria-label="Next">&#10095;</button>
</div>

### Magic

The castle wouldn't be magical without movement.<br>
*The stairs also rotate...*

<video 
  src="images/chessbattlescene.mp4" 
  poster="images/hogwarts_chess1.jpg"
  controls 
  playsinline 
  style="width: 100%; aspect-ratio: 18/9; object-fit: cover; display: block; margin: 1rem auto; border-radius: 12px; overflow: hidden;">
</video>

<video 
  src="images/chamber_silent.mp4" 
  controls 
  playsinline 
  muted
  loop
  style="width: 100%; aspect-ratio: 18/9; object-fit: cover; display: block; margin: 1rem auto; border-radius: 12px; overflow: hidden;">
</video>

### Custom Textures and Models

50+ custom models and textures bring the magic of the castle to life and break the boundaries of classical Minecraft. All made by me!

<div class="carousel" id="gallery">
  <div class="carousel-track">
    <figure class="carousel-slide">
      <img src="images/hogwarts_gloucester.jpg" alt="Minecraft Hogwarts Castle" loading="lazy">
    </figure>
    <figure class="carousel-slide">
      <img src="images/hogwarts_GH1.jpg" alt="Forbidden Forest and Clock Tower" loading="lazy">
    </figure>
    <figure class="carousel-slide">
      <img src="images/hogwarts_chess1.jpg" alt="Quidditch Pitch" loading="lazy">
    </figure>
    <figure class="carousel-slide">
      <img src="images/hogwarts_brazier.jpg" alt="Quidditch Pitch" loading="lazy">
    </figure>
  </div>
  <button class="prev" aria-label="Previous">&#10094;</button>
  <button class="next" aria-label="Next">&#10095;</button>
</div>

## The Wizarding World

### Ministry of Magic

<figure style="position: relative; display: inline-block; margin: 0; border-radius: 12px; overflow: hidden;">
  <img src="images/mom.jpg" alt="Minecraft Ministry of Magic" style="display: block; width: 100%; height: auto; border-radius: 12px;">
</figure>

### Azkaban

<figure style="position: relative; display: inline-block; margin: 0; border-radius: 12px; overflow: hidden;">
  <img src="images/azkaban.jpeg" alt="Minecraft Azkaban" style="display: block; width: 100%; height: auto; border-radius: 12px;">
</figure>

### The Burrow

<figure style="position: relative; display: inline-block; margin: 0; border-radius: 12px; overflow: hidden;">
  <img src="images/burrow.jpeg" alt="Minecraft The Burrow" style="display: block; width: 100%; height: auto; border-radius: 12px;">
</figure>

### Malfoy Manor

<figure style="position: relative; display: inline-block; margin: 0; border-radius: 12px; overflow: hidden;">
  <img src="images/malfoy_manor.jpg" alt="Minecraft Malfoy Manor" style="display: block; width: 100%; height: auto; border-radius: 12px;">
</figure>


<!-- Styles and JS  -->

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
