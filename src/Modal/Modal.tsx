import styles from './Modal.module.css';

type ModalProps = {
  children: JSX.Element;
}

export default function Modal(props: ModalProps): JSX.Element {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.modalWidth}></div>
        {props.children}
      </div>
    </div>
  );
}
