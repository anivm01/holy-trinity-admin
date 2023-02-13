import './ObituariesPage.scss'
import { Link } from "react-router-dom"
import SavedObituaries from '../../components/SavedObituaries/SavedObituaries'

function ObituariesPage() {

    
  return (
    <section className='obituaries-page'>
      <Link className='obituaries-page__link' to="/obituaries/add-new">Add New</Link>
        <SavedObituaries />
    </section>
    )
}

export default ObituariesPage