import './Modal.scss';
import CloseIcon from '../../../assets/svg/CloseIcon/CloseIcon';


const Modal = ({ visible, setVisible, children, size }) => {
    const containerClassName = `modal__container${size === 'wide' ? ' modal__container--wide' : ''}`;

    return (
        <div className='modal'>
            {visible ? (
                <div className="modal__overlay">
                    <div className={containerClassName}>
                        <button className="modal__close" onClick={() => setVisible(false)}>
                            <CloseIcon className="modal__x" />
                        </button>
                        {children}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Modal;
