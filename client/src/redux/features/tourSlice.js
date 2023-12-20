import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';


export const createTour = createAsyncThunk('tour/create',
async({updatedTourData,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.createTour(updatedTourData);
        toast.success("Tour Added Successfully");
        navigate('/');
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getTours = createAsyncThunk('getTours',
async(page, {rejectWithValue})=>{
    try {
        const response = await api.getTours(page);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getTour = createAsyncThunk('tour/:id',
async(id, {rejectWithValue})=>{
    try {
        const response = await api.getTour(id);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getToursByUser = createAsyncThunk('/tour/UserTours/:id',
async(userId, {rejectWithValue})=>{
    try {
        const response = await api.getToursByUser(userId);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const deleteTour = createAsyncThunk('tour/DeleteTour/:id',
async({id,toast}, {rejectWithValue})=>{
    try {
        const response = await api.deleteTour(id);
        toast.success('Tour Deleted Successfully')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const updateTour = createAsyncThunk('tour/UpdateTour/:id',
async({updatedTourData,id,toast,navigate}, {rejectWithValue})=>{
    try {
        const response = await api.updateTour(updatedTourData,id);
        toast.success('Tour Updated Successfully');
        navigate('/');
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const searchTours = createAsyncThunk('tour/SearchTour',
async(searchQuery, {rejectWithValue})=>{
    try {
        const response = await api.getToursBySearch(searchQuery);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const searchToursByTag = createAsyncThunk('tour/Tagsearch',
async(tag, {rejectWithValue})=>{
    try {
        const response = await api.getToursByTag(tag);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getRelatedTours = createAsyncThunk('tour/getRelatedTours',
async(tags, {rejectWithValue})=>{
    try {
        const response = await api.getRelatedTours(tags);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const likeTour = createAsyncThunk('liketour/:id',
async({_id}, {rejectWithValue})=>{
    try {
        const response = await api.likingTour(_id);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});




const tourSlice = createSlice({
    name : 'tour',
    initialState :{
        tour : {},
        tours : [],
        userTours:[],
        tagTours:[],
        relatedTours:[],
        currentPage : 1,
        numberOfPages : null,
        error : "",
        loading : false,
    },
     reducers:{
         setCurrentPage : (state,action)=>{
            state.currentPage = action.payload;
         }
     },
    extraReducers:{
        [createTour.pending] :(state,action)=>{
            state.loading =true
        },
        [createTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.tours =[action.payload];
        },
        [createTour.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [getTours.pending] :(state,action)=>{
            state.loading =true
        },
        [getTours.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.tours =action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getTours.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [getTour.pending] :(state,action)=>{
            state.loading =true
        },
        [getTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.tour =action.payload;
        },
        [getTour.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [getToursByUser.pending] :(state,action)=>{
            state.loading =true
        },
        [getToursByUser.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.userTours =action.payload;
        },
        [getToursByUser.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [deleteTour.pending] :(state,action)=>{
            state.loading =true
        },
        [deleteTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            console.log('action:' ,action);
            const {arg : {id}} = action.meta;
            if(id){
                state.userTours = state.userTours.filter((item)=> item._id !== id);
                state.tours = state.tours.filter((item)=> item._id !== id)
            }
            
        },
        [deleteTour.rejected] : (state,action)=>{
            state.loading = false ;
            console.log('actionnn' ,action);
            state.error = action.payload.message;
        },
        [updateTour.pending] :(state,action)=>{
            state.loading =true
        },
        [updateTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            console.log('action:' ,action);
            const {arg : {id}} = action.meta;
            if(id){
                state.userTours = state.userTours.map((item)=> 
                item._id === id ? action.payload :item) ;
                state.tours = state.tours.map((item)=> 
                item._id === id ? action.payload : item);
            }
            
        },
        [updateTour.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [searchTours.pending] :(state,action)=>{
            state.loading =true
        },
        [searchTours.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.tours =action.payload;
        },
        [searchTours.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [searchToursByTag.pending] :(state,action)=>{
            state.loading =true
        },
        [searchToursByTag.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.tagTours =action.payload;
        },
        [searchToursByTag.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [getRelatedTours.pending] :(state,action)=>{
            state.loading =true
        },
        [getRelatedTours.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.relatedTours =action.payload;
        },
        [getRelatedTours.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [likeTour.pending] :(state,action)=>{
         
        },
        [likeTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";   
            const {arg : {_id}} = action.meta;
            if(_id){
               
                state.tours = state.tours.map((item)=> 
                item._id === _id ? action.payload : item);
            }
            
        },
        [likeTour.rejected] : (state,action)=>{
        
            state.error = action.payload.message;
        },
      
    }
        
    
});

export default tourSlice.reducer;
export const {setCurrentPage} =tourSlice.actions

