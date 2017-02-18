import _find from 'lodash/find';
import { certsSelector } from 'modules/data/ducks/selectors';
const SELECT_CERT = 'certsPage/select_cert';

export default {
  certsPage: (state = {}, action) => {
    if (action.type === SELECT_CERT) {
      return { ...state, certId: action.payload };
    }
    return state;
  },
};

export const actions = {
  selectCert: (id) => ({ type: SELECT_CERT, payload: id }),
};

export const selectors = {
  selectedCert: (state) => _find(certsSelector(state), (cert) => cert.objectId === state.certsPage.certId),
};
