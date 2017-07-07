import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authenication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount(){
      if(!this.props.authenicated){
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps){
      if(!nextProps.authenicated) {
        this.context.router.push('/');
      }
    }

    render(){
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenicated: state.auth.authenicated };
  }

  return connect(mapStateToProps)(Authenication);
}
