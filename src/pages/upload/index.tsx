import React, { useState } from 'react';
import { useCreatePostMutation } from '../../redux/services/postService'; 
import Header from '../components/Header'
import { OutlinedInput,Button,Alert, } from '@mui/material'
const UploadPostPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<any>(1);
  const [successAlert, setSuccessAlert]=useState<boolean>(false);
  const [createPost, { isLoading, isError, data, error }] = useCreatePostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({ title, body, userId }).unwrap();
      setTitle('');
      setBody('');
        setSuccessAlert(true);
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Failed to create post.');
    }
  };

  return (
    <>
    <Header />
    <div className="w-full flex justify-center items-center flex-col mt-[15vh] font-serif">
        <div className="w-[90vw] flex flex-col gap-3">
            <p className="text-2xl font-bold">Post a new blog:</p>
            <p>Title:</p>
            <OutlinedInput onChange={(e)=>{setTitle(e.target.value)}}/>
            <p>Body:</p>
            <OutlinedInput onChange={(e)=>{setBody(e.target.value)}}/>
            <Button className="w-10" onClick={handleSubmit} variant="contained" color="black">Post</Button>
            {successAlert && <Alert severity="success">Post Uploaded!</Alert>}
            {isError || error && <Alert severity="error">Something Went Wrong!</Alert>}
            {isLoading && <p>Loading...</p>}
        </div>
    </div>
    </>
  );
};

export default UploadPostPage;