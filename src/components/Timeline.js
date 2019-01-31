import React, { Component } from "react";
import PhotoItem from './PhotoItem';

export default class Timeline extends Component {

  constructor() {
    super();
    this.state = { photos: [] };
  }

  loadPhotos(props) {
    let profileURL;
    if (props.login === undefined) {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos/${props.login}`;
    }
  
    fetch(profileURL)
      .then(response => response.json())
      .then(photos => {
        this.setState({
          photos: photos
        });
      });
  }

  componentDidMount() {
    this.loadPhotos(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.loadPhotos(nextProps);
    }
  }

  render() {
    return (
      <div className="fotos container">
        {this.state.photos.map(photo => <PhotoItem key={photo.id} photo={photo}/>)}
      </div>
    );
  }
}