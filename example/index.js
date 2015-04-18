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
var lookupTex1 = getTex2D("lookup_selective_color.png");
var lookupTex2 = getTex2D("lookup_miss_etikate.png");
var lookupTex = lookupTex1;

//could also use ndarray get-pixels 
var lookupImage = new Image();

var shader = require('gl-shader')(gl,
    glslify('./index.vert'),
    glslify('./index.frag')
)

//handle mouse move
var mouseX = 0;
window.addEventListener("mousemove", function(ev) {
    mouseX = Math.max(0, Math.min(1, ev.pageX/canvas.width));
});

canvas.addEventListener("mousedown", function(ev) {
    ev.preventDefault();
    lookupTex = lookupTex===lookupTex1 ? lookupTex2 : lookupTex1;
})

function render() {
  if (!lookupTex.texture)
    return;
  shader.bind()
  shader.uniforms.stop = mouseX;
  shader.uniforms.uTexture = tex.bind(0)
  shader.uniforms.uLookup = lookupTex.texture.bind(1);
  triangle(gl)
}

//add some info text
document.body.appendChild(info());

function getTex2D(path) {
    var obj = {
        image: new Image(),
        texture: null
    };
    obj.image.onload = function() {
        obj.texture = createTex2d(gl, obj.image)
        obj.texture.minFilter = obj.texture.magFilter = gl.LINEAR;
    };
    obj.image.src = path;
    return obj;
}

function info() {
    var lbl = document.createElement("div")
    lbl.style.font = "14px 'Helvetica', 'Arial', sans-serif";
    lbl.style.margin = "10px";
    lbl.innerHTML = "move your mouse to see the color transform<br>click to swap lookup tables";
    return lbl;
}