import {useState} from 'react'


export const useUserData = () =>{

	const [userName,setUserName] = useState('')

	return {userName,setUserName}

}