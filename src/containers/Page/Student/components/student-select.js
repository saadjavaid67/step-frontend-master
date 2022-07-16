import React from 'react';
import AsyncPaginate from 'react-select-async-paginate';
import { getStudentsForSelection } from '../../../../redux/request/apis';

const CustomOption = ({ innerProps, isDisabled, data }) => {
    return !isDisabled ? (
        <div {...innerProps} className={'ant-select-dropdown-menu-item'} style={{
            borderBottom: '1px solid #e8e8e8',
            padding: 10,
            paddingLeft: 10,
            paddingRight: 10,
        }}>{data.display}</div>
    ) : null;
}

async function loadOptions(search, prevOptions) {
    let params = {
        size: 10,
        page: prevOptions.length / 10 + 1,
        sort: "full_name asc",
        with_model: ['customer', 'emergency_contacts']
    }
    if (search && search !== '') {
        params.search_text = search;
    }

    let getStudentsForSelectionResponse = await getStudentsForSelection({ params });
    let students = getStudentsForSelectionResponse.data;
    let formatOptions = students.map((student) => {
        return {
            value: student.id,
            label: student.full_name || '',
            display: <div>
                <div><b>Full Name:</b> {student.full_name || ''}</div>
                <div><b>Birthday:</b> {student.birthday || ''}</div>
                <div><b>Parent Full Name:</b> {student.customer.full_name || ''}</div>
                <div><b>Parent Phone Number:</b> {student.customer.mobile_phone_number || ''}</div>
            </div>,
            student: student
        }
    });
    return {
        options: formatOptions,
        hasMore: getStudentsForSelectionResponse.total > (prevOptions.length || 0) + 10,
    };
};

export default function ({ isDisabled, selectedValue, onSelectChange, ...rest }) {
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
            isDisabled={isDisabled}
            value={selectedValue}
            loadOptions={loadOptions}
            onChange={onSelectChange}
            styles={selectStyles}
            components={{ Option: CustomOption }}
            allowClear
        />
    )
}
