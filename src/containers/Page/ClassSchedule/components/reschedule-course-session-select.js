import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseSessionsForReschedule } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ course_class_id, ...rest }) {
    const dispatch = useDispatch();

    //Get Courses Sessions
    const courseSessions = useSelector(state => state.getCourseSessionsForReschedule.data);
    const courseSessionsFetched = useSelector(state => state.getCourseSessionsForReschedule.dataFetched);
    const courseSessionsLoading = useSelector(state => state.getCourseSessionsForReschedule.isFetching);
    useEffect(() => {
        const params = {
            course_class_id: course_class_id
          };
        dispatch(getCourseSessionsForReschedule({ params }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course_class_id]);

    return (
        <Select
            showSearch
            loading={courseSessionsLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                courseSessionsFetched ?
                courseSessions.map((courseSession) => {
                        return <Option key={`course-session-${courseSession.id}`} value={courseSession.id}>{courseSession.start_date}</Option>
                    })
                    : []
            }
        </Select>
    )
}
