import React from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import { filesEmpty } from 'react-icons-kit/icomoon/filesEmpty';
import { cog } from 'react-icons-kit/icomoon/cog';
import { exit } from 'react-icons-kit/icomoon/exit';
import { browserHistory } from 'react-router';

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;

const BaseContainer = props =>
    <div
        style={{
          display: 'inline-block',
          paddingTop: 16,
          paddingBottom: 16,
          fontFamily: 'Roboto',
          width: 240,
          ...props.style,
        }}
    >
        {props.children}
    </div>;

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
    this.groupId = props.groupId;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(route) {
    if(route !== 'logout') {
      return browserHistory.push(`/${route}/${this.props.groupId}`);
    }
    return browserHistory.push('/index');
  }

  render() {
    return (
            <div style={{ position: 'fixed', paddingRight: '5%' }}>
                <div style={{ display: 'flex' }}>
                    <BaseContainer
                        style={{
                          fontSize: 12,
                          background: '#2d353c',
                          color: '#a8acb1',
                          paddingTop: 0,
                        }}
                    >
                        <div style={{ display: 'flex', padding: 16, background: '#1a2229' }}>
                            {/* <div style={{ width: 40, height: 40 }}>
                                <img
                                    src="https://e27.co/img/profiles/15483/profile_pic.png"
                                    style={{ borderRadius: '30px', width: 40, height: 40 }}
                                />
                            </div>
                            <div style={{ paddingLeft: 6, paddingTop: 6 }}>
                                <div style={{ fontSize: 12, color: '#E5E5E5' }}>
                                    {' '}Warren Mira{' '}
                                </div>
                                <div style={{ fontSize: 11 }}> Ninja Developer </div>
                            </div> */}
                        </div>
                        <SideNav
                            hoverBgColor="#232a2f"
                            hoverColor="red"
                            highlightBgColor="#00acac"
                            defaultSelected="sheets"
                            highlightColor="#FFF"
                            onClick={this.handleClick}
                        >
                            <Nav id="sheets" onClick={this.handleClick}>
                                <NavIcon><Icon20 icon={filesEmpty} /></NavIcon>
                                <NavText> <div onClick={() => this.handleClick('sheets')}>Sheets</div> </NavText>
                            </Nav>
                            <Nav id="settings">
                                <NavIcon><Icon20 icon={cog} /></NavIcon>
                                <NavText> <div onClick={() => this.handleClick('settings')}>Groups Settings</div></NavText>
                            </Nav>
                            <Nav id="logout">
                                <NavIcon><Icon20 icon={exit} /></NavIcon>
                                <NavText> <div onClick={() => this.handleClick('logout')}>Logout</div></NavText>
                            </Nav>
                        </SideNav>
                    </BaseContainer>
                </div>
            </div>
    );
  }
}


SideBar.propTypes = {
  groupId: React.PropTypes.string,
};
