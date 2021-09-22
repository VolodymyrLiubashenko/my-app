import React from "react";
import style from "./logo.module.css";
import spiderlogo from "./logo4.png";
import { NavLink } from "react-router-dom";
import hulklogo from "./hulklogo.png";
import { useChangeTheme } from "../../Theme/useChangeTheme";

const Logo = () => {
	const { themeState } = useChangeTheme();
	let logo;
	!themeState ? (logo = hulklogo) : (logo = spiderlogo);
	return (
		<>
			<NavLink exact to="/">
				<img className={style.logo} src={logo} alt="LOGO" />
			</NavLink>
		</>
	);
};

export default Logo;
