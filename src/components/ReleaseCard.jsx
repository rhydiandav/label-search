import React from 'react';

const ReleaseCard = props => {
  let albumArtStyle = { height: '250px', width: '250px' };
  return (
    <div>
      <img
        src={props.release.albumArt}
        style={albumArtStyle}
        alt={props.release.title}
      />
      <h2>{props.release.title}</h2>
      {props.release.artists.map(artist => (
        <h3>{artist}</h3>
      ))}
      <a href={`spotify:album:${props.release.id}`}>Listen...</a>
    </div>
  );
};

export default ReleaseCard;
