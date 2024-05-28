class BlackLine {
  constructor(x, y, w, h, adjustW) {
    this.x = x; //x coordinate
    this.y = y; //y coordinate
    this.w = w; //width
    this.h = h; //height
    this.adjustW = adjustW; //width adjustment
  }

  draw(hue, sizeMultiplier) {
    push(); //Save the current drawing state
    translate(this.x, this.y); //Translate to the specified position
    rotate(-28); //Rotate by -28 degrees
    noStroke(); //Remove the stroke
    fill(hue, 100, 100); // Set fill color

    rect(0, 0, (this.w + this.adjustW) * sizeMultiplier, this.h * sizeMultiplier); //Draw the rectangle

    pop(); //Restore the previous drawing state
  }
}

class DrawFunction {
  constructor(x, y, rotation, lines, config) {
    this.x = x; //x coordinate
    this.y = y; //y coordinate
    this.rotation = rotation; //rotation angle
    this.lines = lines; //number of lines
    this.config = config; //configuration function
  }

  draw(hue, sizeMultiplier) {
    push(); //Save the current drawing state
    translate(this.x, this.y); //Translate to the specified position
    rotate(this.rotation); //Rotate by the specified angle
    
    for (let i = 0; i < this.lines; i++) {
      this.config(i, hue, sizeMultiplier); //Call the configuration function to draw each line
    }
    pop(); //Restore the previous drawing state
  }
}

let referenceWidth = 1280; //Reference width
let referenceHeight = 720; //Reference height
let song; //Audio object
let fft; //FFT object
let button; //Button object
let isPlaying = false; //Playing state flag

function preload() {
  song = loadSound('assets/lovestory.mp3'); //Preload audio file
}

function setup() {
  createCanvas(windowWidth, windowHeight); //Create canvas
  colorMode(HSB, 360, 100, 100); //Set color mode to HSB
  angleMode(DEGREES); //Set angle mode to degrees

  fft = new p5.FFT(); //Create FFT object
  button = createButton('play/pause'); //Create play/pause button
  button.position(width / 2 - button.width / 2, height - 50); //Set button position
  button.mousePressed(togglePlayPause); //Add click event to button
}

function draw() {
  colorMode(RGB); //Set color mode to RGB
  background(247, 241, 223); //Set background color

  let scaleFactor = min(width / referenceWidth, height / referenceHeight); //Calculate scaling factor
  translate(width / 2, height / 2); //Translate to the center of the canvas
  scale(scaleFactor); //Scale the canvas
  translate(-referenceWidth / 2, -referenceHeight / 2); //Translate to the top-left corner of the reference size

  colorMode(HSB, 360, 100, 100); //Set color mode to HSB
  let hue = (frameCount % 360); //Dynamically change the hue for gradient animation

  let spectrum = fft.analyze(); //Get the frequency spectrum
  let sizeMultiplier = map(spectrum[10], 0, 255, 0.5, 2); //Calculate size multiplier based on spectrum data

  //Create multiple BlackLine objects
  let blackLines = [
    new BlackLine(280, 731, 190, 4, 4),
    new BlackLine(338, 755, 960, 4, 4),
    new BlackLine(112, 659, 210, 6, 6),
    new BlackLine(128, 666, 210, 6, 6),
    new BlackLine(140, 672, 210, 6, 6),
    new BlackLine(308, 525, 505, 10, -12),
    new BlackLine(336, 540, 505, 10, -12),
    new BlackLine(436, 595, 45, 8, -12),
    new BlackLine(460, 610, 17, 8, -12)
  ];

  //Create multiple DrawFunction objects
  let drawFunctions = [
    new DrawFunction(68, 575, -28, 22, (i, hue, sizeMultiplier) => {
      noFill(); //No fill
      stroke(hue, 100, 100); //Set stroke color
      let y = i * 6 * sizeMultiplier; //Calculate y coordinate
      let x1 = 0 + i * 4.5 * sizeMultiplier; //Calculate x1 coordinate
      let x2 = 480 - i * 3.7 * sizeMultiplier; //Calculate x2 coordinate
      line(x1, y, x2, y); //Draw line
    }),
    new DrawFunction(843, 154, -28, 57, (i, hue, sizeMultiplier) => {
      if (i >= 20 && i < 33) {
        noStroke(); //No stroke
      } else {
        noFill(); //No fill
        stroke(hue, 100, 100); //Set stroke color
      }
      let y = i * 6 * sizeMultiplier; //Calculate y coordinate
      let x1 = 0 - i * 4 * sizeMultiplier; //Calculate x1 coordinate
      let x2 = 69 + i * 3.3 * sizeMultiplier; //Calculate x2 coordinate
      line(x1, y, x2, y); //Draw line
      if (i == 7 || i == 13) {
        noStroke(); //No stroke
        fill(hue, 100, 100); //Set fill color
        if (i == 7) {
          rect(x1, y, 80 * sizeMultiplier, 10 * sizeMultiplier); //Draw rectangle
          rect(x2, y, 260 * sizeMultiplier, 10 * sizeMultiplier); //Draw rectangle
        } else if (i == 13) {
          rect(x1, y, 124 * sizeMultiplier, 8 * sizeMultiplier); //Draw rectangle
          rect(x2, y, 260 * sizeMultiplier, 10 * sizeMultiplier); //Draw rectangle
        }
      } else if (i == 17) {
        noStroke(); //No stroke
        fill(hue, 100, 100); //Set fill color
        rect(x1, y, 154 * sizeMultiplier, 6 * sizeMultiplier); //Draw rectangle
      }
    }),
    new DrawFunction(153, 530, -28, 54, (i, hue, sizeMultiplier) => {
      noFill(); //No fill
      stroke(hue, 100, 100); //Set stroke color
      let y = i * 6 * sizeMultiplier; //Calculate y coordinate
      let x1 = 0 + i * 4 * sizeMultiplier; //Calculate x1 coordinate
      let x2 = x1 + 50 * sizeMultiplier; //Calculate x2 coordinate
      line(x1, y, x2, y); //Draw line
    }),
    new DrawFunction(238, 712, -28, 20, (i, hue, sizeMultiplier) => {
      if (i >= 10 && i < 14) {
        noStroke(); //No stroke
      } else {
        noFill(); //No fill
        stroke(hue, 100, 100); //Set stroke color
      }
      let y = i * 6 * sizeMultiplier; //Calculate y coordinate
      let x1 = 0 + i * 5 * sizeMultiplier; //Calculate x1 coordinate
      let x2 = x1 + 1280 * sizeMultiplier; //Calculate x2 coordinate
      line(x1, y, x2, y); //Draw line
    }),
    new DrawFunction(144, 609, -28, 2, (i, hue, sizeMultiplier) => {
      noFill(); //No fill
      stroke(hue, 100, 100); //Set stroke color
      let y = i * 24 * sizeMultiplier; //Calculate y coordinate
      let x1 = 0 + i * 16 * sizeMultiplier; //Calculate x1 coordinate
      let x2 = x1 + 1200 * sizeMultiplier; //Calculate x2 coordinate
      line(x1, y, x2, y); //Draw line
    }),
    new DrawFunction(94, 651, -28, 9, (i, hue, sizeMultiplier) => {
      noFill(); //No fill
      stroke(hue, 100, 100); //Set stroke color
      let y = i * 6 * sizeMultiplier; //Calculate y coordinate
      let x1 = 0 + i * 5 * sizeMultiplier; //Calculate x1 coordinate
      let x2 = 440 - i * 3 * sizeMultiplier; //Calculate x2 coordinate
      line(x1, y, x2, y); //Draw line
    }),
    new DrawFunction(812, 423, -28, 1, (i, hue, sizeMultiplier) => {
      noStroke(); //No stroke
      fill(hue, 100, 100); //Set fill color
      rect(0, 0, 311 * sizeMultiplier, 5 * sizeMultiplier); //Draw rectangle
    })
  ];

  blackLines.forEach(line => line.draw(hue, sizeMultiplier)); //Draw black lines
  drawFunctions.forEach(drawFunc => drawFunc.draw(hue, sizeMultiplier)); //Draw draw functions
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //Adjust canvas size
}

function togglePlayPause() {
  if (isPlaying) {
    song.pause(); //Pause playback
  } else {
    song.play(); //Start playback
  }
  isPlaying = !isPlaying; //Toggle playing state
}

