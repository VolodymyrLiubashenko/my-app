import {useState} from 'react'


export const useSingleArticle = () =>{

	const [singleArticle,setSingleArticle] = useState({})

	const [actionState,setAction] = useState('')

	const editArticleStatus = () =>{
		setAction('toEdit')
	}
	const deleteArticleStatus = () =>{
		setAction('deleted')
	}
	const editedArticle = () => {
		setAction('edited')
	}

	return{singleArticle,setSingleArticle,editArticleStatus,deleteArticleStatus,actionState,editedArticle,setAction}

}