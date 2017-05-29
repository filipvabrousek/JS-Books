f=_=>_[0]==_.slice(-1)


const i = document.querySelector(#i);

i.addEventlistener("change", () => 
e => console.log( 
f(i.value))
);



//sin(x)
const c = document.getElementById("c");
const ctx = c.getContext("2d");
const cw = (c.width = 400);
const ch = (c.height = 250);
const cx = cw / 2;
const cy = ch / 2;
const rad = Math.PI / 180;
const w = 400;
const h = 200;
const amplitude = h;
const frequency = 0.01;
let phi = 0;
let frames = 0;
const stopped = true;
//ctx.strokeStyle = "Cornsilk";
ctx.lineWidth = 4;

const Draw = () => {
  frames++;
  phi = frames / 30;

  ctx.clearRect(0, 0, cw, ch);
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${frames},100%,50%)`;
  ctx.moveTo(0, ch);

  for (let x = 0; x < w; x++) {
    y = Math.sin(x * frequency + phi) * amplitude / 2 + amplitude / 2;
    ctx.lineTo(x, y + 40);
  }

  ctx.lineTo(w, ch);
  ctx.lineTo(0, ch);
  ctx.stroke();
  requestId = window.requestAnimationFrame(Draw);
}

requestId = window.requestAnimationFrame(Draw);
