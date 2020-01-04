import React, { ReactNode, ComponentType, Fragment } from 'react'
import { TilePayload } from "../services/tiles-overlay-service";
import { createPortal } from 'react-dom';

const Tiles = <ExtendedPayload extends {} = any>({
  TileComponent,
  children,
  tiles,
  width,
  height
}: {
  children?: (props: {
    tileCoord: google.maps.Point,
    zoom: number,
    width: number,
    height: number,
    data?: any,
  }) => ReactNode | null;
  TileComponent?: ComponentType<TilePayload & {
    width: number,
    height: number,
    data?: any,
  }>;  
  tiles: Map<Node, TilePayload & {data?: ExtendedPayload}>,
  width: number,
  height?: number
}) => {
  
  const tileNodes = [...tiles.keys()];  
  
  return (
    <>
      {tileNodes.map((tile) => {
        const payload = tiles.get(tile);

        if (!payload) return null;

        let node: ReactNode;

        if (children) {
          node = children({
            ...payload,
            width: width,
            height: height || width,
          })
        } else if (TileComponent) {
          node = (                  
            <TileComponent
              {...payload}
              width={width}
              height={height || width}
            />
          )
        } else {
          node = null;
        }

        const {tileCoord: {x, y}, zoom} = payload;

        return (
          <Fragment key={`${x}-${y}-${zoom}-${width}-${height || width}`}>
            {createPortal(node, tile as Element)}
          </Fragment>
        );
      })}
    </>
  );
}

export {Tiles};