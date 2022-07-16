import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ ...rest }) {
    const dispatch = useDispatch();

    //Get Courses Levels
    const teachers = useSelector(state => state.getUsersForSelection.data);
    const teachersFetched = useSelector(state => state.getUsersForSelection.dataFetched);
    const teachersLoading = useSelector(state => state.getUsersForSelection.isFetching);
    useEffect(() => {
        dispatch(getUsersForSelection());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            showSearch
            loading={teachersLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                teachersFetched ?
                teachers.map((teacher) => {
                        return <Option key={`teacher-${teacher.id}`} value={teacher.id}>{teacher.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}