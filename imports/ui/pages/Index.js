import React from 'react';
import CRUDcontainer from '../containers/CRUD';


export default class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <div id='react-root'>
          <CRUDcontainer/>
      </div>
    );
  }
}


Index.propTypes = {

};
