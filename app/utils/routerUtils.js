import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions as profileActions } from 'api/profile';
import { actions as roleActions, selectors as roleSelectors } from 'api/role';

const fetchProfile = profileActions.fetch;
const fetchUserRoles = roleActions.fetchUserRoles;
const fetchUserRolesSelector = roleSelectors.fetchUserRoles;

export const requireAdmin = async (store) => {
  const result = { login: false, isAdmin: false };
  try {
    let currentUser = currentUserSelector(store.getState());
    // if currentUser's not been fetched, fetch it before continue
    // if it's fetched already, don't wait for the result
    if (!currentUser) {
      await new Promise((resolve, reject) => {
        store.dispatch(fetchProfile({ meta: { resolve, reject } }));
      });
    } else {
      store.dispatch(fetchProfile({}));
    }
    currentUser = currentUserSelector(store.getState());
    if (currentUser) {
      result.login = true;
    } else {
      return result;
    }
    if (currentUser.roles.indexOf('super') >= 0 || currentUser.roles.indexOf('admin') >= 0) {
      result.isAdmin = true;
      return result;
    }
    const { fulfilled } = fetchUserRolesSelector(store.getState());
    if (!fulfilled) {
      await new Promise((resolve, reject) => {
        store.dispatch(fetchUserRoles({ meta: { resolve, reject } }));
      });
    }
    const { roles } = fetchUserRolesSelector(store.getState());
    if (roles.indexOf('admin') > -1 || roles.indexOf('super') > -1) {
      result.isAdmin = true;
    }
    return result;
  } catch (err) {
    throw err;
  }
};
