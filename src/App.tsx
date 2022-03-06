import { useState } from 'react';
import styles from './App.module.css';
import Calendar from './Calendar';
import { Event, newEvent } from './utils/event';
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

  function removeEvent(event: Event) {
    setEvents(events.filter((e) => e.uuid != event.uuid));
  }

  // Button Actions
  const monthDown: React.MouseEventHandler<HTMLButtonElement> = () => {
    const date = new Date(month);
    date.setDate(0);
    setMonth(date);
  };

  const monthUp: React.MouseEventHandler<HTMLButtonElement> = () => {
    const date = new Date(month);
    date.setDate(32);
    setMonth(date);
  };

  const monthToday: React.MouseEventHandler<HTMLButtonElement> = () => {
    const date = new Date(today);
    setMonth(date);               // TODO: Scroll appropriately.
  };

  const addEvent: React.MouseEventHandler<HTMLButtonElement> = () => {
    setcurrentEditEvent({
      event: newEvent('Test event', new Date(), new Date(), '#558899'),
      new: true,
      save: saveEvent,
      remove: removeEvent,
      close: () => {
        setcurrentEditEvent(undefined);
      }
    });
  };

  const editEvent: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (events.length < 1) return;
    setcurrentEditEvent({
      event: events[0],
      save: saveEvent,
      remove: removeEvent,
      close: () => {
        setcurrentEditEvent(undefined);
      }
    });
  };

  const list: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log(events);
  };

  return (
    <>
      <div className={styles.contentStrip}>
        <div className={styles.controls}>
          <button onClick={monthDown}>&lt;</button>
          <div className={styles.month}>
            {getLongMonth(month)}
          </div>
          <button onClick={monthUp}>&gt;</button>
          <button onClick={monthToday}>Today</button>
          <button onClick={addEvent}>new</button>
          <button onClick={editEvent}>edit</button>
          <button onClick={list}>list</button>
        </div>
        <Calendar today={today} month={month}/>
      </div>
      <EventModal data={currentEditEvent}/>
    </>
  );
}
