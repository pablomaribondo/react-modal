import { FC, useEffect, useRef, ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  duration?: number;
  showCloseButton?: boolean;
}

const DISABLE_CLICK_CLASS = 'disable-click';

const Modal: FC<ModalProps> = ({
  title,
  children,
  onClose,
  duration = 300,
  showCloseButton
}) => {
  const modal = useRef<HTMLDivElement>(null);
  const modalBackground = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    if (modal.current) {
      modal.current.classList.add(DISABLE_CLICK_CLASS);
    }

    if (modalBackground.current) {
      modalBackground.current.style.transitionDuration = `${duration}ms`;
    }

    if (modalContent.current) {
      modalContent.current.style.transitionDuration = `${duration}ms`;
    }

    setTimeout(() => {
      if (modalBackground.current) {
        modalBackground.current.style.opacity = '0.2';
      }

      if (modalContent.current) {
        modalContent.current.style.opacity = '1';
        modalContent.current.style.top = '0';
      }
    }, 20);

    setTimeout(() => {
      if (modal.current) {
        modal.current.classList.remove(DISABLE_CLICK_CLASS);
      }
    }, duration + 20);

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [duration]);

  const closeModalHandler = () => {
    if (modal.current) {
      modal.current.classList.add(DISABLE_CLICK_CLASS);
    }

    if (modalBackground.current) {
      modalBackground.current.style.opacity = '0';
    }

    if (modalContent.current) {
      modalContent.current.style.opacity = '0';
      modalContent.current.style.top = '-100px';
    }

    setTimeout(() => {
      if (modal.current) {
        modal.current.classList.remove(DISABLE_CLICK_CLASS);
        onClose();
      }
    }, duration);
  };

  return (
    <div ref={modal} className="modal">
      <div
        ref={modalBackground}
        className="modal__bg"
        onClick={closeModalHandler}
      />
      <div ref={modalContent} className="modal__inner">
        <div className="modal__head">
          <h2>{title}</h2>
          {showCloseButton && (
            <button type="button" className="btn" onClick={closeModalHandler}>
              &times;
            </button>
          )}
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__foot">
          <a href="/#" onClick={closeModalHandler}>
            Close
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
