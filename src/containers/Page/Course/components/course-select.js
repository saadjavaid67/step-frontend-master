import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ ...rest }) {
    const dispatch = useDispatch();

    //Get Courses
    const courses = useSelector(state => state.getCoursesForSelection.data);
    const coursesFetched = useSelector(state => state.getCoursesForSelection.dataFetched);
    const coursesLoading = useSelector(state => state.getCoursesForSelection.isFetching);
    useEffect(() => {
        const params = {
            with_model: ["levels"]
        }
        dispatch(getCoursesForSelection({
            params
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            showSearch
            loading={coursesLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                coursesFetched ?
                    courses.map((course) => {
                        return <Option key={`course-${course.id}`} value={course.id}>{course.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}