import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getRelatedTours, getTour } from '../redux/features/tourSlice';
import {useParams ,useNavigate} from 'react-router-dom';
import moment from 'moment';
import {MDBCard,MDBCardBody,MDBCardText,MDBCardImage,MDBContainer,MDBIcon, MDBBtn} from 'mdb-react-ui-kit'
import RelatedTours from '../components/RelatedTours';
import DisqusThread from '../components/DisqusThread';

const SingleTour = () => {
    const {id} = useParams();
    const {tour,relatedTours} = useSelector((state)=>({...state.tour}));
    const dispatch = useDispatch();
    const tags = tour?.tags;
    const navigate = useNavigate();

 
    useEffect(()=>{
        tags && dispatch(getRelatedTours(tags));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,tags])

    useEffect(()=>{
        if(id){
            dispatch(getTour(id));
        }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,id])
   

  return (
   <>
    <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
        <MDBCardImage
            position='top'
            style={{width:'100%',maxHeight:'600px'}}
            src={tour?.imageFile}
            alt={tour?.title}
        />
        <MDBCardBody>
        <MDBBtn tag='a'  style={{float:'left',color:'#000'}} onClick={()=> navigate("/")}>
        Back

         </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
                <p className='text-start tourName'>Created By: {tour?.name}</p>
            </span>
            <div style={{float:'left'}}>
            <span className='text-start'>
               {tour &&tour.tags && tour.tags.map((item)=>(
                  `#${item}`
               ))}
            </span>
            </div>
            <br/>
            <MDBCardText className='text-start mt-2'>
            <MDBIcon
            style={{float:'left',margin:'5px',}}
            far
            icon='calendar-alt'
            size='lg' 

            />
            <small className='text-muted'>
                  {moment(tour?.createdAt).fromNow()}
            </small>
            </MDBCardText>
            <MDBCardText className='lead mb-0 text-start'>
                   {tour?.description}
            </MDBCardText>


        </MDBCardBody>

        <RelatedTours relatedTours={relatedTours} tourId={id} />

       

        </MDBCard>
        <DisqusThread id={id} title={tour?.title} path={`/tour/${id}`} />
    </MDBContainer>
   </>
     
  )
}

export default SingleTour