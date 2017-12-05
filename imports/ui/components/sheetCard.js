// /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { PropTypes } from 'prop-types';
import {Button} from 'react-bootstrap';

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
            <div  className='card-container'>
        <div onClick={() => this.props.onSelect(this.props.sheet)} className='card-image-container'>
                <img className='card-image' src='/ilidan.jpeg' alt=''/>
              </div>
              <div className='card-body'>
                <p className='card-body-text'>{sheet.char_name}</p>
              </div>
              <div className='card-footer'>
                <p>Created by: {sheet.player_name}</p>
                <Button
                  bsStyle = 'danger'
                  style={{marginRight:'15px'}}
                  onClick = {this.props.onDelete}
                >
                  DELETE
                </Button>
              </div>
            </div>
    );
  }
}

SheetCard.propTypes = {
  sheet: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};
