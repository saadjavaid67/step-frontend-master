import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseLevelsForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ course_id, ...rest }) {
    const dispatch = useDispatch();

    //Get Courses Levels
    const courseLevels = useSelector(state => state.getCourseLevelsForSelection.data);
    const courseLevelsFetched = useSelector(state => state.getCourseLevelsForSelection.dataFetched);
    const courseLevelsLoading = useSelector(state => state.getCourseLevelsForSelection.isFetching);
    console.log(course_id);
    useEffect(() => {
        const params = {
            course_id: course_id
          };
        dispatch(getCourseLevelsForSelection({
            params
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course_id]);

    return (
        <Select
            showSearch
            loading={courseLevelsLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                courseLevelsFetched ?
                    courseLevels.map((level) => {
                        return <Option key={`level-${level.id}`} value={level.id}>{level.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}