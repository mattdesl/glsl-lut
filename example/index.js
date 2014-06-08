var canvas        = document.body.appendChild(document.createElement('canvas'))
var triangle      = require('a-big-triangle')
var createContext = require('gl-context')
var createTex2d   = require('gl-texture2d')
var glslify       = require('glslify')
var createShell   = require('gl-now')
var lena          = require('lena')

canvas.width = 512
canvas.height = 512
document.body.style.margin = "0";

var gl = createContext(canvas, render)
var tex = createTex2d(gl, lena)
var lookupTex;

//could also use ndarray get-pixels 
var lookupImage = new Image();
lookupImage.src = "lookup_miss_etikate.png";
lookupImage.onload = function() {
    lookupTex = createTex2d(gl, lookupImage)
    lookupTex.minFilter = lookupTex.magFilter = gl.LINEAR;
};

var shader = glslify({
    vert: './index.vert'
  , frag: './index.frag'
})(gl)

//handle mouse move
var mouseX = 0;
window.addEventListener("mousemove", function(ev) {
    mouseX = Math.max(0, Math.min(1, ev.pageX/canvas.width));
});

function render() {
  if (!lookupTex)
    return;
  shader.bind()
  shader.uniforms.stop = mouseX;
  shader.uniforms.uTexture = tex.bind(0)
  shader.uniforms.uLookup = lookupTex.bind(1);
  triangle(gl)
}

//add some info text
document.body.appendChild(info());

function info() {
    var lbl = document.createElement("div")
    lbl.style.font = "14px 'Helvetica', 'Arial', sans-serif";
    lbl.style.margin = "10px";
    lbl.innerText = "move your mouse to see the color transform";
    return lbl;
}