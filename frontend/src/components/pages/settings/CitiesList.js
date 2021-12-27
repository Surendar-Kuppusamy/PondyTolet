import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../Loader';
import { resetCitiesResult, getCities, editCity, deleteCityByID, deleteBulkCity, bulkStatusChangeCity, changeCityStatus } from '../../../actions/settingActions';


Modal.setAppElement('#root');

class CitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            searchKey: '',
            pageRange: 10,
            currentPage: 0,
            modalIsOpen:false,
            cityEditID: '',
            enableDisableValue: 0,
            city: '',
            cityIds: []
        }
        this.handleSearch.bind(this);
        this.handlePagination.bind(this);
        this.checkAll.bind(this);
        this.handleCheck.bind(this);
        this.deleteCity.bind(this);
        this.bulkDeleteCities.bind(this);
        this.enableDisableCities.bind(this);
        this.enableDisableCity.bind(this);
        
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
        if(this.props.settingState.cities_result != undefined && Object.keys(this.props.settingState.cities_result).length != 0) {
            if(this.props.settingState.cities_result.status == 'error') {
                toast.error(this.props.settingState.cities_result.message, {theme: "colored"});
            } else {
                toast.success(this.props.settingState.cities_result.message, {theme: "colored"});
                if(this.props.settingState.cities_result.bulkDelete != undefined && this.props.settingState.cities_result.bulkDelete == 1) {
                    this.setState({cityIds: []});
                }
                this.props.getCities(this.state);
                this.setState({modalIsOpen: false});
                this.props.resetCitiesResult();
            }
        }
    }
    handleSearch() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.setState({loader: true});
            this.props.getCities(this.state);
            this.setState({loader: false});
        }, 800);
    }
    handlePagination = (data) => {
        let selected = data.selected;
        this.setState({currentPage: selected});
        console.log(selected);
        let count = Math.ceil(this.props.settingState.total_city / this.state.pageRange);
        setTimeout(() => {
            this.props.getCities(this.state);
        }, 50);
    }
    checkAll = (event) => {
        var checkboxes = document.getElementsByClassName('cityID');
        console.log(checkboxes);
        for(var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].type == "checkbox") {
                if(event.target.checked) {
                    checkboxes[i].checked = true;
                    let citiesID = this.state.cityIds;
                    if(citiesID.indexOf(checkboxes[i].value) === -1) {
                        citiesID.push(checkboxes[i].value);
                        this.setState({cityIds: citiesID})    
                    }
                } else {
                    checkboxes[i].checked = false;
                    this.setState({cityIds: []});
                }
            }
        }
    }
    handleCheck = (event) => {
        let selectedCityValue = event.target.value;
        let checkedValueIndex = this.state.cityIds.indexOf(selectedCityValue);
        if(event.target.checked) {
            if(checkedValueIndex === -1) {
                this.setState({cityIds: this.state.cityIds.concat(selectedCityValue)})
            }
        } else {
            if(checkedValueIndex !== -1) {
                this.setState({cityIds: this.state.cityIds.filter(item => item !== selectedCityValue)});
            }
        }
    }
    

    deleteCity = (cityID, city_name) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete this "'+city_name+'" city.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.deleteCityByID(cityID)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    bulkDeleteCities = () => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete selected cities.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.deleteBulkCity(this.state)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    enableDisableCities = (status) => {
        let msg = "";
        if(status == 1) {
            msg = 'Are you sure to enable selected cities.';
        } else {
            msg = 'Are you sure to disable selected cities.';
        }
        confirmAlert({
            title: 'Confirm',
            message: msg,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.bulkStatusChangeCity(this.state)
              },
              {
                label: 'No',
                onClick: () => console.log('Cancelled')
              }
            ]
        });
    }

    enableDisableCity = (status, id, city_name) => {
        let msg = "";
        if(status == 1) {
            msg = 'Are you sure to enable city "'+city_name+'".';
        } else {
            msg = 'Are you sure to disable city "'+city_name+'".';
        }
        confirmAlert({
            title: 'Confirm',
            message: msg,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.changeCityStatus(id, status)
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
            <section id="CitiesList">
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
                        <h2>Edit City</h2>
                        <button onClick={() => this.setState({modalIsOpen: false})}>close</button>
                        <form name="editCity" onSubmit={(e) => {e.preventDefault();this.props.editCity(this.state);}}>
                            <input type="text" name="city" id="city" value={this.state.city} onChange={(e) => this.setState({city: e.target.value})} />
                            <button className="btn btn-info">Edit</button>
                        </form>
                    </Modal>
                </div>

                <div className="mt-2">
                    <div className="form-group text-right">
                        <input type="text" name="citySearch" id="citySearch" placeholder="Search City" onChange={(e) => {this.setState({searchKey: e.target.value});this.handleSearch();}} value={this.state.searchKey} />
                    </div>
                    { this.state.cityIds.length > 0 ? 
                    <div className="btn-group">
                        <button type="button" className="btn btn-danger" onClick={this.bulkDeleteCities}>Delete</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => {this.setState({enableDisableValue: 1}); this.enableDisableCities(1)}}>Enable</button>
                        <button type="button" className="btn btn-danger" onClick={(e) => {this.setState({enableDisableValue: 2}); this.enableDisableCities(2)}}>Disable</button>
                    </div>
                   : <div></div> }
                    <table className="table table-hover mt-2">
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="bulkAction" onChange={this.checkAll} /></th>
                                <th>City Name</th>
                                <th>Status</th>
                                <th>Created By</th>
                                <th>Created On</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.settingState.cities != undefined && this.props.settingState.cities.map(value => {
                                return (
                                    <tr key={value._id}>
                                        <td><input className="cityID" type="checkbox" name="cityIds[]" onChange={(e) => this.handleCheck(e)} value={value._id} /></td>
                                        <td>{value.city_name}</td>
                                        <td>{(value.status == 1) ? <span>Active</span> : <span>Inactive</span>}</td>
                                        <td>{value.created_on}</td>
                                        <td><FontAwesomeIcon icon={faTrashAlt} onClick={() => this.deleteCity(value._id, value.city_name)} /></td>
                                        <td><FontAwesomeIcon icon={faPencilAlt} onClick={() => this.setState({cityEditID: value._id, city: value.city_name, modalIsOpen: true})} /></td>
                                        <td>
                                            {(value.status != 1) ? <span><FontAwesomeIcon icon={faCheck} onClick={() => this.enableDisableCity(1, value._id, value.city_name)} /></span> : <span><FontAwesomeIcon icon={faTimes} onClick={() => this.enableDisableCity(2, value._id, value.city_name)}  /></span>}
                                        </td>
                                    </tr>
                                )
                            })}
                            {this.props.settingState.cities != undefined && this.props.settingState.cities.length <= 0 && <tr><td colSpan="7" className="text-center">No City found.</td></tr> }
                        </tbody>
                    </table>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(this.props.settingState.total_city / this.state.pageRange)}
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
        getCities: (state) => {
            dispatch(getCities(state))
        },
        editCity: (state) => {
            dispatch(editCity(state))
        },
        deleteCityByID: (cityID) => {
            dispatch(deleteCityByID(cityID))
        },
        deleteBulkCity: (state) => {
            dispatch(deleteBulkCity(state))
        },
        bulkStatusChangeCity: (state) => {
            dispatch(bulkStatusChangeCity(state))
        },
        changeCityStatus: (cityID, status) => {
            dispatch(changeCityStatus(cityID, status))
        },
        resetCitiesResult: (state) => {
            dispatch(resetCitiesResult(state))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);