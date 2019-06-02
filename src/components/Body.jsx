import React, { Component } from 'react';
import Filter from './Filter';
import ReleaseCard from './ReleaseCard';
import queryString from 'query-string';

export default class Body extends Component {
  state = {
    searchString: '',
    releases: [],
    authorisation: {}
  };

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken) return;

    this.setState({
      authorisation: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  }

  handleSubmit = () => {
    fetch(
      `https://api.spotify.com/v1/search?q=label:"${
        this.state.searchString
      }"&type=album&limit=50`,
      {
        headers: this.state.authorisation
      }
    )
      .then(res => res.json())
      .then(data => {
        let formattedAlbums = data.albums.items.map(album => {
          return {
            name: album.name,
            artists: album.artists.map(artist => artist.name),
            albumArt: album.images[0].url,
            id: album.id,
            releaseDate: album.release_date
          };
        });
        this.setState({ releases: formattedAlbums });
      });
  };

  handleChange = searchString => {
    this.setState({ searchString });
  };

  render() {
    return (
      <div style={this.props.defaultStyle}>
        <Filter
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div style={{ display: 'inline-block' }}>
          {this.state.releases.map(release => {
            return <ReleaseCard release={release} key={release.id} />;
          })}
        </div>
      </div>
    );
  }
}
