import { Fragment } from "react";


export const CalendarEvent = ({event}) => {

    const {title, user} = event;

  return (
    <Fragment>
        <strong>{title}</strong>
        <span> - {user.name}</span>
    </Fragment>
  )
}
