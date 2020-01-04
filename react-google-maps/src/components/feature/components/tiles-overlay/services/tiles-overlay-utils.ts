import { TilePayload } from "./tiles-overlay-service";

export function tileToKey({
  tileCoord: {x, y}, 
  zoom,
} : TilePayload): string {
  return `${x}-${y}-${zoom}`;
}