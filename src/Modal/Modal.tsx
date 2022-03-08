import styles from './Modal.module.css';

type ModalProps = {
  children: JSX.Element;
}

export default function Modal(props: ModalProps): JSX.Element {
  return (
    <div className={styles.backdrop}>
      <div className={styles.contentStrip}>
        <div className={styles.modal}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
