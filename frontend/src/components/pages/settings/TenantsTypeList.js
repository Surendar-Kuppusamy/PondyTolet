import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../Loader';
import { resetTenantsResult, getTenants, editTenant, deleteTenantByID, deleteBulkTenant, bulkStatusChangeTenant, changeTenantStatus } from '../../../actions/settingActions';


Modal.setAppElement('#root');

class TenantsTypeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            searchKey: '',
            pageRange: 10,
            currentPage: 0,
            modalIsOpen:false,
            tenantEditID: '',
            enableDisableValue: 0,
            tenant: '',
            tenantIds: []
        }
        this.handleSearch.bind(this);
        this.handlePagination.bind(this);
        this.checkAll.bind(this);
        this.handleCheck.bind(this);
        this.deleteTenant.bind(this);
        this.bulkDeleteTenants.bind(this);
        this.enableDisableTenants.bind(this);
        this.enableDisableTenant.bind(this);
        
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
        if(this.props.settingState.tenants_result != undefined && Object.keys(this.props.settingState.tenants_result).length != 0) {
            if(this.props.settingState.tenants_result.status == 'error') {
                toast.error(this.props.settingState.tenants_result.message, {theme: "colored"});
            } else {
                toast.success(this.props.settingState.tenants_result.message, {theme: "colored"});
                if(this.props.settingState.tenants_result.bulkDelete != undefined && this.props.settingState.tenants_result.bulkDelete == 1) {
                    this.setState({tenantIds: []});
                }
                this.props.getTenants(this.state);
                this.setState({modalIsOpen: false});
                this.props.resetTenantsResult();
            }
        }
    }
    handleSearch() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.setState({loader: true});
            this.props.getTenants(this.state);
            this.setState({loader: false});
        }, 800);
    }
    handlePagination = (data) => {
        let selected = data.selected;
        this.setState({currentPage: selected});
        console.log(selected);
        let count = Math.ceil(this.props.settingState.total_tenant / this.state.pageRange);
        setTimeout(() => {
            this.props.getTenants(this.state);
        }, 50);
    }
    checkAll = (event) => {
        var checkboxes = document.getElementsByClassName('tenantID');
        console.log(checkboxes);
        for(var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].type == "checkbox") {
                if(event.target.checked) {
                    checkboxes[i].checked = true;
                    let tenantsID = this.state.tenantIds;
                    if(tenantsID.indexOf(checkboxes[i].value) === -1) {
                        tenantsID.push(checkboxes[i].value);
                        this.setState({tenantIds: tenantsID})
                    }
                } else {
                    checkboxes[i].checked = false;
                    this.setState({tenantIds: []});
                }
            }
        }
    }
    handleCheck = (event) => {
        let selectedTenantValue = event.target.value;
        let checkedValueIndex = this.state.tenantIds.indexOf(selectedTenantValue);
        if(event.target.checked) {
            if(checkedValueIndex === -1) {
                this.setState({tenantIds: this.state.tenantIds.concat(selectedTenantValue)})
            }
        } else {
            if(checkedValueIndex !== -1) {
                this.setState({tenantIds: this.state.tenantIds.filter(item => item !== selectedTenantValue)});
            }
        }
    }

    deleteTenant = (tenantID, tenant_type) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete this "'+tenant_type+'" state.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.deleteTenantByID(tenantID)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    bulkDeleteTenants = () => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete selected tenant type.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.deleteBulkTenant(this.state)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    enableDisableTenants = (status) => {
        let msg = "";
        if(status == 1) {
            msg = 'Are you sure to enable selected tenant type.';
        } else {
            msg = 'Are you sure to disable selected tenant type.';
        }
        confirmAlert({
            title: 'Confirm',
            message: msg,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.bulkStatusChangeTenant(this.state)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    enableDisableTenant = (status, id, tenant_type) => {
        let msg = "";
        if(status == 1) {
            msg = 'Are you sure to enable tenant type "'+tenant_type+'".';
        } else {
            msg = 'Are you sure to disable tenant type "'+tenant_type+'".';
        }
        confirmAlert({
            title: 'Confirm',
            message: msg,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.changeTenantStatus(id, status)
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
            <section id="TenantsList">
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
                        <form name="editTenant" onSubmit={(e) => {e.preventDefault();this.props.editTenant(this.state);}}>
                            <input type="text" name="tenant" id="tenant" value={this.state.tenant} onChange={(e) => this.setState({tenant: e.target.value})} />
                            <button className="btn btn-info">Edit</button>
                        </form>
                    </Modal>
                </div>

                <div className="mt-2">
                    <div className="form-group text-right">
                        <input type="text" name="tenantSearch" id="tenantSearch" placeholder="Search Tenant type" onChange={(e) => {this.setState({searchKey: e.target.value});this.handleSearch();}} value={this.state.searchKey} />
                    </div>
                    { this.state.tenantIds.length > 0 ? 
                    <div className="btn-group">
                        <button type="button" className="btn btn-danger" onClick={this.bulkDeleteTenants}>Delete</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => {this.setState({enableDisableValue: 1}); this.enableDisableTenants()}}>Enable</button>
                        <button type="button" className="btn btn-danger" onClick={(e) => {this.setState({enableDisableValue: 2}); this.enableDisableTenants()}}>Disable</button>
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
                            { this.props.settingState.tenants != undefined && this.props.settingState.tenants.map(value => {
                                return (
                                    <tr key={value._id}>
                                        <td><input className="tenantID" type="checkbox" name="tenantIds[]" onChange={(e) => this.handleCheck(e)} value={value._id} /></td>
                                        <td>{value.tenant_type}</td>
                                        <td>{(value.status == 1) ? <span>Active</span> : <span>Inactive</span>}</td>
                                        <td>{value.created_on}</td>
                                        <td><FontAwesomeIcon icon={faTrashAlt} onClick={() => this.deleteTenant(value._id, value.tenant_type)} /></td>
                                        <td><FontAwesomeIcon icon={faPencilAlt} onClick={() => this.setState({tenantEditID: value._id, tenant: value.tenant_type, modalIsOpen: true})} /></td>
                                        <td>
                                            {(value.status != 1) ? <span><FontAwesomeIcon icon={faCheck} onClick={() => this.enableDisableTenant(1, value._id, value.tenant_type)} /></span> : <span><FontAwesomeIcon icon={faTimes} onClick={() => this.enableDisableTenant(2, value._id, value.tenant_type)}  /></span>}
                                        </td>
                                    </tr>
                                )
                            })}
                            {this.props.settingState.tenants != undefined && this.props.settingState.tenants.length <= 0 && <tr><td colSpan="7" className="text-center">No tenant type found.</td></tr> }
                        </tbody>
                    </table>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(this.props.settingState.total_tenant / this.state.pageRange)}
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
        getTenants: (state) => {
            dispatch(getTenants(state))
        },
        editTenant: (state) => {
            dispatch(editTenant(state))
        },
        deleteTenantByID: (tenantID) => {
            dispatch(deleteTenantByID(tenantID))
        },
        deleteBulkTenant: (state) => {
            dispatch(deleteBulkTenant(state))
        },
        bulkStatusChangeTenant: (state) => {
            dispatch(bulkStatusChangeTenant(state))
        },
        changeTenantStatus: (tenantID, status) => {
            dispatch(changeTenantStatus(tenantID, status))
        },
        resetTenantsResult: (state) => {
            dispatch(resetTenantsResult(state))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TenantsTypeList);