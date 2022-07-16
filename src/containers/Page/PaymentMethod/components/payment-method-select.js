import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentMethodsForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ ...rest }) {
    const dispatch = useDispatch();

    //Get Payment Methods
    const paymentMethods = useSelector(state => state.getPaymentMethodsForSelection.data);
    const paymentMethodsFetched = useSelector(state => state.getPaymentMethodsForSelection.dataFetched);
    const paymentMethodsLoading = useSelector(state => state.getPaymentMethodsForSelection.isFetching);
    useEffect(() => {
        dispatch(getPaymentMethodsForSelection());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            showSearch
            loading={paymentMethodsLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                paymentMethodsFetched ?
                paymentMethods.map((paymentMethod) => {
                        return <Option key={`payment-method-${paymentMethod.id}`} value={paymentMethod.id}>{paymentMethod.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}