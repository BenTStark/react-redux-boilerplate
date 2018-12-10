import React, { Component } from "react";
import { object } from "prop-types";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import styles from "./calendar.scss";

const localizer = BigCalendar.momentLocalizer(moment);
const myEventsList = [
  {
    title: "my Event",
    start: moment("2018-12-05", "YYYY-MM-DD"),
    end: moment("2018-12-05", "YYYY-MM-DD"),
    allDay: true
  }
];
export default class CalendarComponent extends Component {
  // Using propTypes is recommended for good code style, readability and code stability
  // static propTypes = {
  //
  //   calendar: object.isRequired
  // };

  render() {
    return (
      <div>
        <BigCalendar
          className={styles.calendar}
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}
