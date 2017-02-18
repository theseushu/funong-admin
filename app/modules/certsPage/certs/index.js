import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'api/cert';
import { certsSelector } from 'modules/data/ducks/selectors';
import List from './list';

const search = actions.search;
const searchStateSelector = selectors.search;

export default connect(
  (state) => ({ ...searchStateSelector(state), certs: certsSelector(state) }),
  (dispatch) => bindActionCreators({ search }, dispatch),
)(List);
