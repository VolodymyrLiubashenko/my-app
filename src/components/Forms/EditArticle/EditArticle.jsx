import React, { useContext } from "react";
import style from "./edit_article.module.css";
import Button from "../../Button/Button";
import { Redirect } from "react-router-dom";
import { SingleArticleState } from "../../../context";
import { useApiArticles } from "../../../Api/useApiArticles";
import Spinner from "../../Spinner/Spinner";
import { Form as FormikForm, withFormik, FastField } from "formik";
import FormErrorMassage from "../../FormValidationMessages/FormErrorMessage";
import { FormSchemaNewArticle } from "../../FormValidationShema/ValidationShema";

const DEFAULT_VALUES = {};

const EditArticle = (props) => {
	const { actionState, editedArticle, singleArticle } = useContext(SingleArticleState);
	const { values, handleSubmit, isValid } = props;

	DEFAULT_VALUES.title = singleArticle.title ? singleArticle.title : "";
	DEFAULT_VALUES.description = singleArticle.description? singleArticle.description: "";
	DEFAULT_VALUES.body = singleArticle.body ? singleArticle.body : "";
	DEFAULT_VALUES.tagList = singleArticle.tagList? singleArticle.tagList.join(" "): "";

	const slug = sessionStorage.getItem("slug");
	const { editArticle, requestState, setError } = useApiArticles();

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

	let Edit = (e) => {
		e.preventDefault();
		handleSubmit();
		editArticle(articleBody, editedArticle, setError(true), slug);
	};

	if (actionState === "edited") {
		return <Redirect to="/newcomment" />;
	}

	const renderButton = () => {
		if (requestState === "isLoading") return <Spinner size="small" />;
		return (
			<Button
				action="Edit Article"
				type="submit"
				isMain
				isBig
				disabled={!isValid}
			/>
		);
	};

	return (
		<FormikForm onSubmit={Edit} className={style.container}>
			<h3 className={style.title}>Edit Article</h3>
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
})(EditArticle);
