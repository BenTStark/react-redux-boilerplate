import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeContainer from "./Home/home.container";
import BlogContainer from "./Blog/blog.container";
import ContactContainer from "./Contact/contact.container";
import CalendarContainer from "./Calendar/calendar.container";
import NotFoundComponent from "./NotFound/notFound.component";

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/otherRoute" render={() => <div>other Component</div>} />
        <Route path="/blog" component={BlogContainer} />
        <Route path="/contact" component={ContactContainer} />
        <Route path="/calendar" component={CalendarContainer} />
        <Route path="/callback" render={() => <div>Callback</div>} />
        {/* Catch all route */}
        <Route component={NotFoundComponent} status={404} />
      </Switch>
    </div>
  );
};
