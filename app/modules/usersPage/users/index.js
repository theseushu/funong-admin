import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import DataTable, { TableHeader } from 'react-mdl/lib/DataTable';
import Icon from 'react-mdl/lib/Icon';
import { actions, selectors } from 'api/profile';
import { usersSelector } from 'modules/data/ducks/selectors';
import Liner from 'modules/common/svgs/liner';
import { humanizeTime } from 'utils/displayUtils';
import styles from 'modules/common/styles';
import Count from './count';
import AddUserToAdminButton from '../addUserToAdminButton';

const fetchUsers = actions.fetchUsers;
const fetchUsersSelector = selectors.fetchUsers;

class Users extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    pending: PropTypes.bool,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
  }
  state = { skip: 0, limit: 50 }
  componentDidMount() {
    const { skip, limit } = this.state;
    this.props.fetchUsers({ skip, limit });
  }
  switchPage = (pageNum) => {
    const { limit } = this.state;
    this.setState({ skip: limit * pageNum, limit }, () => {
      this.props.fetchUsers({ skip: this.state.skip, limit: this.state.limit });
    });
  }
  render() {
    const { pending, users, classes } = this.props;
    if (pending) {
      return (
        <div className={classes.users}>
          { pending && <Liner />}
        </div>
      );
    }
    return (
      <div className={classes.users}>
        <h4>一般用户</h4>
        <p className={classes.note}>提示：<Icon name="supervisor_account" />设置为管理员 </p>
        <DataTable
          shadow={0}
          rows={users.map((user) => {
            let type;
            if (user.roles.indexOf('super') >= 0) {
              type = <span className={styles.colorAccent}>超级管理员</span>;
            } else if (user.roles.indexOf('admin') >= 0) {
              type = <span className={styles.colorAccent}>管理员</span>;
            } else {
              type = user.type;
            }
            return {
              name: user.name,
              mobilePhoneNumber: user.mobilePhoneNumber,
              type,
              createdAt: user.createdAt,
              actions: [
                <AddUserToAdminButton user={user} key={0} />,
              ],
            };
          })}
        >
          <TableHeader name="name">称呼</TableHeader>
          <TableHeader numeric name="mobilePhoneNumber">手机号码</TableHeader>
          <TableHeader numeric name="type">身份</TableHeader>
          <TableHeader numeric name="createdAt" cellFormatter={(createdAt) => humanizeTime(createdAt)} >注册时间</TableHeader>
          <TableHeader numeric name="actions">操作</TableHeader>
        </DataTable>
        <Count />
      </div>
    );
  }
}

export default injectSheet({
  users: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  note: {
    display: 'flex',
    alignItems: 'center',
  },
})(connect(
  (state) => ({ users: usersSelector(state), ...fetchUsersSelector(state) }),
  (dispatch) => bindActionCreators({ fetchUsers }, dispatch),
)(Users));
