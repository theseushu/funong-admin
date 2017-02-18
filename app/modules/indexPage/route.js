import _toPairs from 'lodash/toPairs';
import { requireAdmin } from 'utils/routerUtils';
import createUsersPageRoute from 'modules/usersPage/route';
import createCertsPageRoute from 'modules/certsPage/route';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/',
  name: 'index',
  onEnter: async (nextState, replace, callback) => {
    const { login, isAdmin } = await requireAdmin(store);
    if (login && isAdmin) {
      callback();
    } else {
      let message;
      const redirect = '/';
      if (!login) {
        message = '请登录';
      } else {
        message = '您不是管理员，无法进入控制台。换个账户？';
      }
      replace(`/login?message=${message}&redirect=${redirect}`);
      callback();
    }
  },
  indexRoute: {
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('./index'),
        System.import('./ducks'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component, ducks]) => {
        _toPairs(ducks.default).forEach((pair) => {
          injectReducer(pair[0], pair[1]);
        });
        // injectSagas(ducks.sagas);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
  },
  childRoutes: [
    createUsersPageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createCertsPageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
  ],
});
