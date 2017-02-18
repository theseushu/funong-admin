import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import MediaLeftCard from 'modules/common/cards/mediaLeftCard';
import Button from 'react-mdl/lib/Button';
import { humanizeTime, formatStatus } from 'utils/displayUtils';
import { certTypes } from 'appConstants';
import { selectors, actions } from '../../ducks';
import VerifyButton from '../../changeStatusButton/verifyButton';
import RejectButton from '../../changeStatusButton/rejectButton';

const selectCert = actions.selectCert;
const selectedCertSelector = selectors.selectedCert;

const Cert = ({ cert, selected, select, classes }) => (
  <div className={classes.cert}>
    <MediaLeftCard
      shadow={selected ? 4 : 0}
      thumbnail={<div><img className={classes.image} role="presentation" src={cert.images[0].thumbnail_80_80} /></div>}
      title={<span>{_find(certTypes, (c) => c.value === cert.type).title}<small> {formatStatus(cert.status)}</small></span>}
      subtitle={<span>{cert.owner.name} <small>{humanizeTime(cert.createdAt)}</small></span>}
      actions={[
        <VerifyButton key={0} cert={cert} icon="check_box">通过</VerifyButton>,
        <RejectButton key={1} cert={cert} icon="indeterminate_check_box">拒绝</RejectButton>,
        <Button key={3} disabled={selected} onClick={select} colored>查看</Button>,
      ]}
    />
  </div>
  );

Cert.propTypes = {
  cert: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
};

export default injectSheet({
  cert: {
    width: '100%',
    maxWidth: 800,
    padding: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})(connect(
  (state, { cert }) => {
    const selected = selectedCertSelector(state);
    return ({ selected: !!selected && selected.objectId === cert.objectId });
  },
  (dispatch, { cert }) => bindActionCreators({ select: () => selectCert(cert.objectId) }, dispatch),
)(Cert));
