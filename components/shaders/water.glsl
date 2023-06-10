// WATER
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  float y = uv.y;
  uv.x += sin(uv.y * 20.0 + time * 2.0) * 0.01;
  uv.y += sin(uv.x * 20.0 + time * 2.0) * 0.01;
  color = texture2D(u_texture, uv);
  gl_FragColor = color;
}
