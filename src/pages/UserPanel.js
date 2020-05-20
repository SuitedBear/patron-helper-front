import React from 'react';

import { Menu } from '../components/Menu';
import { UserEdit } from '../pages/UserEdit';
import { ServiceList } from '../pages/ServiceList';
import { Service } from '../pages/service';

/**
 * @TODO: should have
 *  - user services list
 *  - some link to todo list
 *  - way to edit logged user data
 *
 *  props: token, onStateChange
 */
function UserPanel (props) {
  const [ServiceId, setServiceId] = React.useState(0);
  const [subService, setSubService] = React.useState(0);

  return (
    <div>
      <Menu
        serviceId={ServiceId}
        setServiceId={setServiceId}
        setSubService={setSubService}
        onLogout={props.onStateChange}
      />
      {
        (ServiceId > 0)
          ? (
            <Service
              serviceId={ServiceId}
              subService={subService}
              serverAddress={props.serverAddress}
              token={props.token}
            />
          )
          : (ServiceId === -1)
            ? (
              <UserEdit />
            )
            : (
              <ServiceList
                serverAddress={props.serverAddress}
                token={props.token}
                setServiceId={setServiceId}
              />
            )
      }
    </div>
  );
}

export { UserPanel };
