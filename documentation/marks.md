---
layout: documentation
title: "Stardust Documentation: Marks"
---

Marks
====

Stardust uses the term "mark" for graphical elements, such as circles, lines, and wedges.
You can use the **predefined marks** as below to create your visualizations,
or write code in Stardust's [mark specification language]({{base}}/documentation/specification) to create your own marks.

## circle

Creating:

```javascript
let circleMark = Stardust.mark.circle();
// Create circles with 8 triangles, good when drawing large numbers of small circles.
let circleMark = Stardust.mark.circle(8);
let circles = Stardust.mark.create(circleMark, platform);
```

Attributes:

- **center**: Vector2 - The center of the circle. `circles.attr("center", [ 10, 20 ])`.
- **radius**: float - The radius of the circle.
- **color**: Color - The color of the circle.

## rect

## line

## polyline

## wedge
