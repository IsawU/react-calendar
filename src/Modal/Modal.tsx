import styles from './Modal.module.css';

type ModalProps = {
  children: JSX.Element;
}

let shown: boolean = false;

// TODO: This is not the best implementation.
// Background modals need to reload when top level modal is closed,
// otherwise, the body will unblock.
export function enableBodyScroll(enable: boolean): void {
  if (enable && shown) {
    shown = false;
    document.body.style.paddingRight = '0';
    document.body.style.overflow = 'auto';
  }
  else if (!shown) {
    shown = true;
    const scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
    document.body.style.paddingRight = scrollbarWidth;
    document.body.style.overflow = 'hidden';
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
