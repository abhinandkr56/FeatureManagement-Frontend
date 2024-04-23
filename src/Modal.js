import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, closeModal }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={closeModal} className="close-button">X</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Make sure to have a div with this id in your public/index.html
  );
};

export default Modal;
