import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditContentDeliverer from "../../components/EditContentDeliverer/EditContentDeliverer";
import { API_URL } from "../../utilities/api";
import EditCalendarEntry from "../../components/EditCalendarEntry/EditCalendarEntry";

function EditEventPage() {
    const [data, setData] = useState();
    const params = useParams();
    return (
        <EditContentDeliverer
            url={`${API_URL}/calendar/${params.id}`}
            setData={setData}
        >
            <EditCalendarEntry data={data} />
        </EditContentDeliverer>
    );
}

export default EditEventPage;
