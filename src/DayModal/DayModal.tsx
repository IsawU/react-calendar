import styles from './DayModal.module.css';
import Modal from '../Modal';
import EventView from '../Calendar/Day/EventView';
import { Event, newEvent, getDefaultEventColor } from '../utils/event';
import { getDescriptiveWeekday, isDayInRange } from '../utils/date';

export type DayModalProps = {
  date: Date;
  events?: Event[];
  close: () => void;
  addEvent: (event: Event) => void;
  editEvent: (event: Event) => void;
};

export default function DayModal(props: {data: DayModalProps | undefined}): JSX.Element {
  return props.data !== undefined ? dayModal(props.data) : <></>;
}

function dayModal(props: DayModalProps): JSX.Element {
  const title = getDescriptiveWeekday(props.date);

  // Click handlers
  const onAddEvent: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const from = new Date(props.date);
    from.setHours(12);
    from.setMinutes(0);
    const to = new Date(from);
    const event: Event = newEvent('', from, to, getDefaultEventColor());
    props.addEvent(event);
  };

  const onClose: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    props.close();
  };

  // Events
  const todayEvents: Event[] | undefined = props.events?.filter(event => isDayInRange(props.date, event.from, event.to));
  const eventCount: number = todayEvents !== undefined ? todayEvents.length : 0;
  const events: JSX.Element[] = [];
  for (let event = 0; event < eventCount; ++event) {
    if (todayEvents !== undefined) {
      events.push(
        <EventView event={todayEvents[event]} day={props.date} onClick={
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
    <Modal>
      <>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div>
            <button className={styles.headerButton} onClick={onAddEvent}>Add</button>
            <button className={styles.headerButton} onClick={onClose}>&times;</button>
          </div>
        </div>
        <div className={styles.container}>
          {events}
        </div>
      </>
    </Modal>
  );
}