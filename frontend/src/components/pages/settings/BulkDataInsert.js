import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useHistory } from 'react-router';
import { CUSTOM_STYLES, BULK_DATA_INSERT_TYPES } from '../../../config/globalConstant';
import LoadingIndicator from '../common/LoadingIndicator';
import Loader from '../../Loader';
import { getAllOptions } from '../../../actions/assetActions';
import { bulkInsert, createSingleOption, dynamicOptionMerge, resetResult } from '../../../actions/settingActions';
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
            bulk_loader:false,
            loader: false
        }

        this.onSelectDataType.bind(this);
        this.onSelectOptions.bind(this);
        this.handleBulkData.bind(this);
        this.insertBulkData.bind(this);
        this.toUniqueArray.bind(this);
        
    }
    componentDidUpdate() {
        if(this.props.settingState.bulk_result != undefined && Object.keys(this.props.settingState.bulk_result).length != 0) {
            if(this.props.settingState.bulk_result.status == 'error') {
                toast.error(this.props.settingState.bulk_result.message, {theme: "colored"});
            } else {
                if(this.props.settingState.bulk_result.result != undefined) {
                    let pushValue = {
                        option: {
                            label: this.props.settingState.bulk_result.result.city_name,
                            value: this.props.settingState.bulk_result.result._id
                        },
                        fieldType: this.state.type_of_data_to_insert
                    };
                    this.props.dynamicOptionMerge(pushValue);
                    this.setState({default_type_option: pushValue.option});
                }
                toast.success(this.props.settingState.bulk_result.message, {theme: "colored"});
            }
            this.props.resetResult();
        }
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
            let option = value.value;
            this.props.createSingleOption(this.state.type_of_data_to_insert, option, this.state);
        } else {
            this.setState({default_type_option: value});
        }
    };
    handleBulkData(e) {
        this.setState({error_msg: ''});
        this.setState({bulk_data: e.target.value});
    }
    insertBulkData(e) {
        e.preventDefault();
        if(this.state.bulk_data == "") {
            this.setState({error_msg: 'Data Required'});
        } else {
            this.setState({error_msg: ''});
            let bulkData = this.state.bulk_data;
            bulkData = bulkData.trim();
            bulkData = bulkData.split(",");
            bulkData = this.toUniqueArray(bulkData);
            setTimeout(() => {
                this.props.bulkInsert(this.state.type_of_data_to_insert, bulkData, this.state);
            }, 50)
        }
    }
    toUniqueArray(a){
        var newArr = [];
        for (var i = 0; i < a.length; i++) {
            if (newArr.indexOf(a[i].trim()) === -1 && a[i].trim() != "") {
                newArr.push(a[i].trim());
            }
        }
      return newArr;
    }
    render() {
        
        return (
            <section id="BulkDataInsert">
                {this.state.loader == true ? <Loader /> : <div>
                        <h4 className="mt-4 pt-5">
                            Bulk Data Insert
                        </h4>
                        <div>
                            {JSON.stringify(this.state)}
                        </div>
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
                                    <CreatableSelect isLoading={this.state.bulk_loader} formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} createOptionPosition="first" className="basic-single" classNamePrefix="select" id="who_can_contact" name="who_can_contact" options={this.state.type_options} createOptionPosition={"first"} onChange={(value, actionMeta) => this.onSelectOptions(value, actionMeta)} /* defaultValue={this.state.default_type_option} */ value={this.state.default_type_option} components={{LoadingIndicator}} styles={CUSTOM_STYLES} />
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
                        
                    </div>
                }
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
        bulkInsert: (field, bulkValues, state) => {
            dispatch(bulkInsert(field, bulkValues, state))
        },
        createSingleOption: (field, option, state) => {
            dispatch(createSingleOption(field, option, state))
        },
        dynamicOptionMerge: (pushValue) => {
            dispatch(dynamicOptionMerge(pushValue))
        },
        resetResult: () => {
            dispatch(resetResult())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkDataInsert);