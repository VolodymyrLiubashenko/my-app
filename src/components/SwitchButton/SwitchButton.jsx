import React from "react";
import style from "./switch-button.module.css";
import { useChangeTheme } from "../../Theme/useChangeTheme";

let getActiveClass = (e) => {
	e.target.classList.toggle(style.active);
};

const SwitchThemeButton = () => {
	const { setHulkTheme } = useChangeTheme();
	const switchTheme = (e) => {
		setHulkTheme();
		getActiveClass(e);
	};

	return (
		<button
			className={style.button}
			onClick={(e) => switchTheme(e)}
		></button>
	);
};

export default SwitchThemeButton;
