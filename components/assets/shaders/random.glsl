// RANDOM
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float time = u_time;
  vec4 color = texture2D(u_texture, uv);
  if (color.a > 0.1) {
  color.rgb = vec3(
      sin(uv.y * 10.0 + time * 1.0),
      cos(uv.y * 15.0 + time * 1.0),
      sin(uv.y * 10.0 + time * 1.0)
    );
  }
  float x = uv.x * 2.0 - 1.0;
  float y = uv.y * 2.0 - 1.0;
  float d = sqrt(x * x + y * y);
  vec2 distortion = vec2(
    sin(uv.y * 10.0 + time * 1.0),
    cos(uv.y * 15.0 + time * 1.0)
  ) * (d * 0.3);
  uv.x += distortion.x;
  uv.y += distortion.y;
  float scanline = sin(uv.y * 100.0) * 0.2;
  color.rgb += scanline;
  gl_FragColor = color;
}
