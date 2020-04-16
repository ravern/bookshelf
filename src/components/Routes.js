import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BaseLayout from '../layouts/Base';
import ShelfPage from '../pages/Shelf';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/shelf">
          <BaseLayout>
            <ShelfPage />
          </BaseLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
