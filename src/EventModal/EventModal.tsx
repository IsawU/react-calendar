import { useState } from 'react';
import Modal from '../Modal';
import styles from './EventModal.module.css';
import { Event, getTextColor, getDefaultEventColor } from '../utils/event';
import { getHumanReadableDate } from '../utils/date';
import { Validated, validated, getValidatedStyle } from '../utils/validate';

export type EventProps = {
  event: Event;
  new?: boolean;
  save: (event: Event) => void;
  remove: (event: Event) => void;
  close: () => void;
};

// TODO: Add a better date picker because DST breaks things.
export default function EventModal(props: { data: EventProps | undefined }) {
  return props.data !== undefined ? eventModal(props.data) : <></>;
}

function eventModal(props: EventProps) {
  const newEvent = props.new !== undefined ? props.new : false;
  const ownColor = props.event.color !== undefined ? props.event.color : getDefaultEventColor();

  const [editing, setEditing] = useState<boolean>(newEvent);

  const initialDateValidity = checkDate(getHumanReadableDate(props.event.from), getHumanReadableDate(props.event.to));

  const [name, setName] = useState<Validated<string>>(validated(props.event.name, checkName(props.event.name)));
  const [from, setFrom] = useState<Validated<string>>(validated(getHumanReadableDate(props.event.from), initialDateValidity.from));
  const [to, setTo] = useState<Validated<string>>(validated(getHumanReadableDate(props.event.to), initialDateValidity.to));
  const [color, setColor] = useState<string>(ownColor);

  // Validation functions
  function checkName(name: string): boolean {
    return name.length > 0;
  }

  function checkDate(from: string, to: string): { from: boolean, to: boolean } {
    let fromResult: boolean = true;
    let toResult: boolean = true;

    const fromTime = Date.parse(from);
    const toTime = Date.parse(to);

    if (!isFinite(fromTime)) fromResult = false;
    if (!isFinite(toTime)) toResult = false;

    if (fromResult && toResult) {
      const fromDate = new Date(fromTime);
      const toDate = new Date(toTime);
      if (toDate < fromDate) {
        fromResult = false;
        toResult = false;
      }
    }

    return { from: fromResult, to: toResult };
  }

  // Button actions
  const save: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (name.valid && from.valid && to.valid) {
      const numFrom = Date.parse(from.value);
      const numTo = Date.parse(to.value);
      if (isFinite(numFrom) && isFinite(numTo)) {
        props.event.name = name.value;
        props.event.from = new Date(numFrom);
        props.event.to = new Date(numTo);
        props.event.color = color.length > 0 ? color : undefined;
        props.save(props.event);
        props.new = false;
        setEditing(false);
        return;
      }
    }
    alert("Invalid input.");  // TODO
  };

  const cancel: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newEvent = props.new !== undefined ? props.new : false;
    if (confirm('Cancel?')) {   // TODO
      if (newEvent) {
        props.close();
      }
      else {
        setName(validated(props.event.name, true));
        setFrom(validated(getHumanReadableDate(props.event.from), true));
        setTo(validated(getHumanReadableDate(props.event.to), true));
        setColor(ownColor)
        setEditing(false);
      }
    }
  };

  const remove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (confirm('Remove?')) {   // TODO
      props.remove(props.event);
      props.close();
    }
  };

  const edit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setEditing(true);
  };

  const close: React.MouseEventHandler<HTMLButtonElement> = () => {
    props.close();
  };

  // Inputs change
  const nameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value: string = event.target.value;
    setName(validated(value, checkName(value)));
  };

  const fromChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const from: string = event.target.value;
    const dateValidity = checkDate(from, to.value);
    setFrom(validated(from, dateValidity.from));
    setTo(validated(to.value, dateValidity.to));
  };

  const toChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const to: string = event.target.value;
    const dateValidity = checkDate(from.value, to);
    setTo(validated(to, dateValidity.to));
    setFrom(validated(from.value, dateValidity.from));
  };

  const colorChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setColor(event.target.value);
  };

  if (editing) {
    return (
      <Modal>
        <>
          <div className={styles.header} style={{color: getTextColor(color), backgroundColor: color}}>
            <div className={styles.name}>
              <input type="text" className={getValidatedStyle(name)} value={name.value} onChange={nameChange} placeholder="Event name"/>
            </div>
            <div>
              <button className={styles.headerButton} style={{color: color, backgroundColor: getTextColor(color)}} onClick={save}>Save</button>
              <button className={styles.headerButton} style={{color: color, backgroundColor: getTextColor(color)}} onClick={cancel}>Cancel</button>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.label}>From:</div>
            <input type="text" className={getValidatedStyle(from)} value={from.value} onChange={fromChange}/>
            <div className={styles.label}>To:</div>
            <input type="text" className={getValidatedStyle(to)} value={to.value} onChange={toChange}/>
            <div className={styles.label}>Color:</div>
            <input type="text" value={color} onChange={colorChange} placeholder="#000000 format color"/>
          </div>
        </>
      </Modal>
    );
  }
  else {
    return (
      <Modal>
        <>
          <div className={styles.header} style={{color: getTextColor(color), backgroundColor: color}}>
            <div className={styles.name}>{name.value}<br/><small>{props.event.uuid}</small></div>
            <div>
              <button className={styles.headerButton} style={{color: color, backgroundColor: getTextColor(color)}} onClick={remove}>Delete</button>
              <button className={styles.headerButton} style={{color: color, backgroundColor: getTextColor(color)}} onClick={edit}>Edit</button>
              <button className={styles.headerButton} style={{color: color, backgroundColor: getTextColor(color)}} onClick={close}>&times;</button>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.label}>From:</div>
            <div className={styles.data}>{from.value}</div>
            <div className={styles.label}>To:</div>
            <div className={styles.data}>{to.value}</div>
          </div>
        </>
      </Modal>
    );
  }
}
