import React from "react";
import style from "./footer.module.css";
import Logo from "../../Logo/Logo";

const Footer = (props) => {
	return (
		<footer className={style.footer}>
			<div className={style.footer_content}>
				<div className={style.logo_container}>
					<Logo />
				</div>
				<p className={style.footer_description}>
					2021 Just training project
				</p>
				<p className={style.footer_descriptuon}>
					Developed by Vladimir Liubashenko
				</p>
			</div>
		</footer>
	);
};

export default Footer;
