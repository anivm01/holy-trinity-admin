import { Link } from 'react-router-dom'
import SavedWorshipOffices from '../../components/SavedWorshipOffices/SavedWorshipOffices'
import './WorshipOfficesPage.scss'

function WorshipOfficesPage() {
  return (
    <section className='worship-offices-page'>
        <Link className='worship-offices-page__link' to="/worship-offices/add-new">Add New</Link>
        <SavedWorshipOffices />
    </section>
  )
}

export default WorshipOfficesPage