// Common code for stardust examples

// Transition controller
var _previousTransition = null;

function beginTransition(func, maxTime) {
    if(_previousTransition) _previousTransition.stop();
    _previousTransition = null;
    maxTime = maxTime || 1;
    var t0 = new Date().getTime();
    var req = null;
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
        if(!shouldStop) {
            req = requestAnimationFrame(rerender);
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