import { useState } from "react";
import { useApi } from "./useApi";

export const useApiTags = () => {
	const [requestState, setRequestState] = useState("finished");
	const [error, setError] = useState(false);
	const { Axios } = useApi();

	const getTags = (setTags) => {
		setRequestState("isLoading");
		Axios.get("tags?limit3")
			.then(({ data }) => {
				setTags(data.tags);
				setRequestState("finished");
			})
			.catch((err) => {
				setRequestState("finished");
				setError(true);
			});
	};
	return { getTags, requestState, setRequestState, error, setError };
};
