import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Layout from 'modules/common/layout';
import Certs from './certs';
import Cert from './cert';

const CertsPage = ({ classes }) => (
  <Layout>
    <div className={classes.page}>
      <h4>未审核的认证资料</h4>
      <div className={classes.content}>
        <Certs />
        <Cert />
      </div>
    </div>
  </Layout>
  );

CertsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: '0 24px',
  },
  content: {
    display: 'flex',
    '& > *': {
      flex: 1,
    },
  },
})(CertsPage);
