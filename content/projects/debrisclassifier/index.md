---
title: "Himalayan Debris Classifier"
date: 2025-05-15
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
tags: ["Research"]
author: "Eric Taylor"
description: "A random forest classifier for classifying clean ice, dirty ice, debris-covered ice, and water from Landsat imagery." 
summary: "Building on my dissertation's conclusions, I develop a random forest classifier using Google Earth Engine for classifying clean ice, dirty ice, debris-covered ice, and water from Landsat imagery." 
cover:
    image: "Labels.png"
    alt: "Everest Region"
    relative: true
# editPost:
#     URL: "Eric_Taylor_Dissertation.pdf"
#     Text: "Full PDF"
showToc: true
disableAnchoredHeadings: false

---

<figure style="position: relative; display: inline-block; margin: 0; border-radius: 12px; overflow: hidden;">
  <img src="Labels.png" alt="Classified debris" style="display: block; width: 100%; height: auto; border-radius: 12px;">
  <figcaption style="
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 4px 8px;
    font-size: 10;
    font-weight: normal;
    text-align: center;
    width: 100%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  ">
    Classified debris-covered glaciers in the Everest Region
  </figcaption>
</figure>

## Introduction



Presently, global and regional distributed debris thickness maps (e.g., Rounce et al., 2021; McCarthy et al., 2022) use a binary method of debris classification, whereby a pixel is either debris-covered (and has a measurable thickness) or it is clean-ice. Such maps have a middle resolution, typically 30 m x 30 m, derived using satellite imagery.

At the sub-pixel level, surface type within middle-resolution imagery is heterogenous. This has implications for glacier melt models, where the estimated melt is dependent on the surface type. Thick debris cover on debris-covered glaciers reduces melt compared to a climatologically equivilant clean-ice surface (Evatt et al., 2015). Below a critical thickness (typically 2-3 cm), debris cover enhanced melt due to its lower albedo to clean ice. If both clean ice and debris-covered ice are present at the sub-pixel level, but a classification model only defines one surface type for the entire pixel, then subsequent melt estimates will be inaccurate.

Rounce et al. (2018) identify this as the 'mixed pixel' effect in the lower ablation area on glacier tongues. Debris cover appears thick in their models, which would result in a significant reduction in estimated sub-debris ablation. However, measured ablation is significantly higher due to unresolved sub-pixel scale supraglacial ponds and ice cliffs. Exposed ice at such low elevations as the glacier tongue results in highly concentrated areas of melt, which can even offset the reduced ablation beneath thick debris, regarded as the 'debris-cover anomaly' (Salerno et al., 2017).


My dissertation concluded that:

> "Methods for estimating the fractional debris cover within low-resolution satellite-obtained pixels need to be developed so that the sparsely covered transition zone can be better represented in models of debris cover and its evolution, thereby permitting better projections of debris evolution and its resultant impacts on glacier dynamics in a changing climate." (p. 44)

<figure style="position: relative; display: inline-block; margin: 0; border-radius: 12px; overflow: hidden;">
  <img src="TZ_DDTM_Visual.png" alt="Rongbuk Glacier" style="display: block; width: 100%; height: auto; border-radius: 12px;">
  <figcaption style="
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 4px 8px;
    font-size: 10;
    font-weight: normal;
    text-align: center;
    width: 100%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  ">
    Debris thickness on Rongbuk Glacier, Tibet
  </figcaption>
</figure>


A starting point is to develop a classifier which is able to classify satellite imagery into clean-ice, partially debris-covered, and debris-covered pixels. The next step would be to develop algorithms which estimate the degree of debris-cover at the sub-pixel level before employing a mixed melt model. Here, we tackle the starting point.

## Training Data

To classify Landsat imagery, I employ a supervised learning approach - a random forest classifier.

## Producing a cloud-free image

Mountains are cloudy<sup>[CITATION NEEDED]</sup>

## Classification



## References

Evatt, G.W. et al. (2015) ‘Glacial melt under a porous debris layer’, Journal of Glaciology, 61(229), pp. 825–836. Available at: https://doi.org/10.3189/2015JoG14J235.

McCarthy, M. et al. (2022) ‘Supraglacial debris thickness and supply rate in High-Mountain Asia’, Communications Earth & Environment, 3(1), pp. 1–11. Available at: https://doi.org/10.1038/s43247-022-00588-2.

Rounce, D.R. et al. (2018) ‘Quantifying Debris Thickness of Debris-Covered Glaciers in the Everest Region of Nepal Through Inversion of a Subdebris Melt Model’, Journal of Geophysical Research: Earth Surface, 123(5), pp. 1094–1115. Available at: https://doi.org/10.1029/2017JF004395.

Rounce, D.R. et al. (2021) ‘Distributed Global Debris Thickness Estimates Reveal Debris Significantly Impacts Glacier Mass Balance’, Geophysical Research Letters, 48(8), p. e2020GL091311. Available at: https://doi.org/10.1029/2020GL091311.

Salerno, F. et al. (2017) ‘Debris-covered glacier anomaly? Morphological factors controlling changes in the mass balance, surface area, terminus position, and snow line altitude of Himalayan glaciers’, Earth and Planetary Science Letters, 471, pp. 19–31. Available at: https://doi.org/10.1016/j.epsl.2017.04.039.