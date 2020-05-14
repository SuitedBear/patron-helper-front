import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Menu } from './Menu';
import { UserEdit } from './UserEdit';
import { Service } from './Service';

function ServiceList (props) {
  return (
    <div>
      Service List
    </div>
  );
}

/**
 * @TODO: should have
 *  - user services list
 *  - some link to todo list
 *  - way to edit logged user data
 *
 *  should recieve token in props
 */
class UserPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // -1: userEdit, 0: serviceList >=1:serviceId
      activeService: 0
    };
  }

  render () {
    return (
      <Router>
        <>
          <Menu serviceId={this.state.activeService} />
          <Switch>
            <Route path='/user'>
              <UserEdit />
            </Route>
            <Route
              path='/:serviceId'
              render={routeProps => <Service {...routeProps} serviceId={this.state.activeService} />}
            />
            <Route path='/'>
              <ServiceList />
            </Route>
          </Switch>
        </>
      </Router>
    );
  }
}

export { UserPanel };
