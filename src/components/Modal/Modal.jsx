import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalStyled, Overlay } from './modal.styled';

export const Modal = ({ onClose, src }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalStyled>
        <img src={src} alt="Big" />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
