import React from 'react';
import { connect } from 'react-redux'

import Register from '../components/Register';
import { registerUserAction, registerFormLoaded } from '../actions/registrationActions';
import { Link } from 'react-router-dom'
import { history } from '../store/configureStore';

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(registerFormLoaded());
    }

    registerUser(dispatch) {
        return user => dispatch(registerUserAction(user));
    }

    render(){
        const { registering, registered, loggedIn, errors } = this.props;
        if(registered){
            return (
                <div className="thanks-page">
                <div className="illustrations"></div>
                <div className="grid-container">
                    <div className="grid-x grid-padding-x">
                        <div className="large-12 cell">
                            <h2>Thanks for signing up!</h2>
                            <p>Check your email for a verification link to proceed.</p>
                            <Link to="/" className="button">Go back to the homepage</Link>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
        if(loggedIn){
            history.push('/dashboard');
        }
        return <Register registering={registering}  errors={errors} registerUser={this.registerUser(this.props.dispatch)}/>

    }
}

function mapStateToProps(state) {
     const { registering, registered, errors } = state.registration;
     const { loggedIn } = state.authentication;
     return {
        loggedIn,
        registering,
        registered,
        errors
     };
}

export default connect(
  mapStateToProps
)(RegisterPage)