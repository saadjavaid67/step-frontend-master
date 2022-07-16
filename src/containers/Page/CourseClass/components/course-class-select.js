import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseClassesForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ type, ...rest }) {
    const dispatch = useDispatch();

    //Get Courses Classes
    const courseClasses = useSelector(state => state.getCourseClassesForSelection.data);
    const courseClassesFetched = useSelector(state => state.getCourseClassesForSelection.dataFetched);
    const courseClassesLoading = useSelector(state => state.getCourseClassesForSelection.isFetching);
    useEffect(() => {
        const params = {
            with_model: ['price_group.details'],
            sort_by: type,
            hideDisable: true,
          };
        dispatch(getCourseClassesForSelection({ params }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            showSearch
            loading={courseClassesLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                courseClassesFetched ?
                    courseClasses.map((courseClass) => {
                        return <Option key={`course-class-${courseClass.id}`} value={courseClass.id}>{courseClass.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}
