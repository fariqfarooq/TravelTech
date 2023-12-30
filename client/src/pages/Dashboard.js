import React ,{useEffect}from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link ,} from 'react-router-dom';
import {
    MDBCard,
    MDBCardText,
    MDBCardTitle,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBCardGroup
} from 'mdb-react-ui-kit';
import { deleteTour, getToursByUser } from '../redux/features/tourSlice';
import Spinner from '../components/Spinner';
import {toast} from 'react-toastify'


const Dashboard = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>({...state.auth}));
    const {userTours,loading} = useSelector((state)=>({...state.tour}));
    const userId = user?.result?._id ;

    useEffect(()=>{
        if(userId){
            dispatch(getToursByUser(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,userId])
    
    const  excerpt = (str)=>{
        if(str.length>40){
            str = str.substring(0,40) + "...";
        }
        return str;
    }
    if(loading){
        return <Spinner />
    }

    const handleDelete =(id)=>{
        if(window.confirm('Are you sure you want to delete this tour ? ')){
            dispatch(deleteTour({id,toast}))
        }

    }
  
  return (
   <div style={{margin:'auto',padding:'120px',maxWidth:'900px',alignContent:"center"}}>
   {userTours.length===0 && (
    <h3> No Tour Available with the user: {user?.result?.name}</h3>
   )}

   {userTours.length>0 &&(
    <>
    <h4 className='text-center'>Dashboard:{user?.result?.name}</h4>
      <hr style={{maxWidth:'750px'}}/>
    </>
   )}
      
      {userTours && userTours.map((item)=>(
        <MDBCardGroup key={item._id}>
            <MDBCard style={{maxWidth:'600px'}}  className='mt-2'>
               <MDBRow className='g-0'>
                <MDBCol md='4'>
                    <MDBCardImage
                    className='rounded'
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                     />

                </MDBCol>
                <MDBCol md='8'>
                  <MDBCardBody>
                    <MDBCardTitle className='text-start'>
                     {item.title}
                    </MDBCardTitle>
                    <MDBCardText className='text-start'>
                        <small className='class-muted'>
                            {excerpt(item.description)}
                        </small>
                    </MDBCardText>
                    <div style={{marginLeft:"5px",float:'right',marginRight:'20px', }}>
                       <MDBBtn className='mt-1' tag='a' color='none'>
                        <MDBIcon fas icon='trash' style={{color:"#dd4b39"}} size='lg' onClick={()=>handleDelete(item._id)} />

                       </MDBBtn>
                       <Link to={`/editTour/${item._id}`}>
                        <MDBIcon fas icon='edit' style={{color:"#55acee",marginLeft:'10px'}} size='lg'/>
                        
                        </Link>

                    </div>
                  </MDBCardBody>

                </MDBCol>
               </MDBRow>

            </MDBCard>
        </MDBCardGroup>
      ))}

   </div>
  )
}

export default Dashboard