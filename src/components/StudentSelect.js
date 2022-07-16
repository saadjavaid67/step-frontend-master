import React, { Component } from 'react';
import { connect } from "react-redux";
import AsyncPaginate from 'react-select-async-paginate';
import { getAllStudent } from '../redux/request/apis';

const CustomOption = ({ innerProps, isDisabled, data }) => {
    return !isDisabled ? (
        <div {...innerProps} className={'ant-select-dropdown-menu-item'} style={{
            borderBottom: '1px solid #888888',
            padding: 10,
            paddingLeft: 10,
            paddingRight: 10,
        }}>{data.display}</div>
    ) : null;
}

class StudentSelect extends Component {
    state = {

    }

    loadOptions = async (search, prevOptions) => {
        let params = {
            size: 10,
            page: prevOptions.length / 10 + 1,
            sort: "display_name asc",
            keyword: search
        }
        let getAllStudentResponse = await getAllStudent({ params });
        let students = getAllStudentResponse.data;
        console.log(students);
        let formatOptions = students.map((option) => {
            return {
                value: option.id,
                label: option.full_name || '',
                display: <div>
                    <div><b>Full Name:</b> {option.full_name || ''}</div>
                    <div><b>Birthday:</b> {option.birthday || ''}</div>
                    <div><b>Parent Full Name:</b> {option.customer.full_name || ''}</div>
                    <div><b>Parent Phone Number:</b> {option.customer.mobile_phone_number || ''}</div>
                </div>,
                student: option
            }
        });
        return {
            options: formatOptions,
            hasMore: getAllStudentResponse.total > (prevOptions.length || 0) + 10,
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
                paddingRight: 10,
            }),
        };
        return (
            <AsyncPaginate
                isDisabled={this.props.isDisabled}
                value={this.props.selectedValue}
                loadOptions={this.loadOptions}
                onChange={this.props.onSelectChange}
                isLoading={this.props.getAllStudentLoading}
                styles={selectStyles}
                components={{ Option: CustomOption }}
            />
        );
    }
}

export default connect(
    state => ({
    }),
    {
    }
)(StudentSelect);
