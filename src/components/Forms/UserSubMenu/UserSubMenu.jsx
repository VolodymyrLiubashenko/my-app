import React, { useContext } from "react";
import style from "./userSubMenu.module.css";
import Button from "../../Button/Button";
import { NavLink } from "react-router-dom";
import { Authorization, UserData } from "../../../context";

const UserSubMenu = ({ addActiveBurgerClass }) => {
	const { setUserName } = useContext(UserData);
	const { userdata, logOut } = useContext(Authorization);
	const initProfileButton = () => {
		setUserName(userdata.username);
		addActiveBurgerClass();
	};
	const initLogout = () => {
		logOut();
	};
	return (
		<div className={style.container}>
			<NavLink className={style.link} to="/userprofile">
				<Button
					isSecondary
					action="profile"
					type="button"
					onClick={() => initProfileButton()}
				/>
			</NavLink>
			<NavLink className={style.link} to="/newarticle">
				<Button
					isSecondary
					action="new article"
					onClick={() => initProfileButton()}
				/>
			</NavLink>
			<Button
				type="button"
				action="log out"
				onClick={() => initLogout()}
			/>
		</div>
	);
};

export default UserSubMenu;
