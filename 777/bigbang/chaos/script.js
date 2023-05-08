var w,
  h,
  amount,
  clicked = false,
  ctx = c.getContext("2d"),
  inGame = false,
  cells = [],
  cellsExplored = [],
  settings = Settings(),
  nextInit = false,
  killTimer,
  expColor,
  expImg;

function restart() {
  nextInit = true;
  if (!inGame) init();
}

function Settings() {
  return {
    maxSize: 14,
    minSize: 1,
    maxSpeed: 4,
    speedExplosionX: 0,
    speedExplosionY: 0,
    firstExplosionDegree: 3,
    stepExplosion: 3,
    maxSizeExp: 8,
    composite: "lighter",
    limitParticles: 1500,
    restart: restart
  };
}

function getRandomColor(min) {
  return {};
}

function checkExplosion(a, b) {
  if (b.exploded) return;

  var distX = a.x - b.x,
    distY = a.y - b.y,
    dist = Math.sqrt(distX * distX + distY * distY) - b.size / 2;
  dist <= a.explosionSize && b.explode();
}

function generateFireBall(w, h, a, r, g, b) {
  r = parseInt(r);
  r = isNaN(r) || r > 255 ? 255 : r;
  g = parseInt(g);
  g = isNaN(g) || g > 255 ? 255 : g;
  b = parseInt(b);
  b = isNaN(b) || b > 255 ? 255 : b;

  var tempCanvas = document.createElement("canvas");

  tempCanvas.width = w;
  tempCanvas.height = h;

  var imgCtx = tempCanvas.getContext("2d");
  var gradient = imgCtx.createRadialGradient(
    w / 2,
    h / 2,
    0,
    w / 2,
    h / 2,
    w / 2
  );

  function applyMask(value, mask) {
    value = Math.abs(((value * mask) / 255) | 0);
    return value < 256 ? value : 255;
  }

  gradient.addColorStop(
    0,
    "rgba(" + [applyMask(r, 255), applyMask(g, 255), applyMask(b, 255), a] + ")"
  );
  gradient.addColorStop(
    0.3,
    "rgba(" +
      [applyMask(r, 182), applyMask(g, 249), applyMask(b, 245), a * 0.2] +
      ")"
  );
  gradient.addColorStop(
    0.4,
    "rgba(" +
      [applyMask(r, 202), applyMask(g, 246), applyMask(b, 254), a * 0.3] +
      ")"
  );
  gradient.addColorStop(
    0.6,
    "rgba(" +
      [applyMask(r, 152), applyMask(g, 217), applyMask(b, 239), a * 0.05] +
      ")"
  );
  gradient.addColorStop(
    0.88,
    "rgba(" +
      [applyMask(r, 10), applyMask(g, 128), applyMask(b, 153), a * 0.05] +
      ")"
  );
  gradient.addColorStop(
    0.93,
    "rgba(" +
      [applyMask(r, 17), applyMask(g, 218), applyMask(b, 254), a * 0.1] +
      ")"
  );
  gradient.addColorStop(
    0.98,
    "rgba(" +
      [applyMask(r, 183), applyMask(g, 254), applyMask(b, 251), a * 0.2] +
      ")"
  );
  gradient.addColorStop(
    1,
    "rgba(" + [applyMask(r, 17), applyMask(g, 223), applyMask(b, 254), 0] + ")"
  );

  imgCtx.fillStyle = gradient;
  imgCtx.fillRect(0, 0, w, h);

  return tempCanvas;
}

function Cell(size, x, y) {
  var c = (this.color = getRandomColor(settings.minColor));
  this.img = canvas_utils.colorize(
    canvas_utils.resources.images.particle,
    (c.r = 184),
    (c.g = 244),
    (c.b = 255),
    1.5
  );

  this.expImg = generateFireBall(64, 64, 1, 255, c.g, c.b);

  var m =
      settings.maxSize > settings.minSize ? settings.maxSize : settings.minSize,
    mm = m === settings.maxSize ? settings.minSize : settings.maxSize;
  this.size = size || Math.random() * (m - mm) + mm;
  this.initSize = this.size;
  this.x = x || Math.random() * w;
  this.y = y || Math.random() * h;
  this.vx = Math.random() * settings.maxSpeed * 2 - settings.maxSpeed;
  this.vy = Math.random() * settings.maxSpeed * 2 - settings.maxSpeed;
  this.exploded = false;
  this.explosionSize = settings.maxSizeExp / 4;
  this.expV = settings.stepExplosion;
}

function rand(max, min) {
  min = min || 0;
  return Math.random() * (max - min) + min;
}

Cell.prototype.update = function () {
  var s = this.size * 2,
    s2 = s / 2;

  if (!this.exploded) {
    ctx.moveTo(this.x, this.y);
  }

  this.x += this.vx * rand(rand(5));
  this.y += this.vy * rand(rand(5));

  if (this.x < 0 || this.x > w) {
    this.vx *= -1;
    this.x = this.x > 0 ? w : 0;
  }
  if (this.y < 0 || this.y > h) {
    this.vy *= -1;
    this.y = this.y > 0 ? h : 0;
  }

  if (!this.exploded) {
    ctx.lineTo(this.x, this.y);
    ctx.drawImage(this.img, this.x - s2, this.y - s2, s, s);
    return;
  }

  this.explosionSize += (this.expV / this.explosionSize) * 20;

  if (this.size > 0) {
    this.size -= 0.05;
  }

  if (this.explosionSize > settings.maxSizeExp * 2) {
    this.expV *= -1;
    this.vx *= 0;
    this.vy *= 0;
  } else if (this.explosionSize < 0) {
    cellsExplored.splice(cellsExplored.indexOf(this), 1);
    return;
  }

  s =
    this.explosionSize *
    (this.now && this.now--
      ? 8
      : 1 * (settings.firstExplosionDegree - (this.now || 0)) || 1);

  if (this.now === undefined) {
    cells.splice(cells.indexOf(this), 1);
    cellsExplored.push(this);
  }

  this.now = this.now || settings.firstExplosionDegree;
  s2 = s / 2;

  ctx.drawImage(this.expImg, this.x - s2, this.y - s2, s, s);

  var l = cells.length;
  while (l--) checkExplosion(this, cells[l]);
};

Cell.prototype.explode = function () {
  this.exploded = true;
  this.vx *= settings.speedExplosionX;
  this.vy *= settings.speedExplosionY;
};

function click(e) {
  if (!inGame) init();
  else if (clicked) nextInit = true;
  else {
    e = e.touches && e.touches.length ? e.touches[0] : e;
    var cell = new Cell(settings.maxSize, e.pageX, e.pageY);
    cells.push(cell);
    cell.explode();
    clicked = true;
  }
}



function anim() {
  if (nextInit) {
    nextInit = false;
    return init();
  }

  if (inGame) window.requestAnimationFrame(anim);

  ctx.save();

  ctx.globalCompositeOperation = "destination-out";

  ctx.fillStyle = "rgba(0, 0, 0, .2)";
  ctx.globalAlpha = 0.2;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";

  ctx.fillStyle = "none";
  ctx.strokeStyle = "#fff";
  ctx.beginPath();

  var l = cells.length;
  while (l--) cells[l].update();

  l = cellsExplored.length;
  while (l--) cellsExplored[l].update();

  ctx.stroke();
  ctx.restore();

  if (!cells.length) gameOver();
}


function init() {
  expColor = getRandomColor(settings.minColor);
  expImg = generateFireBall(64, 64, 1, expColor.r, expColor.g, expColor.b);

  w = window.innerWidth;
  h = window.innerHeight;
  amount = ((w * h) / 500) | 0;
  amount = amount > settings.limitParticles ? settings.limitParticles : amount;
  c.width = w;
  c.height = h;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  cells.splice(0);
  cellsExplored.splice(0);
  var n = amount;
  while (n--) cells.push(new Cell());
  clicked = false;
  inGame = true;
  if (killTimer !== undefined) text.className = "close";
  text2.className = "close";
  killTimer = 5;

  anim();
}
init();

setTimeout(function () {
  text.className = "close";
  text2.className = "close";
}, 300);