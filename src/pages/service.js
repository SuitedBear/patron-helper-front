import React from 'react';
import {
  Switch,
  Route,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import { Levels } from './Levels';

function Service (props) {
  const { serviceId } = useParams();
  const match = useRouteMatch();

  return (
    <div>
      service ID {serviceId}
      <Switch>
        <Route path={`${match.url}/levels`}>
          <Levels />
        </Route>
        <Route path={match.url}>
          <div>Service Info</div>
        </Route>
      </Switch>
    </div>
  );
}

export { Service };
