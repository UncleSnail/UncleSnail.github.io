// Ported by Caleb Marcoux from my original program on Khan Academy.
// https://www.khanacademy.org/computer-programming/planet-explorer/5870857777250304
// The original resolution was 600 x 600, so some elements may not display correctly.
// To preserve authenticity, as little code as possible was changed.

/**Galaxy retention variables**/
//Create an array of hashes for storing the planet data.


var planets;
var planetCount;
var galaxyImage;
var selectedPlanet;//The index of the selected planet.

/**Name generation code: **/
var planetNames;
var plantNames;
var raceNames;
var rockNames;
var vowels;
var consonates;

//planet creation index
var i;
//Buffers
var planetImageBuffer;
var planetThumbnailBuffer;
var planetMineralBuffer;
var randomPlanet;

function setup(){
  canvas = createCanvas(600, 600);
  canvas.parent('planet-explorer-app');

  planets = [];
  planetCount = 10;
  galaxyImage = "none";
  selectedPlanet = 0;//The index of the selected planet.

  imageMode(CENTER);
  angleMode = "radians";

  /**Name generation code: **/
  planetNames = {
      beginning: ["stel","arch","kript","chript","stine","mal","pal","stal","tar","nish","pish","shish","ack","ach","ump","amp","sal","ast","pant","uln","shike","orb","ort","ost","zilt","pet","sut"],
      middle: ["ar","anth","in","ish","uln","ant","at","ob","om","spar","rob","um","uz","az","ab"],
      end: ["is","a","ise","ize","pite","cite","ic","i","pi","si","ine","pal","oni","ony","ose","nose","zane","zant","zan"]
  };
  plantNames = {
      beginning: ["hu","pu","su","mu","moo","ma","sa","ca","ka","ba","bu","buba","bubu","shi","shisi","pa","pi","cra","sahra","do","doo","du","da","dada","puff"],
      middle: ["ckle","le","sle","cup","bun","mle","she","he","me","ma","sa","hu","ine"],
      end: ["berry","fruit","nut","bun","flower","pome","mellon","apple","grape","seed","fluff","puff","cone","grass","drupe","capsule","loment","samara"],
      title: ["bush","tree","plant","shrub","vine","weed","herb"],
      describer: ["sweet","bitter","sour","thorny","spicy","tangy","wild","zesty","unsightly","smelly","harty","tough","annual","aromatic","aged","barren","bushy","bienial","creeping","dense","delicious","hard","dwarf","ephermeral","etiolated","exotic","extinct","fertile","flowering","giant","herbaceous","indigenous","leafy","lush","luxuriant","native","mature","natualized","natural","organic","oil-bearing","parasitic","perennial","petrified","pigmy","poisonous","polymorphous","potted","rank","scorched","scrubby","shrubby","succulent","temperate","tender","thick","thirsty","tolerant","trailing","vigorous","withered","wilted","woody","blooming","fruiting","deep-rooted","shallow-rooted","hard-rooted","long-stemmed","Syrupy","Sugary","Minty","Nectarous","Rubbery","Juicy","Acidic","Tart","Tender","Skinless","barkless","lean","dry","wholesome","lumpy","fine","refined","ambrosial","nutty","salty","caramelized","sugar-coated"]
  };
  raceNames = {
      beginning: ["nth","nt","ln","lt","pt","sh","te"],
      middle: ["chi","miz"],
      end: ["ans","ites","anders"],
      fillers: ["zu","lu","cu","ach","shu","shi","si","zi","mi","mik","kim","ca"]
  };
  rockNames = {
      beginning: ["min","di","em","to","pan","am","op","cy","si","gom","her","sc","and","peg","qu"],
      middle: ["er","am","az","th","st","or","es","ar"],
      end: ["al","ond","ium","rate","old","ite","yst","ire","oid"],
      title: ["rock","stone","dust","crystal"]
  };
  vowels = ["a","e","i","o","u","y"];
  consonates = ["q","w","r","t","p","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];

  //planet creation index
  i = 0;
  //Buffers
  planetImageBuffer = "empty";
  planetThumbnailBuffer = "empty";
  planetMineralBuffer = "empty";
  randomPlanet;
  noLoop();
}

function generateName(strings, beginning, middle, end) {
    var outputName = "";
    if (beginning) {
        outputName += strings.beginning[round(random(0,strings.beginning.length-1))];
    }
    if (middle) {
        outputName += strings.middle[round(random(0,strings.middle.length-1))];
    }
    if (end) {
        outputName += strings.end[round(random(0,strings.end.length-1))];
    }
    return outputName;
};
function generatePlanetName(strings) {
    var outputName = "";
    var beginning = true;
    var middle = true;
    var end = true;
    var twoWords = false;
    do {//always do once,then if twoWords gets set to true, run it again. This means names can be more than two words long.
        twoWords = false;
        if (round(random(0,10)) === 0) {
            beginning = false;
        }
        if (round(random(0,2)) === 0) {
            middle = false;
        }
        if (round(random(0,5)) === 0) {
            end = false;
        }

        outputName+=generateName(strings,beginning,middle,end);


        if (round(random(0,5)) === 0) {
            twoWords = true;
            outputName+= " ";
        }

        //if there are no more words to the name, have a possibility of adding a number to the end.
        if (twoWords === false && round(random(0,10))===0) {
            outputName+= " ";
            var addedNumber = random(0,999);
            if (round(random(0,2))===0) {//maybe round number completely
                addedNumber = round(addedNumber);
            }
            else if (round(random(0,1))===0) {//round to 2 places.
                addedNumber*=100;
                addedNumber = round(addedNumber);
                addedNumber/=100;
            }
            else {//round to 1 place.
                addedNumber*=10;
                addedNumber = round(addedNumber);
                addedNumber/=10;
            }
            outputName+= addedNumber;
        }

        //check to make sure that there is a name
        if (outputName === ""||outputName === " ") {
            twoWords = true;//then run it again.
        }
    }
    while (twoWords===true);
    return outputName;
};
function generatePlantName(strings) {
    var outputName = "";
    var beginning = true;
    var middle = true;
    var end = true;
    var twoWords = false;

    if (round(random(0,2)) === 0) {//add adjective (ex: "sweet")
        outputName += strings.describer[round(random(0,strings.describer.length-1))];
        outputName += " ";
    }

    //Still need to fix this loop. Came from planet names
    do {//always do once,then if twoWords gets set to true, run it again. This means names can be more than two words long.
        twoWords = false;
        if (round(random(0,10)) === 0) {
            beginning = false;
        }
        if (round(random(0,5)) === 0) {
            middle = false;
        }
        if (round(random(0,2)) === 0) {
            end = false;
        }

        outputName+=generateName(strings,beginning,middle,end);


        if (round(random(0,6)) === 0) {
            twoWords = true;
            outputName+= " ";
        }

        //check to make sure that there is a name
        if (outputName === ""||outputName === " ") {
            twoWords = true;//then run it again.
        }
    }
    while (twoWords===true);

    if (round(random(0,1)) === 0) {//add suffix (ex: "bush")
        outputName += " ";
        outputName += strings.title[round(random(0,strings.title.length-1))];
    }

    return outputName;
    //return generateName(strings,true,true,true);
};
function generateRaceName(strings) {
    var outputName = "";
    var beginning = true;
    var middle = true;
    var end = true;
    var twoWords = false;

    //possible beginning before repeated sounds.
    if (round(random(0,2))!==0) {//beginning
        outputName += consonates[round(random(0,consonates.length-1))];
        outputName += vowels[round(random(0,vowels.length-1))];
        outputName += strings.beginning[round(random(0,strings.beginning.length-1))];
    }

    //possibility of repeating base sounds (fillers like zu and lu)
    while (round(random(0,0.6))!==0) {//filler
        outputName += strings.fillers[round(random(0,strings.fillers.length-1))];
    }

    if (round(random(0,2))!==0) {//middle
        outputName += strings.middle[round(random(0,strings.middle.length-1))];
    }
    return outputName;
};
function generateRockName(strings) {
    var outputName = "";
    outputName += generateName(strings,true,true,true);
    return outputName;
};
/**End name generation code**/

/**Crystal generation code**/
function generateCrystal(w, h, offset,variation,mainColor,shineOffset,resolution) {
    var point = createVector(round(random(20,w-20)),0);
    var bottom = {
        l : createVector(round(random(0+variation,(w/2)-5)),h),
        r : createVector(round(random((w/2)+5,w-variation)),h)
    };
    var middle = {
        l : createVector(0,round(random((h*offset)-variation,(h*offset)+variation))),
        r : createVector(w,round(random((h*offset)-variation,(h*offset)+variation)))
    };
    var center = createVector(point.x+round(random(-variation,variation)),((middle.r.y+middle.l.y)/2)+round(random(-variation,variation)));
    var crystal = createGraphics(w,h);
    crystal.background(255, 255, 255,0);
    crystal.fill (mainColor[0],mainColor[1],mainColor[2]);
    crystal.noStroke();

    //main body
    crystal.beginShape();
    crystal.vertex(bottom.l.x,bottom.l.y);
    crystal.vertex(middle.l.x,middle.l.y);
    crystal.vertex(point.x,point.y);
    crystal.vertex(middle.r.x,middle.r.y);
    crystal.vertex(bottom.r.x,bottom.r.y);
    crystal.endShape();

    //bottom left
    crystal.fill (mainColor[0]+10,mainColor[1]+10,mainColor[2]+10);
    crystal.beginShape();
    crystal.vertex(bottom.l.x,bottom.l.y);
    crystal.vertex(middle.l.x,middle.l.y);
    crystal.vertex(center.x,center.y);
    crystal.vertex(w/2,h);
    crystal.endShape();

    //top left
    crystal.fill (mainColor[0]+40,mainColor[1]+40,mainColor[2]+40);
    crystal.beginShape();
    crystal.vertex(center.x,center.y);
    crystal.vertex(middle.l.x,middle.l.y);
    crystal.vertex(point.x,point.y);
    crystal.endShape();

    //top right
    crystal.fill (mainColor[0]+15,mainColor[1]+15,mainColor[2]+15);
    crystal.beginShape();
    crystal.vertex(center.x,center.y);
    crystal.vertex(middle.r.x,middle.r.y);
    crystal.vertex(point.x,point.y);
    crystal.endShape();

    //bottom right
    crystal.fill (mainColor[0]+2,mainColor[1]+2,mainColor[2]+2);
    crystal.beginShape();
    crystal.vertex(bottom.r.x,bottom.r.y);
    crystal.vertex(middle.r.x,middle.r.y);
    crystal.vertex(center.x,center.y);
    crystal.vertex(w/2,h);
    crystal.endShape();

    return crystal;
};
function generateCrystalStructure(w,h,crystalNumber,secondaryCrystalNumber) {
    var crystal = createGraphics(w,h);
    crystal.background(255, 255, 255,0);
    var col = [random(0,255),random(0,255),random(0,255)];
    var offset = random(1/16,1/3);
    for (var i = 0; i < crystalNumber; i ++) {
        var hueOffsetAmount = 10;
        var wide = random((w/4)-i*10,(w/2)-i*10);
        var high = random(h-i*50-h/8,h-(h/4)-i*50-h/8);
        var valueOffset = random(-30,30);
        var hueOffset = [random(-hueOffsetAmount,hueOffsetAmount),random(-hueOffsetAmount,hueOffsetAmount),random(-hueOffsetAmount,hueOffsetAmount)];
        crystal.push();
        crystal.translate(w/2,h-h/8);
        crystal.rotate(random(-0.2-(i*0.2),0.2+(i*0.2)));
        crystal.image(generateCrystal(wide,high,offset,10,[col[0]+valueOffset+hueOffset[0], col[1]+valueOffset+hueOffset[1], col[2]+valueOffset+hueOffset[2]],1,30),-wide/2,-high);
        crystal.pop();
    }//main gems
    for (var i = 0; i < secondaryCrystalNumber; i ++) {//bottom gems
        var o = (w/2)/secondaryCrystalNumber;
        var hueOffsetAmount = 10;
        var wide = random((w/15),(w/10));
        var high = random(h-h*0.95,h-h*0.8);
        var valueOffset = random(-30,30);
        var hueOffset = [random(-hueOffsetAmount,hueOffsetAmount),random(-hueOffsetAmount,hueOffsetAmount),random(-hueOffsetAmount,hueOffsetAmount)];
        crystal.push();
        crystal.translate(w/4+i*o,h-h/8);
        crystal.scale(1-abs(random(0-(i*(1/secondaryCrystalNumber)),1-(i*(1/secondaryCrystalNumber)))));//small on edges
        crystal.rotate(random(-1+(i*(2/secondaryCrystalNumber)),0+(i*(2/secondaryCrystalNumber))));//more tilted on edges
        crystal.image(generateCrystal(wide,high,offset,5,[col[0]+valueOffset+hueOffset[0], col[1]+valueOffset+hueOffset[1], col[2]+valueOffset+hueOffset[2]],1,30),-wide/2,-high);
        crystal.pop();
    }
    return crystal;
};
/**End crystal generation code**/

/**Planet generation code**/
function createPlanet(size,color1,color2,rings,ringColor1,ringColor2,ringSizeFactor,ringNumber,ringTilt) {
    //if rings would enter planet.
    if ((ringNumber*2)>(size/ringSizeFactor)) {
        ringNumber = 10;
    }
    var ringRotation = random(0,16);
    var ringTilt = random(ringTilt[0],ringTilt[1]);//divide size by this for ring height.
    var ringColors = [];
    for (var i = 0; i < ringNumber; i ++) {
        ringColors[i] = color(lerpColor(ringColor1,ringColor2,random(0,1)));
    }//set ring colors
    //size+1 to avoid clipping
    var planet = createGraphics(size+1,size+1);
    planet.background(0,0,0,0);

    //Rings (back)
    if (rings) {
        planet.push();
        planet.translate(size/2,size/2);
        planet.rotate(ringRotation);

        for (var i = 0; i < ringNumber; i ++) {
            var lightness = random (0,255);
            planet.noFill();
            planet.stroke(ringColors[i]);
            planet.strokeWeight(2);
            planet.arc(0,0,size-5-i*2,(size-i*2)/ringTilt,3.2,6.4);
        }
        planet.pop();
    }
    //End rings

    //Main planet
    planet.push();
    planet.translate(size/2,size/2);

    //if rings, make planet smaller (to fit on canvas)
    if (rings) {
        size = size/2;
    }

    //base w/ shading
    planet.noStroke();
    for (var i = 0; i < 100; i ++) {
        planet.fill(lerpColor(color1,color2,i/100));
        planet.ellipse(0-(i/5),0-(i/5),size-i,size-i);
    }

    //variations
    strokeCap(ROUND);
    for (var i = 0; i < size+size/2; i ++) {
        var lightness = random (0,255);
        planet.noFill();
        planet.stroke(lightness, lightness, lightness,random(0.1,3));
        planet.strokeWeight(1+(i/25));
        planet.arc(0,0,size-(i-(i/2)),size-(i-(i/2)),random(1,8),random(1,8));
    }

    //Squiggles


    planet.pop();
    //End main planet

    //Rings (front)
    //(size*ringSizeFactor = original input size.
    if (rings) {
        planet.push();
        planet.translate((size*ringSizeFactor/2),(size*ringSizeFactor/2));
        planet.rotate(ringRotation);

        for (var i = 0; i < ringNumber; i ++) {
            var lightness = random (0,255);
            planet.noFill();
            planet.stroke(ringColors[i]);
            planet.strokeWeight(2);
            planet.arc(0,0,size*ringSizeFactor-5-i*2,(size*ringSizeFactor-i*2)/ringTilt,0,3.2);
        }

        planet.pop();
    }
    //End rings

    return planet;
};//updated for transparency
function randomColor(baseColor,toneVariation,valueVariation) {
    var tone = [random(-toneVariation,toneVariation),random(-toneVariation,toneVariation),random(-toneVariation,toneVariation)];
    var value = random(-valueVariation,valueVariation);
    var outputColor = [0,0,0];
    if (baseColor === undefined) {
        return color(random(0,255),random(0,255),random(0,255));
    }
};
function createRandomPlanet(size) {
    var baseColor = randomColor();
    var highlightColor = randomColor();
    var ringColor = randomColor();
    var ringHighlightColor = randomColor();

    if (size === undefined) {
        size = random(75,125);
    }

    //Pick white or black sometimes.
    if (round(random(0,25))===0) {
        highlightColor = color (255);
    }
    if (round(random(0,25))===0) {
        highlightColor = color (0);
    }
    if (round(random(0,25))===0) {
        ringColor = color (255);
    }
    if (round(random(0,25))===0) {
        ringColor = color (0);
    }
    if (round(random(0,50))===0) {
        ringColor = color (255);
        ringHighlightColor = color (117, 184, 255);
    }

    return {
        size: size,
        image: createPlanet(size,baseColor,highlightColor,round(random(0,1)),ringColor,ringHighlightColor,2,random(5,50),[1,6]),
        baseColor: baseColor,
        highlightColor: highlightColor,
        ringColor: ringColor,
        ringHighlightColor: ringHighlightColor
        };
};
/**End planet generation code**/

/**Galaxy generation Code**/
function generateRoundStar(starSize,starColor,randomAmount) {
    var star = createGraphics(starSize+40,starSize+40);//added 40 to offset scale difference with other star!

    star.background(0, 0, 0, 0);

    star.push();
    star.translate(starSize/2+20,starSize/2+20);//added 20 to offset scale difference with other star!

    for (var i = 0; i < 25; i ++) {
        star.noStroke();
        star.fill(starColor[0]+i+random(-randomAmount,randomAmount),starColor[1]+i+random(-randomAmount,randomAmount),starColor[2]+i+random(-randomAmount,randomAmount), 10);
        star.ellipse(0,0,random(2,starSize),random(2,starSize));
    }

    star.pop();
    return star;
};
function generateGlowStar(starSize,starColor,randomAmount,glowAmount,resolution,glowStrength) {
    var star = createGraphics(starSize+glowAmount*2,starSize+glowAmount*2);

    star.background(0, 0, 0, 0);

    star.push();
    star.translate(starSize/2+glowAmount,starSize/2+glowAmount);

    for (var i = 0; i < resolution; i ++) {
        star.noStroke();
        star.fill(starColor[0]+50,starColor[1]+50,starColor[2]+50, glowStrength);
        star.ellipse(0,0,starSize+i*glowAmount/resolution,starSize+i*glowAmount/resolution);//glow

        star.fill(starColor[0]+(i*(250/resolution)),starColor[1]+(i*(250/resolution)),starColor[2]+(i*(250/resolution)));
        star.ellipse(0-(i/resolution)*starSize/4,0-(i/resolution)*starSize/4,starSize-i*(starSize/resolution),starSize-i*(starSize/resolution));//main star
    }

    star.pop();
    return star;
};
function generateSpiral(w,h,col,border,starSize,spiralEnd,starGap,randomAmount,rotation) {
    var spiral = createGraphics(w+border*2,h+border*2);

    spiral.background(0,0,0,0);

    var edgeColor = [15,79,231];

    //createVector(cos(i)*(r+bump),sin(i)*(r+bump))

    spiral.push();
    spiral.translate(w/2+border,h/2+border);
    spiral.rotate(rotation);

    spiral.colorMode(HSB);
    spiral.noStroke();
    spiral.fill(edgeColor[0],edgeColor[1],edgeColor[2]);
    var starImages = [generateRoundStar(starSize,[col[0],col[1],col[2]],91), generateGlowStar(10,[col[0],col[1],col[2]],10,20,5,5)];
    for (var i = 0; i < spiralEnd; i += starGap) {
        var size = random(1,starSize);
        var randomSpread = random(0,i/randomAmount);
        var spread = random(2,i/randomAmount)+randomSpread;
        spiral.fill(col[0],col[1],col[2]);
        //spiral.ellipse(cos(i)*(i/10+spread),sin(i)*(i/10+spread),size,size);
        spiral.imageMode(CENTER);
        spiral.image(starImages[round(random(0,starImages.length-1))], cos(i)*(i/10+spread),sin(i)*(i/10+spread),size,size);
    }
    spiral.colorMode(RGB);

    spiral.pop();

    return spiral;
};
/**End galaxy generation Code**/

/**Planet Explorer Functions**/
function displayPlanets() {
    //image(galaxyImage, width/2, height/2);
    for (var j = 0; j < planets.length; j ++) {
        var planet = planets[j];
        var xPos = width/2;
        var yPos = height/2;
        xPos = (cos(planet.orbitAngle)*planet.orbitRadius)+(width/2);
        yPos = (sin(planet.orbitAngle)*planet.orbitRadius)+(height/2);
        /*
        push();
            translate(width/2,height/2);
            rotate(planet.orbitAngle);
            //translate(planet.orbitRadius,0);
            scale(0.1,0.1);
            image(planet.planetImage, planet.orbitRadius*10, 0);
        pop();
        */
        //Display planet orbits
        /*
        fill (0,0,0,0);
        stroke(255,255,255,50);
        ellipse(width/2,height/2,planet.orbitRadius*2,planet.orbitRadius*2);
        */
        image(planet.planetThumbnail, xPos, yPos);
        planets[j].orbitAngle+=PI/1000*planet.orbitSpeed;
    }
};
function displayPlanet(planet) {
    stroke(170, 155, 176);
    strokeWeight(3);
    fill (52, 75, 102,240);
    rect (50,250,width-100,height-300);
    image (planet.planetImage, width/2, 200);
    fill (255, 255, 255);
    textAlign(LEFT, TOP);
    textSize(25);
    noStroke();
    text (planet.name, 60, 260);
    textSize(15);

    //left column
    textAlign(LEFT, TOP);
    var infoTextLeft = "Primary tribe: " +
    planet.tribe + "\n" +
    "Primary foliage types: ";
    for (var j = 0; j < planet.plants.length; j++) {
        infoTextLeft += "\n\t-" + planet.plants[j];
    }
    text (infoTextLeft, 60, 360);
    //right column
    textAlign(RIGHT, TOP);
    var infoTextRight = "Age: " + round(planet.age*100)/100 +
    " yrs\nSpeed: " + round(planet.orbitSpeed*10000)/100 + "kph" +
    "\nOrbit radius: " + round(planet.orbitRadius*100)/100 + "km" +
    "\nSize: " + planet.size + "km" +
    "\nValuable mineral: " + planet.mineral;
    text (infoTextRight, width-60, 360);
    stroke(170, 155, 176);

    image (planet.mineralImage, width-150, height-100);

    scale(600/400);
    translate(-100,-200);
    stroke(170, 155, 176);
    fill (20, 29, 56);
    rect (width/2-50, height-75, 100, 50);
    fill (181, 181, 181);
    textAlign (CENTER, CENTER);
    textSize (20);
    noStroke();
    text ("Close", width/2, height-50);

    stroke(170, 155, 176);
    fill (20, 29, 56);
    rect (width/2+55, height-75, 50, 50);
    fill (181, 181, 181);
    textAlign (CENTER, CENTER);
    textSize (20);
    noStroke();
    text (">", width/2+80, height-50);

    stroke(170, 155, 176);
    fill (20, 29, 56);
    rect (width/2-105, height-75, 50, 50);
    fill (181, 181, 181);
    textAlign (CENTER, CENTER);
    textSize (20);
    noStroke();
    text ("<", width/2-80, height-50);
};

function mouseClicked() {
    resizeCanvas(400, 400);
    if (selectedPlanet === "none") {
        selectedPlanet = 0;
    }
    if ((mouseX >= width/2-50 && mouseX <= width/2+50) && (mouseY >= height-75 && mouseY <= height-25) && selectedPlanet !== "none") {
        selectedPlanet = "none";
    }
    if ((mouseX >= width/2+55 && mouseX <= width/2+105) && (mouseY >= height-75 && mouseY <= height-25) && selectedPlanet !== "none") {
        if (selectedPlanet < planets.length-1) {
            selectedPlanet ++;
        }
        else {
            selectedPlanet = 0;
        }
    }
    if ((mouseX <= width/2-55 && mouseX >= width/2-105) && (mouseY >= height-75 && mouseY <= height-25) && selectedPlanet !== "none") {
        if (selectedPlanet > 0) {
            selectedPlanet --;
        }
        else {
            selectedPlanet = planets.length - 1;
        }
    }
    resizeCanvas(600, 600);
};

function draw() {
    background(5, 21, 36);
    scale(400/600);

    /*if (galaxyImage === "none") {
        var galaxyBuffer = createGraphics(width,height);
        galaxyBuffer.background(0,0,0,0);
        galaxyBuffer.image(generateSpiral(400,400,[254,207,245],50,14,1000,0.5,20,random(0,8)),0,0);
        galaxyBuffer.image(generateSpiral(400,400,[158,154,296],50,18,1000,0.5,20,random(0,8)),0,0);
        galaxyBuffer.image(generateSpiral(400,400,[260,118,175],50,20,1000,0.5,20,random(0,8)),0,0);
        galaxyImage = galaxyBuffer;
        return;
    }*/

    if (planets.length <= planetCount) {
        //Loading galaxy screen
        textAlign(CENTER,CENTER);
        textSize(12);
        fill (252, 252, 252);
        noStroke();
        text("loading, please wait, this may take a while...",width/2,height/2);
        fill (186, 182, 186);
        textSize(10);
        text("If it isn't finished after a minute, please let me know in the tips and thanks, so I can try to find a solution.",width/2-150,height/2+100,300,100);
        fill (4, 15, 26);
        rect (width/2-100,height/2+20,200,20);
        fill (174, 170, 247);
        rect (width/2-100,height/2+20,map(planets.length,0,planetCount,0,200),20);

        textAlign(CENTER,CENTER);
        textSize(11);
        fill(213, 199, 222);
        if (planetImageBuffer === "empty") {
            text("Generating planet texture", width/2, height/2+60);
            randomPlanet = createRandomPlanet(random(200, 400));
            planetImageBuffer = randomPlanet.image;
            return;
        }
        else if (planetThumbnailBuffer === "empty") {
            text("Generating planet thumbnail", width/2, height/2+60);
            //planetThumbnailBuffer = createPlanet(randomPlanet.size/5,randomPlanet.baseColor,randomPlanet.highlightColor,round(random(0,1)),randomPlanet.ringColor,randomPlanet.ringHighlightColor,2,random(5,50),[1,6]);
            //planetThumbnailBuffer = randomPlanet.image;
            var thumbnailBuffer = createGraphics(randomPlanet.size/4+2,randomPlanet.size/4+2);
            thumbnailBuffer.push();
            thumbnailBuffer.scale(0.25);
            thumbnailBuffer.background(0,0,0,0);
            thumbnailBuffer.image(planetImageBuffer,1,1);
            thumbnailBuffer.pop();
            planetThumbnailBuffer = thumbnailBuffer;
            return;
        }
        else if (planetMineralBuffer === "empty") {
            text("Generating planet mineral", width/2, height/2+60);
            planetMineralBuffer = generateCrystalStructure(100, 100, 3, random(5, 30));
            return;
        }

        var plants = [];
        for (var j = 0; j < 5; j++) {
            plants.push(generatePlantName(plantNames));
        }
        text("Compiling planet", width/2, height/2+60);
        planets.push({
            name: generatePlanetName(planetNames),
            planetImage: planetImageBuffer,
            planetThumbnail: planetThumbnailBuffer,
            plants: plants,
            tribe: generateRaceName(raceNames),
            mineral: generateRockName(rockNames),
            mineralImage: planetMineralBuffer,
            orbitRadius: random(50,250),
            orbitSpeed: random(0,2),
            orbitAngle: random(0, 2*PI),
            age: random(0,100000),
            size: round(random(1000,1000000))
        });

        //Clear the buffers.
        planetImageBuffer = "empty";
        planetThumbnailBuffer = "empty";
        planetMineralBuffer = "empty";

        i++;
        return;
    }

    displayPlanets();
    if (selectedPlanet !== "none") {
        displayPlanet(planets[selectedPlanet]);
    }
    else {
        fill(255);
        textAlign(CENTER,BASELINE);
        textSize(12);
        noStroke();
        text("Click to view planet info.",width/2,height-5);
    }
};
