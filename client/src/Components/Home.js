import './css/style.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMemoriesBySearch, getMemory } from '../actions/memory';
import Form from './Form';
import Memory from './Memory';
import Pages from './Pages';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');

    const [tags, setTags] = useState([]);

    const [ele, setEle] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMemory(page));
    }, [ele, dispatch]);


    const [val, setVal] = useState('');

    const addTag = (e) => {
        if (e.keyCode === 13) {
            if (val.trim() !== '' && !tags.includes(val.trim())) {
                setTags([...tags, e.target.value]);
            }
            setVal('');
        }
    }

    const handleSearch=(e)=>{
        e.preventDefault();
        if(search.trim() || tags.length!==0){
            dispatch(getMemoriesBySearch({search,tags:tags.join(',')}));
            navigate(`/memory/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            navigate('/');
        }
    }

    return (
        <div className='d-flex flex-wrap justify-content-around col-md-10 col-12 m-auto'>
            <div className=' col-md-10 col-11 d-flex align-items-center flex-column'>
                <Memory setEle={setEle} />
                { (!searchQuery && !tags.length)&&
                    <Pages page={page} />}
            </div>
            <div className=' p-2'>
                <div className='mt-5 mb-3 p-3 black'>
                    <div className='mb-2'>
                    <input type={'text'} className='w-100 my-1' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search your memory' />
                    </div>
                    <div className='mb-2'>
                    <input type={'text'} value={val} onKeyDownCapture={addTag} onChange={(e) => { setVal(e.target.value) }} className='w-100 my-1' placeholder='Search for tags' />
                    </div>
                    <div className='d-flex flex-wrap mb-2' style={{ maxWidth: '350px' }}>
                        {tags.map((tag) =>
                            <div className='border d-flex p-1 align-items-center justify-content-between m-1' style={{ borderRadius: '20px' }}>
                                {tag} <TiDelete className='ms-1' style={{ cursor: 'pointer' }} onClick={() => { setTags(tags.filter((t) => t !== tag)) }} />
                            </div>)}
                    </div>
                    <button className='btn btn-primary w-100' onClick={handleSearch} >Search</button>
                </div>
                <Form ele={ele} setEle={setEle} />
            </div>
        </div>
    )
}

export default Home
