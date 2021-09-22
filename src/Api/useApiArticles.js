import { useState, useContext } from "react";
import { useApi } from "./useApi";
import { SingleArticleState, Authorization } from "../context";

export const useApiArticles = () => {
	const { Axios } = useApi();

	const [requestState, setRequestState] = useState("finished");
	const [error, setError] = useState(false);
	const { setSingleArticle, deleteArticleStatus } = useContext(SingleArticleState);
	const { userdata } = useContext(Authorization);

	const getArticles = (setArticles) => {
		setError(false);
		setRequestState("isLoading");
		Axios.get("articles?limit=100")
			.then(({ data }) => {
				setRequestState("finished");
				setArticles(data.articles);
			})
			.catch((err) => {
				setError(true);
				setRequestState("finished");
			});
	};

	const getFavouriteArticles = (setArticles,userName = userdata.username) => {
		setError(false);
		setRequestState("isLoading");
		Axios.get(`articles?limit=100&favorited=${userName}`)
			.then(({ data }) => {
				setRequestState("finished");
				setArticles(data.articles);
			})
			.catch((err) => {
				setError(true);
				setRequestState("finished");
			});
	};

	const getUserArticles = (setArticles, userName = userdata.username) => {
		setError(false);
		setRequestState("isLoading");
		Axios.get(`articles?limit=100&author=${userName}`)
			.then(({ data }) => {
				setRequestState("finished");
				setArticles(data.articles);
			})
			.catch((err) => {
				setError(true);
				setRequestState("finished");
			});
	};

	const getArticlesFeed = (setArticles) => {
		setError(false);
		setRequestState("isLoading");
		Axios.get("articles/feed?limit=30")
			.then(({ data }) => {
				setRequestState("finished");
				setArticles(data.articles);
			})
			.catch((err) => {
				setRequestState("finished");
				setError(true);
			});
	};

	const getSingleArticle = (slug, setArticle) => {
		setError(false);
		setRequestState("isLoading");
		return Axios.get(`articles/${slug}`)
			.then(({ data }) => {
				setSingleArticle(data.article);
				setArticle(data.article);
				setRequestState("success");
			})
			.catch((err) => {
				setError(true);
				setRequestState("finished");
			});
	};

	const createNewArticle = (body) => {
		setRequestState("isLoading");
		setError(false);
		return Axios.post("/articles", body)
			.then(() => setRequestState("success"))
			.catch((err) => {
				setRequestState("finished");
				setError(true);
			});
	};

	const deleteArticle = (slug) => {
		setError(false);
		setRequestState("isLoading");
		return Axios.delete(`articles/${slug}`)
			.then(() => {
				deleteArticleStatus();
				setRequestState("finished");
			})
			.catch((err) => {
				setError(true);
				setRequestState("finished");
			});
	};

	const setFavouriteArticle = (slug, setArticle) => {
		setError(false);
		return Axios.post(`articles/${slug}/favorite`)
			.then(({ data }) => {
				if (setArticle) 
				setArticle(data.article);
				return data;
			})
			.catch((err) => {
				setRequestState("finished");
				setError(true);
				return undefined;
			});
	};

	const setUnfavouriteArticle = (slug, setArticle) => {
		setError(false);
		return Axios.delete(`articles/${slug}/favorite`)
			.then(({ data }) => {
				if (setArticle)
				 setArticle(data.article);
				return data;
			})
			.catch((err) => {
				setRequestState("finished");
				setError(true);
				return undefined;
			});
	};

	const editArticle = (body, editedArticle, error, slug) => {
		setError(false);
		setRequestState("isLoading");
		Axios.put(`articles/${slug}`, body)
			.then(() => {
				editedArticle();
				setRequestState("finished");
			})
			.catch((err) => {
				setRequestState("finished");
				return error;
			});
	};

	const filterArticle = (setArticles, filterData) => {
		setError(false);
		setRequestState("isLoading");
		Axios.get(`articles?limit=100&tag=${filterData}`)
			.then(({ data }) => {
				setRequestState("finished");
				setArticles(data.articles);
			})
			.catch((err) => {
				setError(true);
				setRequestState("finished");
			});
	};

	return {
		getArticles,
		editArticle,
		setRequestState,
		getArticlesFeed,
		deleteArticle,
		getSingleArticle,
		requestState,
		error,
		setFavouriteArticle,
		setUnfavouriteArticle,
		getFavouriteArticles,
		getUserArticles,
		filterArticle,
		setError,
		createNewArticle,
	};
};
