import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
      // no_image: "C:\Users\ynnav\OneDrive\Documents\React\newsapp\src\components\no_image.jpg"
    }
  }

  async componentDidMount() {
    this.setState({
      loading: true
    })
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e444e38dd0944b2abdde9b9c5ed45e2e&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  handlePreviousClick = async () => {
    console.log("previous")
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e444e38dd0944b2abdde9b9c5ed45e2e&page=${this.state.page - 1}&pageSize=20`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false
    })
  }

  handleNextClick = async () => {
    console.log("next");
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e444e38dd0944b2abdde9b9c5ed45e2e&page=${this.state.page + 1}&pageSize=20`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false
    })
  }

  render() {
    return (
      <div className='container my-4'>
        <h1>NewsApp-Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-3" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container">
          <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
            <button type="button" disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / 20)} className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default News
