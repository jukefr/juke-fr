// ANAGLYPH
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  float offset = 0.03;
  vec4 red = texture2D(u_texture, uv - vec2(offset, 0.0));
  vec4 blue = texture2D(u_texture, uv + vec2(offset, 0.0));
  color.r = red.r;
  color.b = blue.b;
  gl_FragColor = color;
}
