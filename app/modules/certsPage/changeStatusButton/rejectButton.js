import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { actions as certActions, selectors as certSelectors } from 'api/cert';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';

const rejectAction = certActions.reject;
const rejectSelector = certSelectors.reject;

const ChangeStatusButton = ({ cert, icon, pending, reject, children }) => (
  <ApiButtonWithIcon
    ripple
    colored
    icon={icon}
    pending={pending}
    key={0}
    onClick={(e) => {
      e.preventDefault();
      reject({ objectId: cert.objectId, meta: { storeKey: cert.objectId } });
    }}
  >
    {children}
  </ApiButtonWithIcon>
);

ChangeStatusButton.propTypes = {
  pending: PropTypes.bool,
  icon: PropTypes.string,
  cert: PropTypes.object.isRequired,
  reject: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default injectSheet({
})(connect(
  (state, { cert }) => ({
    ...rejectSelector(state)[cert.objectId],
  }),
  (dispatch) => bindActionCreators({ reject: rejectAction }, dispatch),
)(ChangeStatusButton));
