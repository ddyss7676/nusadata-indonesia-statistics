// charts.js — small SVG chart builders. Each returns an SVG string sized
// by its viewBox, so charts stay sharp on desktop and phone screens.

const INK = '#17352f';
const GRID = '#d8e2dc';
const TEAL = '#0e7c66';
const AMBER = '#d98e1f';
const SKY = '#2f6fb2';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function frame(width, height, inner) {
  return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" class="chart">' + inner + '</svg>';
}

function gridLines(width, height, pad, min, max, format) {
  let out = '';
  for (let i = 0; i <= 4; i++) {
    const v = min + (max - min) * i / 4;
    const y = height - pad.bottom - (height - pad.top - pad.bottom) * i / 4;
    out += '<line x1="' + pad.left + '" y1="' + y.toFixed(1) + '" x2="' + (width - pad.right) + '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
    out += '<text x="' + (pad.left - 6) + '" y="' + (y + 3).toFixed(1) + '" text-anchor="end" class="axis">' + esc(format(v)) + '</text>';
  }
  return out;
}

export function lineChart(series, options) {
  const width = 640, height = 192;
  const pad = { left: 52, right: 16, top: 26, bottom: 34 };
  const format = (options && options.format) || ((v) => v.toFixed(1));
  const values = series.points.map((p) => p.value);
  let min = Math.min.apply(null, values);
  let max = Math.max.apply(null, values);
  if (options && options.zero) min = Math.min(0, min);
  const span = (max - min) || 1;
  min -= span * 0.12; max += span * 0.12;
  const x = (i) => pad.left + (width - pad.left - pad.right) * (series.points.length === 1 ? 0.5 : i / (series.points.length - 1));
  const y = (v) => height - pad.bottom - (height - pad.top - pad.bottom) * (v - min) / (max - min);
  let inner = gridLines(width, height, pad, min, max, format);
  const path = series.points.map((p, i) => (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(p.value).toFixed(1)).join(' ');
  inner += '<path d="' + path + '" fill="none" stroke="' + TEAL + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>';
  series.points.forEach((p, i) => {
    inner += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.value).toFixed(1) + '" r="4.5" fill="' + AMBER + '" stroke="#fff" stroke-width="1.5"/>';
    inner += '<text x="' + x(i).toFixed(1) + '" y="' + (y(p.value) - 10).toFixed(1) + '" text-anchor="middle" class="value">' + esc(format(p.value)) + '</text>';
    inner += '<text x="' + x(i).toFixed(1) + '" y="' + (height - 10) + '" text-anchor="middle" class="axis">' + esc(p.year) + '</text>';
  });
  return frame(width, height, inner);
}

export function pairedBarChart(series, options) {
  const width = 640, height = 300;
  const pad = { left: 52, right: 16, top: 30, bottom: 34 };
  const format = (options && options.format) || ((v) => String(Math.round(v)));
  const max = Math.max.apply(null, series.points.map((p) => Math.max(p.value, p.second || 0))) * 1.12;
  const slot = (width - pad.left - pad.right) / series.points.length;
  const y = (v) => height - pad.bottom - (height - pad.top - pad.bottom) * v / max;
  let inner = gridLines(width, height, pad, 0, max, format);
  series.points.forEach((p, i) => {
    const cx = pad.left + slot * i + slot / 2;
    const bw = Math.min(22, slot * 0.3);
    inner += '<rect x="' + (cx - bw - 2).toFixed(1) + '" y="' + y(p.value).toFixed(1) + '" width="' + bw + '" height="' + (height - pad.bottom - y(p.value)).toFixed(1) + '" fill="' + SKY + '" rx="3"/>';
    inner += '<rect x="' + (cx + 2).toFixed(1) + '" y="' + y(p.second).toFixed(1) + '" width="' + bw + '" height="' + (height - pad.bottom - y(p.second)).toFixed(1) + '" fill="' + TEAL + '" rx="3"/>';
    inner += '<text x="' + cx.toFixed(1) + '" y="' + (height - 10) + '" text-anchor="middle" class="axis">' + esc(p.year) + '</text>';
  });
  inner += '<rect x="' + pad.left + '" y="6" width="12" height="12" fill="' + SKY + '" rx="2"/><text x="' + (pad.left + 18) + '" y="16" class="axis">Labour force</text>';
  inner += '<rect x="' + (pad.left + 130) + '" y="6" width="12" height="12" fill="' + TEAL + '" rx="2"/><text x="' + (pad.left + 148) + '" y="16" class="axis">In work</text>';
  return frame(width, height, inner);
}

export function barChart(rows, options) {
  const width = 640;
  const rowH = 34;
  const height = rows.length * rowH + 16;
  const labelW = (options && options.labelWidth) || 190;
  const max = Math.max.apply(null, rows.map((r) => r.value)) * 1.05;
  const format = (options && options.format) || ((v) => String(v));
  let inner = '';
  rows.forEach((r, i) => {
    const y = 10 + i * rowH;
    const w = (width - labelW - 90) * r.value / max;
    const fill = r.highlight ? AMBER : TEAL;
    inner += '<text x="0" y="' + (y + 16) + '" class="axis strong">' + esc(r.name) + '</text>';
    inner += '<rect x="' + labelW + '" y="' + y + '" width="' + w.toFixed(1) + '" height="20" fill="' + fill + '" rx="4"/>';
    inner += '<text x="' + (labelW + w + 8).toFixed(1) + '" y="' + (y + 15) + '" class="value">' + esc(format(r.value)) + '</text>';
  });
  return frame(width, height, inner);
}

export function donutChart(slices) {
  const size = 260, cx = 130, cy = 130, r = 92, innerR = 56;
  const colors = [TEAL, AMBER, SKY];
  const total = slices.reduce((sum, s) => sum + s.share, 0);
  let angle = -Math.PI / 2;
  let inner = '';
  slices.forEach((s, i) => {
    const sweep = s.share / total * Math.PI * 2;
    const a0 = angle, a1 = angle + sweep;
    const large = sweep > Math.PI ? 1 : 0;
    const p = (rad, a) => (cx + rad * Math.cos(a)).toFixed(1) + ' ' + (cy + rad * Math.sin(a)).toFixed(1);
    inner += '<path d="M' + p(r, a0) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + p(r, a1) + ' L' + p(innerR, a1) + ' A' + innerR + ' ' + innerR + ' 0 ' + large + ' 0 ' + p(innerR, a0) + ' Z" fill="' + colors[i % colors.length] + '"/>';
    angle = a1;
  });
  inner += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" class="donut-big">56.1%</text>';
  inner += '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" class="axis">live on Java</text>';
  return frame(size, size, inner);
}

export { esc, INK };
