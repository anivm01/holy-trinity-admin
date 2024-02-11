import './ResourcesPage.scss'
import PageHeader from '../../components/PageHeader/PageHeader';
import AddNewResource from '../../components/Resources/AddNewResource/AddNewResource';
import SavedResources from '../../components/Resources/SavedResources/SavedResources';

function ResourcesPage() {

    return (
        <section className='resources-page'>
            <PageHeader title="Resources"></PageHeader>
            <AddNewResource />
            <SavedResources />
        </section>
    )
}

export default ResourcesPage