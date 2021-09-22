import { useEffect, useState } from "react";
import { useApiArticles } from "../../../Api/useApiArticles";

export const useHome = () => {
  const [articles, setArticles] = useState([]);
  const [tabindex, setTabIndex] = useState(1);
  const [filterData, setFilterData] = useState("");
  const {
    filterArticle,
    getArticles,
    getArticlesFeed,
    requestState,
    error,
    setFavouriteArticle,
    setUnfavouriteArticle,
  } = useApiArticles();

  const getArticleData = () => {
    if (tabindex === 1) return getArticles(setArticles);
    if (tabindex === 0) return getArticlesFeed(setArticles);
    if (tabindex === 2) return filterArticle(setArticles, filterData);
  };

  useEffect(() => {
    getArticleData();
  }, [tabindex, filterData]);

  const initFavouriteButton = (e) => {
    let favourite = e.target.closest("button").dataset.ispressed;
    let slug = e.target.closest("button").dataset.id;
    e.target.closest("button").dataset.isloading = true;
    if (favourite === "true") {
      setUnfavouriteArticle(slug).then((data) => {
        if (!data)
          return e.target.closest("button").removeAttribute("data-isloading");
        e.target.closest("button").removeAttribute("data-isloading");
        e.target.closest("button").dataset.ispressed = data.article.favorited;
        e.target.closest(
          "button"
        ).lastElementChild.innerHTML = `<span>Like ${data.article.favoritesCount}</span>`;
      });
    } else {
      setFavouriteArticle(slug).then((data) => {
        if (!data)
          return e.target.closest("button").removeAttribute("data-isloading");
        e.target.closest("button").removeAttribute("data-isloading");
        e.target.closest("button").dataset.ispressed = data.article.favorited;
        e.target.closest(
          "button"
        ).lastElementChild.innerHTML = `<span>Like ${data.article.favoritesCount}</span>`;
      });
    } 
  };

  return {
    setTabIndex,
    articles,
    initFavouriteButton,
    requestState,
    error,
    setFilterData,
    filterData,
    tabindex,
  };
};
