import { useEffect } from "react";
import { Fragment, useState } from "react"
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar, CalendarEvent, CalendarModal, FabAddNews, FabDelete } from "../"
import { localizer, getMessagesES } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  // const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  const lastView = localStorage.getItem('lastView') || 'week'
  const eventStylegetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderradius: '0px',
      opacity: 0.8,
      color: 'white',
      minHeight: '50px'
    }

    return {
      style
    }
  }

  const onDoubleclick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    // setLastView(event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])


  return (
    <Fragment>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesES()}
        eventPropGetter={eventStylegetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleclick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal />
      <FabAddNews />
      <FabDelete />
    </Fragment >
  )
}
