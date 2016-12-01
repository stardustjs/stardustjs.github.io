// Common code for stardust examples

// Transition controller
var _previousTransition = null;

function beginTransition(func, maxTime) {
    if(_previousTransition) _previousTransition.stop();
    _previousTransition = null;
    maxTime = maxTime || 1;
    var t0 = new Date().getTime();
    var req = null;
    var totalFrames = 0;
    var rerender = () => {
        req = null;
        var t1 = new Date().getTime();
        var t = (t1 - t0) / 1000;
        var shouldStop = false;
        if(t > maxTime) {
            t = maxTime;
            shouldStop = true;
        }
        func(t);
        totalFrames += 1;
        if(!shouldStop) {
            req = requestAnimationFrame(rerender);
        } else {
            requestAnimationFrame(function() {
                var t1 = new Date().getTime();
                d3.select(".fps").text("FPS: " + (totalFrames / ((t1 - t0) / 1000)).toFixed(1));
            });
        }
    }
    req = requestAnimationFrame(rerender);
    _previousTransition = {
        stop: () => {
            if(req != null) cancelAnimationFrame(rerender);
        }
    }
    return _previousTransition;
}

function measureFPS(renderFunction) {
    var count = 10;
    var totalFrames = 0;
    var t0 = new Date().getTime();
    var doFrame = function() {
        if(totalFrames >= count) {
            var t1 = new Date().getTime();
            var fps = totalFrames / ((t1 - t0) / 1000);
            d3.select(".fps").text("FPS: " + fps.toFixed(1));
            return;
        }
        renderFunction();
        totalFrames += 1;
        requestAnimationFrame(doFrame);
    };
    requestAnimationFrame(doFrame);
}

function FPS() {
    this.updates = [];
    this.updateIndex = 0;
}

FPS.prototype.update = function() {
    this.updateIndex += 1;
    this.updates.push(new Date().getTime());
    if(this.updates.length > 100) {
        this.updates.splice(0, this.updates.length - 100);
    }
    if(this.updateIndex % 20 == 0) {
        var dt = (this.updates[this.updates.length - 1] - this.updates[0]) / (this.updates.length - 1);
        d3.select(".fps").text("FPS: " + (1000 / dt).toFixed(1));
    }
}

var switches = {};

d3.select("[data-switch]").each(function(s) {
    var name = d3.select(this).attr("data-switch");
    var modes = d3.select(this).selectAll("[data-value]");
    var valueDefault = modes.filter(".active").attr("data-value");
    switches[name] = valueDefault;
    modes.on("click", function() {
        modes.classed("active", false);
        d3.select(this).classed("active", true);
        var newValue = d3.select(this).attr("data-value");
        var previous = switches[name];
        if(previous != newValue) {
            switches[name] = newValue;
            if(switches[name + "_changed"]) {
                switches[name + "_changed"](switches[name], previous);
            }
        }
    });
});