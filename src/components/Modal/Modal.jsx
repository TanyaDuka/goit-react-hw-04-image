import React, { useEffect } from 'react';
import s from '../Modal/Modal.module.css';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

  const Modal = ({onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  },
  [onClose]);

  // const handleClose = e => {
  //   if (e.code === 'Escape') {
  //     onClose();
  //   }
  // };

  const handleCloseClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
      <div className={s.Overlay} onClick={handleCloseClick}>
        <div className={s.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }


Modal.propTypes = {
  children: propTypes.element,
  onClose:propTypes.func.isRequired
}

export default Modal;