// Ported by Caleb Marcoux from my original program on Khan Academy.
// https://www.khanacademy.org/computer-programming/balloon-popper/5894008298799104
// To preserve authenticity, as little code as possible was changed.

// If you like this. Check out Bird Bait, my other game. That is where I took this background from.
//I AM THE ONE WHO ORIGINALLY MADE ALL THE PROGRAMS ON MY PROFILE. If it is created off of someone elses then I saved a spin off. Please save a spin off if you want to change this code or re-save it.

var balloons;
var popCount;
var time; // The amount of time it takes before another balloon appears. The lower this number is; the more balloons there are.
var timer;
var s;//Change this to change the size of the balloons.
var bx3;
var r;
var bspeed;
var grass;
var rock;
var tree;

function preload() {
  // Images provided by Daniel Cook. (LostGarden.com)
  grass = loadImage("../images/cute/GrassBlock.png");
  rock = loadImage("../images/cute/Rock.png");
  tree = loadImage("../images/cute/TreeUgly.png");
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('balloon-popper-app');
  balloons = [];
  popCount = 0;
  time = 20; // The amount of time it takes before another balloon appears. The lower this number is; the more balloons there are.
  timer = time;
  s = 60;//Change this to change the size of the balloons.
  bx3 = 0;
  r = random (100,400);
  bspeed = 3;
}

function backdrop() {
    background (105, 214, 196);
    if (bx3>400) {bx3=0;}
    for (var i = -100;i<500;i+=100){
        image(grass,i,300);
        image(rock,0,250);
        image(tree,+r,250);
        noStroke();
        fill(255, 255, 255,240);
        ellipse(50-bx3+i*4,50,100,50);
        ellipse(121-bx3+i*4,60,100,50);
        ellipse(122-bx3+i*4,22,50,50);
        ellipse(71-bx3+i*4,102,50,50);
        ellipse(270-bx3+i*4,110,50,50);
        ellipse(229-bx3+i*4,50,50,50);
        ellipse(261-bx3+i*4,83,100,50);
        ellipse(294-bx3+i*4,41,100,50);
        ellipse(336-bx3+i*4,91,100,100);
        ellipse(302-bx3+i*4,3,100,50);
        ellipse(121-bx3+i*4,60,100,50);
        ellipse(380-bx3+i*4,55,50,50);
    }
};

function mousePressed() {
    for (var i = 0; i < balloons.length; i++) {
        var N = map (noise(frameCount/500+balloons[i].y/500),0,1,-100,100);
        if (dist(mouseX,mouseY,balloons[i].x+N,balloons[i].y+s/1.5)<s/2.5){
            balloons[i].popping=true;
            balloons[i].r=map(balloons[i].r,0,1.5,0,s/6);
            balloons[i].x=[balloons[i].x+N];
            balloons[i].y=[balloons[i].y+N];
            for (var j =0; j < 4; j++) {
                balloons[i].x.push(balloons[i].x[0]+random(-10,10));
                balloons[i].y.push(balloons[i].y[0]+random(-10,10));
            }
            //balloons.splice(i,1);
            popCount+=1;
        }
    }
};

function draw() {
    backdrop();
    stroke (255, 255, 255,100);
    bx3+=0.1;
    if (timer > 0) {
        timer-=1;
    }
    else {
        balloons.push({
            x: round(random(0,width)),
            y: round(random(height+10,height+50)),
            c: color(random(0,255), random(0,255), random(0,255), 200),
            poping: false,
            ps: 100,
            r : random (0.1,1.5)
        });
        timer = time;
    }
    // draw balloons
    for (var i = balloons.length-1; i>=0; i--) {
        var N = map (noise(frameCount/500+balloons[i].y/500),0,1,-100,100);
        fill (balloons[i].c);
        if (balloons[i].popping===true) {
            balloons[i].ps-=1;
            for (var j = 0; j < 5; j ++) {
                var n = map(noise(balloons[i].ps/50+balloons[i].x[j]/10),0,1,-20,20);
                var n2 = map(noise(balloons[i].ps/50+balloons[i].x[j]/10,10),0,1,-20,20);
                fill (balloons[i].c);
                ellipse(balloons[i].x[j]+n,balloons[i].y[j]+40+n2,balloons[i].r+j,balloons[i].r+j);
                balloons[i].y[j]-=balloons[i].ps/30;
            }
        }
        else {
           beginShape ();
            bezier(balloons[i].x+N,balloons[i].y+s,balloons[i].x+N-s,balloons[i].y,balloons[i].x+N+s,balloons[i].y,balloons[i].x+N,balloons[i].y+s);
            bezier(balloons[i].x+N,balloons[i].y+s,balloons[i].x+N-(s/4),balloons[i].y+s*1.1,balloons[i].x+N+(s/4),balloons[i].y+s*1.1,balloons[i].x+N,balloons[i].y+s);
            endShape ();
            balloons[i].y-=balloons [i].r;
        }
        if (balloons[i].y<-s) {
            balloons.splice(i,1);
        }
        if (balloons[i].ps<0) {
            balloons.splice(i,1);
        }
    }
    fill (0, 0, 0);
    text("There are curently "+balloons.length+" balloons",1,10);
    text("You have popped "+popCount+" balloons",1,20);

    if (frameCount<500) {
        fill (79, 88, 219,255-frameCount/2);
        rect (100,100,200,200,10);
        fill (0);
        if (frameCount>300) {
            fill (0, 0, 0,255-(frameCount-355)*2);
        }
        textAlign(CENTER,CENTER);
        textSize(30);
        text ("Click on a\nballoon to\npop it!\nHave fun.",200,180);
        textSize(9);
        text ("This text will\ndissappear automatically.\nThere is not really a point to this\ngame (yet), just have fun.",200,275);
        textAlign(LEFT,BASELINE);
        textSize(12);
    }
};
