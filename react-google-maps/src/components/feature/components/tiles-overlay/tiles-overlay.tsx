import React from 'react';
import { useSmartTilesOverlay } from './hooks';
import { Tiles } from './components/tiles';
import { TilesOverlayProps } from '.';

const TilesOverlay = ({
  TileComponent,
  children,
  ...props
}: TilesOverlayProps) => {
  const tiles = useSmartTilesOverlay(props);

  const {width, height} = props;

  return (
    <Tiles
      tiles={tiles}
      children={children}
      TileComponent={TileComponent}
      width={width}
      height={height}
    />
  );
}

export {TilesOverlay};