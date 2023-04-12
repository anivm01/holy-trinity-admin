import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import EditCommunityNews from '../../components/EditCommunityNews/EditCommunityNews';
import EditContentDeliverer from '../../components/EditContentDeliverer/EditContentDeliverer';
import { API_URL } from '../../utilities/api';

function EditCommunityNewsPage() {
    const [data, setData] = useState();
    const [dataBg, setDataBg] = useState();
    const params = useParams();
    return (
      <EditContentDeliverer
        url={`${API_URL}/article/en/${params.id}`}
        setData={setData}
      >
        <EditContentDeliverer
          url={`${API_URL}/article/bg/${params.id}`}
          setData={setDataBg}
        >
          <EditCommunityNews data={data} dataBg={dataBg} />
        </EditContentDeliverer>
      </EditContentDeliverer>
    );
}

export default EditCommunityNewsPage