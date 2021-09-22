import React,{createContext}  from 'react'
import {useAuth} from './Hooks/useAuth'
import {useSingleArticle} from './Hooks/useSingleArticle'
import {useUserData} from './Hooks/useUserData'
import {useTheme} from './Hooks/useTheme'
export const Authorization = createContext()
export const SingleArticleState = createContext()
export const UserData = createContext()
export const Theme = createContext()


export const ProviderAuthorization = ({children})=>{
	const Auth = useAuth()

	return  <Authorization.Provider value ={Auth}>{children}</Authorization.Provider>
}

export const SingleArticleProvider = ({children}) =>{
	const Article = useSingleArticle()
	return <SingleArticleState.Provider value = {Article}>{children}</SingleArticleState.Provider>
}



export const UserDataProvider = ({children}) =>{
	const Userdata = useUserData()
	return <UserData.Provider value = {Userdata}>{children}</UserData.Provider>
}

export const ThemeProvider = ({children})=>{
	const ThemeData = useTheme()

	return  <Theme.Provider value ={ThemeData}>{children}</Theme.Provider>
}
