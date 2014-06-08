# [![browser support](https://ci.testling.com/mattdesl/glsl-lut.png)](https://ci.testling.com/mattdesl/glsl-lut)

# glsl-lut [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

![ABTest](http://i.imgur.com/IrgPRO2.png)

Allows you to use a lookup table to apply color transform in a shader. Original implementation from GPUImage, see [here](http://liovch.blogspot.ca/2012/07/add-instagram-like-effects-to-your-ios.html). For more details on the concept, see [here](http://http.developer.nvidia.com/GPUGems2/gpugems2_chapter24.html).

This is geared towards OpenGL ES, so no 3D textures are used, and the lookup table is 512x512 (using every 4th color).

## Usage

[![NPM](https://nodei.co/npm/glsl-lut.png)](https://nodei.co/npm/glsl-lut/)

You can grab the original (un-altered) lookup table from the [image](image) folder. Maybe a better soul than me could create a LUT generator with ndarray, so it can be required like the lena image. See [this file](https://github.com/BradLarson/GPUImage/blob/master/framework/Source/GPUImageLookupFilter.h) for further details on generating a lookup table.

Then you can apply any filters with Photoshop or at runtime to the lookup table image. These can be things like curves, levels, grayscale, etc. Each transform must be independent of surrounding pixels (no blurs, median, etc).

In your shader, use it like so:
```glsl

uniform sampler2D uLookup;

#pragma glslify: transform = require(glsl-lut)

...
    vec4 original = texture2D(uTexture, vUv);
	gl_FragColor = transform(original, uLookup);
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/glsl-lut/blob/master/LICENSE.md) for details.