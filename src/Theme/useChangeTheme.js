import {useContext} from 'react'
import {Theme} from '../context'

export const useChangeTheme = () =>{
	const {themeState,setHulkTheme} = useContext(Theme)

	return {
		themeState,
		setHulkTheme
	}
}