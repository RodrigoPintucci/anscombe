var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined,
    q: 1
}


window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('click', whenclick);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Square(x, y, width, lenght){
    this.x = x;
    this.y = y;
    this.width = width;
    this.lenght = lenght;
    this.draw = function(){
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.lenght);
        c.strokeStyle = 'rgb(107, 73, 110)';
        c.stroke();
        c.fillStyle = 'rgb(107, 73, 110)';
        c.fill();
    }

    this.update = function(){
        this.draw();
    }

}

function Circle(x, y, dx, dy, radius, i, r, g, b, maxRadius, minRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.i = i;
    this.r = r;
    this.g = g;
    this.b = b;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        c.strokeStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        c.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        c.stroke();
        c.fill();
    }
    
    this.update = function() {
        for (var i = 0; i < circleArray.length; i++){
            if (mouse.q == 1){
                this.r = rgb1[0];
                this.g = rgb1[1];
                this.b = rgb1[2];
                if (this.i == i){
                    if (firstX[i] > fourthX[i]){
                        if (this.x < (firstX[i] + 2)*40){
                            this.x += this.dx * firstX[i]/fourthX[i];
                        }
                    } else {
                        if (this.x > (firstX[i] + 2)*40){
                            this.x -= this.dx * fourthX[i]/firstX[i];
                        }
                    }

                    if (firstY[i] > fourthY[i]){
                        if (this.y > canvas.height - 100 - firstY[i]*40){
                            this.y -= this.dy * firstY[i]/fourthY[i];
                        }
                    } else {
                        if (this.y < canvas.height - 100 - firstY[i]*40){
                            this.y += this.dy * fourthY[i]/firstY[i];
                        }
                    }
                }
            } else if (mouse.q == 2){     
                this.r = rgb2[0];
                this.g = rgb2[1];
                this.b = rgb2[2];
                if (this.i == i){
                    if (secondY[i] > firstY[i]){
                        if (this.y > canvas.height - 100 - secondY[i]*40){
                            this.y -= this.dy * secondY[i]/firstY[i];
                        }
                    } else {
                        if (this.y < canvas.height - 100 - secondY[i]*40){
                            this.y += this.dy * firstY[i]/secondY[i];
                        }
                    }
                }
            //    for (var j = 0; j < 100; j++){
            //         circleArray[i].y += (firstY[i]*40 - secondY[i]*40)/100;
            //     }
            } else if (mouse.q == 3){
                this.r = rgb3[0];
                this.g = rgb3[1];
                this.b = rgb3[2];
                if (this.i == i){
                    if (thirdY[i] > secondY[i]){
                        if (this.y > canvas.height - 100 - thirdY[i]*40){
                            this.y -= this.dy * thirdY[i]/secondY[i];
                        }
                    } else {
                        if (this.y < canvas.height - 100 - thirdY[i]*40){
                            this.y += this.dy * secondY[i]/thirdY[i];
                        }
                    }
                }
            } else if (mouse.q == 4){
                this.r = rgb4[0];
                this.g = rgb4[1];
                this.b = rgb4[2];
                if (this.i == i){
                    if (fourthX[i] > firstX[i]){
                        if (this.x < (fourthX[i] + 2)*40){
                            this.x += this.dx * fourthX[i]/firstX[i];
                        }
                    } else {
                        if (this.x > (fourthX[i] + 2)*40){
                            this.x -= this.dx * firstX[i]/fourthX[i];
                        }
                    }

                    if (fourthY[i] > thirdY[i]){
                        if (this.y > canvas.height - 100 - fourthY[i]*40){
                            this.y -= this.dy * fourthY[i]/thirdY[i];
                        }
                    } else {
                        if (this.y < canvas.height -100 - fourthY[i]*40){
                            this.y += this.dy * thirdY[i]/fourthY[i];
                        }
                    }
                }
            }
        }
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if (this.radius < this.maxRadius){
                    this.radius += 3;
                }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }

}

function whenclick (){
    if (mouse.q < 4){
        mouse.q += 1;
    } else {
        mouse.q = 1;
    }
}

var circleArray = [];


function init(){
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
    sq = new Square((2)*40, canvas.height - 100 - 14*40, 20*40, 3.15*40 + (10.84 - 4.26)*40 + (4.26 -3.10)*40 + 3.10*40);
    for(var i = 0; i < 11; i++){
        var radius = 10;
        var x = (firstX[i] + 2)*40;
        var y = canvas.height - 100 - firstY[i]*40;
        var dx = 0.5;
        var dy = 0.5;
        var i = i;
        var r = 219;
        var g = 175;
        var b = 175;
        var maxRadius = 3*radius;
        var minRadius = 1*radius;
        circleArray.push(new Circle(x, y, dx, dy, radius, i, r, g, b, maxRadius, minRadius));
    }

}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    sq.update();
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}
init();
animate();





