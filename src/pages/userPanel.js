import React from 'react';

import { Menu } from '../components/menu';
import { UserEdit } from './userEdit';
import { ServiceList } from './serviceList';
import { Service } from './service';

/**
 * @TODO: should have
 *  - user services list
 *  - way to edit logged user data
 *
 *  props: token, onStateChange
 */
function UserPanel (props) {
  const [ServiceId, setServiceId] = React.useState(0);
  const [subService, setSubService] = React.useState(0);
  const [unsavedChanges, setUnsavedChanges] = React.useState(false);

  const handleMenuChange = (newState) => {
    if (unsavedChanges) {
      const discardChanges = window.confirm(
        'Zmiany nie zostały zapisane, czy na pewno chcesz kontynuować?'
      );
      if (!discardChanges) return;
    }
    setUnsavedChanges(false);
    switch (newState) {
      case (10):
        setServiceId({...ServiceId, id: 0});
        break;
      case (11):
        setServiceId({...ServiceId, id: -1});
        break;
      case (0):
      case (1):
      case (2):
      case (3):
      case (4):
        setSubService(newState);
        break;
      default:
        props.onStateChange(0);
    }
  };

  return (
    <div className='user-panel'>
      <Menu
        service={ServiceId}
        subService={subService}
        userName={props.userName}
        onMenuChange={handleMenuChange}
      />
      {
        (ServiceId.id > 0)
          ? (
            <Service
              serviceId={ServiceId.id}
              subService={subService}
              serverAddress={props.serverAddress}
              token={props.token}
              onChanges={setUnsavedChanges}
            />
          )
          : (ServiceId.id === -1)
            ? (
              <UserEdit />
            )
            : (
              <ServiceList
                serverAddress={props.serverAddress}
                token={props.token}
                setServiceId={setServiceId}
                onChanges={setUnsavedChanges}
              />
            )
      }
    </div>
  );
}

export { UserPanel };
