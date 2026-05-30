let width = 500;
let height = width;
let radius = width/2;

let canvas;
let context;

window.onload = function() {
    canvas = document.getElementById("clock");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");

    //drawing origin starts from top left corner;
    //shift left by radius, shift down by radius
    //now origin starts from the middle
    context.translate(radius, radius);
    radius = radius * 0.90;
    drawClock();
}

function drawClock() {
    drawFace();
    drawNumbers();
    drawTime();
    setTimeout(drawClock, 1000);
}

function drawFace() {
    context.beginPath(); //clears the pen
    context.arc(0, 0, radius, 0, 2*Math.PI); //draw a circle

    //draw the border of the circle
    // context.strokeStyle = "red";     //black by default
    context.strokeStyle = "black";
    context.lineWidth = radius*0.1;     //10% of the radius (5% of width)
    context.stroke(); //draws the line
    
    //fill in the circle color
    context.fillStyle = "whitesmoke";   //color to fill
    // context.fillStyle = "yellow";    //140 standard colors by name
    // context.fillStyle = "#058743"; //can also specify hex
    context.fill();
}

function drawNumbers() {
    context.font = `${radius*0.20}px times new roman`;
    context.textBaseline = "middle"; //draw in the middle of the line
    context.textAlign = "center";
    context.fillStyle = "black";

    for(let num = 1; num <= 12; num++) {
        let angle = num * Math.PI / 6; //or 2 PI / 12
        //rotate to draw
        context.rotate(angle);  //rotate right
        context.translate(0, -radius*0.85);
        context.rotate(-angle); //rotate back to draw straight

        context.fillText(num.toString(), 0, 0);

        //undo rotation
        context.rotate(angle);  
        context.translate(0, radius*0.85);
        context.rotate(-angle);
    }
}

function drawTime(){
    let now = new Date();
    let hour = now.getHours() % 12; //for 24 hour clock
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // hour = 7;
    // minute = 12;
    // second = 18;

    console.log(hour, minute, second);

    //seconds
    let secondAngle = second * Math.PI/30;   //60 seconds * PI/30 = 2*PI
    context.strokeStyle = "red";
    drawHand(secondAngle, radius*0.75, radius*0.01);

    //minute
    let minuteAngle = minute * Math.PI/30;   //60 minutes * PI/30 = 2*PI
    context.strokeStyle = "black";
    drawHand(minuteAngle, radius*0.70, radius*0.02);

    //hour
    let hourAngle = hour * Math.PI/6;       //12 hours * PI/6 = 2*PI
    hourAngle += minuteAngle/12;            //hour hand moves in proportion to minute within the 30 degrees
    context.strokeStyle = "black";
    drawHand(hourAngle, radius*0.50, radius*0.03);

    //draw a dot for the center
    context.beginPath();
    context.arc(0, 0, radius*0.05, 0, 2*Math.PI);
    context.fillStyle = "black";
    context.fill();
}

function drawHand(angle, length, width) {
    context.beginPath();        //clears the pen to create new path
    context.lineWidth = width;  //set line width
    context.lineCap = "round";  //round out edge of line

    context.moveTo(0,0);        //start at origin (center)
    context.rotate(angle);      //rotate to angle
    context.lineTo(0, -length); //set line
    context.stroke();           //draw line
    context.rotate(-angle);     //rotate back
}