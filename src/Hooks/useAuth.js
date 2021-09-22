import {useState} from 'react'

 
export const useAuth = ()=>{
	const [isLoggedIn,setUserStatus] = useState(false)
	const [userdata,setUserData] = useState({})
	const [token,setToken] = useState(sessionStorage.getItem('token'))

	const logIn = ()=>{
		 setUserStatus(true)
	}
	 
	const logOut = ()=>{
		 setUserStatus(false)
		 sessionStorage.removeItem('token')
		 sessionStorage.removeItem('slug')
		 setToken(sessionStorage.getItem('token'))
		 setUserData({})
	}

	const getUser = (data) =>{
		 setUserData(data)
	}

	const removeUserData = () =>{
		 setUserData(undefined)
	}

	const getUserToken = (data) =>{
		 setToken(data)
	}

	const removeUserToken = () =>{
		 setToken(undefined)
	}

	
		
	localStorage.setItem('token',token)


	return{
		isLoggedIn,
		userdata,
		token,
		logIn,
		logOut,
		getUser,
		removeUserData,
		getUserToken,
		removeUserToken
	}
		
}


