import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import { actions as roleActions, selectors as roleSelectors } from 'api/role';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import IconButtonLoading from 'modules/common/iconButtonLoading';

const removeUserFromRoleAction = roleActions.removeUserFromRole;
const fetchAllSelector = roleSelectors.fetchAll;
const removeUserFromRoleSelector = roleSelectors.removeUserFromRole;

const isSuper = (user) => user.roles.indexOf('super') >= 0;
const isAdmin = (user) => user.roles.indexOf('admin') >= 0;

const RemoveUserFromAdminButton = ({ authorized, user, adminRole, pending, removeUserFromRole }) => {
  const isSuperUser = isSuper(user);
  const isAdminUser = isAdmin(user);
  if (pending) {
    return <IconButtonLoading />;
  }
  return (
    <IconButton
      ripple
      name="remove_circle"
      disabled={!authorized || isSuperUser || !isAdminUser}
      key={0}
      onClick={(e) => {
        e.preventDefault();
        removeUserFromRole({ user, role: adminRole, meta: { storeKey: user.objectId } });
      }}
    />
  );
};

RemoveUserFromAdminButton.propTypes = {
  authorized: PropTypes.bool,
  pending: PropTypes.bool,
  user: PropTypes.object.isRequired,
  adminRole: PropTypes.object.isRequired,
  removeUserFromRole: PropTypes.func.isRequired,
};

export default injectSheet({
})(connect(
  (state, { user }) => ({
    ...removeUserFromRoleSelector(state)[user.objectId],
    adminRole: _find(fetchAllSelector(state).roles, ({ name }) => name === 'admin'),
    authorized: currentUserSelector(state).roles.indexOf('super') >= 0,
  }),
  (dispatch) => bindActionCreators({ removeUserFromRole: removeUserFromRoleAction }, dispatch),
)(RemoveUserFromAdminButton));
