import React, { useContext, useRef } from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import SwitchThemeButton from "../../SwitchButton/SwitchButton";
import Logo from "../../Logo/Logo";
import UserSubMenu from "../../Forms/UserSubMenu/UserSubMenu";
import { Authorization } from "../../../context";
import Spinner from "../../Spinner/Spinner";

const Header = ({ userRequestState }) => {
	const { isLoggedIn, userdata, token } = useContext(Authorization);
	const burger = useRef();
	const navbar = useRef();
	let addActiveBurgerClass = () => {
		burger.current.classList.toggle(style.active);
		navbar.current.classList.toggle(style.active);
	};

	let renderUser = () => {
		if (token && userRequestState === "isLoading") {
			return (
				<li className={style.spinner}>
					<Spinner size="small" />
				</li>
			);
		}
		if (token && userRequestState === "finished" && isLoggedIn) {
			return (
				<>
					<li className={style.user}>
						<div className={style.avatar}>
							<button>
								<img
									src={
										userdata.image
											? userdata.image
											: "data:image/png;base64,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"
									}
									alt="Avatar"
								/>
							</button>
						</div>
						<ul className={style.submenu}>
							<li>
								<UserSubMenu
									addActiveBurgerClass={addActiveBurgerClass}
								/>
							</li>
						</ul>
					</li>
					<li className={style.username}>{userdata.username}</li>
				</>
			);
		}
		return (
			<>
				<li className={style.navbar_item}>
					<Link to="/loginform" activeClassName={style.active}>
						<button
							type="button"
							className={style.button}
							onClick={() => addActiveBurgerClass()}
						>
							Log in
						</button>
					</Link>
				</li>
				<li className={style.navbar_item}>
					<Link to="/signupform" activeClassName={style.active}>
						<button
							type="button"
							className={style.button}
							onClick={() => addActiveBurgerClass()}
						>
							Sign UP
						</button>
					</Link>
				</li>
			</>
		);
	};

	return (
		<div className={style.header}>
			<div className={style.header_content}>
				<div className={style.logo_container}>
					<Logo />
				</div>
				<div
					ref={burger}
					className={style.burger}
					onClick={() => addActiveBurgerClass()}
				>
					<span></span>
				</div>
				<nav ref={navbar} className={style.navigation}>
					<ul className={style.navbar}>
						<li className={style.navbar_item}>
							<Link to="/my-app" activeClassName={style.active}>
								<button
									type="button"
									className={style.button}
									onClick={() => addActiveBurgerClass()}
								>
									Home
								</button>
							</Link>
						</li>
						{renderUser()}
						<li className={style.navbar_item}>
							<SwitchThemeButton />
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Header;
