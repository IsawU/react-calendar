import styles from './Calendar.module.css';
import Day from './Day';
import { getShortWeekday } from '../utils/date';

export type CalendarProps = {
  month: Date;
  today?: Date;
};

export default function Calendar(props: CalendarProps) {
  const month: Date = new Date(props.month);
  const today: Date | undefined = props.today !== undefined ? new Date(props.today) : undefined;  // TODO: Possible performance gain, as today should not need to be ever changed.

  month.setDate(1);                     // Make sure we get the first day of requested month.
  const firstMonthDay = month.getDay();
  const firstCalenderDay = 2 - (firstMonthDay > 0 ? firstMonthDay : 7);  // Get offset to the first day of the calendar.

  // Create days for the calendar.
  const days: JSX.Element[] = [];
  for (let day = firstCalenderDay; day < firstCalenderDay+42; ++day) {
    const date = new Date(props.month);
    date.setDate(day);
    days.push(<Day date={date} month={month} today={today}/>);
  }

  // Get short day names for calendar header.
  const dayHeaders: JSX.Element[] = [];
  const dateHeaders = new Date(0);
  for (let day = 5; day < 12; ++day) {    // TODO: Perhaps use a separate component that does not ever need to be redrawn.
    dateHeaders.setDate(day);
    dayHeaders.push(
      <div className={styles.header}>
        {getShortWeekday(dateHeaders)}
      </div>
    );
  }

  return (
    <div className={styles.calendar}>
      {dayHeaders}
      {days}
    </div>
  );
}
