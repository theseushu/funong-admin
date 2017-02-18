import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { actions, selectors } from 'api/profile';
import { usersSelector } from 'modules/data/ducks/selectors';

const countAll = actions.countAll;
const countAllSelector = selectors.countAll;

class Users extends Component {
  static propTypes = {
    countAll: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    result: PropTypes.number,
  }
  componentDidMount() {
    this.props.countAll({});
  }
  render() {
    const { pending, result } = this.props;
    if (pending) {
      return null;
    }
    return (
      <p>共{result}用户</p>
    );
  }
}

export default injectSheet({
})(connect(
  (state) => ({ users: usersSelector(state), ...countAllSelector(state) }),
  (dispatch) => bindActionCreators({ countAll }, dispatch),
)(Users));
