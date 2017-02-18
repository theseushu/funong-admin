import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import BlockLoading from 'modules/common/loading/block';
import Cert from './cert';

class CertList extends Component {
  static propTypes = {
    pending: PropTypes.bool,
    certs: PropTypes.array.isRequired,
    search: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.props.search({});
  }
  render() {
    const { pending, certs, classes } = this.props;
    if (pending) {
      return (
        <div className={classes.certList}>
          <BlockLoading />
        </div>
      );
    }
    return (
      <div>
        {certs.map((cert, i) => <Cert key={i} cert={cert} />)}
      </div>
    );
  }
}

export default injectSheet({
  certList: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
})(CertList);
