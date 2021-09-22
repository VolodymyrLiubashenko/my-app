import axios from "axios";


export const Axios = axios.create({
	baseURL: "/",
	headers: {
      "Access-Control-Allow-Origin":'http://localhost:3000/',
    },
});

export const authInstance = axios.create({
    baseURL: "/",
    headers: {
      Authorization: `Token ${localStorage.getItem('tokenvalue')}`,
      "Access-Control-Allow-Origin":'http://localhost:3000/',
    },
  });

export const getArticles = () => {
	return Promise.all([
		Axios.get("articles?limit=3")
			.then(({ data }) => data)
	]);
};

export const getSingleArticle = (slug )=>{
	return Promise.all([
	authInstance.get(`articles/${slug}`)
	.then(({data})=>data.article)
	])
} 

export const getArticlesFeed = () => {
	return Promise.all([
		Axios.get("articles/feed?limit=3")
			.then(({ data }) => data)
	]);
};

export const setFavouriteArticle = (slug) =>{
	return Promise.all([
		authInstance.post(`articles/${slug}/favorite`)
		.then(({data})=>data.article)
		])
}
export const setUnfavouriteArticle = (slug) =>{
	return Promise.all([
		authInstance.delete(`articles/${slug}/favorite`)
		.then(({data})=>data.article)
		])
}



export const getTags = () => {
	return Promise.all([
	Axios.get("tags?limit3")
	.then(({data}) => data)
		])
};



export const getCurrentUser = ()=>{
	return Promise.all([
	authInstance.get("user")
	.then((data)=>data)
	])
} 

export const addComment =(slug,body) =>{
	return Promise.all([
	authInstance.post(`articles/${slug}/comments`,{
		"comment":{
			"body": body
		}})
	.then((res)=>console.log(res))
	])
}

export const deleteComment = (slug,id)=>{
	return Promise.all([
		authInstance.delete(`articles/${slug}/comments/${id}`)
		.then((res)=>console.log(res))
		])
}

export const  getCommentsFromArticle = (slug)=>{
	return Promise.all([
	authInstance.get(`/articles/${slug}/comments`)
	.then((data)=>data.data.comments)
	])
}

export const getUserProfile = (username) =>{
	return new Promise(()=>{
		authInstance.get(`/profiles/${username}`)
		.then((data)=>console.log(data))
	})
}

export const followUser = (username) =>{
	return new Promise(()=>{
		authInstance.post(`/profiles/${username}/follow`)
		.then((data)=>console.log(data))
	})
}


export const unfollowUser = (username) =>{
	return new Promise(()=>{
		authInstance.DELETE(`/profiles/${username}/follow`)
		.then((data)=>console.log(data))
	})
}




export const test = () => {
	return  Promise.all([
		Axios.get("articles?limit=3")
			.then(({ data }) => data),
		Axios.get("tags?limit3")
			.then(({data}) => data)
	]).then(([articles,tags])=>{
		return {articles,tags}
	})
};













