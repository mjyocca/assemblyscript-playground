// The entry file of your WebAssembly module.
export function add(a: i32, b: i32): i32 {
  return a + b;
}

const example = [[
  [-112.074279, 40.52215],
  [-112.074279, 40.853293],
  [-111.610107, 40.853293],
  [-111.610107, 40.52215],
  [-112.074279, 40.52215]
]]

type Poly = i64[][][][];

export function pointInPolygon(point: i64[], polygon: Poly): boolean {
  let pt = [point[0], point[1]];
  let polys = polygon;
  let insidePoly = false;
  let i = 0;
  while (i < polys.length && !insidePoly) {
    if (inRing(pt, polys[i][0])) {
      let inhole = false;
      let k = 1;
      while (k < polys[i].length && !inhole) {
        if (inRing(pt, polys[i][k])) {
          inhole = true;
        }
        k++;
      }
      if (!inhole) insidePoly = true;
    }
    i++;
  }
  return insidePoly;
}

export function inRing (pt: i64[], ring: Array<Array<i64>>): boolean {
  let isInside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    let xi = ring[i][0], yi = ring[i][1];
    let xj = ring[j][0], yj = ring[j][1];
    let intersect = ((yi > pt[1]) !== (yj > pt[1])) &&
        (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi);
    if (intersect) isInside = !isInside;
  }
  return isInside;
}