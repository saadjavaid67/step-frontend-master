import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationsForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ ...rest }) {
    const dispatch = useDispatch();

    //Get Locations
    const locations = useSelector(state => state.getLocationsForSelection.data);
    const locationsFetched = useSelector(state => state.getLocationsForSelection.dataFetched);
    const locationsLoading = useSelector(state => state.getLocationsForSelection.isFetching);
    useEffect(() => {
        dispatch(getLocationsForSelection());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            showSearch
            loading={locationsLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                locationsFetched ?
                locations.map((location) => {
                        return <Option key={`location-${location.id}`} value={location.id}>{location.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}