import { addMouseListeners, addResizeCanvasListener, animation, clearCanvas, mouse, onMouseDragg, scale, startAnimation } from "@apjs/dynamic"


class Particle {

  x: number
  y: number
  z: number
  angle: number

  constructor(x: number, y: number, z: number, angle: number) {
    this.x = x
    this.y = y
    this.z = z
    this.angle = angle
  }
}
const canvas = document.querySelector("canvas")!
const ctx = canvas.getContext("2d")!
let focalLenght = 100
let  particles: Particle[] = [],
  numParticles = 200,
  centerZ = 2000,
  radius = 500,
  baseAngle = 0,
  rotationSpeed = 0.01


addResizeCanvasListener(canvas)
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight

  ctx.restore()
  particles = []
  for (let i = 0; i < numParticles; i++) {
    let angle = 0.2 * i

    particles.push(new Particle(
      Math.cos(angle + baseAngle) * radius,
      2000 - 4000 / numParticles * i + Math.random() * 500,
      centerZ + Math.sin(angle + baseAngle) * radius,
      0.2 * i
    ))
  }

}

addMouseListeners()
onMouseDragg(()=>{
  if(!mouse.x) return
  rotationSpeed = (mouse.x - innerWidth / 2) * 0.00005

})

function animate() {

  clearCanvas(ctx)
  ctx.save()
  ctx.translate(innerWidth / 2, innerHeight / 2);

  baseAngle += rotationSpeed;

  
  ctx.beginPath()

  for (let i = 0; i < numParticles; i++) {
    let particle = particles[i],
      perspective = focalLenght / (focalLenght + particle.z)

    ctx.save()
    scale(ctx, perspective)
    ctx.translate(particle.x, particle.y)

    ctx.lineTo(particle.x, particle.y)


    ctx.restore()

    particle.x = Math.cos(particle.angle + baseAngle) * radius
    particle.z = centerZ + Math.sin(particle.angle + baseAngle) * radius
  }
  
  ctx.stroke()

  ctx.restore()
}

init()
animation.animate(animate)
startAnimation()