//submitted by Lily
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  float x = (vUv.x - 0.5);
  float y = (vUv.y - 0.5);
  float dist = x * y + y * x;
  float ripple = 0.5 + 0.5 * sin(dist * 1000.0 + u_time * 0.5);
  vec4 rippleColor = vec4(5.0, 1.0, 3.0, ripple);
  gl_FragColor = texture2D(u_texture, vUv) * rippleColor;
}
