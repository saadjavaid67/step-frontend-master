import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPriceGroupsForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ ...rest }) {
    const dispatch = useDispatch();

    //Get Price Groups
    const priceGroups = useSelector(state => state.getPriceGroupsForSelection.data);
    const priceGroupsFetched = useSelector(state => state.getPriceGroupsForSelection.dataFetched);
    const priceGroupsLoading = useSelector(state => state.getPriceGroupsForSelection.isFetching);
    useEffect(() => {
        dispatch(getPriceGroupsForSelection());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            showSearch
            loading={priceGroupsLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                priceGroupsFetched ?
                priceGroups.map((priceGroup) => {
                        return <Option key={`price-group-${priceGroup.id}`} value={priceGroup.id}>{priceGroup.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}