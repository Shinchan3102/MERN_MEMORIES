import axios from 'axios';

const API=axios.create({baseURL:'http://localhost:5000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profiles')){
        req.headers.authorization= `Bearer ${JSON.parse(localStorage.getItem('profiles')).token}`;
    }
    return req;
})

export const fetchMemory=(page)=>API.get(`/memory?page=${page}`);
export const fetchMem=(id)=>API.get(`/memory/${id}`);
export const fetchMemoryBySearch=(searchQuery)=>API.get(`/memory/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createMemory=(newMemory,config)=> API.post('/memory',newMemory,config);
export const updateMemory=(id,updatedMemory,config)=> API.patch(`/memory/${id}`,updatedMemory,config);
export const deleteMemory=(id)=>API.delete(`/memory/${id}`);
export const likeMemory=(id)=>API.patch(`/memory/${id}/likes`);
export const postComment=(comment,id)=>API.patch(`/memory/${id}/comment`,{comment});

export const signUp=(user)=>API.post('/users/signup',user);
export const signIn=(user)=>API.post('/users/signin',user);