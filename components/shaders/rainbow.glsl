uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  if (color.a < 1.0) {
    color.r = sin(time * 0.8) * 0.5 + 0.5;
    color.g = sin(time * 0.6) * 0.5 + 0.5;
    color.b = sin(time * 0.4) * 0.5 + 0.5;
  }
  gl_FragColor = color;
}
