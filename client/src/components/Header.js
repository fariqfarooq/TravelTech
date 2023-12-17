import React,{useState} from 'react'; 
import {useSelector,useDispatch} from 'react-redux'  
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { setLogout } from '../redux/features/authSlice';

const Header = () => {
    const [show,setShow] = useState(false);
    const {user}= useSelector((state)=>({...state.auth}));
    const dispatch = useDispatch();

    const handleLogout =()=>{
      dispatch(setLogout());
    }
  return (
   <MDBNavbar fixed='top' expand='lg'  style={{backgroundColor:'#f0e6ea'}}>
     <MDBContainer>
        <MDBNavbarBrand href='/' style={{color:'#606080',fontWeight:"600",fontSize:'22px'}}>
            TourToKashmir
        </MDBNavbarBrand>
       
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={()=>setShow(!show)}
          style={{color:'#606080'}}>

           <MDBIcon icon='bars' fas />
    
        </MDBNavbarToggler>

        <MDBCollapse open={show} navbar>
        <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
        {user?.result?._id && (
             <h5 style={{marginRight:"30px",marginTop:'17px'}}>
              Logged in as : {user?.result?.name}
             </h5>
          )}

        <MDBNavbarItem>
          <MDBNavbarLink href='/'>
                  <p className='header-text'> Home </p>
          </MDBNavbarLink>
        </MDBNavbarItem>

        {user?.result?._id && (
          <>
          <MDBNavbarItem>
          <MDBNavbarLink href='/addTour'>
                  <p className='header-text'>Add Tour</p>
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBNavbarLink href='/dashboard'>
                  <p className='header-text'> Dashboard </p>
          </MDBNavbarLink>
        </MDBNavbarItem>
          </>
        )}
        
        {user?.result?._id ? (
          <MDBNavbarItem>
          <MDBNavbarLink href='/login'>
                  <p className='header-text' onClick={handleLogout}> Logout </p>
          </MDBNavbarLink>
        </MDBNavbarItem>
        ):(
          <MDBNavbarItem>
          <MDBNavbarLink href='/login'>
                  <p className='header-text'> Login </p>
          </MDBNavbarLink>
        </MDBNavbarItem>
        )}
       
       

        </MDBNavbarNav>

        </MDBCollapse>
     </MDBContainer>
       
   </MDBNavbar>
  )
}

export default Header