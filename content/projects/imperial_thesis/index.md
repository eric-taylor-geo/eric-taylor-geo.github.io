---
title: "Domain-informed deep learning for downscaling tropical cyclone waves to hazard-relevant spatial scales"
date: 2026-08-26

tags: ["Research"]
author: "Eric Taylor"
description: "My master's thesis" 
summary: "My master's thesis" 
cover:
    image: "irp_cover.png"
    alt: "Super-resolution"
    relative: true
editPost:
    URL: "imperial_thesis.pdf"
    Text: "Full PDF"
# showToc: true
disableAnchoredHeadings: false

---

## Abstract

This study investigates deep learning methods for downscaling tropical cyclone significant wave height (Hm0) from 8-to-1 km along the US East Coast. Deterministic UNet and stochastic Wasserstein generative adversarial network (WGAN) architectures are evaluated under direct and residual formulations, conditioned on fine-resolution bathymetry and a bathymetry-relative directional encoding. Performance is assessed for unseen storms, unseen coastal geometries, and extreme wave conditions, emphasising nearshore prediction skill. The strongest performance was achieved by a residual predicting U-Net using bathymetry-relative wave predictors, which successfully reconstructed fine-scale structure with substantially lower error than the WGANs. This U-Net reduced nearshore mean absolute error by 85.8% relative to bilinear interpolation. The final WGAN produced very little stochastic variability, with a mean pixel-wise ensemble standard deviation of 0.020 m. These results suggest that for 8-to-1 km Hm0 downscaling, deterministic models can outperform stochastic generative approach

