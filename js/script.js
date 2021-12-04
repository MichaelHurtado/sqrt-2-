let hydra, hydraCanvas;
hydraCanvas = document.createElement("canvas");
hydraCanvas.width = window.innerWidth
hydraCanvas.height = window.innerHeight
hydraCanvas.id = "hydraCanvas";
hydraCanvas.style.position = "absolute";
hydraCanvas.style.zIndex = 2;
hydraCanvas.style.top = 0;
hydraCanvas.style.left = 0;
hydraCanvas.getContext("webgl", { preserveDrawingBuffer: true });
hydra = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
  enableStreamCapture: false,
  width: 1920,
  height:1080,
});
document.querySelector(".placeholder").appendChild(hydraCanvas)

s0.initImage('eielson.jpg')
src(o0)
  .color(1,[0,1],1)
  .add(noise(1,0))
  .colorama([0,0.3].smooth())
  .layer(noise(50,1).thresh().pixelate([20,10,100],[10,5,30]).luma().mult(src(s0).modulate(noise(2))))
  .out()
render(o1)

var elt;
var txt;
var markov = new Markov();
var i=0; 
let font;
var num;
let slider;
let val;
const s = ( p1 ) => {

  p1.preload = ()=> {
    font=[p1.loadFont("AppleGaramond.ttf"),p1.loadFont("AppleGaramond-Bold.ttf"),p1.loadFont("AppleGaramond-BoldItalic.ttf"),p1.loadFont("AppleGaramond-Italic.ttf"),p1.loadFont("AppleGaramond-LightItalic.ttf"),p1.loadFont("AppleGaramond-Light.ttf")];
    txt=p1.loadStrings("eielson.txt");
  };
  p1.setup = ()=> {
    let canvas = p1.createCanvas(hydraCanvas.width, hydraCanvas.height);
    p1.pixelDensity(1);
    elt = canvas.elt;
    s1.init({src:elt})
    canvas.hide();
    p1.iniciar();
  };
  p1.iniciar = ()=> {
    p1.frameRate(1);
    markov.addStates(txt);
    p1.textSize(20);
    p1.init();
  };
  p1.draw = ()=> {
    val = 15;
    p1.escribir();
  };
  p1.escribir = ()=> {
    markov.train(val);
    p1.textFont(font[p1.int(p1.random(6))]);
    p1.textSize(p1.random(20,30));
    p1.text(markov.generateRandom(70),p1.random(80,300),100+i);
    i=i+30;
    if(i==num){
      p1.fill(255); 
      p1.text("*presionar click",60,height-50);
      p1.noLoop();
    }  
  };
  p1.init = () => {
    p1.clear();
    p1.strokeWeight(2.5);
    p1.stroke(0,0,0);
    p1.fill(0,255,0);
    i=0;
    num=30*p1.int(p1.random(3,15));    
  };
  p1.mousePressed = ()=> {
    p1.loop();
    p1.init();
    p1.escribir();
  };
};

let myp5 = new p5(s);

src(o0).modulateScale(gradient().g(),0.9).color(1.0,1.0,1.0).layer(src(s1)).out(o1)