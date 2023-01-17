//submitted by oatmealine
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  vec4 tcolor = texture2D(u_texture, uv);
  if (tcolor.a >= 1.0) {
    vec3 col = 0.5 + 0.5 * cos((u_time * 0.2) + uv.xyx + vec3(0, 2, 4));
    uv.y += sin(uv.x * 3.0) / ((uv.x + 4.0 + sin(u_time * 0.4)) / 0.1);
    uv.x += round(uv.y * 49.3) * (5.347 * round(uv.y * 49.3 + u_time * 0.4 + uv.x * (sin(u_time / 50.0) * 10.0) * sin(uv.x * 3.14)));
    gl_FragColor = vec4(col * mod(uv.x - u_time / 20.0, 0.4), 1.0);
  }
}
