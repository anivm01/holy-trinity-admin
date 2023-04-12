import './ErrorModal.scss'
import error from '../../assets/error.svg'

function ErrorModal( {errorMessage, setUploadError } ) {
  return (
    <div className='error-message'>
        <div className='error-message__box'>
            <img className='error-message__icon' src={error} alt="Error icon"/>
            <h2 className='error-message__title'>Save record action required!</h2>
            <p className='error-message__message'>{errorMessage}</p>
            <button onClick={()=>{setUploadError(false)}} className='error-message__button'>OK</button>
        </div>
    </div>
  )
}

export default ErrorModal