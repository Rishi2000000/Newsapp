import React, { Component } from 'react';


export default class NewItem extends Component {
  render() {
    let { title, description, imgurl, newurl } = this.props;
    return (
      <div>
        <div className="card" style={{ margin: "5px 0px" }}>
          <img src={imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a rel="noreferrer" href={newurl} target="_blank" className="btn btn-primary">Read more</a>
          </div>
        </div>
      </div>
    );
  }
}
