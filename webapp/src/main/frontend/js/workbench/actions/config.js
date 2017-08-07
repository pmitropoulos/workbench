const ActionTypes = require('../action-types');

var actions = {

  // 
  // Basic actions
  //

  requestConfiguration: () => ({
    type: ActionTypes.config.REQUEST_CONFIGURATION,
  }),

  loadConfiguration: (config, timestamp) => ({
    type: ActionTypes.config.LOAD_CONFIGURATION,
    config,
  }),

  //
  // Thunk actions
  //

  getConfiguration: () => (dispatch, getState) => {
    // Request and load configuration from server
    dispatch(actions.requestConfiguration());
    // Todo fetch and load
  },

};

module.exports = actions;
