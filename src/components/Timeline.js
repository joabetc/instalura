import React, { Component } from "react";
import PhotoItem from './PhotoItem';

export default class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = { photos: [] };
    this.login = this.props.login;
  }

  loadPhotos() {
    let profileURL;
    if (this.login === undefined) {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      profileURL = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
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
    this.loadPhotos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.loadPhotos();
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