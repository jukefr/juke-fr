// ZEBRA
// submitted by oatmealine
// see https://www.shadertoy.com/view/ssGcWV for other version
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;

#define DEPTH 5.0 // fun to mess around with
#define RADIUS 0.2
#define AMP 8. // please do not set this to 0. or else you'll cause an infinite loop
// the reason its formatted like 8. instead of 8.0 is because else
// the live refresh will kick in when you edit the first digit and
// cause an infloop with .0

float dist(vec2 uv, float radius, vec2 dir) {
  float middle = uv.x * u_resolution.x;
  float rad = radius * u_resolution.x;
  for (
    vec2 offset = vec2(0.0);
    length(offset) <= rad;
    offset += dir
  ) {
    for (
      float neg = -1.0;
      neg <= 1.0;
      neg += 2.0
    ) {
      vec2 uv2 = uv + offset * neg / u_resolution;
      vec4 tex = texture2D(u_texture, uv2);
      if (tex.a < 1.0) return length(offset) / rad;
    }
  }
  return 1.0;
}

void main() {
  vec2 uv = vUv;
  vec4 tcolor = texture2D(u_texture, uv);
  if (tcolor.a >= 1.0) {
    float t = u_time * 0.2;
    float d = dist(uv, RADIUS, vec2(sin(t), cos(t)) * AMP);
    float a = sin(u_time + d * DEPTH);
    gl_FragColor = vec4(vec3(a), 1.0);
  }
}
