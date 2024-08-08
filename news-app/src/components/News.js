import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: "5",
    category: "general",
  };

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { articles: [], loading: false, page: 1, totalResults: 0 };
    document.title = `${this.props.category}- MyNewsApp`;
  }

  async handleNewsData() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9bac137a9c534d4394e770ddd56a8f1a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let filteredData = await data.json();
    this.setState({
      articles: filteredData.articles,
      loading: false,
      totalResults: filteredData.totalResults,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.handleNewsData();
  }

  handleButtonNext = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.handleNewsData();
  };

  handleButtonPrevious = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.handleNewsData();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9bac137a9c534d4394e770ddd56a8f1a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let filteredData = await data.json();
    this.setState({
      articles: this.state.articles.concat(filteredData.articles),
      loading: false,
      totalResults: filteredData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          MyNewsApp - Top headlines on {this.props.category}
        </h1>
        {this.state.loading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 40) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://img.freepik.com/premium-photo/creative-glowing-blue-breaking-news-pattern-background-with-globe-headline-communication-global-world-concept-3d-rendering_670147-21161.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author ? element.author : "unknown"}
                      publishedAt={new Date(element.publishedAt).toUTCString()}
                      source={element.source}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* <div className="container d-flex justify-content-center">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark m-3"
            onClick={this.handleButtonPrevious}
          >
            &laquo;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark m-3"
            onClick={this.handleButtonNext}
          >
            Next &raquo;
          </button>
        </div> */}
        </InfiniteScroll>
      </>
    );
  }
}
