precision mediump float;

uniform sampler2D uTexture;
uniform sampler2D uLookup;
uniform float stop;
varying vec2 vUv;

#pragma glslify: transform = require(../)

void main() {
	vec4 color = texture2D(uTexture, vUv);

	if (vUv.x > stop)
		gl_FragColor = transform(color, uLookup);
	else 
		gl_FragColor = color;
}
