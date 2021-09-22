import axios from "axios";
import { useContext } from "react";
import { Authorization } from "../context";

export const useApi = () => {
	const { token } = useContext(Authorization);

	const AuthInstance = axios.create({
		baseURL: "https://conduit.productionready.io/api/",
		headers: {
			Authorization: `Token ${token}}`,
			"Access-Control-Allow-Origin": "http://localhost:3000/",
		},
	});

	const Guest = axios.create({
		baseURL: "https://conduit.productionready.io/api/",
		headers: {
			"Access-Control-Allow-Origin": "http://localhost:3000/",
		},
	});

	let Axios;
	if (token) {
		Axios = AuthInstance;
	} else {
		Axios = Guest;
	}

	return { Axios };
};
