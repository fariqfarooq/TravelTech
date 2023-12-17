import React ,{useState,useEffect}from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBValidationItem,
    MDBBtn,
 
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import {toast} from 'react-toastify';
import {useNavigate ,useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { createTour, updateTour } from '../redux/features/tourSlice';


const initialState = {
    title: '',
    description :'',
    tags :[],
    
}

const AddEditTour = () => {
    const [tourData ,setTourData] = useState(initialState);
    const {title,description,tags} = tourData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error,userTours} = useSelector((state)=>({...state.tour}));
    const {user} = useSelector((state)=>({...state.auth}));
    const {id} =useParams();

    useEffect(()=>{
        const singleTour = userTours.find((tour)=> tour._id === id);
        if(singleTour){
            setTourData(singleTour);
        }
    },[userTours,id])

     useEffect(()=>{
        error && toast.error(error)
    },[error])

     const handleSubmit =(e)=>{
        e.preventDefault();
        if(title && description && tags){
            const updatedTourData = {...tourData, name : user?.result?.name};
            if(!id){
                dispatch(createTour({updatedTourData,navigate,toast}));
                handleClear();
            }
            else{
                dispatch(updateTour({id,updatedTourData,navigate,toast}));
                handleClear();
            }
            
            
        }
        
     }
     const onInputChange =(e)=>{
          const {name,value} = e.target;
          setTourData({
            ...tourData,
            [name] : value
          })
     }
     const handleClear =()=>{
        setTourData({
            title:"",
            description:'',
            tags:[]
        })
     }
     const handleAddTag=(tag)=>{
           setTourData({
               ...tourData,
               tags:[...tourData.tags,tag]
             })
        }
     const handleDeleteTag = (deleteTag)=>{
        setTourData({
            ...tourData,
            tags:tourData.tags.filter((tag)=> tag !== deleteTag)
        })
     }


  return (
    <div style={{
      margin:'auto' ,
      padding: '15px' ,
      maxWidth: '450px' ,
      alignContent:'center' ,
      marginTop:'120px',
    }} className='container'>
    <MDBCard alignment='center'>
        <h5>{id ? 'Upadate Tour' : "Add Tour"}</h5>
        <MDBCardBody>
        <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate   >
        <MDBValidationItem invalid feedback='Please provide title'>
            <div className='col-md-12'>
                <input 
                placeholder='Enter Title'
                type='text'
                value={title}
                name='title'
                onChange={onInputChange}
                className='form-control' 
                 required
               
                />
            </div>
        </MDBValidationItem>
         
        <MDBValidationItem invalid feedback='Please provide description'>
        <div className='col-md-12'>
                <textarea
                style={{height:'100px'}} 
                placeholder='Enter Description'
                type='text'
                value={description}
                name='description'
                onChange={onInputChange}
                className='form-control' 
                 required
                
                />
            </div>
        </MDBValidationItem>
           
            <div className='col-md-12'>
            <ChipInput 
                name='tags'
                variant='outlined'
                placeholder='Enter Tag'
                fullWidth
                value={tags}
                onAdd={(tag)=>handleAddTag(tag)}
                onDelete={(tag)=>handleDeleteTag(tag)}
            />
            </div>
            <div className='d-flex.justify-content-start'>
            <FileBase
              type='file'
              multiple={false} 
              onDone={(({base64})=>
              setTourData({...tourData,imageFile:base64}))
              } 

              />

            </div>

            <div className='col-12'>
            <MDBBtn style={{width:'100%'}}>{id ? "Update" : "Submit"}</MDBBtn>
            <MDBBtn style={{width:'100%'}} className='mt-2' color='danger' onClick={handleClear}>Clear</MDBBtn>

            </div>
            
        </MDBValidation>
        </MDBCardBody>
    </MDBCard>

    </div>
    
  )
}

export default AddEditTour;