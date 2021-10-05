import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useSelector, useDispatch, connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { CUSTOM_STYLES, BULK_DATA_INSERT_TYPES } from '../../../config/globalConstant';
import LoadingIndicator from '../common/LoadingIndicator';
import { getAllOptions } from '../../../actions/assetActions';
import { bulkInsert } from '../../../actions/settingActions';
import { bindActionCreators } from 'redux';



class BulkDataInsert extends React.Component {
    constructor(props) {
        super(props);
        
        this.state={
            type_of_data_to_insert: 0,
            type_options: [],
            default_type_option: 0,
            bulk_data: "",
            error_msg: "",
            bulk_loader:false
        }

        this.onSelectDataType.bind(this);
        this.onSelectOptions.bind(this);
        this.handleBulkData.bind(this);
        this.insertBulkData.bind(this);
        
    }
    componentDidMount() {
        this.props.getoptions();
        console.log(this.props.assetState);
        //this.setState({available_options})
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    onSelectDataType(e) {
        this.setState({type_of_data_to_insert: e.value});
        if(e.value == 1) {
            this.setState({type_options: this.props.assetState.alloptions.city_options})
        } else if(e.value == 2) {
            this.setState({type_options: this.props.assetState.alloptions.state_options})
        } else if(e.value == 3) {
            this.setState({type_options: this.props.assetState.alloptions.who_can_contact_options})
        }
    }
    onSelectOptions(value, actionMeta) {
        console.log(value, actionMeta);
        if(actionMeta.action == "create-option" && actionMeta.option.__isNew__) {
            //this.setState({default_type_option: })
        }
    };
    handleBulkData(e) {
        this.setState({error_msg: ''});
        console.log(e.target.value);
        this.setState({bulk_data: e.target.value});
    }
    insertBulkData(e) {
        e.preventDefault();
        if(this.state.bulk_data == "") {
            this.setState({error_msg: 'Data Required'});
        } else {
            this.setState({error_msg: ''});
            const bulkData = this.state.bulk_data.split(",");
            console.log(bulkData);
        }
    }
    render() {
        
        return (
            <section id="BulkDataInsert">
                <h4 className="mt-4 pt-5">
                    Bulk Data Insert
                </h4>
                <form id="bulkDataForm" name="bulkDataForm" onSubmit={e => this.insertBulkData(e)}>
                <div className="my-2">
                    <div className="my-2">
                        Select Data want to insert:
                    </div>
                    <Select isLoading={this.state.bulk_loader} className="basic-single" classNamePrefix="select" id="type_of_data_to_insert" name="type_of_data_to_insert" options={BULK_DATA_INSERT_TYPES} onChange={e => this.onSelectDataType(e)} defaultValue={this.state.type_of_data_to_insert} components={{LoadingIndicator}} styles={CUSTOM_STYLES} />
                    <span id="type_of_data_to_insert_error"></span>
                </div>
                {this.state.type_of_data_to_insert !=0 && 
                    <div>
                        <div className="my-2">
                            <div className="my-2">
                                {BULK_DATA_INSERT_TYPES[(this.state.type_of_data_to_insert - 1)].label}
                            </div>
                            <CreatableSelect isLoading={this.state.bulk_loader} formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} createOptionPosition="first" className="basic-single" classNamePrefix="select" id="who_can_contact" name="who_can_contact" options={this.state.type_options} createOptionPosition={"first"} onChange={(value, actionMeta) => this.onSelectOptions(value, actionMeta)} defaultValue={this.state.default_type_option} components={{LoadingIndicator}} styles={CUSTOM_STYLES} />
                            <span></span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bulk_data" className="form-label">Bulk Data</label>
                            <textarea className="form-control" id="bulk_data" name="bulk_data" rows="3" onChange={e => this.handleBulkData(e)} value={this.bulk_data}></textarea>
                            <span id="bulk_data_error" className="text-danger">{this.state.error_msg}</span>
                        </div>
                        <div>
                            <button className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                }
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        assetState: state.assetState,
        settingState: state.settingState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getoptions: () => {
            dispatch(getAllOptions())
        },
        bulkInsert: () => {
            dispatch(bulkInsert())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkDataInsert);