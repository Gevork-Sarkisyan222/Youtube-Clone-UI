import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function Search() {
  const [videos, setVideos] = useState([]);
  const { search } = useSelector((state) => state.search);

  useEffect(() => {
    const fetchFindVideo = async () => {
      const res = await axios.get(`/videos/search?q=${search}`);
      setVideos(res.data);
    };
    fetchFindVideo();
  }, [search]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Search;
