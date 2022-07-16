import React from 'react';
import AsyncPaginate from 'react-select-async-paginate';
import { getCustomersForSelection } from '../../../../redux/request/apis';

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
    }
    if (search && search !== ''){
        params.search_text = search;
    }
    
    let getCustomersForSelectionResponse = await getCustomersForSelection({ params });
    let customers = getCustomersForSelectionResponse.data;
    let formatOptions = customers.map((customer) => {
        return {
            value: customer.id,
            label: customer.full_name || '',
            display: <div>
                <div><b>Full Name:</b> {customer.full_name || ''}</div>
                <div><b>Mobile:</b> {customer.mobile_phone_number || ''}</div>
                <div><b>Email:</b> {customer.email || ''}</div>
            </div>,
            customer: customer
        }
    });
    return {
        options: formatOptions,
        hasMore: getCustomersForSelectionResponse.total > (prevOptions.length || 0) + 10,
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
                {...rest}
            />
    )
}