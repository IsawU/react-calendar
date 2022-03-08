import styles from './Modal.module.css';

type ModalProps = {
  children: JSX.Element;
}

// TODO: This is not the best implementation.
// Background modals need to reload when top level modal is closed,
// otherwise, the body will unblock.
export function enableBodyScroll(enable: boolean): void {
  const body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  if (body === undefined) return;
  if (enable) {
    body.style.overflow = 'auto';
  }
  else {
    body.style.overflow = 'hidden';
  }
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
