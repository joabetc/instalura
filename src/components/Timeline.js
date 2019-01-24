import React, { Component } from "react";
import PhotoItem from './PhotoItem';

export default class Timeline extends Component {

  constructor() {
    super();
    this.state = { photos: [] };
  }
  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(response => response.json())
      .then(photos => {
        this.setState({
          photos: photos
        });
      });
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.photos.map(photo => <PhotoItem key={photo.id} photo={photo}/>)
        }
      </div>
    );
  }
}