import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicationsForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ student_id, ...rest }) {
    const dispatch = useDispatch();

    const applications = useSelector(state => state.getApplicationsForSelection.data);
    const applicationsFetched = useSelector(state => state.getApplicationsForSelection.dataFetched);
    const applicationsLoading = useSelector(state => state.getApplicationsForSelection.isFetching);
    useEffect(() => {
        const params = {
            with_model: ['class'],
            student_id: student_id,
            status: 'RESERVED',
            invoiced: true
          };
        dispatch(getApplicationsForSelection({
            params
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [student_id]);

    return (
        <Select
            showSearch
            loading={applicationsLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                applicationsFetched ?
                applications.map((application) => {
                        return <Option key={`application-${application.id}`} value={application.id}>{application.class.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}
