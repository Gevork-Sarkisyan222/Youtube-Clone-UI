import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { format } from 'timeago.js';
import Avatar from '@mui/material/Avatar';

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comments }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/find/${comments.userId}`);
        setUser(res.data);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <Container>
      <Avatar
        alt={user.name}
        src={user.img ? user.img : '/broken-image.jpg'}
        sx={{ width: 50, height: 50 }}
      />
      <Details>
        <Name>
          {user.name} <Date>{format(comments.createdAt)}</Date>
        </Name>
        <Text>{comments.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
