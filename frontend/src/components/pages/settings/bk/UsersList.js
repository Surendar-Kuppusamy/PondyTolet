import React from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { CUSTOM_STYLES, BULK_DATA_INSERT_TYPES } from '../../../config/globalConstant';
import { getUsers } from '../../../actions/settingActions';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            users: []
        }
        
    }
    componentDidMount() {
        this.props.getUsers();
        //this.setState({available_options})
        console.log(this.props.settingState);
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    componentDidUpdate() {
        //console.log(this.props.settingState);
        if(this.state.users.length == 0) {
            this.setState({users: this.props.settingState.users_list.users});
        }
    }
    render() {
        
        return (
            <section id="UsersList">
                <h4 className="mt-4 pt-5">
                    Users List
                </h4>
                <div className="mt-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.users.map(value => {
                            return (
                                <tr key={value._id}>
                                    <td>{value.first_name}</td>
                                    <td>{value.last_name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.password}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settingState: state.settingState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => {
            dispatch(getUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);