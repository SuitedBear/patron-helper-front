import React from 'react';

import { Levels } from './levels';
import { Patrons } from './patrons';
import { Todos } from './altTodos';
import { Rewards } from './rewards';

// TODO: add csv import button
function Service (props) {
  const [subServiceComponent, setComponent] =
    React.useState(<p>Service not loaded</p>);
  const [loadingState, setLoadingState] = React.useState('Generate Todos');
  const [apiState, setApiState] = React.useState('Check API Data');

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
      } else {
        setLoadingState('Generating failed!');
      }
    }

    async function handleApiData () {
      setApiState('Getting API data...');
      const apiInsert = await window.fetch(
        `${props.serverAddress}/services/${props.serviceId}/api`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
      if (!apiInsert.ok) {
        console.log('getting API data failed!');
        setApiState('API insert failed!');
      } else {
        console.log('API insert successfull');
        setApiState('Check API Data');
      }
    }

    switch (props.subService) {
      case (1):
        setComponent(
          <Levels
            serviceId={props.serviceId}
            token={props.token}
            serverAddress={props.serverAddress}
            onChanges={props.onChanges}
          />
        );
        break;
      case (2):
        setComponent(
          <Patrons
            serviceId={props.serviceId}
            token={props.token}
            serverAddress={props.serverAddress}
            onChanges={props.onChanges}
          />
        );
        break;
      case (3):
        setComponent(
          <Todos
            serviceId={props.serviceId}
            token={props.token}
            serverAddress={props.serverAddress}
            onChanges={props.onChanges}
          />
        );
        break;
      case (4):
        setComponent(
          <Rewards
            serviceId={props.serviceId}
            token={props.token}
            serverAddress={props.serverAddress}
            onChanges={props.onChanges}
          />
        );
        break;
      default:
        setComponent(
          <div>
            <div>Service Main: {}</div>
            <button onClick={(e) => handleGenerate(e)}>{loadingState}</button>
            <button onClick={() => handleApiData()}>{apiState}</button>
          </div>
        );
    }
  }, [props, loadingState, apiState]);

  return (
    <div>
      <span style={{ margin: '15px' }}>service ID {props.serviceId}</span>
      {subServiceComponent}
    </div>
  );
}

export { Service };
