import _toPairs from 'lodash/toPairs';
import { actions, selectors } from 'api/role';

const fetchAllRoles = actions.fetchAll;
const fetchAllRolesSelector = selectors.fetchAll;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/users',
  name: 'users',
  onEnter: async (nextState, replace, callback) => {
    // ensure roles are fetched before enter page
    const { roles } = fetchAllRolesSelector(store.getState());
    if (roles) {
      callback();
    } else {
      store.dispatch(fetchAllRoles({
        meta: {
          resolve: () => callback(),
          reject: () => {
            replace('/error');
            callback();
          },
        },
      }));
    }
  },
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
});
