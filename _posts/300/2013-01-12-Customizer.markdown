---
layout: 300-post
title:  "Customizer"
date:   2013-12-01 17:00
categories: "300"
---

# Customize Design using the [Re-styler](http://restyler.teamstudio.com/)

![Unplugged Re-styler](http://teamstudio.s3.amazonaws.com/images/restyler.png)

Unplugged Controls 3.0 has been rebuilt so that the appearance of the user interface can be easily customized according to a company's branding or preferences.

This customization is done using the online [Unplugged Re-styler App](http://restyler.teamstudio.com/), which allows you to set key CSS values to adapt the design. We'll cover a few of the main customization options here, using the built-in themes as examples of how to achieve different appearances. This should give you an idea of what's possible, and how to start customizing the Controls for yourself.

## Colors

![Dark](http://teamstudio.s3.amazonaws.com/images/phone-people-dark.png)![Light](http://teamstudio.s3.amazonaws.com/images/phone-people-light.png)![iOS 7](http://teamstudio.s3.amazonaws.com/images/phone-people-ios7.png)

Colors and backgrounds are defined as they are in CSS (with the exception of background images), which allows a good degree of flexibility. You can set colors and backgrounds with:

1. **Hex values**, e.g. #464646
2. **RGBa values**, e.g. rgba(255,255,255,0.9)
3. **CSS Color Names**, e.g. white
4. **Webkit Background Gradients**, e.g. -webkit-linear-gradient(#343434, #121212)
5. **Transparent**, i.e. transparent

#### Background

| | Dark Theme    | Light Theme  | iOS 7 Theme |
| ------------ | ------------- | ------------ | ------------ |
| **Body Background** | #464646  | #ECECED | #f0eff4 |
| | Dark, high-contrast background | Lighter, grey background | Light, bluish grey background |

#### Navbar Colors

| | Dark Theme    | Light Theme  | iOS 7 Theme |
| ------------ | ------------- | ------------ |
| **Navbar Background** | -webkit-linear-gradient(#343434, #121212) | white | rgba(255,255,255,0.9) |
| **Navbar Title Color** | white  | #333 | black |
| | White text on dark, glossy background | Black text on white background | Black text on slightly transparent white background |

#### Content Colors

| | Dark Theme    | Light Theme  | iOS 7 Theme |
| ------------ | ------------- | ------------ |
| **Table Header Background** | #CCC | white | transparent |
| **Table Heading Color** | #333 | #657893 | #4f4f4f |
| **Table Row Title Color** | black | black | black |
| **Table Row Detail Color** | #999 | #999 | #999 |
| | Black headings on grey background | Bluish headings on white background | Grey headings on transparent background |

You can also edit the Table Row background color, but we'd recommend you leave it white for the sake of contrast and readability.

#### Footer/Tab Colors

| | Dark Theme    | Light Theme  | iOS 7 Theme |
| ------------ | ------------- | ------------ |
| **Footer Background** | -webkit-linear-gradient(#343434, #121212) | white | rgba(255,255,255,0.9) |
| **Footer Tab Color** | #AAA | #b1bac8 | #999 |
| **Selected Footer Tab Color** | white | #657893 | #157efb |
| | Grey icons & text (white when selected) on dark, glossy background | Blue icons & text (darker blue when selected) on white background | Grey icons & text (bright blue when selected) on slightly transparent white background |

## Buttons

![Dark](http://teamstudio.s3.amazonaws.com/images/phone-person-dark.png)![Light](http://teamstudio.s3.amazonaws.com/images/phone-person-light.png)![iOS 7](http://teamstudio.s3.amazonaws.com/images/phone-person-ios7.png)

| | Dark Theme    | Light Theme  | iOS 7 Theme |
| ------------ | ------------- | ------------ |
| **Button Background** | #636363  | #959eb2 | transparent |
| **Button Box Shadow** | inset 0 1px rgba(255, 255, 255, 0.3) | inset 0 1px rgba(255,255,255,0.2) | none |
| **Button Border Radius** | 6px | 6px | none |
| **Button Label Color** | white | white | #2087fc |
| **Button Label Font Weight** | bold | bold | normal |
| **Button Label Shadow** | 0 1px rgba(0,0,0,0.4) | 0 1px rgba(0,0,0,0.2) | none |
| | Chunky, rounded, glossy buttons with high contrast against background | Lighter, less saturated buttons with subtle gloss & shadow | Minimalist buttons with transparent backgrounds and simple, bright labels/icons

Custom colors can also be set for Positive/Success buttons (e.g. the green Sync button in the bottom left) and Negative/Warning buttons (i.e. the red Close button).


## Content Layout

![Dark](http://teamstudio.s3.amazonaws.com/images/phone-edit-dark.png)![Light](http://teamstudio.s3.amazonaws.com/images/phone-edit-light.png)![iOS 7](http://teamstudio.s3.amazonaws.com/images/phone-edit-ios7.png)

| | Dark Theme | Light Theme | iOS 7 Theme |
| ------------ | ------------ | ------------- | ------------ |
| **Content Padding** | 10px  | 10px  | 36px 0 |
| **Content Border Radius** | 10px  | 10px  | none |
|  | Equal padding around content; rounded corners  | Equal padding around content; rounded corners  | More padding at top; zero padding on the left/right so content sits flush against sides of container |

## Menu

![Dark](http://teamstudio.s3.amazonaws.com/images/phone-menu-dark.png)![Light](http://teamstudio.s3.amazonaws.com/images/phone-menu-light.png)![iOS 7](http://teamstudio.s3.amazonaws.com/images/phone-menu-ios7.png)

##### Settings

| | Dark Theme | Light Theme | iOS 7 Theme |
| ------------ | ------------- | ------------ |
| **Menu Padding** | 10px  | 10px  | 36px 0 |
| **Menu Border Radius** | 10px  | 10px  | none |
| **Menu Item Background** | #222  | #657893  | white |
| **Menu Item Label Color** | white  | white  | black |
| **Menu Item Box Shadow** | inset 0 1px rgba(255,255,255,0.1)  | inset 0 1px rgba(255,255,255,0.1)  | none |
| **Menu Item Border Outer** | #111  | transparent  | transparent |
| **Menu Item Border Divider** | #111  | #55657b  | #d8d8d8 |
| **Selected Item Background** | #0078F4  | #B9C1D4  | #4ca1fe |
| **Selected Item Label Color** | white  | white  | white |
| | Dark, rounded menu with clear borders and high contrast icons/text | Lighter menu with softer colors and less contrast | Minimalist menu with monochrome text/icons, obvious seelcted state, and no highlights or shadows |

In each case, the padding & border radius is the same as the content area, which helps them line up, but you could set them differently if you prefer.