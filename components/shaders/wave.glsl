// WAVE
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  uv.x += sin(uv.y * 100.0 + time * 1.0) * 0.1;
  uv.y += sin(uv.x * 100.0 + time * 1.0) * 0.1;
  uv.x += sin(time * 1.0) * 0.1;
  uv.y += cos(time * 1.0) * 0.1;
  float dist = distance(uv, vec2(0.5, 0.5));
  float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
  gl_FragColor = color * alpha;
}
