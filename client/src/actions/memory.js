import * as api from '../api';

export const getMemory = (page) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const { data } = await api.fetchMemory(page);
        console.log(data);
        dispatch({ type: "FETCH_ALL", payload: data });
        dispatch({type:'END_LOADING'});
    } catch (err) {
        console.log("actions memory err " + err);
    }
}

export const getMem=(id)=> async(dispatch)=>{
    try{
        dispatch({type:'START_LOADING'});
        const {data}=await api.fetchMem(id);
        dispatch({type:'FETCH_MEMORY',payload:data});
        dispatch({type:'END_LOADING'});
    }catch(err){
        console.log("details err "+err);
    }
}

export const getMemoriesBySearch = (searchQuery) => async (dispatch) => {
    try {
        // console.log(searchQuery);
        const { data: { data } } = await api.fetchMemoryBySearch(searchQuery);
        // console.log(data);
        // console.log('data');
        dispatch({ type: 'FETCH_BY_SEARCH', payload: data })
    } catch (err) {
        console.log("Search err " + err);
    }
}

export const createMemory = (memory) => async (dispatch) => {
    try {
        console.log(...memory);
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
          console.log(...memory);
        const { data } = await api.createMemory(memory,config);
        dispatch({ type: "CREATE", payload: data })
    } catch (err) {
        console.log('creatememory err ' + err);
    }
}

export const updateMemory = (id, memory) => async (dispatch) => {
    try {
        console.log(...memory);
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
        // console.log(memory);
        const { data } = await api.updateMemory(id, memory,config);
        // console.log(data);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (err) {
        console.log('updateMemory err ' + err);
    }
}

export const likeMemory = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeMemory(id);
        dispatch({ type: 'LIKE', payload: data })
    } catch (err) {
        console.log("like err " + err);
    }
}

export const postComment = (comment,id) => async (dispatch) => {
    try {
        const { data } =await api.postComment(comment,id);
        console.log(data);
        dispatch({ type: 'COMMENT', payload: data });
        return data.comments;
    } catch (err) {
        console.log("like err " + err);
    }
}

export const deleteMemory = (id) => async (dispatch) => {
    try {
        await api.deleteMemory(id);
        dispatch({ type: 'DELETE', payload: id });
    } catch (err) {
        console.log('deleteMemory err ' + err);
    }
}
