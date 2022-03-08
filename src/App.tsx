import { useState } from 'react';
import styles from './App.module.css';
import Calendar from './Calendar';
import { Event, getDefaultEventColor, newEvent } from './utils/event';
import EventModal, { EventProps } from './EventModal';
import DayModal, { DayModalProps } from './DayModal';
import { getLongMonth, getLongYear } from './utils/date';

export default function App(): JSX.Element {
  const [today, _] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const [currentEditEvent, setcurrentEditEvent] = useState<EventProps | undefined>(undefined);
  const [currentViewDay, setCurrentViewDay] = useState<DayModalProps | undefined>(undefined);

  function toThisMonth(): void {
    const date = new Date(today);
    setMonth(date);               // TODO: Scroll appropriately.
  }

  // Events
  function saveEvent(event: Event): void {
    if (events.filter((e) => e.uuid == event.uuid).length == 0) {
      events.push(event);
      setEvents(events);
    }
  }

  function addEvent(event: Event): void {
    setcurrentEditEvent({
      event: event,
      new: true,
      save: saveEvent,
      remove: removeEvent,
      close: closeEditEvent,
    });
  }

  function editEvent(event: Event): void {
    setcurrentEditEvent({
      event: event,
      save: saveEvent,
      remove: removeEvent,
      close: closeEditEvent,
    });
  }

  function removeEvent(event: Event): void {
    const index = events.indexOf(event);
    delete events[index];
    setEvents(events);
  }

  function closeEditEvent(): void {
    setcurrentEditEvent(undefined);
  }

  // Day view
  function viewDay(day: Date): void {
    setCurrentViewDay({
      date: day,
      events: events,
      close: closeViewDay,
      addEvent: addEvent,
      editEvent: editEvent,
    });
  }

  function closeViewDay(): void {
    setCurrentViewDay(undefined);
  }

  // Click handlers
  const onMonthDown: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const date = new Date(month);
    date.setDate(0);
    setMonth(date);
  };

  const onMonthUp: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const date = new Date(month);
    date.setDate(32);
    setMonth(date);
  };

  const onMonth: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    toThisMonth();
  };

  const onToday: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    toThisMonth();
    viewDay(today);
  };

  const onAddEvent: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const from = new Date(today);
    from.setHours(12);
    from.setMinutes(0);
    const to = new Date(from);
    addEvent(newEvent('', from, to, getDefaultEventColor()));
  };

  return (
    <>
      <div className={styles.contentStrip}>
        <div className={styles.controls}>
          <button onClick={onMonthDown}>&lt;</button>
          <div className={styles.now}>
            <div className={styles.month}>{getLongMonth(month)}</div>
            <div className={styles.year}>{getLongYear(month)}</div>
          </div>
          <button onClick={onMonthUp}>&gt;</button>
          <button onClick={onMonth}>Current month</button>
          <button onClick={onToday}>Today</button>
          <button onClick={onAddEvent}>Add event</button>
        </div>
        <Calendar today={today} month={month} events={events} editEvent={editEvent} viewDay={viewDay}/>
      </div>
      <DayModal data={currentViewDay}/>
      <EventModal data={currentEditEvent}/>
    </>
  );
}
