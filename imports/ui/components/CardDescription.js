import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import { Radar, RadarChart, PolarGrid, Legend,PolarAngleAxis, PolarRadiusAxis } from 'recharts';
// import {mock} from '../../../public/mocks/sheetMock';

export default class CardDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        mock : {
            _id: "TEST",
            type: "Player",
            group_id: "TEST",
            player_name: "TestPlayer",
            status: "Alive",
            sheet: {
                name: "Helgor of Blackwood",
                class: "Ranger",
                lv: 4,
                xp: 1150,
                race: "Human",
                speed: 40,
                darkvision: false,
                strength: 20,
                dexterity: 18,
                constituition: 10,
                wisdom: 16,
                charisma: 9,
                image: "Put a URL here",
                background: "Helgor is a skilled archer, from his time in the army he learned that a single arrow can bring an entire empire down to its knees, when he did.",
        },}
    }
    };

  renderHexagon() {
    const data = [
          { subject: 'Speed', A: this.state.mock.sheet.speed, B: 0, fullMark: 150 },
          { subject: 'Strenght', A: this.state.mock.sheet.strength, B: 0, fullMark: 150 },
          { subject: 'Dexterity', A: this.state.mock.sheet.dexterity, B: 0, fullMark: 150 },
          { subject: 'Constitution', A: this.state.mock.sheet.constituition, B: 0, fullMark: 150 },
          { subject: 'Wisdom', A: this.state.mock.sheet.wisdom, B: 0, fullMark: 150 },
          { subject: 'Charisma', A: this.state.mock.sheet.charisma, B: 0, fullMark: 150 },
      ];
    return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
    );
  }

  render() {
    return (
            <div className = 'card-description-container'>
                <div className = 'card-description-title'>
                    CHAR STATS
                </div>
                <div className = 'card-general-info'> 
                    <div className='card-general-info-title'>
                        <strong> GENERAL INFO </strong>
                    </div>
                    <div style={{padding: '3%'}}> 
                        <Grid>
                            <Row>
                                <Col md={6}>
                                    <div className='card-general-item'>
                                        <span> <strong> TYPE </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.type} </span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                <div className='card-general-item'> 
                                        <span> <strong> GROUPD ID </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.group_id} </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <div className='card-general-item'>
                                        <span> <strong> PLAYER NAME </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.player_name} </span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                <div className='card-general-item'> 
                                        <span> <strong> STATUS </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.status} </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <div className='card-general-item'>
                                        <span> <strong> CHAR NAME </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.sheet.name} </span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='card-general-item'>
                                        <span> <strong> CLASS </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.sheet.class} </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <div className='card-general-item'>
                                        <span> <strong> LEVEL </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.sheet.lv} </span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='card-general-item'>
                                        <span> <strong> EXPERIENCE </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.sheet.xp} </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <div className='card-general-item'>
                                        <span> <strong> RACE </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.sheet.race} </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <div className='card-general-item'>
                                        <span> <strong> DESCRIPTION </strong> </span>
                                        <div className='separate' />
                                        <span> {this.state.mock.sheet.background} </span>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
                <div className='card-general-info'>
                    <div className='card-general-info-title'>
                        <strong> ATTRIBUTES </strong>
                    </div>
                    <div style={{ padding: '3%' }}>
                        <Grid>
                            <Row style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingRight: '200px',
                            }}> 
                                {this.renderHexagon()}
                            </Row>
                        </Grid>
                    </div>
                </div>
                
            </div>
    );
  }
}

CardDescription.propTypes = {
  card: PropTypes.object.isRequired,
};

