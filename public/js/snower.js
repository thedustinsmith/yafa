(function () {
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();
 
    function randMax(max) {
        return parseInt(Math.random() * max, 10);
    }
 
    function Snower(opts) {
        this.width = opts.width || window.innerWidth;
        this.height = opts.height || window.innerHeight;
        this.flakeCount = opts.flakeCount || 500;
    }
 
    Snower.prototype.setup = function () {
        var self = this;
        var container = document.createElement("div");
        this.container = container;
        container.style.cssText = "position: fixed; top:0; left: 0;";
        document.body.appendChild(container);
        this.refreshContext();
 
        this.flakes = [];
        for (var i = 0; i < this.flakeCount; i++) {
            this.flakes.push(new Flake(self));
        }
    };
 
    Snower.prototype.refreshContext = function () {
        this.container.style.height = this.height + "px;";
        this.container.style.width = this.width + "px";
    };
 
    Snower.prototype.animate = function () {
        var self = this;
        var len = this.flakes.length;
        while (len--) {
            var f = self.flakes[len];
            f.update();
            f.draw();
 
            if (f.y > self.height) {
                var newF = new Flake(self);
                newF.y = 0;
                f.destroy();
                self.flakes.splice(len, 1, newF);
            }
        }
    };
 
    Snower.prototype.go = function () {
        var self = this;
        if (self.stopped) {
            return;
        }
        self.animate();
        requestAnimFrame(self.go.bind(self));
    };
 
    Snower.prototype.start = function () {
        this.stopped = false;
        this.setup();
        this.go();
    };
 
    Snower.prototype.stop = function () {
        this.stopped = true;
        document.body.removeChild(this.container);
    };
 
    Snower.prototype.toggle = function () {
        if (this.stopped) {
            this.start();
        }
        else {
            this.stop();
        }
    };
 
    function Flake(snower) {
        this.x = randMax(snower.width);
        this.startX = this.x;
        this.maxXDelt = Math.max(1, randMax(10));
        this.xV = 0; //Math.random() > .5 ? -1 : 1;
        this.y = randMax(snower.height);
        this.v = Math.max(Math.random() * 2, 1);
        this.r = Math.max(1, randMax(5));
        this.el = el = document.createElement("div");
        el.style.cssText = "position: absolute; border-radius: 50%; background: rgba(255, 255, 255, " + Math.random() + ");";
        el.style.width = el.style.height = this.r + "px";
        snower.container.appendChild(el);
    }
 
    Flake.prototype.draw = function (ctx) {
        this.el.style.webkitTransform = "translate(" + this.x + "px, " + this.y + "px)";
    };
 
    Flake.prototype.update = function () {
        //var xDelt = Math.abs(this.x - this.startX);
        //if (xDelt > this.maxXDelt) {
        //  this.xV *= -1; //0;
        //}
        var yDelt = this.v;
        //var thresh = this.maxXDelt / 2;
        //yDelt = yDelt - (yDelt * 1/thresh);
        this.y += yDelt;
        this.x += this.xV;
    };
 
    Flake.prototype.destroy = function () {
        this.el.parentNode.removeChild(this.el);
    };
 
    window.Snower = s = new Snower({
        flakeCount: 1000
    });
 
    window.onresize = function (ev) {
        s.width = window.innerWidth;
        s.height = window.innerHeight;
        s.refreshContext();
    };
 
    s.start();
})();