import {useState} from 'react'

export const useTheme = ()=>{
	const[themeState,setThemestate] = useState(true)

	const setHulkTheme = (funk)=>{
		if(themeState){
			setThemestate(false)
			document.getElementById('root').dataset.theme='hulk'
			document.getElementsByTagName('body')[0].dataset.theme='hulk'
		}else{
			setThemestate(true)
			document.getElementById('root').removeAttribute('data-theme')
			document.getElementsByTagName('body')[0].removeAttribute('data-theme')
		}
		
	}
	
	return{
		themeState,
		setHulkTheme
	}

}