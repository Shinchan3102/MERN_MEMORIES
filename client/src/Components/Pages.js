import './css/style.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getMemory } from '../actions/memory';

const Pages = ({page}) => {
    
    const {totalPages}=useSelector((state)=>state.memory);
    const pages=[...Array(totalPages).keys()];

    const dispatch=useDispatch();

    useEffect(()=>{
        if(page){
            dispatch(getMemory(page));
        }
    },[page]);

    return (
        <div className='mt-3'>
            <ul className="pagination">
                <li className={`page-item ${(Number(page)===1 || !Number(page)) ? 'disabled': ''} bla`} >
                    <Link className="page-link bla" to={`/memory?page=${Number(page)-1}`}>Previous</Link>
                </li>
                {
                    pages.map((p,i)=> <li className={`page-item ${p+1===(Number(page) || 1) ? 'active' : ""} bla`} key={i}>
                        <Link className="page-link bla" to={`/memory?page=${p+1}`}>{p+1}</Link>
                        </li>)
                }
                <li className={`page-item ${(Number(page)===totalPages || totalPages===1) ? 'disabled': ''} bla`} >
                    <Link className="page-link bla" to={`/memory?page=${Number(page)+1}`}>Next</Link>
                </li>
            </ul>
        </div>
    )
}

export default Pages
