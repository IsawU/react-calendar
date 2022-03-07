import styles from './Modal.module.css';

type Props = {
  children: JSX.Element;
}

export default function Modal(props: Props) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.modalWidth}></div>
        {props.children}
      </div>
    </div>
  );
}
