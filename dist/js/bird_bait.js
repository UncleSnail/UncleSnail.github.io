// Ported by Caleb Marcoux from my original program on Khan Academy.
// https://www.khanacademy.org/computer-programming/bird-bait-16/4568063333629952
// To preserve authenticity, as little code as possible was changed.


/**THIS IS VERSION 1.6**///if you want to know how this game looked in the bigging here is the first version I have:
//https://www.khanacademy.org/cs/eat-the-seed-the-first-version-of-bird-bait-ever/5440883783106560

/**If you would like to be notified about new game releases comment in my tips and thanks "notify me" section.**/

//I am just a normal kid. I started learning programming not that long ago so I am still learning too. When I find something cool out I usually make a tutorial showing you how to do it. Lately I have been working on figuring out collision between different types of objects. Go on my recent programs and check those out. I am developping new games so that is why updates for this are not coming quite so quick. I am learning just like the rest of you. Thank you to Khan Academy for giving us this awesome oportunity.

    /* SHORTCUTS.
    menu *Press m or right click to return to the menu. (if you do this on the win or death screen or during a gameplay it WILL NOT give you points OR unlock a level!)

   pause *Press p to pause the game. (durring gameplay) This will not interfeer with your amount of points. You can then play the game from there or restart.

    */

    /**
     * REMEMBER. I am open to suggestions. Just comment and tell me what you want.
     **/

//if you see ANY spelling mistakes or problems with the game please tell me and I will try to fix them. Let's make this game as perfect as possible. (unless I want the "problem" to be there. If that is the case you can tell me why you think it should be fixed and that might change my mind.)

//please leave the credits and original maker if you make a spin off or take my code.

//Also check out my other games if you like this one.
//I started making this program on April 3 2014.


var bopac;
var x;
var y;
var ux;
var uy;
var xm;
var ym;
var ex;
var ey;
var eyu;
var c;
var s;
var ed;
var d;
var eo;
var o;
var bx;
var bx2;
var bx3;
var bspeed;
var ba;
var r;
var distance;
var c;
var bt;
var et;
var dtext;
var c2;
var c1;
var c3;
var rtime;
var p;
var mx3;
var lifeamount;
var blinktime;
var blinkmax;
var blob;
var levunlock;
var goal;
var levelscore;
var score;
var la;
///booleans
var game;
var menu;
var page;
var death;
var movement;
var de;
var win;
var pause;
var keys = [];

var dotsize;
var grass;
var rock;
var tree;
function keyPressed() {keys[keyCode]=true;};
function keyReleased() {keys [keyCode]=false;};

function preload() {
  // Images provided by Daniel Cook. (LostGarden.com)
  grass = loadImage("../images/cute/GrassBlock.png");
  rock = loadImage("../images/cute/Rock.png");
  tree = loadImage("../images/cute/TreeUgly.png");
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('bird-bait-app');
  frameRate(32);
  bopac = 255;
  x = 20;
  y = 20;
  ux = 20;
  uy = 200;
  xm = 300;
  ym = 200;
  ex = [0];
  ey = [0];
  eyu = [0];
  c = 0;
  s = 0.5;
  ed =[0];
  d = 0;
  eo = [0];
  o = 0;
  bx = 0;
  bx2 = 0;
  bx3 = 0;
  bspeed = 3;
  ba = 5;
  r = random (100,400);
  distance = 0;
  c = [21,14,3,12,5,0,19,14,1,9,12];
  bt = 0;
  et =[2];
  dtext = "You died";
  c2 = color(138, 95, 65);
  c1 = color(110, 69, 38);
  c3 = color(84, 51, 29);
  rtime = 0;
  p = 0;
  mx3 = 250;
  lifeamount = 5;
  blinktime = 0;
  blinkmax = 20;
  blob=0;
  levunlock=1;
  goal = 20;
  levelscore=0;
  score = 0;
  la = 5;
  ///booleans
  game = false;
  menu = true;
  page = 0;
  death = false;
  movement = false;
  de = true;
  win = false;
  pause = false;
  keys = [];
  dotsize = 15;
  keyPressed = function () {keys[keyCode]=true;};
  keyReleased = function () {keys [keyCode]=false;};
  noLoop();
}

function restart() {
    for (var i = 0; i<ba; i++) {
        eo[i] = c[5];
        ed[i] = c[5];
        ex[i] = c[5];
        ey[i] = c[5];
        et[i] = c[8];
    }
    x = c[0];
    y = c[0];
    ux = c[0];
    uy = 200;
    xm = 300;
    ym = 200;
    d = c[5];
    lifeamount = 5;
    distance = 0;
    movement=true;
    de = true;
    levelscore=0;
};

function dragger(x1,y1,x2,y2,s,color,min,m) {
    var mx2 = map(mx3,x1,x2,0,1);
    var x = lerp(x1, x2, mx2);
    var y = lerp(y1, y2, mx2);
    if (rtime===0) {
        mx3 = x2;
    }
    var xx = constrain (x,x1,x2);
    var yy = constrain (y,y1,y2);
    p = map(xx,x1,x2,min,m);
    stroke(0);
    strokeWeight(1);
    line(x1, y1, x2, y2);
    fill (color);
    ellipse(xx, yy,s,s);
    if (mouseIsPressed&&mouseX>xx-s&&mouseX<xx+s&&mouseY>yy-s&&mouseY<yy+s&&mouseButton===LEFT) {
        mx3 = mouseX;
    }
    };


//mouse clicked function..//
function mouseClicked() {
    if (mouseButton===LEFT) {
    //menu// /page 0
    if (menu===true&&page===0&&mouseX>95&&mouseX<305&&mouseY>270&&mouseY<320) {
        page=1;
    }
    if (menu===true&&page===0&&mouseX>150&&mouseX<250&&mouseY>150&&mouseY<200){
        page=5;
    }
    if (menu===true&&page===0&&mouseX>150&&mouseX<250&&mouseY>210&&mouseY<260){
        page=2;
    }
    //color page../page 4
    if (menu===true&&page===4&&mouseX>150&&mouseY>365-50&&mouseX<250&&mouseY<415-50) {
        menu=false;
        game=true;
        page = 0;
        restart();
        }
        if (menu===true&&page===4&&mouseX>170&&mouseY>420-50&&mouseX<230&&mouseY<445-50) {
            println("to set the opacity, you must click to change the\nbirds color. Then it will change.\nIf your bird is invisible drag the opacity slider\nto the max (all the way to the right) then click\nthe color you would like again.");
        }
        // color picker
        if (menu===true&&page===4&&mouseX>80&&mouseX<130&&mouseY>75&&mouseY<125){c2=color(179, 205, 224,bopac);c3 = color(169, 165, 237,bopac);c1=color(38, 65, 110,bopac);}
        if (menu===true&&page===4&&mouseX>144&&mouseX<194&&mouseY>75&&mouseY<125){c2= color(138, 95, 65,bopac); c3 = color(84, 51, 29,bopac);c1=color(110, 69, 38,bopac);}
        if (menu===true&&page===4&&mouseX>206&&mouseX<256&&mouseY>75&&mouseY<125){c2= color(250, 187, 187,bopac);c3 = color(227, 118, 118,bopac);c1=color(128, 16, 16,bopac);}
        if (menu===true&&page===4&&mouseX>270&&mouseX<320&&mouseY>75&&mouseY<125){c2= color(245, 208, 122,bopac);c3 = color(222, 173, 120,bopac);c1=color(171, 140, 85,bopac);}
    //birds page../page 2
    if (page===2&&mouseX>150&&mouseX<250&&mouseY>325&&mouseY<375){
        page=c[5];
    }
    //how to play../page 1
    if (page===1&&mouseX>150&&mouseX<250&&mouseY>325&&mouseY<375){
        page=c[5];
    }
    //credits page../page 3
    if (page===c[2]&&mouseX>150&&mouseX<250&&mouseY>325&&mouseY<375){
        page=0;
    }
    if (page===c[2]&&mouseX>60&&mouseX<340&&mouseY>50&&mouseY<100){
        println("Chase Wolff\nhttps://www.khanacademy.org/profile/ChaseWolff/programs\nRose(Emberpaw)\nhttps://www.khanacademy.org/profile/BeautifulTigers/discussion");
    }
    if (menu===true&&page===0&&mouseX>130&&mouseX<270&&mouseY>375&&mouseY<400){
        page=c[2];
    }
    // death screen..
        if (death===true&&mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
            death=false;
            menu=true;
            game=false;
            page=c[5];
            score+=round(levelscore/2);
        }
        //win screen
        if (win===true&&mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
            win=false;
            menu=true;
            game=false;
            page=c[5];
            score+=levelscore;
            if (blob===levunlock) {
                levunlock+=1;
            }
        }
        //level screen
        if (menu===true&&page===5&&mouseX>120&&mouseY>190&&mouseX<280&&mouseY<220){
            blob=0;
        }
        if (menu===true&&page===5&&mouseX>150&&mouseY>225&&mouseX<250&&mouseY<275){
        if (rtime===1) {
        menu=false;
        game=true;
        restart();
        page=0;
        }
        if (rtime===0){
            page=4;
            rtime=1;
        }
    }
    if (pause===true) {
        if (mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350) {
            pause = false;
            game = true;
            movement=true;
        }
        if (mouseX>140&&mouseX<260&&mouseY>245&&mouseY<295) {
            pause = false;
            game = true;
            restart();
        }
    }
}
if (mouseButton===RIGHT) {
    menu=true;
    game=false;
    page=0;
    pause=false;
}
};
/*var mouseReleased = function () {
    if (menu===true&&page===4) {
        c3=c3;
    }
};*/

function owl(a,b){
    noStroke();
    fill (135, 105, 74);
    triangle (180+a,240+b,220+a,240+b,201+a,280+b);
    fill (133, 106, 90);
    triangle (168+a,234+b,203+a,240+b,190+a,271+b);
    fill (135, 101, 66);
    triangle (180+a,231+b,230+a,240+b,214+a,264+b);
    fill (117, 80, 47);
    ellipse (200+a,200+b,100,100);
    fill (156, 121, 84);
    ellipse (200+a,230+b,70,40);
    fill (240, 223, 209);
    ellipse (180+a,190+b,35,35);
    ellipse (220+a,190+b,35,35);
    fill (255, 255, 255);
    ellipse (180+a,190+b,30,30);
    ellipse (220+a,190+b,30,30);
    fill (5, 5, 5);
    ellipse (180+a,190+b,20,20);
    ellipse (220+a,190+b,20,20);
    fill (69, 44, 25);
    triangle (180+a,210+b,220+a,210+b,201+a,240+b);
};

function you(x,y,d,xp) {
    stroke(0, 0, 0);
    fill(38, 21, 6);
    triangle(x+25,y+2,x+25,y-5,x+30,y+2-xp);
    triangle(x+25,y+2,x+23,y+8,x+30,y+2+xp);
    fill (c1);
    noStroke();
    var es =20;
    var es2 =8;
    if (blinktime>0){
        es=25;
        es2=10;
    }
    ellipse (x,y,50,50);
    fill (c2);
    ellipse (x,y+15,35,20);
    //eyes
    fill (255, 255, 255);
    ellipse (x+15,y-8,es,es);
    fill (0, 0, 0);
    ellipse (x+20,y-8+d,es2,es/2);
    fill (c3);
    triangle(x-25,y-2,x-35,y+8,x-35,y-15);
    strokeWeight(1);
};
function robbinp(a,b,xp) {
    fill (0, 0, 0);
    noStroke();
    ellipse (a,b,50,50);
    fill (227, 0, 0);
    ellipse (a,b+15,35,20);
    //eyes
    fill (255, 255, 255);
    ellipse (a-15,b-8,20,20);
    fill (0, 0, 0);
    ellipse (a-20,b-8,8,10);
    //other stuff
    stroke(0, 0, 0);
    fill(107, 40, 20);
    triangle(a-25,b+2,a-25,b-5,a-30,b+2-xp);
    triangle(a-25,b+2,a-23,b+8,a-30,b+2+xp);
    fill (0, 0, 0);
    noStroke();
    triangle(a+25,b-2,a+35,b+8,a+35,b-15);
};
function robbin(a,b,xp,i) {
    robbinp(a,b,xp);
    //actions
    if (ex>x-70&&ex<x+1&&ey>y-10&&ey<y+10){eo[i]=5;}
        else {eo=0;}
        if (ex[i]<350&&ex[i]>x-5&&ey[i]>y-10&&ey[i]<y+10){ex[i]-=8;}
        if (ex[i]<x+20&&ex[i]>x-20&&ey[i]>y-10&&ey[i]<y+10&&death===false&&blinktime<=0){dtext = "Your seed got eaten by\na robin.";blinktime=blinkmax;lifeamount-=1;}
        if (ex[i]<x+20&&ex[i]>x-20&&ey[i]>y-10&&ey[i]<y+10){x=ex[i];y=ey[i];}
        if (ex[i]<x+70&&ex[i]>x-1&&ey[i]<y+10&&ey[i]>y-10){ed[i]=c[4];}
        else {ed[i]=0;}
        ex[i]-=c[4];
        if (ex[i]<400&&ex[i]>x-5&&ey[i]<y){ey[i]+=2;}
        if (ex[i]<400&&ex[i]>x-5&&ey[i]>y){ey[i]-=2;}
};
function hawkp(a,b,xp) {
    //b+=eyu;
    noStroke();
    fill (255, 255, 255);
    triangle(a+35,b-2,a+15,b+c[1],a+15,b-15);
    fill (82, 33, 15);
    noStroke();
    ellipse (a,b,50,40);
    fill (212, 181, 157);
    ellipse (a-15,b,20,30);
    //eyes
    fill (255, 255, 255);
    ellipse (a-15,b-8,20,20);
    fill (0, 0, 0);
    rect (a-25,b-10,5,10,3);
    //other stuff
    stroke(0, 0, 0);
    strokeWeight(5);
    line (a-25,b-12,a-10,b-18);
    strokeWeight(1);
    fill(107, 40, 20);
    triangle(a-25,b+2,a-25,b-c[4],a-35,b+2-xp);
    triangle(a-25,b+2,a-23,b+8,a-30,b+2+xp);
    fill (161, 139, 106);
    noStroke();
    triangle(a+15,b,a,b+9,a,b-15);
};
function hawk(a,b,xp,i) {
    hawkp(a,b,xp);
        //actions
    if (ex[i]<ux+40&&ex[i]>ux-40&&ey[i]>uy-40&&ey[i]<uy+40&&death===false&&blinktime<=0){ dtext = "You got eaten by a\nhawk.";blinktime=blinkmax;lifeamount-=1;}
    ed[i]=c[5];
    ex[i]-=c[4];
    /*eyu [i]+=c[8];
    if (eyu[i]>50) {
        eyu +=1;
    }
    if (eyu[i]<-50) {
        eyu -=1;
    }*/

};
//frog
function frogp(a,b,xp) {
    fill (57, 138, 43);
    noStroke();
    ellipse (a,b,50,25);
    fill (100, 184, 83);
    ellipse (a,b+15,35,10);
    //other stuff
    fill(27, 82, 18);
    triangle(a-24,b+2,a-23,b-5,a-30,b+2-xp);
    triangle(a-24,b+2,a-20,b+8,a-30,b+2+xp);
    //eyes
    fill (255, 255, 255);
    ellipse (a-15,b-8,20,15);
    fill (0, 0, 0);
    ellipse (a-15,b-12,10,8);
};
function seagullp(a,b,xp) {
    fill (184, 184, 184);
    noStroke();
    ellipse (a,b,50,50);
    fill (255, 255, 255);
    ellipse (a,b+15,35,20);
    //eyes
    stroke(0);
    fill (255, 255, 255);
    ellipse (a-15,b-8,20,20);
    noStroke();
    fill (0, 0, 0);
    ellipse (a-20,b-8,8,10);
    //other stuff
    stroke(0, 0, 0);
    fill(23, 8, 4);
    triangle(a-25,b+2,a-25,b-5,a-30,b+2-xp);
    triangle(a-25,b+2,a-23,b+8,a-30,b+2+xp);
    fill (255, 255, 255);
    noStroke();
    triangle(a+25,b-2,a+35,b+8,a+35,b-15);
};
function kingfp(a,b,xp) {
    fill (30, 44, 102);
    noStroke();
    ellipse (a,b,50,50);
    fill (199, 153, 113);
    arc(a, b, 50, 50,247.3, 249.5);
    fill (255, 255, 255);
    ellipse (a,b+15,35,20);
    //eyes
    fill (255, 255, 255);
    ellipse (a-15,b-8,20,20);
    fill (0, 0, 0);
    ellipse (a-20,b-8,8,10);
    //other stuff
    stroke(0, 0, 0);
    fill(107, 40, 20);
    triangle(a-25,b+2,a-25,b-5,a-30,b+2-xp);
    triangle(a-25,b+2,a-23,b+8,a-30,b+2+xp);
    fill (199, 153, 113);
    noStroke();
    triangle(a+25,b-2,a+35,b+8,a+35,b-15);
    stroke(0, 0, 0);
    strokeWeight(2);
    line(a-30,b+2,a-30,b+40);
    fill(255, 0, 0,0);
    arc(a-33,b+2,5,8,200,360);
    stroke (0, 0, 0);
    fill (117, 82, 39);
    ellipse (a-30,b+46,10,10);
    fill (94, 184, 71);
    noStroke ();
    ellipse (a-30,b+42,5,8);
};
function enemies(i) {
    if (de ===true) {
    var ec = round (et[i]);
    if (ec===c[8]) {
    hawk(ex[i],ey[i],ed[i],i);
    }
    if (ec===2) {
    robbin(ex[i],ey[i],ed[i],i);
    }
    // universal actions
    if (ex[i]<-50) {if (distance<goal) {ex[i]=random(450,800); ey[i]=random(20,350);et[i]=random(c[8],2);eyu[i]=0;}if (distance>=goal) {
        de = false; win = true;
    }}}
};
function backdrop() {
    background (105, 214, 196);
    if (bx3>400) {bx3=0;}
    for (var i = -100;i<500;i+=100){
        image(grass,i-bx,300);
        image(rock,-bx2,250);
        image(tree,-bx2+r,250);
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
function drawmenu() {
    if (menu===true) {
        blinktime=0;
        bx3+=0.2;
        if (page===0) {
            backdrop();
            fill (168, 134, 92);
            textAlign(LEFT,BASELINE);
            textSize(60);
            noStroke();
            text ("BIRD      BAIT",5,80);
            textAlign(CENTER,BASELINE);
            owl(0,-140);
            if (mouseX>150&&mouseX<250&&mouseY>150&&mouseY<200){
            fill (140, 161, 194);
            }
            else {fill (69, 107, 173);}
            rect (150,150,100,50,20);
            textSize(35);
            fill(13, 57, 133);
            text ("PLAY",200,188);
            if (mouseX>150&&mouseX<250&&mouseY>210&&mouseY<260){
            fill (195, 147, 219);
            }
            else {fill (137, 68, 171);}
            rect (150,210,100,50,20);
            textSize(30);
            fill(207, 16, 80);
            text ("BIRDS",200,245);
            if (mouseX>95&&mouseX<305&&mouseY>270&&mouseY<320){
            fill (90, 158, 110);
            }
            else {fill (81, 128, 96);}
            rect (95,270,210,50,20);
            textSize(29);
            fill(27, 71, 25);
            text ("HOW TO PLAY",200,305);
            if (mouseX>130&&mouseX<270&&mouseY>375&&mouseY<400){
            fill (186, 135, 80);
            }
            else {fill (125, 75, 48);}
            rect (130,375,140,50,20);
            textSize(30);
            fill(132, 161, 126);
            text ("CREDITS",200,400);
            fill (160, 195, 219);
            textSize(25);
            text ("Updates",62,392);
            text ("Coming",342,392);
            fill (74, 146, 194);
            textSize(25);
            text ("Updates",60,390);
            text ("Coming",340,390);
            if (mouseX>5&&mouseX<120&&mouseY>370&&mouseY<400) {
                fill (70, 128, 123,200);
                rect(50,50,300,300);
                textAlign(LEFT,TOP);
                textSize(10);
                fill (255, 255, 255);
                text("4/14  On death screen it lists how you died.\n4/21  Added credits menu.\n4/22  Udated how to play page.\n4/28  added opacity slider.\n4/29  fixed mistake in credits.\n4/30  fixed opacity slider more.\n4/30  Added lives. Made levels and a goal.\n4/30  Added score. Remodled death screen.\n5/1   Added level screen. Made levels locked.\n5/2   Added lock image so you can tell which levels\nyou can do.\n5/2   fixed the level numbers. updated scoring.\n5/2   Added shortcuts. (m or right click to go to menu)\n5/3   Added pause menu. (p to pause)\n5/12 Updates Page and Coming Page.\n5/19 Fixed the pause menu glitch.\n5/21 Updated 'Birds' page.\n6/9   Fixed spelling mistakes and fixed birds page and credits.\n6/21 Fixed spelling mistakes.\n9/3   Fixed frame rate (for fast computers.)\n11/5 Fixed credits page and links.",55,55);
            }
            if (mouseX>280&&mouseX<395&&mouseY>370&&mouseY<400) {
                fill (70, 113, 128,200);
                rect(50,50,300,300);
                textSize(10);
                fill (255, 255, 255);
                textAlign(LEFT,TOP);
                text("Coming in Bird Bait 2 (already done)\n\n5/6   Made the animation for the pelican thing.\n5/19 Finished seagull.\n5/19 Made frog and updated a bunch of stuff.\n5/20 Finished frogs and made different enemies come on\nfurther levels.\n5/20 Fixed death glitches with multiple birds and fixed ground\ncrashing.\n6/10 Made next/restart button on win/death screen.\n6/12 Updated stats and win screen. Added pelican to game.\n\nPlanning on making.\n\nMaking new bird animations\nFinishing all the birds on the Birds page.\nMaking a store so you can spend points.\nMake free play mode.\nMake better color changer.",55,55);
            }
            //\n\nGames coming (In progress)\n\nMath Ninja\nCollision (This game may come out before Bird Bait 2)\nI have been working on it a lot.\nBarrant
            textAlign(CENTER,BASELINE);
            fill (149, 145, 250);
            rect (40-round(score/10)/8,-20,120+round(score/10)/4,40,20);
            rect (240-round(score/10)/8,-20,120+round(score/10)/4,40,20);
            fill (252, 252, 252);
            textSize (15);
            text ("SCORE = "+round(score),100,15);
            text ("LEVEL = "+levunlock,300,15);
            textAlign(LEFT,BASELINE);

        }
        ///birds page..//
        if (page===2) {
            backdrop();
            fill (128, 107, 70,200);
            rect(50,50,300,300);
            if (mouseX>150&&mouseX<250&mouseY>325&&mouseY<375) {
            fill(168, 69, 69);
            }
            else {fill(122, 24, 24);}
            rect(150,325,100,50,20);
            textSize(30);
            fill (0, 0, 0);
            text("MENU",155,360);
            robbinp(200,100,0);
            hawkp(300,100,0);
            you(100,100,0,0);
            seagullp(100,250,0);
            frogp(300,250,0);
            kingfp(200,250,0);
            fill (3, 3, 3);
            textSize(15);
            text("Hover over a bird to read about it.",100,70);
            textSize(20);
            text("you",85,140);
            text("robin",180,140);
            text("hawk",277,140);
            text("seagull",70,220);
            text("frog",282,220);
            text("K.F.",184,222);
            fill (143, 103, 33,210);
            rect (100,10,200,40,20);
            fill (0, 0, 0);
            textSize(30);
            text("Change Color",110,40);
            textSize(25);
            fill (42, 74, 21);
            text("Coming In Bird Bait 2",70,190);
            if (mouseIsPressed&&mouseX>100&&mouseX<300&&mouseY>10&&mouseY<50&&mouseButton===LEFT){
                page=4;
            }
            if (mouseX>75&&mouseX<125&&mouseY>75&&mouseY<125){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(25,25,150,150);
                textSize(15);
                fill(0, 0, 0);
                noStroke();
                text("This bird is your\nfriend. It loves seeds\nand this can come\nin handy when leading\nit away from danger.",30,45);
            }
            if (mouseX>175&&mouseX<225&&mouseY>75&&mouseY<125){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(125,25,150,150);
                textSize(15);
                fill(0, 0, 0);
                noStroke();
                text("This bird is a robin.\nIt is a nice bird but it\ntoo likes seeds. It has\nno interest in hurting\nyour bird, however, if\nit eats the seed you\nhave nothing to lead\nyour bird with.",130,45);
            }
            if (mouseX>275&&mouseX<325&&mouseY>75&&mouseY<125){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(225,25,150,150);
                textSize(15);
                fill(0, 0, 0);
                noStroke();
                text("This is a hawk.\n(despite it's strange\nlooks.) It hunts other\nsmall birds and you\nmust be careful to\nstay away. But hawks\ndon't like seeds so\nthat's good.",230,45);
            }
            if (mouseX>75&&mouseX<125&&mouseY>225&&mouseY<275){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(25,185,150,150);
                textSize(15);
                fill(0, 0, 0);
                noStroke();
                text("This is a seagull. He\nseems to always\nhave diarrhea and is\nusully pooping every-\nwhere. Oh, and his\npoop is very acidic so\nbe careful!     Ps.\nHe also likes seeds.",30,200);
            }
            if (mouseX>275&&mouseX<325&&mouseY>225&&mouseY<275){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(225,185,152,150);
                textSize(15);
                fill(0, 0, 0);
                noStroke();
                text("Say hi to the frog.\nDon't worry about him.\nHe just hops along the\nbottom of the screen.\nOh, wait, if he hits you\nhe grabs on and\nweighs you down.",230,200);
            }
            if (mouseX>175&&mouseX<225&&mouseY>225&&mouseY<275){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(125,185,150,150);
                textSize(15);
                fill(0, 0, 0);
                noStroke();
                text("See that fisher bird?\nHe will try to bait your\nbird to his hook. You\nmust get another bird\nto eat the bait before\nyour bird is caught. If\nhe hooks your bird,\nfeed him your seed.\n",130,200);
                textSize(10);
                text("(you will not lose health.)",130,330);
            }
        }
        //how to play page..//
        if (page===1){
            backdrop();
            fill(34, 97, 18,200);
            rect(50,50,300,300);
            if (mouseX>150&&mouseX<250&mouseY>325&&mouseY<375) {
            fill(87, 166, 75);
            }
            else {fill(16, 92, 5);}
            rect(150,325,100,50,20);
            textSize(30);
            fill (0, 0, 0);
            text("MENU",155,360);
            textSize(20);
            text("Click the screen to move the\nseed. The seed will move to\nwhere you clicked. Your bird,\n(the one that starts on the left),\nwill move toward the seed.\nguide your bird away from\ndanger. Do not let the seed\nget eaten, either by enemies\nor by your own bird. To see\nwhich birds do what, go to the\nbirds page.",70,80);
            if (mouseX>75&&mouseX<320&&mouseY>60&&mouseY<130){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(25,25,350,110);
                textSize(15);
                fill(0, 0, 0);
                noStroke();
                text("He will move towards that thing.          It is a seed.",30,45);
                you(100,80,0,0);
                stroke (0, 0, 0);
                fill (117, 82, 39);
                ellipse (300,60,10,10);
                stroke(58, 138, 61);
                strokeWeight(5);
                fill (94, 184, 71);
                line(150,80,260,65);
                line(250,80,260,65);
                line(245,50,260,65);
                strokeWeight(1);
                noStroke ();
                ellipse (300,60-c[2],5,8);
            }
            if (mouseX>75&&mouseX<320&&mouseY>130&&mouseY<170){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(125,75,150,150);
                textSize(15);
                fill(0, 0, 0);
                noStroke();
                text("This is you.",165,110);
                you(200,150,0,0);

            }
            if (mouseX>75&&mouseX<320&&mouseY>170&&mouseY<250){
                fill (27, 82, 24,240);
                stroke(0, 0, 0);
                rect(25,135,350,110);
                textSize(15);
                fill(0, 0, 0);
                textAlign(RIGHT,BASELINE);
                noStroke();
                text("Your bird will eat\nyour seed if it\ngets too close.\nKeep your bird\naway from\nhawks.",370,150);
                textAlign(LEFT,BASELINE);
                you(100,165,0,5);
                hawkp(250,220,0);
                stroke (0, 0, 0);
                fill (117, 82, 39);
                ellipse (140,165,10,10);
                strokeWeight(1);
                noStroke ();
                fill (94, 184, 71);
                ellipse (140,165-c[2],5,8);
                stroke(58, 138, 61);
                strokeWeight(5);
                line(160,165,260,165);
                line(250,180,262,165);
                line(250,150,262,165);
                stroke(255, 0, 0);
                line(120,215,200,215);
                line(130,230,118,215);
                line(130,200,118,215);
                strokeWeight(1);
            }
        }
        //credits page
        if (page===c[2]) {
            backdrop();
            fill(21, 18, 97,200);
            rect(50,50,300,300);
            if (mouseX>150&&mouseX<250&mouseY>325&&mouseY<375) {
            fill(153, 92, 173);
            }
            else {fill(117, 58, 140);}
            rect(150,325,100,50,20);
            textSize(30);
            fill (0, 0, 0);
            noStroke();
            text("MENU",155,360);
            textSize(30);
            textAlign(CENTER,CENTER);
            textLeading(60);
            text("Uncle Snail Games\nKhan Academy\nAll talent provided\nby God",200,190);
            textSize (20);
            textLeading(20);
            fill(64, 98, 148);
            text("All code and ideas are original and\ncreated by Uncle Snail Games.\n\nI learned how to program on Khan\nand built this in their builder.\n\n\nGod gave me a talent and I would\n\nlike to use that to glorify Him.",200,210);
            textSize(11);
            fill (147, 179, 219);
            text("Thanks to IronKnight@ChaseWolff and Rose(Emberpaw) for\nideas and help debugging. (Click for links to their profiles.)",200,70);
            textAlign(LEFT,BASELINE);
        }
    }
    //colors page
    if (page===4) {
        var x = -50;
        backdrop();
        fill(42, 70, 140,220);
        rect (50,100+x,300,100,30);
        fill (37, 33, 138);
        rect (100,80+x,200,40,10);
        if (mouseX>80&&mouseX<130&&mouseY>75&&mouseY<125){fill (179, 205, 224);}
        else {fill (94, 168, 247);}
        rect (80,125+x,50,50,20);
        if (mouseX>144&&mouseX<194&&mouseY>75&&mouseY<125){fill (179, 144, 113);}
        else {fill (150, 107, 74);}
        rect (144,125+x,50,50,20);
        if (mouseX>206&&mouseX<256&&mouseY>75&&mouseY<125){fill (252, 116, 116);}
        else {fill (219, 33, 9);}
        rect (206,125+x,50,50,20);
        if (mouseX>270&&mouseX<320&&mouseY>75&&mouseY<125){fill (245, 208, 122);}
        else {fill (217, 189, 141);}
        rect (270,125+x,50,50,20);
        fill (255);
        textAlign (CENTER,TOP);
        textSize(30);
        noStroke();
        text ("Pick a Bird",200,84+x);
        fill(41, 94, 42,220);
        rect (25,240+x,350,150,30);
        fill (114, 189, 110);
        rect (100,190+x,200,60,10);
        if (menu===true&&page===4&&mouseX>150&&mouseY>365+x&&mouseX<250&&mouseY<415+x) {
            fill (68, 133, 58);
        }
        else {
        fill (114, 189, 110);
        }
        rect (150,365+x,100,50,20);
        if (menu===true&&page===4&&mouseX>170&&mouseY>420+x&&mouseX<230&&mouseY<445+x) {
            fill (68, 133, 58);
        }
        else {
        fill (114, 189, 110);
        }
        rect (170,420+x,60,25,10);
        fill (255);
        text ("Custom Color",200,204+x);
        fill (255);
        text ("PLAY",200,375+x);
        textSize (15);
        text ("Go to the birds page to change your color later.",200,250+x);
        text ("HELP",200,425+x);
        you(200,320+x,0,0);
        fill (68, 159, 171);
        text ("opacity",200,215);
        var x1 = 150;
        var x2 = 250;
        var y1 = 235;
            var mx2 = map(mx3,x1,x2,10,255);
            var xx = constrain (mx3,x1,x2);
            stroke(0);
            strokeWeight(1);
            line(x1, y1, x2, y1);
            fill (c1);
            ellipse(xx, y1,10,10);
            if (mouseIsPressed&&mouseX>x1-5&&mouseX<x2+5&&mouseY>y1-5&&mouseY<y1+5&&mouseButton===LEFT) {
                mx3 = mouseX;
            }
        bopac =mx2;
        textAlign(LEFT,BASELINE);
    }
    if (page === 5) {
        backdrop();
        textSize (40);
        textAlign(CENTER,CENTER);
        fill(42, 70, 140,220);
        rect (50,50,300,200,30);
        fill (37, 33, 138);
        rect (100,30,200,40,10);
        // level selector
        for (var l = 0; l<la; l++) {
            for (var ll = 0;ll<2;ll++) {
                if (mouseX>55+l*60&&mouseX<105+l*60&&mouseY>75+ll*60&&mouseY<125+ll*60){fill (150-l*5, 205, 220+ll*20);}
            else {fill (94+l*5-ll*25, 168-ll*30, 247-l*10-ll*10);}
            rect (55+l*60,75+ll*60,50,50,20);
            fill (255-l*10,233,255);
            text (l+1+ll*5,80+l*60,100+ll*60);
            if (mouseIsPressed&&mouseX>55+l*60&&mouseX<105+l*60&&mouseY>75+ll*60&&mouseY<125+ll*60&&l+1+ll*5<=levunlock&&mouseButton===LEFT) {
                blob=l+1+ll*5;
            }
            if (l+ll*5>=levunlock) {
                fill (66, 98, 194);
                rect (54+l*60,74+ll*60,52,52,20);
                stroke (255, 255, 255);
                strokeWeight(5);
                line (65+l*60,85+ll*60,95+l*60,115+ll*60);
                line (95+l*60,85+ll*60,65+l*60,115+ll*60);
                noStroke();
                strokeWeight(1);
            }
            }
        }
        fill (125, 201, 255);
        textSize (30);
        fill (255);
        noStroke();
        text ("Pick a Level",200,50);
        fill (0,0,0,240);
        rect (20,300,360,90,20);
        fill (237, 81, 33);
        rect (120,285,160,30,20);
        fill (255);
        textSize(20);
        if (blob===0) {
            text ("Classic game",200,300);
            textSize (15);
            text ("The classic game is how the game was originaly\ndesigned. It has an infinate track with 5 birds per flock.\nYou can get as many points as your distance\non this level. (points = 1/2 distance)",200,350);
        }
        else {
            text ("Level "+blob,200,300);
            textSize (15);
            text ("There are "+ba+" birds per flock.",200,350);
            text ("You must travel "+goal+" yards to win.",200,330);
            text ("Max amount of points you may earn here is "+(goal+25+(blob*5)),200,370);
        }
        if (menu===true&&page===5&&mouseX>120&&mouseY>190&&mouseX<280&&mouseY<220) {fill (145, 204, 222);}
        else {fill (94, 168, 247);}
        rect (120,190,160,30,20);
        fill (255);
        textSize(20);
        text ("Classic game",200,205);
        if (menu===true&&page===5&&mouseX>150&&mouseY>225&&mouseX<250&&mouseY<275) {fill (68, 133, 58);}
        else {fill (114, 189, 110);}
        rect (150,225,100,50,20);
        fill (255);
        if (rtime===0) {
            textSize (30);
            text ("NEXT",200,250);
        }
        if (rtime>0) {
            textSize (30);
            text ("PLAY",200,250);
        }
        textSize (15);

        textAlign(LEFT,BASELINE);
    }
};

function stats() {
    var showspot = map (distance,0,goal,20,200);
    var ssp = constrain (showspot,20,200);
    fill (84, 49, 26);
    textSize(15);
    if (blob===0){
        fill (119, 235, 112);
        rect (-20,-20,150,40,20);
        fill (0);
        text ("distance = " + round(distance),10,15);
    }
    else {
        fill(85, 196, 85);
        stroke(85, 196, 85);
        strokeWeight(3);
        line(20,15,200,15);
        noStroke();
        fill(c2);
        ellipse (204,11,5,8);
        fill(c3);
        ellipse (196,13,5,10);
        fill(c1);
        ellipse (200,13,5,8);
        fill (112, 70, 33);
        stroke(166, 123, 85,200);
        strokeWeight(1);
        arc(200,15,15,15,-20,200);
        fill(85, 196, 85);
        noStroke();
        ellipse(ssp,15,dotsize,dotsize);
        if (distance>=goal) {
            dotsize=18;
        }
        else{
            dotsize=15;
        }
    }
    if (blinktime>14||(blinktime<7&&blinktime>0)){
        fill (138, 122, 255,200);
    }
    else {
        fill (71, 57, 176);
    }
    rect (225,-15,155,35,20);
    fill(0);
    text ("SEEDS",240,15);
    for (var i = 0;i<lifeamount;i+=1){
        stroke (0, 0, 0);
        fill (117, 82, 39);
        ellipse (300+i*15,10,10,10);
        fill (94, 184, 71);
        noStroke ();
        ellipse (300+i*15,10-c[2],5,8);
    }
};
function deathscreen() {
    if (death === true) {
        fill (130, 23, 23,200);
        rect (50,50,300,280);
        if (mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
            fill (61, 116, 235);
        }
        else {fill (34, 69, 156);}
        rect (150,300,100,50,20);
        fill (53, 179, 162);
        textSize(30);
        text("MENU",155,338);
        textSize(25);
        fill (255, 255, 255);
        text ("You traveled\n" + round(distance) + " yards!\nYou gained "+round(levelscore/2)+" points",60,200);
        textLeading(25);
        text (dtext,60,80);
        movement=false;
    }
};
function winscreen() {
    if (win===true) {
        fill (120, 173, 219,200);
        rect (50,50,300,280);
        if (mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
            fill (61, 116, 235);
        }
        else {fill (34, 69, 156);}
        rect (150,300,100,50,20);
        fill (175, 230, 222);
        textSize(30);
        noStroke();
        text("MENU",155,338);
        textSize(25);
        fill (255);
        text ("You gained " + levelscore+" points.",60,200);
        textLeading(40);
        textSize(30);
        text ("You beat level "+blob+"\nwith "+lifeamount+" seeds left.",60,80);
        movement=false;
    }
};
function pausemenu() {
    if (pause ===true) {
        textAlign(CENTER,BASELINE);
        fill (120, 173, 219,20);
        rect (50,50,300,280);
        if (mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
            fill (61, 116, 235);
        }
        else {fill (34, 69, 156);}
        rect (150,300,100,50,20);
        if (mouseX>140&&mouseX<260&&mouseY>245&&mouseY<295){
            fill (61, 116, 235);
        }
        else {fill (34, 69, 156);}
        rect (140,245,120,50,20);
        fill (175, 230, 222);
        textSize(30);
        noStroke();
        text("PLAY",200,338);
        text("RETRY",200,280);
        textSize(25);
        fill (255);
        text ("Your current score for\nthis level is " + levelscore+" points.",200,200);
        textLeading(40);
        textSize(30);
        text ("PAUSED\nlevel "+blob+"\nyou have "+lifeamount+" seeds left.",200,80);
        movement=false;
        textAlign(LEFT,BASELINE);
    }
};
//game
function drawgame() {
    if (game===true){
        levelscore=round((lifeamount*5)+distance+(blob*5));
        if (keys[80]&&death===false&&win===false) {
            pause = true;
            game = false;
        }
        //seed
        if (mouseIsPressed&&movement===true&&mouseButton===LEFT) {
    xm = mouseX;
    ym = mouseY;
}
var mx = lerp (x,xm,s);
var my = lerp (y,ym,s);
if (movement===true) {
x = mx;
y = my;
}
if (lifeamount<=0) {
    death=true;
}
if (blinktime>0) {
    blinktime-=1;
    bopac=100;
}
//////////// background ////////
backdrop ();
stats();
if (distance<goal) {
    bx+=bspeed;
    bx2+=bspeed;
    bx3+=bspeed/4;
}
else {
    bx3+=0.2;
}
if (death===false&&distance<goal) {
distance+=bspeed/100;//distance count
}
if (bx>100) {bx=0;}
if (bx2>400) {bx2=random (-400,-600); r=random(100,300);}
//seed
stroke (0, 0, 0);
fill (117, 82, 39);
ellipse (x,y,10,10);
fill (94, 184, 71);
noStroke ();
ellipse (x,y-c[2],5,8);
/////////////////////////  you
you (ux,uy,d,o);
if (movement===true) {
if (ux<x){ux+=0.5;}
if (ux>x){ux-=4;}
if (uy<y){uy+=4;}
if (uy>y){uy-=4;}
}
if (ux>x-70&&ux<x+1&&uy>y-10&&uy<y+10){o=c[4];}
else {o=c[5];}
if (ux>x-40&&ux<x+5&&uy>y-10&&uy<y+10){ux+=6;}
if (ux>x-20&&ux<x+30&&uy>y-10&&uy<y+10&&death===false&&blinktime<=0){dtext="Your seed got eatten by\nyour bird.";blinktime=blinkmax;lifeamount-=1;}
//enemies//                                         enemy for variable
for (var i = 0; i<ba; i++) {
    enemies(i);
}
    }
    deathscreen();///deathscreen.
    winscreen ();
};
//draw loop
function draw() {
    if (blob===0){
    goal = distance+1;
    ba=5;
}
//levels
if (blob===1){
    goal=20;
    ba=2;
}
if (blob===2){
    goal=25;
    ba=3;
}
if (blob===3){
    goal=50;
    ba=3;
}
if (blob===4){
    goal=60;
    ba=4;
}
if (blob===5){
    goal=60;
    ba=5;
}
if (blob===6){
    goal=70;
    ba=6;
}
if (blob===7){
    goal=50;
    ba=7;
}
if (blob===8){
    goal=40;
    ba=8;
}
if (blob===9){
    goal=50;
    ba=9;
}
if (blob===10){
    goal=60;
    ba=10;
}
//keyboard shortcuts
if (keys[77]) {
    menu=true;
    game=false;
    page=0;
    pause=false;
}
    drawgame();
    drawmenu();
    pausemenu();
};
