import * as api from '../api';

export const signIn=(user,navigate)=>async(dispatch)=>{
    try{
        const {data}=await api.signIn(user);
        dispatch({type:'AUTH',data});
        
        navigate('/');
        
    }catch(err){
        console.log('user signin'+err);
    }
}

export const signUp=(user,navigate)=>async(dispatch)=>{
    try{
        const {data}=await api.signUp(user);
        dispatch({type:'AUTH',data});
        navigate('/');
    }catch(err){
        console.log('user signup'+err);
    }
}