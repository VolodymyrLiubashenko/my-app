  import  {useState} from "react";
  export const usePagination = () =>{

    const [currentPage,setCurrentPage] = useState(0)
    const [postsPerPage] = useState(4)

    const firstPostIndex = currentPage*postsPerPage
    const lastPostIndex = firstPostIndex+postsPerPage

    const getCurrentPosts = (articles)=>{
      let currentPosts = articles.slice(firstPostIndex,lastPostIndex)
      return currentPosts
    }
     const setPage = ({selected})=>{
        setCurrentPage(selected)
    }
    
    
  
    return{getCurrentPosts,setPage}

  }
  