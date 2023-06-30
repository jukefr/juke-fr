// GLITCH
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  float amt = 0.0;
  amt = sin(time * 0.5) * 0.5 + 0.5;
  amt = pow(amt, 2.0);
  uv.x = uv.x + (amt * 0.1);
  vec4 color2 = texture2D(u_texture, uv);
  color = mix(color, color2, amt);
  gl_FragColor = color;
}
