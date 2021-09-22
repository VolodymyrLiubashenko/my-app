import React, { useEffect, useState, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";
import style from "./new_comment.module.css";
import PublishedComment from "./PublishedComment/PublishedComment";
import Spinner from "../../Spinner/Spinner";
import ErrorMassage from "../../ErrorMassage/ErrorMassage";
import { useApiArticles } from "../../../Api/useApiArticles";
import { useApiComment } from "../../../Api/useApiComment";
import { Authorization, SingleArticleState } from "../../../context";
import Article from "../../Article/Article";
import Button from "../../Button/Button";

const NewComment = () => {
    let slug = sessionStorage.getItem("slug");
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const {
        deleteArticle,
        getSingleArticle,
        setFavouriteArticle,
        setUnfavouriteArticle,
        requestState,
        error,
    } = useApiArticles();
    const {
        getCommentsFromArticle,
        requestCommentState,
        commentError,
        deleteComment,
        addComment,
    } = useApiComment();
    const { userdata } = useContext(Authorization);
    const textareaRef = useRef();
    const { setSingleArticle, editArticleStatus, actionState, setAction } = useContext(SingleArticleState);

    useEffect(() => {
        getSingleArticle(slug, setArticle);
        setAction("");
        getCommentsFromArticle(slug, setComments);
    }, []);

    const renderComments = (data) => {
        if (requestCommentState === "isLoading") return <Spinner />;
        if (commentError === true) return <ErrorMassage />;
        let comment = data.map((el) => {
            return (
                <PublishedComment
                    key={el.id}
                    image={el.author.image}
                    username={el.author.username}
                    date={el.createdAt}
                    body={el.body}
                    id={el.id}
                    onClick={(e) => initDeleteComment(e)}
                />
            );
        });
        return comment;
    };

    const renderArticle = (data) => {
        setSingleArticle(data);
        if (error) return <ErrorMassage />;
        if (requestState === "isLoading") return <Spinner />;
        if (requestState === "success") {
            return (
                <Article
                    isWhole
                    slug={data.slug}
                    onClick={(e) => initFavouriteButton(e, data.slug)}
                    onClickEditArticle={() => editArticleStatus()}
                    onClickDeleteArticle={() => deleteArticle(slug)}
                    isPressed={data.favorited}
                    favoritesCount={data.favoritesCount}
                    image={data.author.image}
                    title={data.title}
                    body={data.body}
                    username={data.author.username}
                    createdAt={data.createdAt}
                />
            );
        }
    };
    const initFavouriteButton = (e) => {
        let favourite = e.target.closest("button").dataset.ispressed;
        let slug = e.target.closest("button").dataset.id;
        e.target.closest("button").dataset.isloading = true;
        if (favourite === "true") {
            setUnfavouriteArticle(slug).then((data) => {
                if (!data)
                    return  e.target.closest("button").removeAttribute("data-isloading");
                            e.target.closest("button").removeAttribute("data-isloading");
                            e.target.closest("button").dataset.ispressed = data.article.favorited;
                            e.target.closest("button").lastElementChild.innerHTML = `<span>Like ${data.article.favoritesCount}</span>`;
            });
        } else {
            setFavouriteArticle(slug).then((data) => {
                if (!data)
                    return  e.target.closest("button").removeAttribute("data-isloading");
                            e.target.closest("button").removeAttribute("data-isloading");
                            e.target.closest("button").dataset.ispressed = data.article.favorited;
                            e.target.closest("button").lastElementChild.innerHTML = `<span>Like ${data.article.favoritesCount}</span>`;
            });
        }
    };

    const initDeleteComment = (e) => {
        deleteComment(slug, e.target.closest("button").dataset.id).then((data) => {
            getCommentsFromArticle(slug, setComments);
        });
    };

    const initPostNewComment = (e) => {
        e.target.disabled = true;
        addComment(slug, textareaRef.current.value)
            .then(() => {
                getCommentsFromArticle(slug, setComments);
            })
            .then(() => e.target.removeAttribute("disabled"));
    };

    if (actionState === "deleted") {
        return <Redirect to="/userprofile" />;
    }
    if (actionState === "toEdit") {
        return <Redirect to="/editarticle" />;
    }
    return (
        <div className={style.new_comment}>
            <div className={style.article}>{renderArticle(article)}</div>
            <div className={style.comment}>
                <div className={style.row}>
                    <div className={style.avatar_active_container}>
                        <img src={userdata.image} alt="user Avatar" />
                    </div>
                    <textarea
                        ref={textareaRef}
                        className={style.textarea}
                    ></textarea>
                </div>
                <div className={style.button_container}>
                    <Button
                        action="Post Comment"
                        isSecondary
                        type="button"
                        id={slug}
                        onClick={(e) => initPostNewComment(e)}
                    ></Button>
                </div>
                {renderComments(comments)}
            </div>
        </div>
    );
};

export default NewComment;
