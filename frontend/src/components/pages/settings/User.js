import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { faTrashAlt, faPencilAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../Loader';
import { getUsers, bulkStatusChangeUser, changeUserStatus, resetUsersResult } from '../../../actions/settingActions';
import { ENABLE_DISABLE_FILTER } from '../../../config/globalConstant';

Modal.setAppElement('#root');

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            searchKey: '',
            filterUserStatus:0,
            pageRange: 10,
            currentPage: 0,
            modalIsOpen:false,
            userEditID: '',
            enableDisableValue: 0,
            user: '',
            userIds: []
        }
        this.handleSearch.bind(this);
        this.handlePagination.bind(this);
        this.handleCheck.bind(this);
        this.checkAll.bind(this);
        this.enableDisableUsers.bind(this);
        this.enableDisableUser.bind(this);
        this.onClickUserFilter.bind(this);

    }
    componentDidMount() {
        /* this.setState({loader: true});        
        this.setState({loader: false}); */
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    componentDidUpdate() {
        if(this.props.settingState.users_result != undefined && Object.keys(this.props.settingState.users_result).length != 0) {
            if(this.props.settingState.users_result.status == 'error') {
                toast.error(this.props.settingState.users_result.message, {theme: "colored"});
            } else {
                toast.success(this.props.settingState.users_result.message, {theme: "colored"});
                if(this.props.settingState.users_result.bulkDelete != undefined && this.props.settingState.users_result.bulkDelete == 1) {
                    this.setState({userIds: []});
                }
                this.props.getUsers(this.state);
                this.setState({modalIsOpen: false});
                this.props.resetUsersResult();
            }
        }
    }
    handleSearch() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.setState({loader: true});
            this.props.getUsers(this.state);
            this.setState({loader: false});
        }, 800);
    }
    handlePagination = (data) => {
        let selected = data.selected;
        this.setState({currentPage: selected});
        console.log(selected);
        let count = Math.ceil(this.props.settingState.total_users / this.state.pageRange);
        setTimeout(() => {
            this.props.getUsers(this.state);
        }, 50);
    }
    handleCheck = (event) => {
        let selectedUserValue = event.target.value;
        let checkedValueIndex = this.state.userIds.indexOf(selectedUserValue);
        if(event.target.checked) {
            if(checkedValueIndex === -1) {
                this.setState({userIds: this.state.userIds.concat(selectedUserValue)})
            }
        } else {
            if(checkedValueIndex !== -1) {
                this.setState({userIds: this.state.userIds.filter(item => item !== selectedUserValue)});
            }
        }
    }
    checkAll = (event) => {
        var checkboxes = document.getElementsByClassName('userID');
        console.log(checkboxes);
        for(var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].type == "checkbox") {
                if(event.target.checked) {
                    checkboxes[i].checked = true;
                    let usersID = this.state.userIds;
                    if(usersID.indexOf(checkboxes[i].value) === -1) {
                        usersID.push(checkboxes[i].value);
                        this.setState({userIds: usersID})
                    }
                } else {
                    checkboxes[i].checked = false;
                    this.setState({userIds: []});
                }
            }
        }
    }

    enableDisableUsers = (status) => {
        let msg = "";
        if(status == 1) {
            msg = 'Are you sure to enable selected users.';
        } else {
            msg = 'Are you sure to disable selected users.';
        }
        confirmAlert({
            title: 'Confirm',
            message: msg,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.bulkStatusChangeUser(this.state)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }
    enableDisableUser = (status, id, user_name) => {
        let msg = "";
        if(status == 1) {
            msg = 'Are you sure to enable user "'+user_name+'".';
        } else {
            msg = 'Are you sure to disable user "'+user_name+'".';
        }
        confirmAlert({
            title: 'Confirm',
            message: msg,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.changeUserStatus(id, status)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    };
    onClickUserFilter = (e, field) => {
        console.log(e, field);
        this.setState({ filterUserStatus: e.value });
        this.handleSearch();
    }
    render() {
        return (
            <section id="User">
                <div></div>
                <div>
                    <div className="form-group text-right user_filter">
                        <Dropdown options={ENABLE_DISABLE_FILTER} onChange={e => this.onClickUserFilter(e, 'filterUserStatus')} value={this.state.filterUserStatus} placeholder="User status" />
                        <input type="text" name="citySearch" id="citySearch" placeholder="Search User" onChange={(e) => {this.setState({searchKey: e.target.value});this.handleSearch();}} value={this.state.searchKey} />
                    </div>
                    { this.state.userIds.length > 0 ? 
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" onClick={(e) => {this.setState({enableDisableValue: 1}); this.enableDisableUsers(1)}}>Enable</button>
                        <button type="button" className="btn btn-danger" onClick={(e) => {this.setState({enableDisableValue: 2}); this.enableDisableUsers(2)}}>Disable</button>
                    </div>
                   : <div></div> }
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th><input type="checkbox" name="bulkAction" onChange={this.checkAll} /></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>DOB</th>
                                <th>User Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.settingState.users != undefined && this.props.settingState.users.map((value, index) => {
                                return (
                                    <tr key={value._id}>
                                        <td><input className="userID" type="checkbox" name="userIds[]" onChange={(e) => this.handleCheck(e)} value={value._id} /></td>
                                        <td>{value.name}</td>
                                        <td>{value.email}</td>
                                        <td>{value.dob}</td>
                                        <td>{value.user_type}</td>
                                        <td>
                                            {(value.user_status != 1) ? <span><FontAwesomeIcon icon={faCheck} onClick={() => this.enableDisableUser(1, value._id, value.name)} /></span> : <span><FontAwesomeIcon icon={faTimes} onClick={() => this.enableDisableUser(2, value._id, value.name)}  /></span>}
                                        </td>
                                    </tr>
                                )
                            })}
                            { this.props.settingState.users != undefined && this.props.settingState.users.length == 0 && <tr><td colSpan="6" align="center">No data...</td></tr> }
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(this.props.settingState.total_users / this.state.pageRange)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={this.state.pageRange}
                        onPageChange={this.handlePagination}
                        initialPage={0}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </section>
        )
    }
}

let timer;

const mapStateToProps = (state) => {
    return {
        settingState: state.settingState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: (state) => {
            dispatch(getUsers(state))
        },
        bulkStatusChangeUser: (state) => {
            dispatch(bulkStatusChangeUser(state))
        },
        changeUserStatus: (userID, status) => {
            dispatch(changeUserStatus(userID, status))
        },
        resetUsersResult: (state) => {
            dispatch(resetUsersResult(state))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);