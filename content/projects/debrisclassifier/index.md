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

At the sub-pixel level, surface type within middle-resolution imagery is heterogenous. This has implications for glacier melt models, where the estimated melt is dependent on the surface type. For example, debris cover on debris-covered glaciers typically reduces melt compared to a climatologically equibilant clean-ice surface (Evatt et al., 2015). If both surfaces are present at the sub-pixel level, but a classification model only defines one surface type for the entire pixel, then subsequent melt estimates will be inaccurate.

My dissertation concluded that:

> "Methods for estimating the fractional debris cover within low-resolution satellite-obtained pixels need to be developed so that the sparsely covered transition zone can be better represented in models of debris cover and its evolution, thereby permitting better projections of debris evolution and its resultant impacts on glacier dynamics in a changing climate." (p. 44)


A starting point is to develop a classifier which is able to classify satellite imagery into clean-ice, partially debris-covered, and debris-covered pixels. The next step would be to develop algorithms which estimate the degree of debris-cover at the sub-pixel level before employing a mixed melt model. Here, we tackle the starting point.

## Training Data

To classify Landsat imagery, I employ a supervised learning approach - a random forest classifier.

## Producing a cloud-free image

## Classification



## References

Evatt, G.W. et al. (2015) ‘Glacial melt under a porous debris layer’, Journal of Glaciology, 61(229), pp. 825–836. Available at: https://doi.org/10.3189/2015JoG14J235.