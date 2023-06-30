// SCANLINE
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  if (color.a > 0.1) {
    color = floor(color * 10.) / 10.;
    color += vec4(fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453));
    color *= sin(uv.y * 100. + time * 2.) * 0.2 + 0.8;
  }
  gl_FragColor = color;
}
