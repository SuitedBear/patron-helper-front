import React from 'react';

import { Levels } from './levels';
import { Patrons } from './patrons';
import { Todos } from './todos';

// TODO: add csv import button
function Service (props) {
  const [subServiceComponent, setComponent] =
    React.useState(<p>Service not loaded</p>);
  const [loadingState, setLoadingState] = React.useState('Generate Todos');

  React.useLayoutEffect(() => {
    async function handleGenerate (e) {
      setLoadingState('Generating...');
      const res = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/generate`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (res.ok) {
        setLoadingState('Generate Todos');
        console.log('generate successfull');
      }
    }

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
          <div>
            <div>Service Main</div>
            <button onClick={(e) => handleGenerate(e)}>{loadingState}</button>
          </div>
        );
    }
  }, [props, loadingState]);

  return (
    <div>
      <span style={{ margin: '15px' }}>service ID {props.serviceId}</span>
      {subServiceComponent}
    </div>
  );
}

export { Service };
