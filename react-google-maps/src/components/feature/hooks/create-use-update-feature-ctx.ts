import {useEffect} from 'react';

export const createUseUpdateFeature = <Props>() => (
  props: Props, 
  setProps?: (props: Props) => void
): void => {
  useEffect(() => {
    if (!setProps) return;

    setProps(props);
  }, Object.values(props));
};
