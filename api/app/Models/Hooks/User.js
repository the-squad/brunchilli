/* global use */

const Hash = use('Hash');

const UserHook = (module.exports = {}); // eslint-disable-line

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} userInstance
 *
 * @return {void}
 */
UserHook.hashPassword = async userInstance => {
  if (userInstance.password) {
    userInstance.password = await Hash.make(userInstance.password); // eslint-disable-line
  }
};
