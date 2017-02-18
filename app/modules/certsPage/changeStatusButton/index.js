import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { actions as certActions, selectors as certSelectors } from 'api/cert';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';

const changeStatusAction = certActions.changeStatus;
const changeStatusSelector = certSelectors.changeStatus;

const ChangeStatusButton = ({ cert, status, icon, pending, changeStatus, children }) => (
  <ApiButtonWithIcon
    ripple
    colored
    icon={icon}
    pending={pending}
    key={0}
    onClick={(e) => {
      e.preventDefault();
      changeStatus({ objectId: cert.objectId, status, meta: { storeKey: cert.objectId } });
    }}
  >
    {children}
  </ApiButtonWithIcon>
  );

ChangeStatusButton.propTypes = {
  status: PropTypes.any,
  pending: PropTypes.bool,
  icon: PropTypes.string,
  cert: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default injectSheet({
})(connect(
  (state, { cert }) => ({
    ...changeStatusSelector(state)[cert.objectId],
  }),
  (dispatch) => bindActionCreators({ changeStatus: changeStatusAction }, dispatch),
)(ChangeStatusButton));
