import React, { useContext } from "react";
import style from "./signup.module.css";
import Button from "../../Button/Button";
import { useApiUser } from "../../../Api/useApiUser";
import { NavLink } from "react-router-dom";
import { Authorization } from "../../../context";
import Spinner from "../../Spinner/Spinner";
import { Form as FormikForm, withFormik, FastField } from "formik";
import FormErrorMassage from "../../FormValidationMessages/FormErrorMessage";
import { FormSchemaSignUp } from "../../FormValidationShema/ValidationShema";

const DEFAULT_VALUES = {
	email: "",
	password: "",
	username: "",
};

const SignUPForm = (props) => {
	const { values, handleSubmit, isValid } = props;
	const { logIn, getUserToken, getUser } = useContext(Authorization);
	const { initRegistration, userRequestState } = useApiUser();
	let body = {
		user: {
			email: values.email,
			password: values.password,
			username: values.username,
		},
	};

	const SignUp = (e) => {
		e.preventDefault();
		handleSubmit();
		initRegistration(body).then((data) => {
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
			<Button action="Sign Up" isMain isBig type="submit" disabled={!isValid} />
		);
	};

	return (
		<FormikForm onSubmit={SignUp} className={style.container}>
			<h3 className={style.title}>Create Your Accaunt</h3>
			<label className={style.label}>
				User Name
				<FastField
					className={style.input}
					type="text"
					name="username"
					placeholder="Enter User Name"
				/>
			</label>
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
			{renderButton()}
			<p className={style.massege}>
				Already a member?
				<NavLink to="/loginform" className={style.link}>
					{" "}
					Log in
				</NavLink>
			</p>
		</FormikForm>
	);
};

export default withFormik({
	validationSchema: FormSchemaSignUp,
	mapPropsToValues: ({ initialValues }) =>
		initialValues ? initialValues : DEFAULT_VALUES,
})(SignUPForm);
