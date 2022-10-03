var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

// mouse object
var mouse = {
    // coordinates
    x: undefined,
    y: undefined,
    // quartet phase
    q: 1
}

// interaction with mouse hover
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

// interaction with mouse click
window.addEventListener('click', whenclick);

// window resize
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // initialize again
    init();
})

// text object
function Texto(x, y, text, size, color){
    // atributes
    this.x = x;
    this.y = y;
    this.text = text;
    this.size = size;
    this.color = color;
    // draw function
    this.draw = function(){
        c.font = this.size + "px Verdana";
        c.fillStyle = this.color; // remove this line to see the difference
        c.fillText(this.text, this.x, this.y);
    }
    //update function
    this.update = function(){
        this.draw();
    }
}

// rectangle object
function Square(x, y, width, lenght, color){
    // atributes
    this.x = x;
    this.y = y;
    this.width = width;
    this.lenght = lenght;
    this.color = color;
    // draw function
    this.draw = function(){
        c.beginPath();
        //c.rect(this.x, this.y, this.width, this.lenght);
        c.roundRect(this.x, this.y, this.width, this.lenght, 10);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    // update function
    this.update = function(){
        this.draw();
    }

}

// circle object
function Circle(x, y, dx, dy, radius, i, r, g, b, maxRadius, minRadius) {
    // atributes
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.i = i; // index
    this.r = r;
    this.g = g;
    this.b = b;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;
    // draw function
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        c.strokeStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        c.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        c.stroke();
        c.fill();
    }
    // update function
    this.update = function() {
        for (var i = 0; i < circleArray.length; i++){
            // checks the phase
            if (mouse.q == 1){
                var initial = [fourthX[i], fourthY[i]];
                var final = [firstX[i], firstY[i]];
                this.r = rgb1[0];
                this.g = rgb1[1];
                this.b = rgb1[2];
            } else if (mouse.q == 2){     
                var initial = [firstX[i], firstY[i]];
                var final = [firstX[i], secondY[i]];
                this.r = rgb2[0];
                this.g = rgb2[1];
                this.b = rgb2[2];
            } else if (mouse.q == 3){
                var initial = [firstX[i], secondY[i]];
                var final = [firstX[i], thirdY[i]];
                this.r = rgb3[0];
                this.g = rgb3[1];
                this.b = rgb3[2];
            } else if (mouse.q == 4){
                var initial = [firstX[i], thirdY[i]];
                var final = [fourthX[i], fourthY[i]];
                this.r = rgb4[0];
                this.g = rgb4[1];
                this.b = rgb4[2];
            }
            // checks the order
            if (this.i == i){
                // fixes the x position
                if (final[0] > initial[0]){
                    if (this.x < (final[0] + 2)*40){
                        this.x += this.dx * final[0]/initial[0];
                    }
                } else {
                    if (this.x > (final[0] + 2)*40){
                        this.x -= this.dx * initial[0]/final[0];
                    }
                }
                // fixes the y position
                if (final[1] > initial[1]){
                    if (this.y > canvas.height - 100 - final[1]*40){
                        this.y -= this.dy * final[1]/initial[1];
                    }
                } else {
                    if (this.y < canvas.height - 100 - final[1]*40){
                        this.y += this.dy * initial[1]/final[1];
                    }
                }
            }
        }
        // hover interaction
        if (mouse.x - this.x < 20 && mouse.x - this.x > -20 && mouse.y - this.y < 20 && mouse.y - this.y > -20){
                if (this.radius < this.maxRadius){
                    this.radius += 3;
                }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
        if (this.radius >= this.maxRadius){
            var x = firstX[this.i];
            if (mouse.q == 1){
                var y = firstY[this.i];
            } else if (mouse.q == 2){
                var y = secondY[this.i];
            } else if (mouse.q == 3){
                var y = thirdY[this.i];
            } else if (mouse.q == 4){
                var x = fourthX[this.i];
                var y = fourthY[this.i];
            }
            c.font = "11px Verdana";
            c.fillStyle = "rgb(0,0,0)";
            //c.fillText("(X, Y)", this.x - this.radius + 2, this.y + this.radius/5);
            c.fillText("(" + x + ", " + y + ")", this.x - this.radius + 2, this.y + this.radius/5);
        }
    }

}

// click interaction
function whenclick (){
    if (mouse.q < 4){
        mouse.q += 1;
    } else {
        mouse.q = 1;
    }
}

// array to store the dots
var circleArray = [];

// creates the objects
function init(){
    txt = new Texto(100, canvas.height - 110 - 14*40, "anscombe.exe", 30, 'rgb(0, 0, 0)');
    circleArray = [];
    firstX = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5];
    firstY = [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68];
    secondY = [9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74];
    thirdY = [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73];
    fourthX = [8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8];
    fourthY = [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.50, 5.56, 7.91, 6.89];
    rgb1 = [219, 175, 175];
    rgb2 = [219, 209, 173];
    rgb3 = [173, 219, 186];
    rgb4 = [173, 177, 219];
    sq1 = new Square((1.5)*40, canvas.height - 140 - 14*40, 21*40, (3.15 +10.84 + 1.5)*40, 'rgb(112, 146, 190)')
    sq2 = new Square((2)*40, canvas.height - 100 - 14*40, 20*40, (3.15 +10.84)*40, 'rgb(107, 73, 110)');
    button1 = new Square(690, canvas.height - 134 - 14 *40, 50, 27, 'rgb(200, 200, 200)');
    button2 = new Square(760, canvas.height - 134 - 14 *40, 50, 27, 'rgb(200, 200, 200)');
    button3 = new Square(830, canvas.height - 134 - 14 *40, 50, 27, 'rgb(255, 200, 200)');
    for(var i = 0; i < 11; i++){
        var radius = 10;
        var x = (firstX[i] + 2)*40;
        var y = canvas.height - 100 - firstY[i]*40;
        var dx = 1;
        var dy = 1;
        var i = i;
        var r = 219;
        var g = 175;
        var b = 175;
        var maxRadius = 3*radius;
        var minRadius = 1*radius;
        circleArray.push(new Circle(x, y, dx, dy, radius, i, r, g, b, maxRadius, minRadius));
    }

}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    sq1.update();
    sq2.update();
    button1.update();
    button2.update();
    button3.update();
    //draw a line
    c.beginPath();
    c.moveTo(0 + 80, canvas.height - 300 + 300 - 7*40 + 60);
    c.lineTo(800 + 80, canvas.height - 700 + 280 - 5*40);
    c.strokeStyle = 'rgb(0, 0, 0)';
    c.stroke();
    // c.beginPath();
    // c.moveTo(0 + 80 +14*40, canvas.height - 300 + 300 - 4*40); 
    // c.lineTo(0 + 80 +14*40, canvas.height - 1000 + 300 - 4*40);
    // c.strokeStyle = 'rgb(0, 0, 0)';
    // c.stroke();
    // c.beginPath();
    // c.moveTo(0 + 80, canvas.height - 300 + 300 - 7*40 + 60);
    // c.lineTo(1400 + 80, canvas.height - 300 + 300 - 7*40 + 60);
    // c.strokeStyle = 'rgb(0, 0, 0)';
    // c.stroke();
    // c.beginPath();
    // c.moveTo(0 + 80, canvas.height - 300 + 300 - 14*40 + 60);
    // c.lineTo(1400 + 80, canvas.height - 300 + 300 - 14*40 + 60);
    // c.strokeStyle = 'rgb(0, 0, 0)';
    // c.stroke();

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
    txt.update();
    
}
init();
animate();





