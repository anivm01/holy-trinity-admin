import AddNewBroadcast from '../../components/Broadcasts/AddNewBroadcast/AddNewBroadcast';
import SavedBroadcasts from '../../components/Broadcasts/SavedBroadcasts/SavedBroadcasts';
import PageHeader from '../../components/UI/PageHeader/PageHeader';

function BroadcastsPage() {

    return (
        <section>
            <PageHeader title="Broadcasts" />
            <AddNewBroadcast />
            <SavedBroadcasts />

        </section>
    )
}

export default BroadcastsPage