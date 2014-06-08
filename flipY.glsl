//Some rendering engines will need the Y lookup coordinate inverted
#define LUT_FLIP_Y
#pragma glslify: lookup = require(./index)
#pragma glslify: export(lookup)