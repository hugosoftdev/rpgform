// /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import { addSheet } from '../../api/sheets/methods';
import SideBar from '../components/SideBar.js';
import SheetCard from '../components/sheetCard.js';
/**
 * Uma view onde os profissionais e o dono do salão conseguem ver detalhes sobre todas as transações feitas referentes a cada professional ou ao salão como um todo.
 * Caso seja um profissionais acessando essa view (sem ter id de dono ou de gestor), ele terá acesso somente aos detalhes das transações relacionadas a ele.
 */
export default class sheetsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: {
        char_name: null,
      },
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
      } else {
        console.log(res);
      }
    });
  }

  render() {
    const pageTitle = this.state.selectedCard.char_name || 'PERSONAGENS DO JOGO';
    return (
            <Grid fluid>
              <SideBar
                groupId = {this.props.groupId}
              />
                {/* <Button
                    onClick = {() => this.addSheet()}
                /> */}
                {
                  this.state.selectedCard.char_name ?
                    <Button
                      bsStyle='success'
                      style={{ position: 'absolute', top: '55', right: '50' }}
                      onClick={() => this.setState({ selectedCard: { char_name: null } })}
                      >
                      VER TODOS
                    </Button>
                    :
                    ''
                }
                <div className='card-page-title'>
                  <h1> {pageTitle.toUpperCase()} </h1>
                </div>
                {
                  !this.state.selectedCard.char_name ?
                  <div className='cards-row'>
                    {this.props.sheets.map(item =>
                      <SheetCard
                        sheet = {item}
                        onSelect = {card => this.setState({ selectedCard: card })}
                      />
                    )}
                  </div>
                  :
                  ''
                }

            </Grid>
    );
  }
}

sheetsComponent.propTypes = {
  sheets: PropTypes.array.isRequired,
  groupId: PropTypes.string,
};
