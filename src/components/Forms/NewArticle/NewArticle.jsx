import React from "react";
import style from "./new_article.module.css";
import Button from "../../Button/Button";
import { Redirect } from "react-router-dom";
import { useApiArticles } from "../../../Api/useApiArticles";
import Spinner from "../../Spinner/Spinner";
import { Form as FormikForm, withFormik, FastField } from "formik";
import FormErrorMassage from "../../FormValidationMessages/FormErrorMessage";
import { FormSchemaNewArticle } from "../../FormValidationShema/ValidationShema";

const DEFAULT_VALUES = {
	title: "",
	description: "",
	body: "",
	tagList: "",
};

const NewArticle = (props) => {
	const { values, handleSubmit, isValid } = props;
	const { createNewArticle, requestState } = useApiArticles();

	let getTaglist = (str) => {
		let arr = str.split(" ");
		return arr;
	};

	let articleBody = {
		article: {
			title: values.title,
			description: values.description,
			body: values.body,
			tagList: getTaglist(values.tagList),
		},
	};

	let PublishArticle = (e) => {
		e.preventDefault();
		handleSubmit();
		createNewArticle(articleBody);
	};

	const renderButton = () => {
		if (requestState === "isLoading") return <Spinner size="small" />;
		return (
			<Button
				action="Publish Article"
				type="submit"
				isMain
				isBig
				disabled={!isValid}
			/>
		);
	};

	if (requestState === "success") {
		return <Redirect to="/userprofile" />;
	}

	return (
		<FormikForm onSubmit={PublishArticle} className={style.container}>
			<h3 className={style.title}>New Article</h3>
			<label className={style.label}>
				Article Title
				<FastField
					className={style.input}
					type="text"
					name="title"
					placeholder="Enter Article Title"
				/>
			</label>
			<FormErrorMassage name="title" />
			<label className={style.label}>
				Description
				<FastField
					className={style.input}
					type="text"
					name="description"
					placeholder="Enter Description"
				/>
			</label>
			<FormErrorMassage name="description" />
			<label className={style.label}>
				Write your article
				<FastField
					as="textarea"
					className={style.textarea}
					wrap="soft"
					name="body"
				/>
			</label>
			<FormErrorMassage name="body" />
			<label className={style.label}>
				Tag
				<FastField
					className={style.input}
					type="text"
					name="tagList"
					placeholder="Enter Tag"
				/>
			</label>
			<FormErrorMassage name="tagList" />
			{renderButton()}
		</FormikForm>
	);
};

export default withFormik({
	validationSchema: FormSchemaNewArticle,
	mapPropsToValues: ({ initialValues }) =>
		initialValues ? initialValues : DEFAULT_VALUES,
})(NewArticle);
