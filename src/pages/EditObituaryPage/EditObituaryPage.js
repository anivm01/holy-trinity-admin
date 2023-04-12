import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditContentDeliverer from "../../components/EditContentDeliverer/EditContentDeliverer";
import EditObituary from "../../components/EditObituary/EditObituary";
import { API_URL } from "../../utilities/api";

function EditObituaryPage() {
  const [data, setData] = useState();
  const [dataBg, setDataBg] = useState();
  const params = useParams();
  return (
    <EditContentDeliverer
      url={`${API_URL}/obituary/en/${params.id}`}
      setData={setData}
    >
      <EditContentDeliverer
        url={`${API_URL}/obituary/bg/${params.id}`}
        setData={setDataBg}
      >
        <EditObituary data={data} dataBg={dataBg} />
      </EditContentDeliverer>
    </EditContentDeliverer>
  );
}

export default EditObituaryPage;
