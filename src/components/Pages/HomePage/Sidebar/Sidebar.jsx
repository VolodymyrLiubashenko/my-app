import React, { useState, useEffect } from "react";
import style from "./sidebar.module.css";
import Spinner from "../../.././Spinner/Spinner";
import ErrorMassage from "../../../ErrorMassage/ErrorMassage";
import { useApiTags } from "../../../../Api/useApiTags";
import Button from "../../../Button/Button";

const SideBar = ({ setTabState, setFilterData, setTabIndex, history }) => {
	const [tags, setTags] = useState([]);
	const [showTags, setShowTags] = useState(false);
	const { getTags, requestState, error } = useApiTags();

	const filterData = (e) => {
		let data = e.target.innerHTML;
		setTabState(false);
		setFilterData(data);
		setTabIndex(2);
		history.push(`/?tab${data}`);
	};

	useEffect(() => {
		getTags(setTags);
	}, []);

	let rendersideBar = (data) => {
		if (requestState === "isLoading") return <Spinner />;
		if (error) return <ErrorMassage />;
		let Tags = data.map((el, index) => {
			return (
				<Button
					key={el + index}
					action={el}
					onClick={(e) => filterData(e)}
					isSecondary
				/>
			);
		});
		return Tags;
	};

	let funcSetButtonAction = () => {
		if (showTags) return "Show more";
		return "Show less";
	};

	return (
		<div className={style.side_bar}>
			<h4 className={style.title}>Popular Tags</h4>
			{showTags ? rendersideBar(tags.slice(0, 5)) : rendersideBar(tags)}
			<button
				className={style.button}
				onClick={() => setShowTags(!showTags)}
			>
				{funcSetButtonAction()}
			</button>
		</div>
	);
};

export default SideBar;
