import React from 'react';

import { Levels } from 'pages/levels';
import { Patrons } from 'pages/patrons';
import { Todos } from 'pages/todos';

function Service (props) {
  const [subServiceComponent, setComponent] =
    React.useState(<p>Service not loaded</p>);

  React.useLayoutEffect(() => {
    console.log('Service Layout Effect fired');
    switch (props.subService) {
      case (1):
        setComponent(
          <Levels
            serviceId={props.serviceId}
            token={props.token}
            serverAddress={props.serverAddress}
          />
        );
        break;
      case (2):
        setComponent(
          <Patrons
            serviceId={props.serviceId}
            token={props.token}
            serverAddress={props.serverAddress}
          />
        );
        break;
      case (3):
        setComponent(
          <Todos
            serviceId={props.serviceId}
            token={props.token}
            serverAddress={props.serverAddress}
          />
        );
        break;
      default:
        setComponent(
          <div>Service Main</div>
        );
    }
  }, [props]);

  return (
    <div>
      service ID {props.serviceId}
      {subServiceComponent}
    </div>
  );
}

export { Service };
