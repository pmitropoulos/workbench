import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactRedux from 'react-redux';

import {
  NavLink,
} from 'react-router-dom';

import {
  FormattedMessage,
} from 'react-intl';

import {
  toast,
} from 'react-toastify';

import {
  Pages
} from '../../model/routes';

import {
  getConfiguration,
} from '../../ducks/config';

import {
  login,
  refreshProfile,
} from '../../ducks/user';

//
// Presentational component
//

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this._submit = this._submit.bind(this);

    this.state = {
      username: props.username || '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.username || '',
      password: '',
    });
  }

  _submit($event) {
    $event.preventDefault();

    let { username, password } = this.state;

    this.props.submit(username, password);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card-group mb-0">

                <div className="card p-4">
                  <form className="card-block" onSubmit={this._submit}>

                    <a className="login-brand" target="_blank" href="http://www.slipo.eu/"></a>
                    <p className="text-muted">
                      <FormattedMessage id="login.subtitle" defaultMessage="Sign-in into your account" />
                    </p>

                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className="form-control" placeholder="username"
                        value={this.state.username}
                        onChange={(ev) => this.setState({ username: ev.target.value })}
                      />
                    </div>

                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="password"
                        value={this.state.password}
                        onChange={(ev) => this.setState({ password: ev.target.value })}
                      />
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4">
                          <FormattedMessage id="login.login" defaultMessage="Login" />
                        </button>
                      </div>
                      <div className="col-6 text-right">
                        <NavLink className="btn px-0" activeClassName="active" to={Pages.ResetPassword}>
                          <FormattedMessage id="login.forgot-password" defaultMessage="Forgot password?" />
                        </NavLink>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  username: PropTypes.string,
};

//
// Container component
//

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  submit: (username, password) => (
    dispatch(login(username, password))
      .then(() => dispatch(refreshProfile()))
      .then(() => dispatch(getConfiguration()))
      .then(() => toast.dismiss(),
        () => {
          toast.dismiss();
          toast.error(<FormattedMessage id="login.failure" defaultMessage="The username or password is incorrect." />);
        })
      .catch((err) => null)
  ),
});

LoginForm = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LoginForm);

module.exports = LoginForm;
