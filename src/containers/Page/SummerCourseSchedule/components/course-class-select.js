import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSummerCourseSchedule } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ selectedCourseId, ...rest }) {
    const dispatch = useDispatch();

    //Get Courses Classes
    const summerCourseClasses = useSelector(state => state.getAllSummerCourseSchedule.data);
    const summerCourseClassesFetched = useSelector(state => state.getAllSummerCourseSchedule.dataFetched);
    const summerCourseClassesLoading = useSelector(state => state.getAllSummerCourseSchedule.isFetching);

    useEffect(() => {
        const params = {
            course_id: selectedCourseId
        };
        dispatch(getAllSummerCourseSchedule({ params }));
    }, [selectedCourseId]);

    return (
        <Select
            showSearch
            loading={summerCourseClassesLoading}
            filterOption={true}
            {...rest}
        >
            {
                summerCourseClassesFetched &&
                summerCourseClasses.map((summerClass) => (
                    <Option key={`summer-class-${summerClass.id}`} value={summerClass.name}>{summerClass.name}</Option>
                ))
            }
        </Select>
    )
}
