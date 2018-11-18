class Vec {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(w, h) {
    this.pos = new Vec();
    this.size = new Vec(w, h);
  }
  get left() {
    return this.pos.x - this.size.x / 2;
  }
  get right() {
    return this.pos.x + this.size.x / 2;
  }
  get top() {
    return this.pos.y - this.size.y / 2;
  }
  get bottom() {
    return this.pos.y + this.size.y / 2;
  }
}

class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vec();
  }
}

class Pong {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d");

    this.ball = new Ball();
    this.ball.pos.x = 100;
    this.ball.pos.y = 50;

    this.ball.vel.x = 100;
    this.ball.vel.y = 100;

    let lastTime;
    const callback = (millis) => {
      if (lastTime) {
        this.update((millis - lastTime) / 1000);
      }
      lastTime = millis;
      requestAnimationFrame(callback);
    };
    callback();
  }

  update(dt) {
    this.ball.pos.x += this.ball.vel.x * dt;
    this.ball.pos.y += this.ball.vel.y * dt;

    if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
      this.ball.vel.x = -this.ball.vel.x;
    }
    if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
      this.ball.vel.y = -this.ball.vel.y;
    }

    this._context.fillStyle = "#000";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._context.fillStyle = "#fff";
    this._context.fillRect(
      this.ball.pos.x,
      this.ball.pos.y,
      this.ball.size.x,
      this.ball.size.y
    );
  }
}

const canvas = document.getElementById("pong");
const pong = new Pong(canvas);
// const c = canvas.getContext("2d");

// const ball = new Ball();
// ball.pos.x = 100;
// ball.pos.y = 50;

// ball.vel.x = 100;
// ball.vel.y = 100;

// let lastTime;
// function callback(millis) {
//   if (lastTime) {
//     update((millis - lastTime) / 1000);
//   }
//   lastTime = millis;
//   requestAnimationFrame(callback);
// }

// function update(dt) {
//   ball.pos.x += ball.vel.x * dt;
//   ball.pos.y += ball.vel.y * dt;

//   if (ball.left < 0 || ball.right > canvas.width) {
//     ball.vel.x = -ball.vel.x;
//   }
//   if (ball.top < 0 || ball.bottom > canvas.height) {
//     ball.vel.y = -ball.vel.y;
//   }

//   c.fillStyle = "#000";
//   c.fillRect(0, 0, canvas.width, canvas.height);

//   c.fillStyle = "#fff";
//   c.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
// }

// callback();
