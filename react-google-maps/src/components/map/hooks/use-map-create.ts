import { CreateMapCtx, CreateMapCtxValue } from "../hocs/with-smart-map-ctx";
import { useContext, useEffect, Ref } from "react";
import { MapProps } from "..";

export function useMapCreate(props: MapProps): Ref<HTMLDivElement> {    
  const {ref, setProps} = useContext(CreateMapCtx) as CreateMapCtxValue;

  useEffect(() => {
    setProps(props);
  }, Object.values(props));

  return ref;
}