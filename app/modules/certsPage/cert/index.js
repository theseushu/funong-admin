import { connect } from 'react-redux';
import CertDisplay from 'modules/common/cert/display';
import { selectors } from '../ducks';

const selectedCertSelector = selectors.selectedCert;

export default connect(
  (state) => ({ cert: selectedCertSelector(state) }),
)(CertDisplay);
