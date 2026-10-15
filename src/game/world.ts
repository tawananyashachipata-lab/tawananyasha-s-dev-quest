import type { LocationId } from "@/data/portfolio";

// Logical tile size in world pixels.
export const TILE = 32;
export const WORLD_W = 44;
export const WORLD_H = 30;

export type TileKind =
  | "grass"
  | "grass2"
  | "path"
  | "water"
  | "tree"
  | "flower"
  | "rock"
  | "wall";

export type Building = {
  id: LocationId;
  name: string;
  // top-left tile of the building footprint (4x3 tiles)
  tx: number;
  ty: number;
  doorX: number; // tile of the door (interaction point is below it)
  color: string;
  roof: string;
  icon: string;
};

export const buildings: Building[] = [
  { id: "about", name: "About Me", tx: 4, ty: 4, doorX: 6, color: "#22d3ee", roof: "#7c3aed", icon: "?" },
  { id: "skills", name: "Skills Dojo", tx: 32, ty: 4, doorX: 34, color: "#a78bfa", roof: "#0ea5e9", icon: "S" },
  { id: "projects", name: "Project Village", tx: 5, ty: 20, doorX: 7, color: "#38bdf8", roof: "#6d28d9", icon: "P" },
  { id: "certificates", name: "Hall of Certificates", tx: 33, ty: 20, doorX: 35, color: "#facc15", roof: "#8b5cf6", icon: "C" },
  { id: "contact", name: "Contact Portal", tx: 19, ty: 6, doorX: 21, color: "#34d399", roof: "#0e7490", icon: "@" },
];

export const spawnPoint = { x: 22 * TILE + TILE / 2, y: 16 * TILE };

const grid: TileKind[][] = [];

function baseGrid() {
  for (let y = 0; y < WORLD_H; y++) {
    const row: TileKind[] = [];
    for (let x = 0; x < WORLD_W; x++) {
      row.push((x * 7 + y * 13) % 11 === 0 ? "grass2" : "grass");
    }
    grid.push(row);
  }
}

function carvePath(points: [number, number][]) {
  for (const [x, y] of points) {
    if (x >= 0 && x < WORLD_W && y >= 0 && y < WORLD_H) grid[y][x] = "path";
  }
}

function hPath(x0: number, x1: number, y: number) {
  const pts: [number, number][] = [];
  for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) pts.push([x, y]);
  carvePath(pts);
}

function vPath(y0: number, y1: number, x: number) {
  const pts: [number, number][] = [];
  for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) pts.push([x, y]);
  carvePath(pts);
}

function scatter(kind: TileKind, count: number, seed: number) {
  let placed = 0;
  let n = seed;
  while (placed < count && n < seed + 4000) {
    const x = (n * 37) % WORLD_W;
    const y = (n * 91) % WORLD_H;
    if (grid[y] && grid[y][x] === "grass") {
      grid[y][x] = kind;
      placed++;
    }
    n++;
  }
}

function buildWorld() {
  baseGrid();

  // Water pond bottom-center
  for (let y = 24; y < 29; y++) {
    for (let x = 17; x < 26; x++) {
      const dx = x - 21.5;
      const dy = y - 26.5;
      if (dx * dx / 22 + dy * dy / 7 < 1) grid[y][x] = "water";
    }
  }

  // Paths from spawn hub to each building door
  hPath(6, 36, 12);
  vPath(8, 16, 22);
  hPath(8, 36, 16);
  vPath(12, 23, 7);
  vPath(12, 23, 35);
  hPath(7, 35, 23);
  vPath(8, 12, 7);
  vPath(8, 12, 35);
  // contact portal path
  vPath(10, 12, 21);

  // Building footprints + walls
  for (const b of buildings) {
    for (let y = b.ty; y < b.ty + 3; y++) {
      for (let x = b.tx; x < b.tx + 4; x++) {
        if (y >= 0 && y < WORLD_H && x >= 0 && x < WORLD_W) grid[y][x] = "wall";
      }
    }
    // clear a doorstep tile in front of the door
    const dy = b.ty + 3;
    if (dy < WORLD_H) grid[dy][b.doorX] = "path";
  }

  // Border trees
  for (let x = 0; x < WORLD_W; x++) {
    grid[0][x] = "tree";
    grid[WORLD_H - 1][x] = "tree";
  }
  for (let y = 0; y < WORLD_H; y++) {
    grid[y][0] = "tree";
    grid[y][WORLD_W - 1] = "tree";
  }

  scatter("tree", 26, 3);
  scatter("flower", 40, 11);
  scatter("rock", 14, 23);
}

buildWorld();

export function tileAt(tx: number, ty: number): TileKind {
  if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return "tree";
  return grid[ty][tx];
}

export function isSolid(tx: number, ty: number): boolean {
  const t = tileAt(tx, ty);
  return t === "tree" || t === "water" || t === "rock" || t === "wall";
}

export function allTiles(): TileKind[][] {
  return grid;
}

// Nearest building within interaction range of a world position, if any.
export function nearbyBuilding(px: number, py: number): Building | null {
  const tx = px / TILE;
  const ty = py / TILE;
  for (const b of buildings) {
    const doorWorldX = (b.doorX + 0.5) * TILE;
    const doorWorldY = (b.ty + 3) * TILE;
    const dist = Math.hypot(px - doorWorldX, py - doorWorldY);
    if (dist < TILE * 1.6) return b;
    // also allow standing on the doorstep tile
    if (Math.abs(tx - (b.doorX + 0.5)) < 0.8 && Math.abs(ty - (b.ty + 3)) < 0.9) return b;
  }
  return null;
}
