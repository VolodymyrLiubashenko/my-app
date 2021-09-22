import React, { useContext } from "react";
import style from "./login.module.css";
import { NavLink } from "react-router-dom";
import Button from "../../Button/Button";
import { Authorization } from "../../../context";
import { useApiUser } from "../../../Api/useApiUser";
import Spinner from "../../Spinner/Spinner";
import { Form as FormikForm, withFormik, FastField } from "formik";
import FormErrorMassage from "../../FormValidationMessages/FormErrorMessage";
import { FormSchemaLogin } from "../../FormValidationShema/ValidationShema";

const DEFAULT_VALUES = {
	email: "",
	password: "",
};

const LoginForm = (props) => {
	const { values, handleSubmit, isValid } = props;
	const { logIn, getUserToken, getUser } = useContext(Authorization);
	const { initLogin, userRequestState } = useApiUser();

	let body = {
		user: {
			email: values.email,
			password: values.password,
		},
	};

	const LogIn = (e) => {
		e.preventDefault();
		handleSubmit();
		initLogin(body).then((data) => {
			if (data === "error") {
				return;
			}
			getUser(data);
			logIn();
			sessionStorage.setItem("token", data.token);
			getUserToken(data.token);
		});
	};

	const renderButton = () => {
		if (userRequestState === "isLoading") return <Spinner size="small" />;
		return (
			<Button
				action="Log In"
				disabled={!isValid}
				type="submit"
				isMain
				isBig
				onClick={(e) => LogIn(e)}
			/>
		);
	};

	return (
		<FormikForm onSubmit={LogIn} className={style.container}>
			<h3 className={style.title}>Log In</h3>
			<label className={style.label}>
				Email
				<FastField
					className={style.input}
					type="email"
					name="email"
					placeholder="Enter Your email"
				/>
			</label>
			<FormErrorMassage name="email" />
			<label className={style.label}>
				Password
				<FastField
					className={style.input}
					type="password"
					name="password"
					placeholder="Enter Your Password"
				/>
			</label>
			<FormErrorMassage name="password" />
			{renderButton()}
			<p className={style.massege}>
				Dont have an accaunt yet?
				<NavLink to="/signupform" className={style.link}>
					{" "}
					Create an accaunt
				</NavLink>
			</p>
		</FormikForm>
	);
};

export default withFormik({
	validationSchema: FormSchemaLogin,
	mapPropsToValues: ({ initialValues }) =>
		initialValues ? initialValues : DEFAULT_VALUES,
})(LoginForm);
