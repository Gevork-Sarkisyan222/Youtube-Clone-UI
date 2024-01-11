import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Comments = ({ videoId }) => {
  const path = useLocation().pathname.split('/')[2];
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = React.useState([]);
  const [addComment, setAddComment] = useState('');

  const fetchAddComment = async () => {
    try {
      await axios.post('/comments', { desc: addComment, videoId: path });
      const updatedComments = await axios.get(`/comments/${videoId}`);
      setComments(updatedComments.data);
      setAddComment('');
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar
          alt={currentUser.name}
          src={currentUser.img ? currentUser.img : '/broken-image.jpg'}
          sx={{ width: 50, height: 50 }}
        />
        <Input placeholder="Add a comment..." onChange={(e) => setAddComment(e.target.value)} />
        <Button onClick={fetchAddComment}>Send</Button>
      </NewComment>
      {comments.map((comments) => (
        <Comment key={comments._id} comments={comments} />
      ))}
    </Container>
  );
};

export default Comments;
