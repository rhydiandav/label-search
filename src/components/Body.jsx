import React, { Component } from 'react';
import Filter from './Filter';
import ReleaseCard from './ReleaseCard';

export default class Body extends Component {
  state = {
    filterString: '',
    releases: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        filterString: 'Hyperdub',
        releases: [
          {
            title: 'Untrue',
            artists: ['Burial'],
            albumArt:
              'https://i.scdn.co/image/0c0d4ccf90d9722c5675823b6c7a53cfe6e2841f',
            id: '1C30LhZB9I48LdpVCRRYvq',
            releaseDate: '2007-11-05'
          }
        ]
      });
    }, 1000);
  }

  render() {
    return (
      <div style={this.props.defaultStyle}>
        <Filter />
        {this.state.releases.map(release => {
          return <ReleaseCard release={release} key={release.id} />;
        })}
      </div>
    );
  }
}
