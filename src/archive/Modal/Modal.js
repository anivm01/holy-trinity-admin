import './Modal.scss';
import close from "../../assets/close.svg";


const Modal = ({ visible, setVisible, children }) => {
    return (
        <div className='modal'>
            {visible ? (
                <div className="modal__overlay">
                    <div className="modal__container">
                        <button className="modal__close" onClick={() => setVisible(false)}><img
                            className="modal__x"
                            src={close}
                            alt="close icon"
                        /></button>
                        {children}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Modal;