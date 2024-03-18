import './PriestResourcesPage.scss'
import PageHeader from '../../components/UI/PageHeader/PageHeader';
import SavedPriestResources from '../../components/PriestResources/SavedResources/SavedPriestResources';
import AddNewPriestResource from '../../components/PriestResources/AddNewPriestResource/AddNewPriestResource';
import SavedCategories from '../../components/PriestResources/SavedCategories/SavedCategories';

function PriestResourcesPage() {

    return (
        <main className='priest-resources-page'>
            <PageHeader title="Resources"></PageHeader>
            <section className='priest-resources-page__content'>
                <SavedPriestResources />
                <div className='priest-resources-page__editing'>
                    <SavedCategories />
                    <AddNewPriestResource />
                </div>
            </section>
        </main>
    )
}

export default PriestResourcesPage