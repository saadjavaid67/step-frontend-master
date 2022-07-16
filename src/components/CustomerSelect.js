import React, { Component } from 'react';
import { connect } from "react-redux";
import AsyncPaginate from 'react-select-async-paginate';
import { getAllCustomer } from '../redux/request/actions';
import _ from 'lodash';

class CustomerSelect extends Component {
    state = {

    }

    componentDidMount() {
        const { getAllCustomer } = this.props;
        let params = {
            page: 1,
            sort: "full_name asc"
        }
        getAllCustomer({ params });
    }

    loadOptions = async (search, prevOptions) => {
        let { getAllCustomerResponse } = this.props;
        let customers = getAllCustomerResponse.data;
        let searchOptions = search && search !== "" ? _.filter(customers, function (o) {
            return o.display_name.toLowerCase().includes(search.toLowerCase());
        }) : customers;

        let slicedOptions = searchOptions.slice(prevOptions.length, (prevOptions.length || 0) + 10);
        let formatOptions = slicedOptions.map((option) => {
            return {
                value: option.id,
                label: option.full_name
            }
        });
        return {
            options: formatOptions,
            hasMore: searchOptions.length > (prevOptions.length || 0) + 10,
        };
    };

    render() {
        const selectStyles = {
            container: (base, state) => ({
                ...base,
                zIndex: "999"
            }),
            input: base => ({
                ...base,
                lineHeight: '20px',
                '& input': {
                    font: 'inherit',
                },
            }),
            option: (provided, state) => ({
                ...provided,
                borderBottom: '1px solid #888888',
                padding: 0,
                paddingLeft: 10,
                paddingRight: 10
            }),
        };
        return (
            <AsyncPaginate
                value={this.props.selectedValue}
                loadOptions={this.loadOptions}
                onChange={this.props.onSelectChange}
                isLoading={this.props.getAllCustomerLoading}
                styles={selectStyles}
            />
        );
    }
}

export default connect(
    state => ({
        getAllCustomerLoading: state.getAllCustomer.loading,
        getAllCustomerResponse: state.getAllCustomer.data,
    }),
    {
        getAllCustomer,
    }
)(CustomerSelect);
