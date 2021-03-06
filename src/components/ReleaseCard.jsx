import React from 'react';

const ReleaseCard = props => {
  let albumArtStyle = { height: '250px', width: '250px' };
  return (
    <div style={{ display: 'inline-block', margin: '1em' }}>
      <a href={`spotify:album:${props.release.id}`}>
        <img
          src={props.release.albumArt}
          style={albumArtStyle}
          alt={props.release.name}
        />
      </a>
      <h2>{props.release.name}</h2>
      {props.release.artists.map(artist => (
        <h3 key={artist}>{artist}</h3>
      ))}
    </div>
  );
};

export default ReleaseCard;
