import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessage } from '../../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div className="Feature">
        <div className="container-fluid">
          { this.props.message }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { message }}) => ({ message });
export default connect(mapStateToProps, { fetchMessage })(Feature);