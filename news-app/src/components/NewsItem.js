import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } =
      this.props;
    return (
      <div>
        <div className="card mx-auto my-2">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <span
              class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "90%", zIndex: "1" }}
            >
              {source.name}
              <span class="visually-hidden">unread messages</span>
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {author} at {publishedAt}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Get More Info
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
