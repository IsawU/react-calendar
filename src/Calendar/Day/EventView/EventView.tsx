import styles from './EventView.module.css';
import { Event, getDefaultEventColor, getTextColor } from "../../../utils/event";

export type EventViewProps = {
  event: Event;
  onClick: () => void;
};

export default function EventView(props: EventViewProps) {
  const name: string = props.event.name;
  const eventColor: string | undefined = props.event.color;
  const backgroundColor: string = eventColor !== undefined ? eventColor : getDefaultEventColor()
  const foregroundColor: string = getTextColor(backgroundColor);

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    props.onClick();
  };

  return (
    <div className={`${styles.item} ${styles.event}`}
         style={{backgroundColor: backgroundColor, color: foregroundColor}}
         onClick={onClick}
         >
           {name}&nbsp;
    </div>
  );
}