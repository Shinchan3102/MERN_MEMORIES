import './css/style.css';
import React, { useEffect, useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { BiShow, BiHide } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../actions/auth';
import env from 'react-dotenv';

// dotenv.config();


const Auth = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: `${env.CLIENTID}`,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const style = {
    width: '100%', height: '3rem'
  };

  const [isSignUp, setIsSignUp] = useState(true);

  const [prev, setPrev] = useState(false);

  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

  const [passwordType, setPasswordType] = useState('password');

  const navigate = useNavigate();

  const change = () => {
    setPrev(!prev);
    setPasswordType(passwordType === 'text' ? 'password' : 'text');
  };

  const updateData=(e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp){
      dispatch(signUp(userData,navigate));
    }
    else{
      dispatch(signIn(userData,navigate));
    }
  };

  const responseGoogleSuccess = async (response) => {
    const userProfile = response?.profileObj;
    const token = response?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { userProfile, token } });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  const responseGoogleFailure = async (response) => {
    console.log(response);
    console.log('failure')
  }

  return (
    <div className='mx-auto d-flex align-items-center flex-column black mt-5 p-3 col-10' style={{ maxWidth: '500px' }}>
      <MdLockOutline className='p-1 mb-2' style={{ fontSize: '2.5rem', backgroundColor: 'rgb(93 97 149)', borderRadius: '50%' }} />
      <form className='d-flex flex-column align-items-center w-100' onSubmit={handleSubmit}>

        {isSignUp ? 
        <div className='d-flex flex-row w-100'>
          <div className='w-50 p-2'>
            <input type={'text'} id='firstName' name='firstName' placeholder="First Name" style={style} onChange={updateData} />
          </div>
          <div className='w-50 p-2'>
            <input type={'text'} id='lastName' name='lastName' placeholder='Last Name' style={style} onChange={updateData} />
          </div>
        </div> : <></>}

        <div className='w-100 p-2'>
          <input type='email' id='email' name='email' placeholder="Email" style={style} value={userData.email} onChange={updateData} />
        </div>

        <div className='w-100 p-2'>
          <input type={passwordType} id='password' name="password" placeholder="Password" style={style} value={userData.password} onChange={updateData} />
          {prev ? 
          <BiShow style={{ marginLeft: '-30px', fontSize: '1.3rem', cursor: 'pointer' }} onClick={change} /> : 
          <BiHide style={{ marginLeft: '-30px', fontSize: '1.3rem', cursor: 'pointer' }} onClick={change} />}
        </div>

        {isSignUp ? 
        <div className='w-100 p-2'>
          <input type='password' id='confirmPassword' name='confirmPassword' placeholder='Confirm Password' style={style} onChange={updateData} />
        </div> : <></>}
        <div className='w-100 p-2'>
          <button type='submit' className='btn btn-primary' style={style}>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </div>
        <div className='w-100 p-2'>
          <GoogleLogin
            clientId={`${env.CLIENTID}`}
            render={renderProps => (
              <button className='btn grey w-100' onClick={renderProps.onClick} disabled={renderProps.disabled}> <FcGoogle style={{ fontSize: '1.5rem' }} /> Sign Up with Google</button>
            )}
            buttonText="Login"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy='single_host_origin'
          />
        </div>
      </form>
      {
        isSignUp ? <div>Already registered? <span onClick={() => { setIsSignUp(!isSignUp) }} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#4545ff' }}>Sign In</span></div> : <div>Not registered? <span onClick={() => { setIsSignUp(!isSignUp) }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>Sign Up</span></div>
      }
    </div>
  )
}

export default Auth
// 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