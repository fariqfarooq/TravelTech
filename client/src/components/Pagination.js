import React from 'react';
import {MDBPagination,MDBPaginationItem,MDBBtn} from 'mdb-react-ui-kit'

const Pagination = ({setCurrentPage,currentPage,numberOfPages,dispatch}) => {
    
    const renderPagination=(()=>{
        if(currentPage === numberOfPages && currentPage ===1) return null;
        if(currentPage ===1){
            return (
                <MDBPagination center className='mb-0'>
                  <MDBPaginationItem>
                    <p className='fw-bold mt-1'>1</p>
                  </MDBPaginationItem>
                  <MDBPagination>
                    <MDBBtn rounded className='mx-2' onClick={()=> dispatch(setCurrentPage(currentPage + 1))}>
                      Next

                    </MDBBtn>
                  </MDBPagination>

                </MDBPagination>
            );
        }
        else if(currentPage !== numberOfPages){
            return(
                <MDBPagination center className='mb-0'>
                    <MDBPagination>
                       <MDBBtn rounded className='mx-2' onClick={()=> dispatch(setCurrentPage(currentPage - 1))}>
                          Prev

                        </MDBBtn>
                    </MDBPagination>
                    <MDBPaginationItem>
                      <p className='fw-bold mt-1'>{currentPage}</p>
                    </MDBPaginationItem>
                    <MDBPagination>
                    <MDBBtn rounded className='mx-2' onClick={()=> dispatch(setCurrentPage(currentPage + 1))}>
                      Next

                    </MDBBtn>
                  </MDBPagination>
                 

                </MDBPagination>
            );
        } else{
            return(
           <MDBPagination center className='mb-0'>
            <MDBPagination>
               <MDBBtn rounded className='mx-2' onClick={()=> dispatch(setCurrentPage(currentPage - 1))}>
                  Prev

                </MDBBtn>
            </MDBPagination>
            <MDBPaginationItem>
              <p className='fw-bold mt-1'>{currentPage}</p>
            </MDBPaginationItem>
            </MDBPagination>
            )
            
        }
    })

  return (
    <div className='mt-4'>
        {renderPagination()}
    </div>
  )
}

export default Pagination