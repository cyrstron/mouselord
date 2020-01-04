import {useEffect} from 'react';
import { withDumbMapCtx } from '../hocs/with-dumb-map-ctx';
import { MapService } from '../services';
import { MapHandlerName, MapEventHandler } from '../';

export type MapBroadcasterProps = {
    [key in MapHandlerName]?: MapEventHandler | null;
};

const MapBroadcasterComponent = ({
    mapService, 
    ...props
}: MapBroadcasterProps & {
    mapService: MapService
}) => {
    useEffect(() => {
        const prevHandlers = mapService.handlers;
        const eventKeys = Object.keys(props) as MapHandlerName[];

        eventKeys.forEach((eventName) => {
            const handler = props[eventName] as MapEventHandler | null;

            if (handler) {
                mapService.addHandler(
                    eventName as MapHandlerName,
                    props[eventName] as MapEventHandler,
                );
            } else {
                const prevHandler = prevHandlers[eventName] as MapEventHandler;

                if (!prevHandler) return;

                mapService.removeHandler(eventName, prevHandler);
            }
        });

        return () => {
            eventKeys.forEach((eventName) => {
                mapService.removeHandler(
                    eventName as MapHandlerName,
                    props[eventName] as MapEventHandler,
                );

                const prevHandler = prevHandlers[eventName];

                if (!prevHandler) return;

                mapService.addHandler(
                    eventName as MapHandlerName,
                    prevHandler as MapEventHandler,
                );

            });
        }
    }, []);

    return null;
}

export const MapBroadcaster = withDumbMapCtx<MapBroadcasterProps>(MapBroadcasterComponent);