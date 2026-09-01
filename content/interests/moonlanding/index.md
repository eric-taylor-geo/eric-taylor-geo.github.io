---
title: "Lego Moon Landing Recreation"
date: 2023-08-15
tags: ["Film"]
author: "Eric Taylor"
description: "I spent 3 days in my room in the dark to recreate the moon landing from First Man in Lego" 
summary: "I spent 3 days in my room in the dark to recreate the moon landing from First Man in Lego"
cover:
    image: "images/moon_landing_cover.jpg"
    alt: "Moon landing recreation"
    relative: true
# editPost:
#     URL: "https://github.com/pmichaillat/hugo-website"
#     Text: "Course portal"
showToc: true
disableAnchoredHeadings: false

---

When I was younger, I'd often create Lego stop motion animations of police chase scenes, Star Wars battles, and space missions. In addition to terrible plot direction, a major limitation of my animations was sound design. Therefore, recreating a film sequence with its scene direction and audio offered a way to fix both.

I recently acquired the Lego NASA Apollo 11 Lunar Lander which made a fine addition[^1] to my space collection and I wished to use this to recreate the moon landing sequence from *First Man*.

<figure style="position: relative; display: block; margin: 0 auto; text-align: center; border-radius: 12px; overflow: hidden;">
  <img src="images/shelf.png" alt="MoonLander" style="display: inline-block; width:75%; height: auto; border-radius: 12px;">
</figure>

## Practical Shots and Sets

 I needed shots that actually looked convincing in camera. So I tried to do as much as possible practically, using suspended Lego models, simple set builds, and a lot of improvised lighting and perspective tricks. It was a very low-budget setup.

<figure style="display: flex; justify-content: center; gap: 10px; margin: 0 auto; text-align: center;">
  <img src="images/BTS_1.jpeg" alt="MoonLander 1" style="width: 31.5%; height: auto; border-radius: 12px;">
  <img src="images/BTS_2.png" alt="MoonLander 2" style="width: 58.5%; height: auto; border-radius: 12px;">
</figure>

<p align="center"><i>Mini Lego builds dangling from dental floss and a DIY pulley system to re-create stage separation</i></p>

I next needed a moon...

Turns out faking a moon landing is incredibly difficult<sup>[Citation needed]</sup>. I first considered a miniature moon build which I could then stitch with the shots of the lander and command module. I faced two issues here. I didn't have enough parts to build a convincingly cratered surface. And secondly, I didn’t have a camera with a long enough focal length to make the Lego look convincingly large. 

Let's build a digital moon.

I tried two versions. A Lego moon and a 'real' moon.

A Lego moon has issues. 1) it looks a bit stupid. 2) Lego studs create shadows making the studs look like massive mountains. And in space, where there is no atmosphere to scatter light, shadows are effectively pitch black. This looks really weird.

I decided to use a 'real' moon and designed one in Blender - it wasn't great and present me wishes I did a better job of it. But it did the job. I could now animate the camera moving around the moon to mimic any needed shots.

<figure style="display: flex; justify-content: center; gap: 10px; margin: 0 auto; text-align: center;">
  <img src="images/studded_moon.png" alt="MoonLander 1" style="width: 45%; height: auto; border-radius: 12px;">
  <img src="images/real_moon.png" alt="MoonLander 2" style="width: 45%; height: auto; border-radius: 12px;">
</figure>

<p align="center"><i>Lego and 'real' moon</i></p>

Next, I needed a lunar lander interior set. The lander contains a huge number of controls, but building the instrument panels at true minifigure scale would have made them too small to show much detail. Instead, I used forced perspective, keeping the minifigures closer to the camera so that the larger control panels behind them appeared correctly scaled. I also left gaps behind each panel so that I could illuminate the controls from behind.

Whenever the Moon was visible through the windows, I used my digital Moon by rendering its rotation/angles as necessary. For less complex shots where the lander was simply moving over the Moon's surface, I would use real lunar footage from *Apollo 13*. I would then film these through the set's windows.

One scene required a little more thought. The camera watches the command module move away from the lander through the window before the lander rotates and the Moon comes into view. The view outside therefore had to transition from my physical LEGO command module to the lunar footage while continuously rotating across the window.

My first attempt was to film the rotation away from the physical command module, create a separate render rotating towards the Moon, and stitch the two shots together. The transition, however, was not smooth enough. Instead, I built a 3D model of the LEGO command module in Blender. This allowed me to create the entire sequence as a single continuous animation, which I could then play on my laptop and film through the set's windows.


<figure style="display: flex; justify-content: center; gap: 10px; margin: 0 auto; text-align: center;">
  <img src="images/cockpit.JPG" alt="MoonLander 1" style="width: 58.5%; height: auto; border-radius: 12px;">
  <img src="images/BTS_3.jpeg" alt="MoonLander 2" style="width: 31.5%; height: auto; border-radius: 12px;">
</figure>

And with that, we had the intro sequence:

<video 
  src="videos/beginning.mp4" 
  controls 
  playsinline 
  style="width: 100%; aspect-ratio: 18/9; object-fit: cover; display: block; margin: 1rem auto; border-radius: 12px; overflow: hidden;">
</video>

## Digital Displays


[^1]: A fine addition indeed. <img src="images/fine_addition.jpg" alt="Star Wars meme" style="width: 50%; border-radius: 8px;">