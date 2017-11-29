// /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { PropTypes } from 'prop-types';


export default class SheetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // variaveis
    };
  }


  render() {
    const sheet = this.props.sheet;
    return (
            <div onClick={() => this.props.onSelect(this.props.sheet)} className='card-container'>
              <div className='card-image-container'>
                <img className='card-image' src='/ilidan.jpeg' alt=''/>
              </div>
              <div className='card-body'>
                <p className='card-body-text'>{sheet.char_name}</p>
              </div>
              <div className='card-footer'>
                Created by: {sheet.player_name}
              </div>
            </div>
    );
  }
}

SheetCard.propTypes = {
  sheet: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};
