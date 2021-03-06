import styles from './DayModal.module.css';
import Modal, { enableBodyScroll } from '../Modal';
import EventView from '../Calendar/Day/EventView';
import { Event, newEvent, getDefaultEventColor } from '../utils/event';
import { getDescriptiveWeekday, isDayInRange, sortCompare } from '../utils/date';

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

  enableBodyScroll(false);

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
    enableBodyScroll(true);
    props.close();
  };

  // Events
  const todayEvents: Event[] | undefined = props.events?.filter((event: Event) => isDayInRange(props.date, event.from, event.to))
                                                        .sort((a: Event, b: Event) => { return sortCompare(a.from, b.from); });
  const events: JSX.Element[] | undefined = todayEvents?.map((event: Event) => {
    return (<EventView key={event.uuid} event={event} day={props.date} onClick={
      () => {
        if (props.editEvent !== undefined) {
          props.editEvent(event)
        }
      }
    }/>);
  });

  return (
    <Modal>
      <>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.controls}>
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