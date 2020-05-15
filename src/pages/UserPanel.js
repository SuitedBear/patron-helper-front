import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import { Menu } from './Menu';
import { UserEdit } from './UserEdit';
import { ServiceList } from './ServiceList';
import { Service } from './Service';

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
  const routeMatch = useRouteMatch('/:sId');

  React.useEffect(() => {
    // double render, also catches /user as param
    if (routeMatch) {
      console.log(routeMatch.params.sId);
      setServiceId(routeMatch.params.sId);
    }
  }, [routeMatch]);

  return (
    <>
      <Menu
        serviceId={ServiceId}
      />
      <Switch>
        <Route exact path='/'>
          <ServiceList
            serverAddress={props.serverAddress}
            token={props.token}
          />
        </Route>
        <Route path='/user'>
          <UserEdit />
        </Route>
        <Route path='/:serviceId'>
          <Service />
        </Route>
      </Switch>
    </>
  );
}

export { UserPanel };
