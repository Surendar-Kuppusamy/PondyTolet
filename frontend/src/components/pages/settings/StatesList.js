import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../Loader';
import { resetStatesResult, getStates, editState, deleteStateByID, deleteBulkState, bulkStatusChangeState, changeStateStatus } from '../../../actions/settingActions';


Modal.setAppElement('#root');

class StatesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            searchKey: '',
            pageRange: 10,
            currentPage: 0,
            modalIsOpen:false,
            stateEditID: '',
            enableDisableValue: 0,
            state: '',
            stateIds: []
        }
        this.handleSearch.bind(this);
        this.handlePagination.bind(this);
        this.checkAll.bind(this);
        this.handleCheck.bind(this);
        this.deleteState.bind(this);
        this.bulkDeleteStates.bind(this);
        this.enableDisableStates.bind(this);
        this.enableDisableState.bind(this);
        
    }

    componentDidMount() {
        this.setState({loader: true});
        console.log(this.props.settingState);
        this.setState({loader: false});
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    componentDidUpdate() {
        if(this.props.settingState.states_result != undefined && Object.keys(this.props.settingState.states_result).length != 0) {
            if(this.props.settingState.states_result.status == 'error') {
                toast.error(this.props.settingState.states_result.message, {theme: "colored"});
            } else {
                toast.success(this.props.settingState.states_result.message, {theme: "colored"});
                if(this.props.settingState.states_result.bulkDelete != undefined && this.props.settingState.states_result.bulkDelete == 1) {
                    this.setState({stateIds: []});
                }
                this.props.getStates(this.state);
                this.setState({modalIsOpen: false});
                this.props.resetStatesResult();
            }
        }
    }
    handleSearch() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.setState({loader: true});
            this.props.getStates(this.state);
            this.setState({loader: false});
        }, 800);
    }
    handlePagination = (data) => {
        let selected = data.selected;
        this.setState({currentPage: selected});
        console.log(selected);
        let count = Math.ceil(this.props.settingState.total_state / this.state.pageRange);
        setTimeout(() => {
            this.props.getStates(this.state);
        }, 50);
    }
    checkAll = (event) => {
        var checkboxes = document.getElementsByClassName('stateID');
        console.log(checkboxes);
        for(var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].type == "checkbox") {
                if(event.target.checked) {
                    checkboxes[i].checked = true;
                    let statesID = this.state.stateIds;
                    if(statesID.indexOf(checkboxes[i].value) === -1) {
                        statesID.push(checkboxes[i].value);
                        this.setState({stateIds: statesID})
                    }
                } else {
                    checkboxes[i].checked = false;
                    this.setState({stateIds: []});
                }
            }
        }
    }
    handleCheck = (event) => {
        let selectedStateValue = event.target.value;
        let checkedValueIndex = this.state.stateIds.indexOf(selectedStateValue);
        if(event.target.checked) {
            if(checkedValueIndex === -1) {
                this.setState({stateIds: this.state.stateIds.concat(selectedStateValue)})
            }
        } else {
            if(checkedValueIndex !== -1) {
                this.setState({stateIds: this.state.stateIds.filter(item => item !== selectedStateValue)});
            }
        }
    }

    deleteState = (stateID, state_name) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete this "'+state_name+'" state.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.deleteStateByID(stateID)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    bulkDeleteStates = () => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete selected state.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.deleteBulkState(this.state)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    enableDisableStates = (status) => {
        let msg = "";
        if(status == 1) {
            msg = 'Are you sure to enable selected states.';
        } else {
            msg = 'Are you sure to disable selected states.';
        }
        confirmAlert({
            title: 'Confirm',
            message: msg,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.bulkStatusChangeState(this.state)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    enableDisableState = (status, id, state_name) => {
        let msg = "";
        if(status == 1) {
            msg = 'Are you sure to enable state "'+state_name+'".';
        } else {
            msg = 'Are you sure to disable state "'+state_name+'".';
        }
        confirmAlert({
            title: 'Confirm',
            message: msg,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.changeStateStatus(id, status)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    };

    render() {
        return (
            <section id="StatesList">
                {this.state.loader == true ? <Loader /> : <div>
                <h4 className="mt-4 pt-5">
                    Users List
                </h4>
                <div>
                    {JSON.stringify(this.state)}
                </div>
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        /* onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal} */
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <h2>Edit State</h2>
                        <button onClick={() => this.setState({modalIsOpen: false})}>close</button>
                        <form name="editState" onSubmit={(e) => {e.preventDefault();this.props.editState(this.state);}}>
                            <input type="text" name="state" id="state" value={this.state.state} onChange={(e) => this.setState({state: e.target.value})} />
                            <button className="btn btn-info">Edit</button>
                        </form>
                    </Modal>
                </div>

                <div className="mt-2">
                    <div className="form-group text-right">
                        <input type="text" name="stateSearch" id="stateSearch" placeholder="Search State" onChange={(e) => {this.setState({searchKey: e.target.value});this.handleSearch();}} value={this.state.searchKey} />
                    </div>
                    { this.state.stateIds.length > 0 ? 
                    <div className="btn-group">
                        <button type="button" className="btn btn-danger" onClick={this.bulkDeleteStates}>Delete</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => {this.setState({enableDisableValue: 1}); this.enableDisableStates()}}>Enable</button>
                        <button type="button" className="btn btn-danger" onClick={(e) => {this.setState({enableDisableValue: 2}); this.enableDisableStates()}}>Disable</button>
                    </div>
                   : <div></div> }
                    <table className="table table-hover mt-2">
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="bulkAction" onChange={this.checkAll} /></th>
                                <th>State Name</th>
                                <th>Status</th>
                                <th>Created By</th>
                                <th>Created On</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.settingState.states != undefined && this.props.settingState.states.map(value => {
                                return (
                                    <tr key={value._id}>
                                        <td><input className="stateID" type="checkbox" name="stateIds[]" onChange={(e) => this.handleCheck(e)} value={value._id} /></td>
                                        <td>{value.state_name}</td>
                                        <td>{(value.status == 1) ? <span>Active</span> : <span>Inactive</span>}</td>
                                        <td>{value.created_on}</td>
                                        <td><FontAwesomeIcon icon={faTrashAlt} onClick={() => this.deleteState(value._id, value.state_name)} /></td>
                                        <td><FontAwesomeIcon icon={faPencilAlt} onClick={() => this.setState({stateEditID: value._id, state: value.state_name, modalIsOpen: true})} /></td>
                                        <td>
                                            {(value.status != 1) ? <span><FontAwesomeIcon icon={faCheck} onClick={() => this.enableDisableState(1, value._id, value.state_name)} /></span> : <span><FontAwesomeIcon icon={faTimes} onClick={() => this.enableDisableState(2, value._id, value.state_name)}  /></span>}
                                        </td>
                                    </tr>
                                )
                            })}
                            {this.props.settingState.states != undefined && this.props.settingState.states.length <= 0 && <tr><td colSpan="7" className="text-center">No State found.</td></tr> }
                        </tbody>
                    </table>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(this.props.settingState.total_state / this.state.pageRange)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={this.state.pageRange}
                    onPageChange={this.handlePagination}
                    initialPage={0}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
                </div>
            </div>
            }
            </section>
        )
    }
}

let timer;


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

const mapStateToProps = (state) => {
    return {
        settingState: state.settingState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getStates: (state) => {
            dispatch(getStates(state))
        },
        editState: (state) => {
            dispatch(editState(state))
        },
        deleteStateByID: (stateID) => {
            dispatch(deleteStateByID(stateID))
        },
        deleteBulkState: (state) => {
            dispatch(deleteBulkState(state))
        },
        bulkStatusChangeState: (state) => {
            dispatch(bulkStatusChangeState(state))
        },
        changeStateStatus: (stateID, status) => {
            dispatch(changeStateStatus(stateID, status))
        },
        resetStatesResult: (state) => {
            dispatch(resetStatesResult(state))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatesList);