import Color from "color";
import getRandom from "./utils/getRandom";

export default class Ball {
  constructor(options = {}) {
    this.cords = { x: 0, y: 0 };
    this.size = options.size ?? 5;
    this.velocityX = options.velocityX ?? 3;
    this.velocityY = options.velocityY ?? 4;
    this.color = Color(options.color ?? "#0032fd")
      .rgb()
      .toString();
    this.isCircle = options.isCircle ?? true;
    this.wrapper = {
      width: options.wrapperWidth,
      height: options.wrapperHeight,
    };

    if (!this.color)
      throw new Error("Invalid color format provided: " + this.color);

    if (options.wrapperWidth && options.wrapperHeight) {
      this.init(options.wrapperWidth, options.wrapperHeight);
    }
  }

  get safeWrapper() {
    return {
      width: this.wrapper.width - this.size * 2,
      height: this.wrapper.height - this.size * 2,
    };
  }

  init(wrapperWidth, wrapperHeight) {
    this.cords = {
      x: getRandom(0, wrapperWidth),
      y: getRandom(0, wrapperHeight),
    };

    return this;
  }

  move() {
    this.moveX();
    this.moveY();

    return this;
  }

  moveX() {
    if (this.collisionX) {
      if (this.velocityX < 0 && this.cords.x <= 0) {
        this.velocityX = Math.abs(this.velocityX); // Reverse direction
      } else if (this.velocityX > 0 && this.cords.x >= this.safeWrapper.width) {
        this.velocityX = -Math.abs(this.velocityX); // Reverse direction
      }
    }
    this.cords.x += this.velocityX;

    return this;
  }

  moveY() {
    if (this.collisionY) {
      if (this.velocityY < 0 && this.cords.y <= 0) {
        this.velocityY = Math.abs(this.velocityY); // Reverse direction
      } else if (this.velocityY > 0 && this.cords.y >= this.safeWrapper.height) {
        this.velocityY = -Math.abs(this.velocityY); // Reverse direction
      }
    }
    this.cords.y += this.velocityY;

    return this;
  }

  get collision() {
    return this.collisionX || this.collisionY;
  }

  get collisionX() {
    return Boolean(
      this.cords.x <= 0 || this.cords.x >= this.safeWrapper.width
    );
  }

  get collisionY() {
    return Boolean(
      this.cords.y <= 0 || this.cords.y >= this.safeWrapper.height
    );
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    if (this.isCircle) {
      ctx.arc(
        this.cords.x + this.size,
        this.cords.y + this.size,
        this.size,
        0,
        Math.PI * 2
      );
      ctx.fill();
    } else {
      ctx.fillRect(
        this.cords.x,
        this.cords.y,
        this.size * 2,
        this.size * 2
      );
    }
    ctx.closePath();

    return this;
  }
}