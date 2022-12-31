import './css/style.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdThumbUp, MdDelete, MdEdit } from "react-icons/md";
import { deleteMemory, likeMemory } from '../actions/memory';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

const Memory = ({ setEle }) => {

  const user = JSON.parse(localStorage.getItem('profiles'));

  const location = useLocation();

  const dispatch = useDispatch()

  const { memory, isLoading } = useSelector((state) => {
    return state.memory;
  });

  console.log(memory);

  const navigate = useNavigate();


  // useEffect(() => {

  // }, [location,memory]);

  if (isLoading)
    return <div className='fullHeight'><div className='bor-circle'></div></div>

  if (memory.length === 0)
    return <div className='container'>Sorry for your convenience but this keyword is not reachable</div>
  return (
    <div className='d-flex flex-wrap justify-content-around py-2 col-12' >
      {
        memory.map((mem) => {
          return <div key={mem._id} className="card m-2 my-3 black hidden cardi" style={{ borderRadius: '15px', width: '300px' }}>
            <img src={mem.img} className="card-img-top" alt="img" style={{ borderRadius: '15px 15px 0px 0px', height: '250px' }} />
            <div className="position-absolute d-flex justify-content-between" style={{ top: '0px', color: 'white', padding: '25px', width: '100%' }}>
              <div>
                <h5>{mem.name}</h5>
                <h5 className="">{moment(mem.createdAt).fromNow()}</h5>
              </div>
              <div>
                {(user?.userProfile?.googleId === mem.creator || user?.userProfile?._id === mem.creator) && (
                  <MdEdit style={{ fontSize: '25px', cursor: 'pointer' }} id={mem._id} onClick={() => { setEle(mem) }} />)}
              </div>
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
              <div style={{ color: 'grey', fontStyle: 'italic' }}>{mem.tags.map((tag) => `#${tag} `)}</div>
              <h3 className='card-title'>{mem.title}</h3>
              <div className="card-text">{mem.message.substr(0, 60)}...</div>
              <div className='d-flex justify-content-between'>
                { user?.userProfile && (<span className='d-flex align-items-center' style={{ cursor: 'pointer', color: '#0249ff', fontSize: '25px' }} onClick={() => dispatch(likeMemory(mem._id))} disabled={!user?.userProfile}><MdThumbUp />&nbsp;{`${mem.likes.length} ${mem.likes.length > 1 ? 'likes' : 'like'}`}</span>)}
                {(user?.userProfile?.googleId === mem.creator || user?.userProfile?._id === mem.creator) && (
                  <span className='d-flex align-items-center' style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }} onClick={() => dispatch(deleteMemory(mem._id))}><MdDelete />DELETE</span>)}
              </div>
            </div>
            <button className='btn btn-primary ms-auto m-4 mt-0' style={{ width: '150px' }} onClick={() => { navigate(`/memory/${mem._id}`) }}>Read More</button>
          </div>
        })
      }
    </div>
  )
}

export default Memory
