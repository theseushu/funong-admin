import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Layout from 'modules/common/layout';
import Admin from './admin';
import Users from './users';
const UsersPage = ({ classes }) => (
  <Layout>
    <div className={classes.page}>
      <Admin />
      <Users />
    </div>
  </Layout>
  );


UsersPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  page: {
    display: 'flex',
  },
  admin: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  users: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})(UsersPage);
