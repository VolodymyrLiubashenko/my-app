import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./HomePage.module.css";
import SideBar from "./Sidebar/Sidebar";
import Spinner from "../.././Spinner/Spinner";
import TitleImage from "./TitleImage/TitleImage";
import ErrorMassage from "../../ErrorMassage/ErrorMassage";
import { useHome } from "./useHome";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Pagination from "../../Pagination/Pagination";
import { usePagination } from "../../../Hooks/usePagination";
import { toast } from "react-toastify";
import Article from "../../Article/Article";

const HomePage = ({ isLoggedIn }) => {
  const [tabState, setTabState] = useState(true);
  const notify = () => toast("You're not Loged In");
  const {
    tabindex,
    setTabIndex,
    articles,
    initFavouriteButton,
    requestState,
    error,
    filterData,
    setFilterData,
  } = useHome();

  const { getCurrentPosts, setPage } = usePagination();

  let getArticleSlug = (e) => {
    sessionStorage.setItem("slug", e.target.dataset.id);
  };

  const history = useHistory();

  const readMore = (e) => {
    if (isLoggedIn) {
      getArticleSlug(e);
      history.push(`/newcomment?${e.target.dataset.id}`);
    } else {
      notify();
    }
  };

  const renderArticleTags = (data) => {
    let tags = data.map((el) => {
      return <li>#{el}</li>;
    });
    return tags;
  };

  const renderArticles = (data) => {
    if (requestState === "isLoading") return <Spinner />;
    if (error) return <ErrorMassage />;
    let Articles = data.map((el, index, arr) => {
      return (
        <Article
          isLoggedIn={isLoggedIn}
          key={el.slug}
          slug={el.slug}
          onClick={(e) => {
            isLoggedIn ? initFavouriteButton(e) : notify();
          }}
          isPressed={el.favorited}
          favoritesCount={el.favoritesCount}
          image={el.author.image}
          title={el.title}
          body={el.body}
          username={el.author.username}
          createdAt={el.createdAt}
          child={
            <>
              <ul className={style.taglist}>{renderArticleTags(el.tagList)}</ul>

              <button
                className={style.button}
                onClick={(e) => readMore(e)}
                type="button"
                data-id={el.slug}
              >
                Read more...
              </button>
            </>
          }
        />
      );
    });
    return Articles;
  };

  let renderTabs = () => {
    if (tabState) {
      return (
        <Tabs
          selectedIndex={tabindex}
          onSelect={(index) => {
            if (isLoggedIn) {
              history.push(`?tab${index}`);
              setTabIndex(index);
            } else {
              notify();
            }
          }}
        >
          <TabList>
            <Tab>YourFeeds</Tab>
            <Tab>GlobalFeeds</Tab>
          </TabList>
          <TabPanel>{renderArticles(getCurrentPosts(articles))}</TabPanel>
          <TabPanel>{renderArticles(getCurrentPosts(articles))}</TabPanel>
        </Tabs>
      );
    }
    return (
      <Tabs
        selectedIndex={tabindex}
        onSelect={(index, lastindex, event) => {
          if (index === 0 || index === 1) {
            setTabState(true);
          }
          setTabIndex(index);
          history.push(`?tab${index}`);
        }}
      >
        <TabList>
          <Tab>YourFeeds</Tab>
          <Tab>GlobalFeeds</Tab>
          <Tab>{filterData}</Tab>
        </TabList>
        <TabPanel>{renderArticles(getCurrentPosts(articles))}</TabPanel>
        <TabPanel>{renderArticles(getCurrentPosts(articles))}</TabPanel>
        <TabPanel>{renderArticles(getCurrentPosts(articles))}</TabPanel>
      </Tabs>
    );
  };

  return (
    <div className={style.content}>
      <TitleImage />
      <div className={style.content_container}>
        <div className={style.main}>{renderTabs()}</div>
        <SideBar
          setTabState={setTabState}
          setFilterData={setFilterData}
          setTabIndex={setTabIndex}
          history={history}
        />
      </div>
      <Pagination articles={articles} setPage={setPage} />
    </div>
  );
};

export default HomePage;
