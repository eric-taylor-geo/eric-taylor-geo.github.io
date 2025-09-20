---
title: "2D Debris Development Model"
date: 2024-12-09
tags: ["Research"]
author: "Eric Taylor"
description: "A simple 2D MATLAB model for debris development." 
summary: "A simple 2D MATLAB model for debris development." 
cover:
    image: "cover_image.jpg"
    alt: "Everest Region"
    relative: true
showToc: true
disableAnchoredHeadings: false

---

<!-- <figure style="position: relative; display: inline-block; margin: 0; border-radius: 12px; overflow: hidden;">
  <img src="Labels.png" alt="Classified debris" style="display: block; width: 100%; height: auto; border-radius: 12px;">
  <figcaption style="
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: normal;
    text-align: center;
    width: 100%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  ">
    Classified debris-covered glaciers in the Everest Region
  </figcaption>
</figure> -->

## Debris development

The development of debris cover has two primary controls (Anderson and Anderson, 2018):

1. Velocity driven <br>
2. Meltout driven

### Velocity driven

Consider a portion of a glacier moving at speed $U$ m s<sup>2</sup>. In time $dt$, the glacier moves $Udt$. Thus, the flux of debris through a given point in time $dt$ is $w * H * Udt$, where $w$ and $H$ are the arbitary valley width and debris thickness, respectively.

Therefore, the debris entering a given region on the glacier is controlled by the up-glacier region's velocity. Similarly, the debris leaving this region is controlled by the pixel's own velocity (assuming that nothing is stopping the debris from flowing out).

Thus, the change in debris volume at position x per unit time is:

$\frac{dV}{dt} = \text{Flux in} - \text{Flux out}$,

or:

$\frac{dV}{dt} = w_{x+1}H_{x+1}U_{x+1} - w_{x}H_{x}U_{x}$.

### Meltout driven

Debris also emerges from the meltout of englacial septa, which adds additional debris from velocity driven debris development. Therefore, we must define the volume of ice melted, which itself is a function of the overlying debris thickness, and the ratio of debris meltout to ice melt.

Compared to a climatologically equivilant surface, debris-covered ice melts via an Østrem relationship (Østrem, 1959), whereby melt is initially enhanced due to debris' lower albedo, followed by a logarithmic decrease with debris thickness as debris insulates the ice surface.

