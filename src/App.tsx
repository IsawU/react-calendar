import {useState} from 'react';
import styles from './App.module.css';
import Calendar from './Calendar';
import { getLongMonth } from './utils/date';

export default function App() {
  const [today, setToday] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

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
        </div>
        <Calendar today={today} month={month}/>
      </div>
      <Modal/>
    </>
  );
}
