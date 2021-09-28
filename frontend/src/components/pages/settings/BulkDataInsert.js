import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useSelector, useDispatch, connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { CUSTOM_STYLES, BULK_DATA_INSERT_TYPES } from '../../../config/globalConstant';
import LoadingIndicator from '../common/LoadingIndicator';

class BulkDataInsert extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            type_of_data_to_insert: 0,
            available_options: 0,
            bulk_data: "",
            bulk_loader:false
        }
        
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    onSelectDataType(e) {

    }
    render() {
        return (
            <section id="BulkDataInsert">
                <h4 className="mt-4 pt-5">
                    Bulk Data Insert
                </h4>
                <form id="bulkDataForm" name="bulkDataForm">
                <div className="my-2">
                    <div className="my-2">
                        Select Data want to insert:
                    </div>
                    <Select isLoading={this.state.bulk_loader} className="basic-single" classNamePrefix="select" id="type_of_data_to_insert" name="type_of_data_to_insert" options={BULK_DATA_INSERT_TYPES} onChange={e => this.onSelectDataType(e)} defaultValue={this.state.type_of_data_to_insert} components={{LoadingIndicator}} styles={CUSTOM_STYLES} />
                    <span id="type_of_data_to_insert_error"></span>
                </div>
                </form>
            </section>
        )
    }
}
export default BulkDataInsert;