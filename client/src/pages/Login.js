import React , {useState ,useEffect} from 'react';
import {
        MDBCard,
        MDBCardBody,
        MDBInput,
        MDBCardFooter,
        MDBValidation,
        MDBValidationItem,
        MDBBtn,
        MDBIcon,
        MDBSpinner,
    } from 'mdb-react-ui-kit'
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify'
import { googleSignIN, login } from '../redux/features/authSlice';
import {GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const initialState = {
  email : '',
  password : ''
}



function Login() {
  const [formValue ,setFormValue] = useState(initialState);
  const {loading , error} = useSelector((state)=>({...state.auth}))
  const {email , password} = formValue; 
  const dispatch = useDispatch();
  const navigate =useNavigate();
  
   
  useEffect(()=>{
      error && toast.error(error)
  },[error])

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(email && password){
      dispatch(login({formValue, navigate,toast}))
    }
  }  ;
  const onInputChange = (e) =>{
    const {name,value} = e.target;
    setFormValue({
      ...formValue,
      [name] : value
    })
  };
  const googleSuccess = (resp) => {
    console.log('res',{resp});
    let decoded = jwtDecode(resp?.credential);
    const email = decoded?.email;
    const name = decoded?.name;
    const googleId = decoded?.sub;
    const credential = resp?.credential
    const result = { email, name,  googleId ,credential};
    dispatch(googleSignIN({ result, navigate, toast }));
    console.log(result);
  };

  const googleError = (err)=>{
    console.log('Login failed');
    toast.error(err);
  }

 
 
  return (
    <div 
    style={{
      margin:'auto' ,
      padding: '15px' ,
      maxWidth: '450px' ,
      alignContent:'center' ,
      marginTop:'120px',
    }}
    >
     <MDBCard alignment='center'>
     <MDBIcon fas icon='user-circle'  className='fa-2x'/>
     <h5>Sign In</h5>
     <MDBCardBody>
       <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
         <div className='col-md-12'>
          <MDBValidationItem invalid feedback='Please provide your email'>
        
                 <MDBInput
                  label='Email'
                  type='email'
                  value={email} 
                  name='email'
                  onChange={onInputChange}
                  required
                  
                 />

         
          </MDBValidationItem>
         </div>
         <div className='col-md-12'>
          <MDBValidationItem invalid feedback='Please provide your password'> 
          
         
                 <MDBInput 
                  label='Password'
                  type='password'
                  value={password} 
                  name='password'
                  onChange={onInputChange}
                  required
                 
                 />

         
          </MDBValidationItem>
         </div> 
         
           <div className='col-12'>
                <MDBBtn style={{width:'100%'}} className='mt-2'>
                {loading &&  (
                  <MDBSpinner 
                    size='sm'
                    role ='status'
                    tag='span'
                    className='me-2'
                  />
                )} 
                       Login
                </MDBBtn>
           </div>

        </MDBValidation>
        
       <br/>
        <GoogleLogin
          onSuccess={googleSuccess}
          onError={googleError}  
          theme='filled_black'
          width= "370px"
          
          
          
          />
 
     </MDBCardBody>

     <MDBCardFooter>
      <Link to='/register'>
        <p>Don't have an account ? Sign Up</p>
      </Link>
     </MDBCardFooter>

     </MDBCard>
    </div>
  )
};

export default Login;
