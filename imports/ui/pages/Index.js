import React from 'react';
import CRUDcontainer from '../containers/CRUD';
import sheetsContainer from '../containers/sheets';

export default class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    console.log(`;gd`);
    return (
      <div>
          <sheetsContainer/>
          <CRUDcontainer/>
      </div>
    );
  }
}


Index.propTypes = {

};
