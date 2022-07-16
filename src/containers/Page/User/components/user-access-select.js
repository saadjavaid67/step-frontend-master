import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersForSelection } from '../../../../redux/request/actions';
import { Transfer } from 'antd';

export default function ({ accessUsers, handleAccessChange, ...rest }) {
    const dispatch = useDispatch();

    //Get Courses Levels
    const teachers = useSelector(state => state.getUsersForSelection.data);
    // const teachersFetched = useSelector(state => state.getUsersForSelection.dataFetched);
    // const teachersLoading = useSelector(state => state.getUsersForSelection.isFetching);
    useEffect(() => {
        dispatch(getUsersForSelection());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const options = teachers ? teachers.map((teacher) => {
        return {
            key: teacher.id.toString(),
            name: teacher.name
        }
    }) : []
    return (
        <>
        <div style={{ marginBottom: 10 }}>User Access Right:</div>
        <Transfer
            showSearch
            dataSource={options}
            titles={['Denied', 'Access']}
            targetKeys={accessUsers}
            onChange={handleAccessChange}
            render={item => item.name}
            style={{ marginBottom: 10 }}
        />
        </>
    )
}