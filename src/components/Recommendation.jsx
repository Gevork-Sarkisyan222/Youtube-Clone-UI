import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Card from './Card';

const Container = styled.div`
  flex: 2;
`;

function Recommendation({ tags }) {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideoTags = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideo(res.data);
    };
    fetchVideoTags();
  }, [tags]);

  return (
    <Container>
      {video.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Recommendation;
