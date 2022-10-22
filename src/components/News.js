import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const upgradeNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parseData = await data.json();

    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResult(parseData.totalResult);
    setLoading(false);

    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
    upgradeNews();
    // eslint-disable-next-line
  }, []);

  // const handlePrevClick = async () => {
  // console.log("handle prv");
  // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   props.country
  // }&category=${props.category}&apiKey=285e6bf1afaa41d69ed85ef45fd5b775&page=${
  //   this.state.page - 1
  // }&pageSize=${props.pageSize}`;
  // this.setState({ loading: true });
  // let data = await fetch(url);
  // let parseData = await data.json();
  // console.log(parseData);

  // this.setState({
  //   articles: parseData.articles,
  //   page: this.state.page - 1,
  //   loading: false,
  // });
  // this.setState({
  //   page: this.state.page - 1,
  // });
  // this.upgradeNews();
  // setPage(page-1);
  // upgradeNews();
  // };

  // const handleNextClick = async () => {
  // console.log("handle next");
  // if (
  //   !(
  //     this.state.page + 1 >
  //     Math.ceil(this.state.totalResult / props.pageSize)
  //   )
  // ) {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     props.country
  //   }&category=${props.category}&apiKey=285e6bf1afaa41d69ed85ef45fd5b775&page=${
  //     this.state.page + 1
  //   }&pageSize=${props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);

  //   this.setState({
  //     articles: parseData.articles,
  //     page: this.state.page + 1,
  //     loading: false,
  //   });
  // }
  // this.setState({
  //   page: this.state.page + 1,
  // });
  // this.upgradeNews();
  //   setPage(page+1);
  //   upgradeNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);

    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResult(parseData.totalResult);
    setLoading(false);
  };

  return (
    <>
      <h2
        className="text-center"
        style={{ margin: "25px 0px", marginTop: "90px" }}
      >
        NewsMonkey-Top {capitalizeFirstLetter(props.category)} HeadLines
      </h2>
      {/* {this.state.loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResult}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  totalResult: 0,
};

News.PropsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
