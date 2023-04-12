import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditContentDeliverer from "../../components/EditContentDeliverer/EditContentDeliverer";
import EditEvent from "../../components/EditEvent/EditEvent";
import { API_URL } from "../../utilities/api";

function EditEventPage() {
  const [data, setData] = useState();
  const [dataBg, setDataBg] = useState();
  const params = useParams();
  return (
    <EditContentDeliverer
      url={`${API_URL}/event/en/${params.id}`}
      setData={setData}
    >
      <EditContentDeliverer
        url={`${API_URL}/event/bg/${params.id}`}
        setData={setDataBg}
      >
        <EditEvent data={data} dataBg={dataBg} />
      </EditContentDeliverer>
    </EditContentDeliverer>
  );
}

export default EditEventPage;
