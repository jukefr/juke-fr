// BLURDOTS
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  uv.x += sin(uv.y * 3.14159 * 2.0) * 0.001;
  uv.y += sin(uv.x * 3.14159 * 2.0) * 0.001;
  float noise = sin(uv.x * 100.0) * sin(uv.y * 100.0);
  noise *= sin(time * 0.1) * 0.1;
  noise += 1.0;
  uv *= noise;
  color = texture2D(u_texture, uv);
  gl_FragColor = color;
}
