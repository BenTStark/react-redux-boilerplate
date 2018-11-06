import React from "react";
import { Switch, Route } from "react-router-dom";
//import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import HomeContainer from "./Home/home.container";
import NotFoundComponent from "./NotFound/notFound.component";

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/callback" render={() => <div>Callback</div>} />
        <Route path="/test" component={NotFoundComponent} />
        {/* Catch all route */}
        {/*<Route component={NotFoundComponent} status={404} />*/}
      </Switch>
    </div>
  );
};
