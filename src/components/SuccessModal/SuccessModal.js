import "./SuccessModal.scss"
import success from '../../assets/success.svg'
import { Link } from "react-router-dom"

function SuccessModal() {
  return (
    <div className='success-message'>
        <div className='success-message__box'>
            <img className='success-message__icon' src={success} alt="success icon"/>
            <h2 className='success-message__title'>Success!</h2>
            <p className='success-message__message'>Record saved sucessfully</p>
            <Link to="/weekly-announcements" className='success-message__button'>OK</Link>
        </div>
    </div>
  )
}

export default SuccessModal