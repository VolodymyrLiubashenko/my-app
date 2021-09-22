import React from 'react';
import style from './spinner.module.css';

const Spinner  = ({size}) =>{
	return(
		<div className = {style.spinner_container}
			data-size = {size}
		>
			<span className = {style.spinner}></span>
		</div>
		)
}

export default Spinner