import styles from './EventView.module.css';
import { Event, getDefaultEventColor, getTextColor } from "../../../utils/event";
import { getTextRelative } from '../../../utils/date';

export type EventViewProps = {
  event: Event;
  day?: Date;
  onClick: () => void;
};

export default function EventView(props: EventViewProps): JSX.Element {
  const name: string = props.event.name;
  const eventColor: string | undefined = props.event.color;
  const backgroundColor: string = eventColor ?? getDefaultEventColor()
  const foregroundColor: string = getTextColor(backgroundColor);

  const onClick: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    props.onClick();
  };

  if (props.day !== undefined) {
    const textFrom: string = props.day !== undefined ? getTextRelative(props.day, props.event.from) : '';
    const textTo: string = props.day !== undefined ? getTextRelative(props.day, props.event.to) : '';
    const dateText: JSX.Element = props.day !== undefined ? <div>{textFrom} - {textTo}</div> : <></>;

    return (
      <div className={`${styles.item} ${styles.event} ${styles.big}`}
           style={{backgroundColor: backgroundColor, color: foregroundColor}}
           onClick={onClick}
           >
             <b>{name}</b>&nbsp;
             <small>{dateText}</small>
      </div>
    );
  }
  else {
    return (
      <div className={`${styles.item} ${styles.event} ${props.day !== undefined ? styles.big : ''}`}
          style={{backgroundColor: backgroundColor, color: foregroundColor}}
          onClick={onClick}
          >
            {name}&nbsp;
      </div>
    );
  }
}