import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import EditContentDeliverer from '../../components/EditContentDeliverer/EditContentDeliverer';
import EditWorshipOffice from '../../components/EditWorshipOffice/EditWorshipOffice';
import { API_URL } from '../../utilities/api';

function EditWorshipOfficePage() {
    const [data, setData] = useState();
    const [dataBg, setDataBg] = useState();
    const params = useParams();
    return (
      <EditContentDeliverer
        url={`${API_URL}/worship-office/en/${params.id}`}
        setData={setData}
      >
        <EditContentDeliverer
          url={`${API_URL}/worship-office/bg/${params.id}`}
          setData={setDataBg}
        >
          <EditWorshipOffice data={data} dataBg={dataBg} />
        </EditContentDeliverer>
      </EditContentDeliverer>
    );
}

export default EditWorshipOfficePage