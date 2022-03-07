import styles from './Day.module.css';
import eventStyles from './EventView/EventView.module.css';
import { Event } from '../../utils/event';
import { getShortWeekday, isSameDay, isDayInRange } from '../../utils/date';
import EventView from './EventView';

export type DayProps = {
  date: Date;
  month?: Date;
  today?: Date;
  events?: Event[];
  addEvent?: (event: Event) => void;
  editEvent?: (event: Event) => void;
  removeEvent?: (event: Event) => void;
};

export default function Day(props: DayProps): JSX.Element {
  const isWeekend: boolean = props.date.getDay() == 0 || props.date.getDay() == 6;
  const isInactive: boolean = props.date !== undefined && props.month !== undefined ? props.date.getMonth() != props.month.getMonth() : false;
  const isToday: boolean = props.today !== undefined ? isSameDay(props.date, props.today) : false;

  // Events
  const todayEvents: Event[] | undefined = props.events?.filter(event => isDayInRange(props.date, event.from, event.to));
  const eventCount: number = todayEvents !== undefined ? todayEvents.length : 0;
  const events: JSX.Element[] = [];
  for (let event = 0; event < 5; ++event) {
    if (event >= eventCount || todayEvents === undefined) { // Empty
      events.push(<div className={`${eventStyles.item} ${eventStyles.empty}`}>Hic sunt leones…</div>);
    }
    else if (event == 4 && eventCount > 5) {  // N more events
      const more: number = eventCount - 4;
      events.push(<div className={`${eventStyles.item} ${eventStyles.more}`}>+ {more} more event{more > 1 ? 's' : ''}</div>);
    }
    else {      // EventView
      events.push(
        <EventView event={todayEvents[event]} onClick={
          () => {
            if (props.editEvent !== undefined) {
              props.editEvent(todayEvents[event])
            }
          }
        }/>
      );
    }
  }

  return (
    <div className={`${styles.day} ${isWeekend ? styles.weekend : ''} ${isInactive ? styles.inactive : ''} ${isToday ? styles.today : ''}`}>
      <div className={styles.header}>{getShortWeekday(props.date)}</div>
      <div className={styles.data}>
        <div className={styles.title}>{props.date.getDate()}</div>
        {events}
      </div>
    </div>
  );
}
