import { useState } from 'react';
import styles from './App.module.css';
import Calendar from './Calendar';
import { Event, getDefaultEventColor, newEvent } from './utils/event';
import EventModal, { EventProps } from './EventModal';
import { getLongMonth } from './utils/date';

export default function App() {
  const [today, setToday] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEditEvent, setcurrentEditEvent] = useState<EventProps | undefined>(undefined);

  // Events
  function saveEvent(event: Event) {
    if (events.filter((e) => e.uuid == event.uuid).length == 0) {
      events.push(event);
      setEvents(events);
    }
  }

  function addEvent(event: Event) {
    setcurrentEditEvent({
      event: event,
      new: true,
      save: saveEvent,
      remove: removeEvent,
      close: closeEditEvent,
    });
  }

  function editEvent(event: Event) {
    setcurrentEditEvent({
      event: event,
      save: saveEvent,
      remove: removeEvent,
      close: closeEditEvent,
    });
  }

  function removeEvent(event: Event) {
    setEvents(events.filter((e) => e.uuid != event.uuid));
  }

  function closeEditEvent() {
    setcurrentEditEvent(undefined);
  }

  // Button Actions
  const onMonthDown: React.MouseEventHandler<HTMLButtonElement> = () => {
    const date = new Date(month);
    date.setDate(0);
    setMonth(date);
  };

  const onMonthUp: React.MouseEventHandler<HTMLButtonElement> = () => {
    const date = new Date(month);
    date.setDate(32);
    setMonth(date);
  };

  const onMonthToday: React.MouseEventHandler<HTMLButtonElement> = () => {
    const date = new Date(today);
    setMonth(date);               // TODO: Scroll appropriately.
  };

  const onAddEvent: React.MouseEventHandler<HTMLButtonElement> = () => {
    addEvent(newEvent('Test event', new Date(), new Date(), getDefaultEventColor()));
  };

  const list: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log(events);
  };

  return (
    <>
      <div className={styles.contentStrip}>
        <div className={styles.controls}>
          <button onClick={onMonthDown}>&lt;</button>
          <div className={styles.month}>
            {getLongMonth(month)}
          </div>
          <button onClick={onMonthUp}>&gt;</button>
          <button onClick={onMonthToday}>Today</button>
          <button onClick={onAddEvent}>new</button>
          <button onClick={list}>list</button>
        </div>
        <Calendar today={today} month={month} events={events} addEvent={addEvent} editEvent={editEvent} removeEvent={removeEvent}/>
      </div>
      <EventModal data={currentEditEvent}/>
    </>
  );
}
