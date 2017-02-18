import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl/lib/Layout';
import Textfield from 'react-mdl/lib/Textfield';
import Icon from 'react-mdl/lib/Icon';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Avatar from 'modules/common/avatar';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { colors } from 'modules/common/styles';

const LayoutComponent = ({ classes, user, children }) => {
  const { roles } = user;
  let roleName;
  if (roles.indexOf('super') >= 0) {
    roleName = '超级管理员';
  } else if (roles.indexOf('admin') >= 0) {
    roleName = '管理员';
  }
  return (
    <Layout fixedHeader fixedDrawer>
      <Header className="mdl-color--grey-100 mdl-color-text--grey-600" title="富农商城管理平台">
        <Textfield
          value=""
          onChange={() => {}}
          label="Search"
          expandable
          expandableIcon="search"
        />
      </Header>
      <Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header className={classes.header}>
          <div className={classes.avatar}><Avatar /></div>
          <div className={classes.name}>{user.name}，{roleName}</div>
        </header>
        <Navigation className={`${classes.nav} mdl-color--blue-grey-800`}>
          <Link onlyActiveOnIndex activeClassName={classes.linkActive} to="/">
            <Icon name="home" />
            首页
          </Link>
          <Link onlyActiveOnIndex activeClassName={classes.linkActive} to="/users">
            <Icon name="wc" />
            用户
          </Link>
          <Link onlyActiveOnIndex activeClassName={classes.linkActive} to="/certs">
            <Icon name="perm_media" />
            认证信息
          </Link>
          <Link onlyActiveOnIndex activeClassName={classes.linkActive} to="/products">
            <Icon name="view_comfy" />
            产品
          </Link>
          <Link onlyActiveOnIndex activeClassName={classes.linkActive} to="/posts">
            <Icon name="pages" />
            生意圈
          </Link>
        </Navigation>
      </Drawer>
      <Content className="mdl-color--grey-100">
        {children}
      </Content>
    </Layout>
  );
};


LayoutComponent.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default injectSheet({
  header: {
    display: 'flex',
    flexDirection: 'column',
    height: 150,
    padding: 16,
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 50,
    height: 50,
    color: 'white',
  },
  name: {
    margin: '8px 0',
  },
  nav: {
    flex: 1,
    '& i': {
      marginRight: 32,
    },
  },
  linkActive: {
    background: `${colors.colorPrimary} !important`,
    color: `${colors.colorPrimaryContrast} !important`,
  },
})(connect(
  (state) => ({ user: currentUserSelector(state) }),
)(LayoutComponent));
