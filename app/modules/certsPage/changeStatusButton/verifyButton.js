import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { actions as certActions, selectors as certSelectors } from 'api/cert';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';

const verifyAction = certActions.verify;
const verifySelector = certSelectors.verify;

const ChangeStatusButton = ({ cert, icon, pending, verify, children }) => (
  <ApiButtonWithIcon
    ripple
    colored
    icon={icon}
    pending={pending}
    key={0}
    onClick={(e) => {
      e.preventDefault();
      verify({ objectId: cert.objectId, meta: { storeKey: cert.objectId } });
    }}
  >
    {children}
  </ApiButtonWithIcon>
);

ChangeStatusButton.propTypes = {
  pending: PropTypes.bool,
  icon: PropTypes.string,
  cert: PropTypes.object.isRequired,
  verify: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default injectSheet({
})(connect(
  (state, { cert }) => ({
    ...verifySelector(state)[cert.objectId],
  }),
  (dispatch) => bindActionCreators({ verify: verifyAction }, dispatch),
)(ChangeStatusButton));
