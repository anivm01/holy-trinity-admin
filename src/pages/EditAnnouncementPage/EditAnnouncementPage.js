import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import EditContentDeliverer from '../../components/EditContentDeliverer/EditContentDeliverer';
import EditWeeklyAnnouncement from '../../components/EditWeeklyAnnouncement/EditWeeklyAnnouncement';
import { API_URL } from '../../utilities/api';

function EditAnnouncementPage() {
    const [data, setData] = useState();
    const [dataBg, setDataBg] = useState();
    const params = useParams();
    return (
      <EditContentDeliverer
        url={`${API_URL}/weekly-announcement/en/${params.id}`}
        setData={setData}
      >
        <EditContentDeliverer
          url={`${API_URL}/weekly-announcement/bg/${params.id}`}
          setData={setDataBg}
        >
          <EditWeeklyAnnouncement data={data} dataBg={dataBg} />
        </EditContentDeliverer>
      </EditContentDeliverer>
    );
}

export default EditAnnouncementPage