uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  float x = (uv.x - 0.5) * 3.0;
  float y = (uv.y - 0.5) * 3.0;
  float dist = sqrt(x * x + y * y);
  float a = atan(y, x);
  float ripple = 0.5 + 0.5 * sin(dist * 10.0 + time * 0.5);
  vec4 rippleColor = vec4(1.0, 1.0, 1.0, ripple);
  color = color * rippleColor;
  gl_FragColor = color;
}
