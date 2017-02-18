import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import DataTable, { TableHeader } from 'react-mdl/lib/DataTable';
import { actions, selectors } from 'api/profile';
import { adminUsersSelector, superUsersSelector } from 'modules/data/ducks/selectors';
import Liner from 'modules/common/svgs/liner';
import { humanizeTime } from 'utils/displayUtils';
import styles from 'modules/common/styles';
import RemoveUserFromAdminButton from '../removeUserFromAdminButton';

const fetchAdmins = actions.fetchAdmins;
const fetchAdminsSelector = selectors.fetchAdmins;

class Admin extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fetchAdmins: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    admins: PropTypes.array.isRequired,
    supers: PropTypes.array.isRequired,
  }
  componentDidMount() {
    this.props.fetchAdmins({});
  }
  render() {
    const { pending, admins, supers, classes } = this.props;
    if (pending) {
      return (
        <div className={classes.admin}>
          { pending && <Liner />}
        </div>
      );
    }
    return (
      <div className={classes.admin}>
        <h4>管理员</h4>
        <DataTable
          shadow={0}
          rows={admins.map((user) => {
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
                <RemoveUserFromAdminButton user={user} key={0} />,
              ],
            };
          })}
        >
          <TableHeader name="name">称呼</TableHeader>
          <TableHeader numeric name="mobilePhoneNumber">手机号码</TableHeader>
          <TableHeader numeric name="createdDate" cellFormatter={(createdAt) => humanizeTime(createdAt)}>注册时间</TableHeader>
          <TableHeader numeric name="actions">操作</TableHeader>
        </DataTable>
        <h4>超级管理员</h4>
        <DataTable
          shadow={0}
          rows={supers.map((admin) => ({ name: admin.name, mobilePhoneNumber: admin.mobilePhoneNumber, createdAt: admin.createdAt, actions: [<span key={0}>1</span>] }))}
        >
          <TableHeader name="name">称呼</TableHeader>
          <TableHeader numeric name="mobilePhoneNumber">手机号码</TableHeader>
          <TableHeader numeric name="createdAt" cellFormatter={(createdAt) => humanizeTime(createdAt)} >注册时间</TableHeader>
          <TableHeader numeric name="actions">操作</TableHeader>
        </DataTable>
      </div>
    );
  }
}

export default injectSheet({
  admin: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})(connect(
  (state) => ({ admins: adminUsersSelector(state), supers: superUsersSelector(state), ...fetchAdminsSelector(state) }),
  (dispatch) => bindActionCreators({ fetchAdmins }, dispatch),
)(Admin));
