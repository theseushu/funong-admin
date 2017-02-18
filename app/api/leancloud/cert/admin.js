import { statusValues } from 'appConstants';
import { certToJSON } from '../converters';
const debug = require('debug')('app:api:certs:admin');

export default ({ AV, context }) => {
  class Cert extends AV.Object {}
  AV.Object.register(Cert);

  const searchAllCerts = async ({ skip, limit }) => {
    try {
      const certs = await AV.Cloud.rpc('searchCerts', {
        skip,
        limit,
        status: [statusValues.unverified.value, statusValues.rejected.value, statusValues.verified.value],
      }, {
        sessionToken: context.token.sessionToken,
      });
      return certs.map(certToJSON);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const searchUnverifiedCerts = async ({ skip, limit }) => {
    try {
      const certs = await AV.Cloud.rpc('searchCerts', { skip, limit, status: statusValues.unverified.value }, { sessionToken: context.token.sessionToken });
      return certs.map(certToJSON);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const changeStatus = async ({ objectId, status }) => {
    try {
      await AV.Cloud.rpc('certs.changeStatus', { objectId, status }, { sessionToken: context.token.sessionToken });
      return;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const verifyCert = async ({ objectId }) => {
    try {
      await AV.Cloud.rpc('certs.verify', { objectId }, { sessionToken: context.token.sessionToken });
      return;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const rejectCert = async ({ objectId }) => {
    try {
      await AV.Cloud.rpc('certs.reject', { objectId }, { sessionToken: context.token.sessionToken });
      return;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    searchAllCerts,
    searchUnverifiedCerts,
    changeStatus,
    verifyCert,
    rejectCert,
  };
};
