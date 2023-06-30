// OUCH
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  time *= 0.2;
  vec4 color = texture2D(u_texture, uv);
  color.r = sin(color.r * 100.0 + time * 10.0);
  color.g = sin(color.g * 100.0 + time * 10.0);
  color.b = sin(color.b * 100.0 + time * 10.0);
  gl_FragColor = color;
}
