import  {  useState } from "react";
import style from './pagination.module.css'
import ReactPaginate from 'react-paginate';

  const Pagination = ({articles,setPage}) =>{

    const [postsPerPage] = useState(4)
    const pageCount = Math.ceil(articles.length/postsPerPage)
   
 
    return(
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={setPage}
        pageClassName={style.elem}
        breakClassName={style.breaks}
        containerClassName={style.container}
        activeClassName={style.active_elem}
        previousClassName={style.previous}
        nextClassName={style.next}
        disabledClassName={style.disabled}

      />
      )
   }

   export default Pagination
