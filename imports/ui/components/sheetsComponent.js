import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import { addSheet, removeSheet } from '../../api/sheets/methods';
import SideBar from '../components/SideBar.js';
import SheetCard from '../components/sheetCard.js';
import CardDescription from '../components/CardDescription';
import CharSheetForm from '../components/CharSheetForm';

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
    this.removeSheet = this.removeSheet.bind(this);
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

  removeSheet(id) {
    removeSheet.call({ id }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }

  render() {
    const pageTitle = this.state.selectedCard.char_name || 'GAME CHARACTERS';
    return (
            <Grid fluid>
              <SideBar
                groupId = {this.props.groupId}
              />
                {
                  this.state.selectedCard.char_name ?
                    <Button
                      bsStyle='success'
                      style={{ position: 'absolute', top: '55', right: '50' }}
                      onClick={() => this.setState({ selectedCard: { char_name: null } })}
                      >
                      SEE ALL
                    </Button>
                    :
                    <Button
                      bsStyle='success'
                      style={{ position: 'absolute', top: '55', right: '50' }}
                      onClick={this.addSheet}
                    >
                       CREATE CHAR
                    </Button>
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
                        onDelete = {() => this.removeSheet(item._id)}
                      />
                    )}
                  </div>
                  :
                  <CardDescription
                    card = {this.state.selectedCard}
                  />
                }

            </Grid>
    );
  }
}

sheetsComponent.propTypes = {
  sheets: PropTypes.array.isRequired,
  groupId: PropTypes.string,
};

