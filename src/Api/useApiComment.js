import { useState } from "react";
import { useApi } from "./useApi";

export const useApiComment = () => {
	const { Axios } = useApi();
 
	const [requestCommentState, setRequestCommentState] = useState("finished");
	const [commentError, setCommentError] = useState(false);

	const getCommentsFromArticle = (slug, setComments) => {
		setCommentError(false)
		setRequestCommentState("isLoading");
		Axios.get(`/articles/${slug}/comments`)
			.then(({ data }) => {
				setComments(data.comments);
				setRequestCommentState("finished");
			})
			.catch((err) => {
				setRequestCommentState("finished");
				setCommentError(true);
			});
	};

	const addComment = async (slug, body) => {
		setCommentError(false)
		setRequestCommentState("isLoading");
		return Axios.post(`articles/${slug}/comments`, {
			comment: {
				body: body,
			},
		})
			.then(() => {
				setRequestCommentState("finished");
			})
			.catch((err) => {
				setRequestCommentState("finished");
				setCommentError(true);
			});
	};

	const deleteComment = async (slug, id) => {
		setCommentError(false)
		setRequestCommentState("isLoading");
		return Axios.delete(`articles/${slug}/comments/${id}`)
			.then(() => {
				setRequestCommentState("finished");
			})
			.catch((err) => {
				setRequestCommentState("finished");
				setCommentError(true);
			});
	};

	return {
		getCommentsFromArticle,
		requestCommentState,
		commentError,
		deleteComment,
		addComment,
	};
};
