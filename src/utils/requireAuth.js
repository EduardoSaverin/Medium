import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// This is very common way to check auth in component using it 2nd time.
export default function (Component) {
    class Authenticate extends React.Component {
        /**
         * componentWillMount checks if user isAuth and pushes / to the navigation history to redirect the user if he/she is not logged in,
         * therefore the render method will not be called.
         */
        componentWillMount() {
            if (!this.props.isAuth) {
                this.context.router.history.push('/')
            }
        }
        render() {
            return (
                <Component {...this.props} />
            )
        }
    }
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }
    const mapStateToProps = state => {
        return {
            isAuth: state.authUser.isAuth
        }
    }
    return connect(mapStateToProps)(Authenticate)
}