import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postComment } from '../actions/memory';

const Comments = ({mem}) => {
    const [comments,setComments]=useState(mem?.comments);
    const [comment,setComment]=useState('');
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('profiles'));

    const addComment=async()=>{
        const updatedComments=await dispatch(postComment(`${user?.userProfile.name}: ${comment}`,mem._id));
        console.log(updatedComments);
        setComments(updatedComments);
        setComment('');
    }

  return (
    <div className=''>
      <h4>Comments</h4>
      <hr/>
      <div className='scroll'>
      {comments?.length>0 && comments.map((c,index)=>{
        return (
            <div key={index} className='my-1'><strong>{c.split(': ')[0] } </strong> {c.split(': ')[1]}</div>
        )
      })}
      </div>
      <textarea className='mx-auto my-2 p-2' style={{width:'80%',borderRadius:'5px'}} value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder='Write a comment...' /><br/>
      <button className='btn btn-primary' disabled={!comment || !user} onClick={addComment} >Comment</button>
    </div>
  )
}

export default Comments
