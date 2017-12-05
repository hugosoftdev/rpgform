// /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Row, Col, Modal, Button , FormControl} from 'react-bootstrap';

export default class SheetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: null,
      attValues: { Strength: 8, Dexterity: 8, Constitution: 8, Intelligence: 8, Wisdom: 8, Charisma: 8 },
      char: {},
      tempImage: '',
    };
    // bindings
    this.changeAttributeValue = this.changeAttributeValue.bind(this);
    this.charSetState = this.charSetState.bind(this);
    this.sheetSetState = this.sheetSetState.bind(this);
    this.addChar = this.addChar.bind(this);
  }

  addChar() {
    console.log(this.state.char);
  }

  // Callbacks

  changeAttributeValue(att, value) {
    newAtts = this.state.attValues;
    newAtts[att] = newAtts[att] + value;
    this.setState({ attValues: newAtts }, () => {
      console.log(this.state);
    });
  }
  // Funtions

  getAttributeList() {
    return ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
  }

  charSetState(att, value){
    char = this.state.char;
    char[att] = value;
    this.setState({ char }, console.log(this.state));
  }

  sheetSetState(att,value){
    char = this.state.char;
    if(!char.sheet){
      char.sheet = {};
    }
    char.sheet[att] = value,
    this.setState({char},console.log(this.state));
  }

  render() {
    // TODO- Cada form edita um atributo do objeto pai com um onchange
    return (
      <Row className = {'char-form'}>
        <div className="char-info-header">
          <div className = 'char-header-line'>
            <div className= 'char-header-item'>
              <span>Name</span>
              <FormControl
                placeholder=""
                // value={this.state.login}
                onChange={ e => (this.charSetState('name', e.target.value))}
              />
            </div>
            <div className= 'char-header-item'>
              <span>Class</span>
              <FormControl
              placeholder=""
              // value={this.state.login}
              onChange={ e => (this.charSetState('class', e.target.value))}
            />
            </div>
            <div className= 'char-header-item'>
              <span>Lv</span>
              <FormControl
                placeholder=""
                //value={this.state.login}
                onChange={ e => (this.charSetState('lv', e.target.value))}
              />
            </div>
            <div className= 'char-header-item'>
              <span>Xp</span>
              <FormControl
                placeholder=""
                //value={this.state.login}
                onChange={ e => (this.charSetState('xp', e.target.value))}
              />
            </div>
          </div>
          <div className = 'char-header-line'>
            <div className= 'char-header-item'>
              <span>Race</span>
              <FormControl
                placeholder=""
                //value={this.state.login}
                onChange={ e => (this.charSetState('race', e.target.value))}
              />
            </div>
            <div className= 'char-header-item'>
              <span>Speed</span>
              <FormControl
                placeholder=""
                //value={this.state.login}
                onChange={ e => (this.charSetState('speed', e.target.value))}
              />
            </div>
            <div className= 'char-header-item'>
              <span>Languages</span>
              <FormControl
                placeholder=""
                //value={this.state.login}
                onChange={ e => (this.charSetState('languages', e.target.value))}
              />
            </div>
            <div className= 'char-header-item'>
              <span>Vision</span>
              <FormControl
                placeholder=""
                //value={this.state.login}
                onChange={ e => (this.charSetState('vision', e.target.value))}
              />
            </div>
            
          </div>
        </div>
        <div className = 'char-form-body'>
          <div className = "attributes-table">
            <Grid>
              {this.getAttributeList().map(att => (
                <Row>
                  <Col md={3}>
                    <h1>{att}</h1>
                  </Col>
                  <Col md={1}>
                    <div>
                      <h2>{this.state.attValues[att]}</h2>
                    </div>
                  </Col>
                  <Col md={1}>
                    <Button onClick = { () => this.changeAttributeValue(att, 1)} >+</Button>
                  </Col>
                  <Col>
                    <Button
                    onClick = { () => this.changeAttributeValue(att, -1)} >-</Button>
                  </Col>
                </Row>
              )
              )}
            </Grid>
          </div>
          <div className = 'char-form-seccond-column'>
            <div className = 'char-form-img'>
              {this.state.char.sheet && this.state.char.sheet.image ?
              <div className = 'char-form-image-holder'>
                <img src={this.state.char.sheet.image}/>
              </div>
              :
              <div className = 'char-form-image-vertical-center'>
                <FormControl
                  placeholder="Put image URL here"
                  //value={this.state.login}
                  onChange={ e => (this.setState({ tempImage: e.target.value }))}
                />
                <Button onClick = {() => {this.sheetSetState('image',this.state.tempImage)}}>Set Image</Button>
              </div>
              }
            </div>
            <div className = 'char-form-background'>
              <span>background</span>
              <FormControl
                placeholder=""
                //value={this.state.login}
                onChange={ e => (this.sheetSetState('background', e.target.value))}
              />
            </div>
          </div>
        </div>
        <Button
          onClick = {this.addChar}>
          CREATE CHAR
        </Button>
      </Row>
    );
  }
}

SheetForm.propTypes = {
  GroupId: PropTypes.string.isRequired,
};
