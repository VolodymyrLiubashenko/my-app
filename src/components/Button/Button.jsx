import React from "react";
import style from "./button.module.css";

const Button = ({ onClick, type, action, id, disabled, ...props }) => {
	return (
		<button
			className={style.button}
			onClick={onClick}
			disabled={disabled}
			type={type}
			data-ismain={props.isMain}
			data-issecondary={props.isSecondary}
			data-isbig={props.isBig}
			data-isdisabled={props.isDisabled}
			data-ispressed={props.isPressed}
			data-id={id}
			data-isloading={false}
		>
			<span className={style.spinner_container}>
				<span className={style.spinner}></span>
			</span>
			<span className={style.action}>{action}</span>
		</button>
	);
};
export default Button;
