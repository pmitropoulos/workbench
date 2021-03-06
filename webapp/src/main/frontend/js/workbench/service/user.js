const actions = require('./api/fetch-actions');

var api = {

  getProfile: () => {
    return actions.get('/action/user/profile');
  },

  saveProfile: (profileData, token) => {
    return actions.post('/action/user/profile/save', token, JSON.stringify(profileData));
  },

  login: (username, password, token) => {
    const loginForm = new FormData();
    loginForm.append('username', username);
    loginForm.append('password', password);

    return actions.submit('/login', token, loginForm);
  },

  logout: (token) => {
    return actions.submit('/logout', token, null);
  },
};

module.exports = api;
