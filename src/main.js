const canvas = document.createElement('canvas')
const wrapperEl = document.getElementById('wrapper')
const w = document.documentElement.clientWidth

canvas.width = w < 400 ? 400 : w
canvas.height = canvas.width;

wrapperEl.appendChild(canvas)

const ctx = canvas.getContext('2d')

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Ball {
  constructor () 
  {
    this.size = 5
    
    this.wrapper = {
      height: canvas.height - this.size * 2,
      width: canvas.width - this.size * 2
    }

    this.velocity = {
      x: 5,
      y: 3
    }

    this.cords = {
      x: getRandom(0, this.wrapper.width),
      y: getRandom(0, this.wrapper.height),
    }

    if (!(this.cords.x % this.wrapper.width)) {
      this.cords = this.cords + (this.cords.x ? -1 : 1)
    }

    if (!(this.cords.y % this.wrapper.height)) {
      this.cords = this.cords + (this.cords.x ? -1 : 1)
    }

    setInterval(() => {
      if (this.cords.x <= 0 || this.cords.x >= this.wrapper.width) {
        this.velocity.x = this.velocity.x / -1
      }
      if (this.velocity.x > 0) {
        this.cords.x++
      }
      else if (this.velocity.x < 0) {
        this.cords.x--
      }
      this.render()
    }, Math.abs(this.velocity.x))

    setInterval(() => {
      if (this.cords.y <= 0 || this.cords.y >= this.wrapper.height) {
        this.velocity.y = this.velocity.y / -1
      }
      if (this.velocity.y > 0) {
        this.cords.y++
      }
      else if (this.velocity.y < 0) {
        this.cords.y--
      }
      this.render()
    }, Math.abs(this.velocity.y))
  }

  render () {
    resetCanvas()
    ctx.fillStyle = this.color || '#0069fd'
    ctx.beginPath()
    ctx.arc(this.cords.x + this.size, this.cords.y + this.size, this.size, 0, Math.PI * 2)
    // ctx.fillRect(this.cords.x, this.cords.y, this.width, this.height)
    score.innerText = `Pos(${this.cords.x}, ${this.cords.y}) Speed(${this.velocity.x}, ${this.velocity.y}) px/ms`
    ctx.fill()
    ctx.closePath()
  }
}

function resetCanvas ()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#fdfdfd'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const ball = new Ball()

ball.render()