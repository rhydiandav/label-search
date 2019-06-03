import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import ReleaseCard from './ReleaseCard';
import queryString from 'query-string';
import LabelFilter from './LabelFilter';

export default class Body extends Component {
  state = {
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
        let labels = releases.reduce((uniqueLabels, currentRelease) => {
          if (!uniqueLabels.includes(currentRelease.label))
            uniqueLabels.push(currentRelease.label);
          return uniqueLabels;
        }, []);
        this.setState({ releases, labels });
      });
  };

  handleChange = searchString => {
    this.setState({ searchString, filterString: '' });
  };

  handleFilter = filterString => {
    this.setState({ filterString });
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
    return this.state.authorisation ? (
      <div style={this.props.defaultStyle}>
        <Search
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <LabelFilter
          handleFilter={this.handleFilter}
          labels={this.state.labels}
        />
        <Sort handleSort={this.handleSort} />
        {this.state.filterString ? (
          <div>
            {this.state.releases
              .filter(release => release.label === this.state.filterString)
              .map(release => (
                <ReleaseCard release={release} key={release.id} />
              ))}
          </div>
        ) : (
          <div style={{ display: 'inline-block' }}>
            {this.state.releases.map(release => {
              return <ReleaseCard release={release} key={release.id} />;
            })}
          </div>
        )}
      </div>
    ) : (
      <div style={this.props.defaultStyle}>
        <button
          onClick={() => {
            window.location = 'http://localhost:8888/login';
          }}
        >
          Sign In
        </button>
      </div>
    );
  }
}
