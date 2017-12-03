import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Modal, Button, FormControl } from 'react-bootstrap';
import { addSheet } from '../../api/sheets/methods';
import SideBar from '../components/SideBar.js';

export default class sheetsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        //variaveis
    };
    this.addSheet = this.addSheet.bind(this);
}

  addSheet() {
    const sheet = {
      type: ' master',
      group_id: this.props.groupId,
      player_name: 'hugo',
      char_name: 'hugo bruxo',
    };
    addSheet.call(sheet, (err, res) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }

  render() {
    return (
            <div>
              <SideBar/>
                <Button
                    onClick = {() => this.addSheet()}
                />
                {this.props.sheets.map(sheet =>
                    <p> {sheet.player_name} </p>
                )}
            </div>
    );
  }
}

sheetsComponent.propTypes = {
  sheets: PropTypes.array.isRequired,
  groupId: PropTypes.string,
};
