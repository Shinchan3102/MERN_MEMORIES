import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getMem, getMemoriesBySearch } from '../actions/memory';
import moment from 'moment';
import Comments from './Comments';

const DetailedPost = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate=useNavigate();

    const { mem, memory, isLoading } = useSelector((state) => state.memory);
    // const state=useSelector((state)=> state);


    useEffect(() => {
        dispatch(getMem(id));
    }, [id]);

    useEffect(() => {
        if (mem) {
            dispatch(getMemoriesBySearch({ search: 'none', tags: mem?.tags.join(',') }));
        }
    })

    const similarMemories = memory.filter((m) => m._id !== id);
    // console.log(similarMemories);


    if (isLoading) {
        // console.log('loading')
        return (<h1 className='bor-circle mx-auto'></h1>)
    }


    return (
        <>
            <div className=" card black m-4 hov d-flex flex-row-reverse flex-wrap justify-content-between" style={{ borderRadius: '5px' }}>
                <div className='col-lg-4 col-xl-4 col-xl-4 col-md-5 col-sm-6 col-12 p-3'>
                    <img src={mem?.selectedFile} className="card-img-top" alt="img" style={{ backgroundSize: 'contain' }} />
                </div>
                <div className='col-lg-6 col-xl-6 col-xxl-6 col-md-7 col-sm-6 col-12 p-3'>
                    <h4>{mem?.name}</h4>
                    <h5 className="">{moment(mem?.createdAt).fromNow()}</h5>
                    <div style={{ color: 'grey', fontStyle: 'italic' }}>{mem?.tags.map((tag) => `#${tag} `)}</div>
                    <h1 className='card-title'>{mem?.title}</h1>
                    <div className="card-text">{mem?.message}</div>
                    <br/>
                    <br/>
                    <Comments mem={mem}/>
                </div>
            </div>
            {similarMemories.length ?
                <div>
                    You might also like:-
                    <hr />
                    <div>
                        {similarMemories.map((mem) =>
                            <div key={mem._id} className="card m-3 black mx-auto hov hov-blue" style={{ borderRadius: '15px', maxWidth: '16rem', minWidth: '13rem' }} onClick={()=>{navigate(`/memory/${mem._id}`)}}>
                                <img src={mem.selectedFile} className="card-img-top" alt="img" style={{ borderRadius: '15px 15px 0px 0px', height: '150px' }} />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h6 className='card-title'>{mem.title}</h6>
                                    <div className="card-text">{mem.message.substr(0, 35)}...</div>
                                </div>
                            </div>)}
                    </div>
                </div> : <div></div>}
        </>
    )
}

export default DetailedPost
