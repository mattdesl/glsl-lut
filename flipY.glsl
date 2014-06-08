//Some rendering engines will need the Y lookup coordinate inverted
#define LUT_INVERT
#pragma glslify: lookup = require(./index)
#pragma glslify: export(lookup)