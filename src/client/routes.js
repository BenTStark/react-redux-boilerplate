import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeContainer from "./Home/home.container";
import NotFoundComponent from "./NotFound/notFound.component";

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/otherRoute" render={() => <div>other Component</div>} />
        <Route path="/callback" render={() => <div>Callback</div>} />
        {/* Catch all route */}
        <Route component={NotFoundComponent} status={404} />
      </Switch>
    </div>
  );
};
