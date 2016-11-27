---
layout: default
title: "Stardust: GPU-based Visualization Library"
---

Stardust: GPU-based Visualization Library
====

<ul class="examples group">
    <li><a href="examples/scatterplot"><img src="examples/scatterplot/preview_small.png" /><div class="overlay"><span>Scatterplot</span></div></a></li>
    <li><a href="examples/sanddance"><img src="examples/sanddance/preview_small.png" /><div class="overlay"><span>SandDance</span></div></a></li>
    <li><a href="examples/index-chart"><img src="examples/index-chart/preview_small.png" /><div class="overlay"><span>Index Chart</span></div></a></li>
    <li><a href="examples/squares"><img src="examples/squares/preview_small.png" /><div class="overlay"><span>Squares</span></div></a></li>
    <li><a href="examples/isotype"><img src="examples/isotype/preview_small.png" /><div class="overlay"><span>Isotype</span></div></a></li>
    <li><a href="examples/graph"><img src="examples/graph/preview_small.png" /><div class="overlay"><span>Force-directed Graph</span></div></a></li>
</ul>


**Stardust** is a library for rendering information visualizations with GPU (WebGL). Stardust provides an easy-to-use
and familiar API for defining shapes and binding data to them. With Stardust, you can render tenth of thousands
of markers and animate them in real time without the hassle of managing WebGL shaders and buffers.

[Online Playground](https://stardust-vis.github.io/playground/)

Install with npm:

    npm install stardust-core
    npm install stardust-webgl

Link to the latest release:

    <script type="text/javascript" src="//stardust-vis.github.io/stardust/stardust.bundle.min.js"></script>

Checkout the source code here:

- <https://github.com/stardust-vis/>

Stardust API
----

### Declaring Shape

To render with Stardust, you need to create a `Shape` object.

Use predefined shapes:

    let shape = Stardust.shape.circle();

Declare a new shape with CustomShape class:

    // Create custom shape and declare input and variables
    let shape = Stardust.shape.custom()
        .input("x", "float")
        .input("y", "float", "default_value")
        // ...
        .variable("position", "Vector2(x, y)");

    // Add elements to the shape
    shape.add("P2D.Circle")
        .attr("center", "position")
        .attr("radius", 3);

Compile directly from the specification language:

    let shape = Stardust.shape.compile(`
        import Circle from P2D;
        shape Shape(float x, float y) {
            Circle(Vector2(x, y), 3);
        }
    `).shape("Shape");

### Bind Data to Shape and Render

Direct binding:

    let shape = platform.create(shape);

    // Specify attributes
    shape.attr("name1", 1);
    shape.attr("name2", (d) => d.x);

    // Use scales
    let xScale = Stardust.scale.linear()
        .domain([ 0, 1 ])
        .range([ 0, width ]);
    shape.attr("name1", xScale((d) => d.x));

    // Bind data
    shape.data(data);

    // Custom scales
    let cScale = Stardust.scale.custom("x * 15 + 142")

    // Render
    shape.render();

2-level mapping:

    shape.attr("name1", 1);
    shape.attr("name2", (d) => d.x);

    shape.instance((d) => {
        return {
            data: d.items,
            attrs: {
                "name1": d.length / 13
            }
        }
    });
    shape.data(DATA);
    shape.render();
