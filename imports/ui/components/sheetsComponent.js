// /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Modal, Button, FormControl } from 'react-bootstrap';
import { addSheet } from '../../api/sheets/methods';
import SideBar from '../components/SideBar.js';
/**
 * Uma view onde os profissionais e o dono do salão conseguem ver detalhes sobre todas as transações feitas referentes a cada professional ou ao salão como um todo.
 * Caso seja um profissionais acessando essa view (sem ter id de dono ou de gestor), ele terá acesso somente aos detalhes das transações relacionadas a ele.
 */
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
