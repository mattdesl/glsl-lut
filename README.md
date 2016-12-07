# glsl-lut [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

[![ABTest](http://i.imgur.com/QbSAX2h.png)](http://mattdesl.github.io/glsl-lut/example/demo.html)

[Demo here](http://mattdesl.github.io/glsl-lut/example/demo.html)

Use a texture as a lookup table to apply color transforms in a shader. Original implementation from GPUImage, see [here](http://liovch.blogspot.ca/2012/07/add-instagram-like-effects-to-your-ios.html). For more details on the concept, see [here](http://http.developer.nvidia.com/GPUGems2/gpugems2_chapter24.html).

This is geared towards OpenGL ES, so no 3D textures are used, and the lookup table is 512x512 (using every 4th color).

## Usage

[![NPM](https://nodei.co/npm/glsl-lut.png)](https://nodei.co/npm/glsl-lut/)

First, grab the original (un-altered) lookup table from the [image](image) folder, or with the [CLI](#cli). 


Then you can apply any filters with Photoshop or at runtime to the lookup table image. These can be things like curves, levels, grayscale, etc. Each transform must be independent of surrounding pixels (no blurs, median, etc).

In your shader, sample the lookup texture (`uLookup` below) and pass the original `vec4` color to the transform method.

```glsl

uniform sampler2D uLookup;

#pragma glslify: transform = require('glsl-lut')

...
    vec4 original = texture2D(uTexture, vUv);
	gl_FragColor = transform(original, uLookup);
```

> ❗**Important**: Make sure to set `TEXTURE_MIN_FILTER` and `TEXTURE_MAG_FILTER` to `NEAREST` on the lookup table texture.

## Flipped Y Lookup

Depending on your environment, the Y texture coordinate may need to be inverted during the lookup to get the correct color output. If your colours look messed up, this is most likely the case. Require the inverted function like so:

```
#pragma glslify: transform = require(glsl-lut/flipY)
```

## Defines

Requiring `glsl-lut/flipY` is the same as making a define for `LUT_FLIP_Y`. You can also define `LUT_NO_CLAMP` before requiring the function and the incoming texture color will not have a `clamp(c, 0.0, 1.0)` operation applied. This may be useful if you plan to take advantage of hardware texture wrapping. 

## CLI

You can also use this tool as a command-line application to create a new (default) lookup table PNG image.

```sh
npm install -g glsl-lut
```

Then: 

```sh
glsl-lut > images/lut.png
```

<sup>See [this file](https://github.com/BradLarson/GPUImage/blob/master/framework/Source/GPUImageLookupFilter.h) for further details on generating a lookup table programmatically.</sup>

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/glsl-lut/blob/master/LICENSE.md) for details.
