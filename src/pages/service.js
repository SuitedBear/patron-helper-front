import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import { Levels } from './Levels';

class Service extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      serviceId: this.props.serviceId
    };
  }

  render () {
    return (
      <div>
        service ID {this.props.serviceId}
        <Switch>
          <Route path={`${this.props.match.path}/levels`}>
            <Levels />
          </Route>
          <Route path={this.props.match.path}>
            <div>Service Info</div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export { Service };
