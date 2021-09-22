import React from "react";
import style from "./input.module.css";
const Input = ({ title, type, placeholder, name, value, onChange }) => {
	return (
		<div>
			<label className={style.label}>{title}</label>
			<input
				type={type}
				className={style.input}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default Input;
