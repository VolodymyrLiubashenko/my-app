import React, { useContext } from "react";
import style from "./publishedComment.module.css";
import { format } from "date-fns";
import Button from "../../../Button/Button";
import { Authorization } from "../../../../context";

const PublishedComment = ({ image, username, date, body, id, onClick }) => {
	const { userdata } = useContext(Authorization);
	return (
		<div className={style.published_post}>
			<div className={style.user_info_row}>
				<div className={style.avatar}>
					<div className={style.avatar_container}>
						<img className={style.ava} src={image} alt="my Ava" />
					</div>
					<div className={style.user_data}>
						<span className={style.name}>{username}</span>
						<br />
						<span className={style.date}>
							{format(new Date(date), "dd-MMMM-yyyy ")}
						</span>
					</div>
				</div>
				{userdata.username === username ? (
					<Button
						onClick={onClick}
						id={id}
						action={"delete"}
						isMain
						type="submit"
					/>
				) : null}
			</div>
			<p className={style.comment_body}>{body}</p>
		</div>
	);
};
export default PublishedComment;
