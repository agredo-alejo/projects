// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// Changes made by @agredoalejo

class Pipe {
  constructor() {
    this.centery = random(spacing, height-spacing) 

    this.top = this.centery - spacing / 2;
    this.bottom = height - (this.centery + spacing / 2)
  
    this.x = width
   
    this.w = pipesWidth;
 
    this.speed = 5
  }

  hits(bird) {
    if ((bird.positionY - size) <= this.top || (bird.positionY + size) > (height - this.bottom)) {
      if (birdXPosition > this.x && birdXPosition < this.x + this.w) return true
    }
    return false;
  }
  draw() {
    // Bottom pipe
    fill(0,200,0)
    rect(this.x, height - this.bottom, this.w, this.bottom);
    
    // Top pipe
    fill(0,200,0)
    rect(this.x, 0, this.w, this.top);
    
  }
  update() {
    this.x -= this.speed;
  }
  offscreen() {
    if (this.x < -this.w) return true
    return false
  }
}