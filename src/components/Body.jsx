import React, { Component } from 'react';
import Filter from './Filter';
import Sort from './Sort';
import ReleaseCard from './ReleaseCard';
import queryString from 'query-string';

export default class Body extends Component {
  state = {
    authorisation: {},
    searchString: '',
    releases: [],
    labels: []
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
        let albums = data.albums.items;
        let albumDataPromises = albums.map(album => {
          let responsePromise = fetch(
            `https://api.spotify.com/v1/albums/${album.id}`,
            {
              headers: this.state.authorisation
            }
          );
          let albumDataPromise = responsePromise.then(res => res.json());
          return albumDataPromise;
        });

        let allAlbumDataPromises = Promise.all(albumDataPromises);

        let albumPromise = allAlbumDataPromises.then(albumsData => {
          return albumsData.map(album => {
            return {
              id: album.id,
              name: album.name,
              artists: album.artists.map(artist => artist.name),
              albumArt: album.images[0].url,
              releaseDate: album.release_date,
              label: album.label
            };
          });
        });
        return albumPromise;
      })
      .then(releases => {
        this.setState({ releases });
      });
  };

  handleChange = searchString => {
    this.setState({ searchString });
  };

  handleSort = sortBy => {
    switch (sortBy) {
      case 'Date (Newest First)':
        this.setState({
          releases: this.state.releases.sort((a, b) =>
            a.releaseDate > b.releaseDate
              ? -1
              : b.releaseDate > a.releaseDate
              ? 1
              : 0
          )
        });
        break;
      case 'Date (Oldest First)':
        this.setState({
          releases: this.state.releases.sort((a, b) =>
            a.releaseDate > b.releaseDate
              ? 1
              : b.releaseDate > a.releaseDate
              ? -1
              : 0
          )
        });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div style={this.props.defaultStyle}>
        <Filter
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Sort handleSort={this.handleSort} />
        <div style={{ display: 'inline-block' }}>
          {this.state.releases.map(release => {
            return <ReleaseCard release={release} key={release.id} />;
          })}
        </div>
      </div>
    );
  }
}
