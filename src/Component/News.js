import React, { Component } from 'react';
import NewItem from './NewItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired,

  };

  constructor(props) {
    super(props);
    console.log("hello I am constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=def3db3d1b604a0a93ae53e18faf19ed&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    const filteredArticles = parsedData.articles.filter(
      (article) => article.urlToImage && article.urlToImage.trim() !== ""
    );
    this.setState({
      articles: filteredArticles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }



  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // handlePrev = async () => {
  //   this.setState({ page: this.state.page - 1 }, this.updateNews);
  // };

  // handleNext = async () => {
  //   this.setState({ page: this.state.page + 1 }, this.updateNews);
  // };

  fetchMoreData = async() => {

    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=def3db3d1b604a0a93ae53e18faf19ed&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    const filteredArticles = parsedData.articles.filter(
      (article) => article.urlToImage && article.urlToImage.trim() !== ""
    );
    this.setState({
      articles: this.state.articles.concat(filteredArticles),
      totalResults: parsedData.totalResults,
      loading: false,
    });

  }
  render() {
    return (
      <div className='container my-3'>
        {this.state.loading && <img className="text-center" src='1481.gif' alt='loading' />}
        <h2 className='text-center' style={{ margin: "25px" }}>NewsWala Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><img className="text-center my-3" src='1481.gif' alt='loading' />...</h4>}
        >



          <div className='row'>
            {this.state.articles.map((element) => {
              return (
                <div className='col-md-4' key={element.url}>
                  <NewItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={element.description ? element.description.slice(0, 90) : ""}
                    imgurl={element.urlToImage}
                    newurl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>

        {/* <div className='container d-flex justify-content-between'>
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark" onClick={this.handlePrev}>
            Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark" onClick={this.handleNext}
          >
            Next
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
