// CHECKERED
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  if (color.a > 0.1) {
    if (mod(floor(uv.x * 10.) + floor(uv.y * 10.), 2.) == 0.) {
      color = vec4(0.5, 0., 0.5, 1.);
    } else {
      color = vec4(0., 0., 0., 1.);
    }
  }
  gl_FragColor = color;
}
