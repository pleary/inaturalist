import React, { Component } from "react";
import PropTypes from "prop-types";

class ChangePassword extends Component {
  constructor( ) {
    super( );

    this.state = {
      showPasswordForm: false,
      input: {}
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleChange( e ) {
    const { input } = this.state;
    input[e.target.name] = e.target.value;

    this.setState( { input } );
  }

  handleSubmit( e ) {
    const { input } = this.state;
    const { changePassword } = this.props;

    e.preventDefault( );

    changePassword( input );
  }

  render( ) {
    const { showPasswordForm } = this.state;

    return (
      <div className="settings-item">
        {/* Change this into a button since using onClick? */}
        <label
          className="inverse-toggle collapsible"
          htmlFor="user_password"
          onClick={( ) => {
            this.setState( { showPasswordForm: !showPasswordForm } );
          }}
        >
          {`${I18n.t( "change_password" )} `}
          <i className={`fa fa-caret-${showPasswordForm ? "down" : "right"}`} aria-hidden="true" />
        </label>
        <div className={showPasswordForm ? null : "collapse"}>
          <form id="user_password">
            <div className="form-group">
              <label>
                {I18n.t( "new_password" )}
                <input
                  type="password"
                  className="form-control"
                  name="new_password"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                {I18n.t( "confirm_new_password" )}
                <input
                  type="password"
                  className="form-control"
                  name="confirm_new_password"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <button className="btn btn-xs btn-primary" type="button" onClick={this.handleSubmit}>
              {I18n.t( "change_password" )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func
};

export default ChangePassword;
