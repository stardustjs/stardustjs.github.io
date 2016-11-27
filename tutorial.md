---
layout: default
title: "Stardust: GPU-based Visualization Library"
---

Stardust Tutorial
====

Getting Started
----

First, let's create an HTML file with a script tag to the Stardust library:

    <!DOCTYPE html>
    <meta charset="utf-8">
    <script type="text/javascript" src="//stardust-vis.github.io/stardust/stardust.bundle.min.js"></script>

Add a `canvas` element for our visualization:

    <canvas id="main-canvas"></canvas>

Initialize the WebGL platform:

    <script type="text/javascript">
        // Get our canvas element
        var canvas = document.getElementById("main-canvas");
        var width = 960;
        var height = 500;

        // Create a WebGL 2D platform on the canvas:
        var platform = Stardust.platform("webgl-2d", canvas, width, height);

        // ... Load data and render your visualization
    </script>

For the tutorial, let's make some data. You can load data from JSON or CSV files using other libraries such as D3.

    var data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

Create a Stardust shape specification:

    var circleSpec = Stardust.shape.circle();

Create a shape object using the spec on our WebGL platform:

    var circles = Stardust.shape.create(circleSpec, platform);

Bind data attributes to the circles:

    circles.attr("center", (d) => [ d * 80, 250 ]);
    circles.attr("radius", (d) => d * 3);
    circles.attr("color", [ 0, 0, 0, 1 ]);

Bind our data items to the circles:

    circles.data(data);

Render the circles:

    circles.render();

You may change data bindings and call render again:

    // Update binding attributes
    circles.attr("color", [ 1, 0, 0, 1 ]);

    // Clear the previously rendered stuff
    platform.clear();

    // Re-render the circles
    circles.render();

Putting everything together, we get:

    <!DOCTYPE html>
    <meta charset="utf-8">
    <script type="text/javascript" src="https://stardust-vis.github.io/stardust/stardust.bundle.min.js"></script>
    <canvas id="main-canvas"></canvas>
    <script type="text/javascript">
        // Get our canvas element
        var canvas = document.getElementById("main-canvas");
        var width = 960;
        var height = 500;

        // Create a WebGL 2D platform on the canvas:
        var platform = Stardust.platform("webgl-2d", canvas, width, height);

        // Make some data
        var data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

        // Create circle spec
        var circleSpec = Stardust.shape.circle();

        // Create circles
        var circles = Stardust.shape.create(circleSpec, platform);

        // Bind data attributes to the circles
        circles.attr("center", (d) => [ d * 80, 250 ]);
        circles.attr("radius", (d) => d * 3);
        circles.attr("color", [ 0, 0, 0, 1 ]);

        // Bind data items
        circles.data(data);

        // Render
        circles.render();
    </script>