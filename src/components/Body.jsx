import React, { Component } from 'react';
import Filter from './Filter';
import ReleaseCard from './ReleaseCard';

export default class Body extends Component {
  state = {
    searchString: '',
    releases: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        searchString: 'Hyperdub',
        releases: [
          {
            title: 'Untrue',
            artists: ['Burial'],
            albumArt:
              'https://i.scdn.co/image/0c0d4ccf90d9722c5675823b6c7a53cfe6e2841f',
            id: '1C30LhZB9I48LdpVCRRYvq',
            releaseDate: '2007-11-05'
          },
          {
            title: 'Burial',
            artists: ['Burial'],
            albumArt:
              'https://i.scdn.co/image/9887e498ad64beb738b24db3b5dd6a06b8fdddfa',
            id: '18f6aWSeCaKMZxg75d0t2g',
            releaseDate: '2006-05-15'
          }
        ]
      });
    }, 1000);
  }

  handleSubmit = searchString => {
    this.setState({ searchString });
  };

  render() {
    return (
      <div style={this.props.defaultStyle}>
        <Filter handleSubmit={this.handleSubmit} />
        <div style={{ display: 'inline-block' }}>
          {this.state.releases.map(release => {
            return <ReleaseCard release={release} key={release.id} />;
          })}
        </div>
      </div>
    );
  }
}
