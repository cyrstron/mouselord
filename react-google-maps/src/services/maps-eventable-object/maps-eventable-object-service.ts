import { MapsObjectService } from "../maps-object";

export abstract class MapsEventableObjectService<
  MapsObject extends google.maps.MapsObject<
    MapsObjectEventName,
    MapsObjectOptions,
    MapsObjectEventHandler
  >,
  MapsObjectEventName,
  MapsObjectOptions,
  MapsObjectEventHandler,
  HandlerName extends string,
> extends MapsObjectService<MapsObjectOptions, MapsObject> {
  handlers: {[key in HandlerName]?: MapsObjectEventHandler};
  listeners: Map<MapsObjectEventHandler, google.maps.MapsEventListener> = new Map();

  constructor(
    google: Google,
    object: MapsObject, {
      options,
      handlers,
    }: {
      options?: MapsObjectOptions,
      handlers?: {[key in HandlerName]: MapsObjectEventHandler},
    },
    public eventNames: {
      [key in HandlerName]: MapsObjectEventName
    },  
    public groupProps: (props: MapsObjectOptions & {
      [key in HandlerName]?: MapsObjectEventHandler
    }) => {
      handlers?: {
        [key in HandlerName]: MapsObjectEventHandler;
      },
      options?: MapsObjectOptions,
    }
  ) {
    super(google, object, options);

    this.handlers = handlers || {};

    this.setHandlers(handlers);
  }

  addHandler(    
    handlerName: HandlerName,
    handler: MapsObjectEventHandler,
  ) {
    this.handlers[handlerName as HandlerName] = handler;

    const eventName = this.eventNames[handlerName];

    const listener = this.object.addListener(eventName, handler);

    this.listeners.set(handler, listener);
  }

  removeHandler(    
    handlerName: HandlerName,
    handler: MapsObjectEventHandler,
  ) {
    this.handlers[handlerName as HandlerName] = undefined;

    const listener = this.listeners.get(handler);

    if (!listener) return;

    listener.remove();
    this.listeners.delete(handler);
  }

  resetHandlers() {
    this.handlers = {};

    this.listeners.forEach((listener) => {
      listener.remove();
    });

    this.listeners = new Map();
  }

  setHandlers(handlers: {
    [key in HandlerName]: MapsObjectEventHandler;
  } | undefined) {
    if (!handlers) return;

    (Object.keys(handlers)).forEach((handlerName) => {
      const handler: MapsObjectEventHandler = handlers[handlerName as HandlerName];

      this.addHandler(handlerName as HandlerName, handler);
    });
  }

  setProps(props: MapsObjectOptions & {
    [key in HandlerName]?: MapsObjectEventHandler
  }) {
    const {
      handlers,
      options,
    } = this.groupProps(props);

    this.setOptions(options);
    this.setHandlers(handlers);
  }

  updateProps(
    props: MapsObjectOptions & {
      [key in HandlerName]?: MapsObjectEventHandler;
    }
  ) {
    const {
      options, 
      handlers
    } = this.groupProps(props);
    
    this.updateOptions(options);
    this.updateHandlers(handlers);
  }

  updateHandlers(
    handlers: {
      [key in HandlerName]: MapsObjectEventHandler;
    } | undefined,
  ): void {
    if (!handlers && !this.handlers) return;

    if (!handlers) {
      this.resetHandlers();
      return;
    }

    if (!this.handlers) {
      this.setHandlers(handlers);
      return;
    }

    Object.keys({
      ...this.handlers,
      ...handlers,
    }).forEach((handlerName) => {
      const handler = handlers[handlerName as HandlerName];
      const prevHandler = this.handlers[handlerName as HandlerName];

      if (handler === prevHandler) return;

      if (prevHandler) {
        this.removeHandler(handlerName as HandlerName, prevHandler as MapsObjectEventHandler);
      }
      if (handler) {
        this.addHandler(handlerName as HandlerName, handler);
      }
    });
  }

  unmount(): void {
    this.resetHandlers();
  }
}
