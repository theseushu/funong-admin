import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import loading from 'assets/blockLoading.gif';

const IconButtonLoading = ({ classes }) => (
  <span className={classes.icon}>
    <img role="presentation" src={loading} />
  </span>
);

IconButtonLoading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  icon: {},
})(IconButtonLoading);
