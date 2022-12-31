import './css/style.css';
import React, { useEffect, useState } from 'react';
// import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createMemory, updateMemory } from '../actions/memory';
import { useNavigate } from 'react-router-dom';

const Form = ({ ele, setEle }) => {
    const [data, setData] = useState({ title: '', message: '', tags: '' });

    const user = JSON.parse(localStorage.getItem('profiles'));

    const [file, setFile] = useState();

    const formData = new FormData();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const changedData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.append("title", data.title);
        formData.append("message", data.message);
        formData.append("tags", data.tags);
        formData.append("name", user?.userProfile?.name);
        if (ele) {
            dispatch(updateMemory(ele._id, formData));
        }
        else {
            formData.append("img", file);
            dispatch(createMemory(formData));
            navigate('/');
        }
        clear();
    }

    const clear = () => {
        setEle(null);
        setData({ title: '', message: '', tags: '' });
        setFile('');
    }

    useEffect(() => {
        if (ele) {
            console.log(ele);
            setData(ele);
        }
    }, [ele]);

    return (
        <>
            <div className='black'>
                {user === null ? (
                    <h6 className='ms-auto p-3 mt-2 w-100 text-center'>
                        Please login or signin to create your memories
                    </h6>) :
                    (<form className='p-3 m-1 mt-5' style={{}} autoComplete='off'>
                        <div className='mb-3'>
                            <h3 className='text-center'>{ele ? 'Update' : 'Create'} a Memory</h3>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="grey w-100" id="title" name='title' value={data.title} onChange={changedData} placeholder='Title' />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="grey w-100" id="message" name='message' value={data.message} onChange={changedData} placeholder='Message' />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="grey w-100" id="tags" name='tags' value={data.tags} onChange={changedData} placeholder='Tags' />
                        </div>
                        <div className='mb-3'>
                            <input type={'file'} name='img' className='grey w-100' onChange={(e) => { setFile(e.target.files[0]) }} />
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className='mb-3'>
                            <div className="btn btn-danger w-100" onClick={clear}>Clear</div>
                        </div>
                    </form>)}
            </div>
        </>)
}

export default Form
