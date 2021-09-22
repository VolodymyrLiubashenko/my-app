import { useApi } from "./useApi";
import { useState } from "react";

export const useApiUser = () => {
	const [userRequestState, setUserRequestState] = useState("finished");
	const [errorUserRequestStatus, setErrorUserRequestStatus] = useState(false);
	const { Axios } = useApi();

	const initEditUser = (body) => {
		setErrorUserRequestStatus(false);
		setUserRequestState("isLoading");
		return Axios.put("user", body)
			.then(({ data }) => {
				setUserRequestState("finished");
				return data.user;
			})
			.catch((err) => {
				setUserRequestState("finished");
				setErrorUserRequestStatus(true);
				return "error";
			});
	};

	const initRegistration = (body) => {
		setErrorUserRequestStatus(false);
		setUserRequestState("isLoading");
		return Axios.post("users", body)
			.then(({ data }) => {
				setUserRequestState("finished");
				return data.user;
			})
			.catch((err) => {
				setUserRequestState("finished");
				return "error";
			});
	};

	const initLogin = (body) => {
		setErrorUserRequestStatus(false);
		setUserRequestState("isLoading");
		return Axios.post("users/login", body)
			.then(({ data }) => {
				setUserRequestState("finished");
				return data.user;
			})
			.catch((err) => {
				setUserRequestState("finished");
				setErrorUserRequestStatus(true);
				return "error";
			});
	};

	const initGetCurrentUser = () => {
		setErrorUserRequestStatus(false);
		setUserRequestState("isLoading");
		return Axios.get("user")
			.then(({ data }) => {
				setUserRequestState("finished");
				return data.user;
			})
			.catch((err) => {
				setUserRequestState("finished");
				setErrorUserRequestStatus(true);
				return "error";
			});
	};

	const getUserProfile = (username, setUserProfile) => {
		setErrorUserRequestStatus(false);
		setUserRequestState("isLoading");
		Axios.get(`profiles/${username}`)
			.then(({ data }) => {
				setUserProfile(data.profile);
				setUserRequestState("finished");
			})
			.catch((err) => {
				setUserRequestState("finished");
				setErrorUserRequestStatus(true);
			});
	};

	const followUser = (username, setUserProfile) => {
		setErrorUserRequestStatus(false);
		setUserRequestState("isLoading");
		Axios.post(`profiles/${username}/follow`)
			.then(({ data }) => {
				setUserProfile(data.profile);
				setUserRequestState("finished");
			})
			.catch((err) => {
				setUserRequestState("finished");
				setErrorUserRequestStatus(true);
			});
	};

	const unFollowUser = (username, setUserProfile) => {
		setErrorUserRequestStatus(false);
		setUserRequestState("isLoading");
		Axios.delete(`profiles/${username}/follow`)
			.then(({ data }) => {
				setUserProfile(data.profile);
				setUserRequestState("finished");
			})
			.catch((err) => {
				setUserRequestState("finished");
				setErrorUserRequestStatus(true);
			});
	};

	return {
		initEditUser,
		initRegistration,
		initLogin,
		initGetCurrentUser,
		userRequestState,
		errorUserRequestStatus,
		getUserProfile,
		followUser,
		unFollowUser,
		setUserRequestState,
	};
};
