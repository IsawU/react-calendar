import styles from './Day.module.css';
import { getShortWeekday } from '../../utils/date';

export type DayProps = {
  date: Date;
  month?: Date;
  today?: Date;
};

function dateIsSameDay(lhs: Date, rhs: Date): boolean {
  return lhs.getFullYear() == rhs.getFullYear() &&
  lhs.getMonth() == rhs.getMonth() &&
  lhs.getDate() == rhs.getDate();
}

export default function Day(props: DayProps) {
  const isWeekend = props.date.getDay() == 0 || props.date.getDay() == 6;
  const isInactive = props.date !== undefined && props.month !== undefined ? props.date.getMonth() != props.month.getMonth() : false;
  const isToday = props.today !== undefined ? dateIsSameDay(props.date, props.today) : false;

  // TODO: Remove mockup and actually implement events.
  const eventCount = props.date.getDay();

  const events: JSX.Element[] = [];
  for (let event = 0; event < 5; ++event) {
    if (event >= eventCount) {
      events.push(<div className={`${styles.item} ${styles.empty}`}>Test {event}</div>);
    }
    else if (event == 4 && eventCount > 5) {
      let more = eventCount - 4;
      events.push(<div className={`${styles.item} ${styles.more}`}>+ {more} more event{more > 1 ? 's' : ''}</div>);
    }
    else {
      events.push(<div className={`${styles.item} ${styles.event}`}>Test {event}</div>);
    }
  }
  // ----

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
