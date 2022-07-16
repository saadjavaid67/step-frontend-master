import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseClassesForCourseSchedule } from '../../../../redux/request/actions';
import { Row, Col, Form, Tabs, Select, Skeleton, Empty } from 'antd';
import CourseCategoriesSelect from '../../CourseCategory/components/course-category-select';
import _ from 'lodash';

const TabPane = Tabs.TabPane;
export default function ({ class_id, handleTabChange, ...rest }) {
    const [categoryId, setCategoryId] = useState(undefined);
    const [dayOfWeek, setDayOfWeek] = useState(undefined);
    const [finished, setFinished] = useState('no');
    const dispatch = useDispatch();

    const courseClasses = useSelector(state => state.getCourseClassesForCourseSchedule.data);
    const courseClassesFetched = useSelector(state => state.getCourseClassesForCourseSchedule.dataFetched);
    const courseClassessLoading = useSelector(state => state.getCourseClassesForCourseSchedule.isFetching);

    useEffect(() => {
        if (courseClassesFetched && class_id === undefined && courseClasses.length > 0) {
            handleTabChange(courseClasses[0].id.toString());
        }

        if (courseClassesFetched && class_id !== undefined && courseClasses.length > 0 && _.find(courseClasses, (f) => f.id.toString() === class_id) === undefined) {
            handleTabChange(courseClasses[0].id.toString());
        }
        if (courseClassesFetched && courseClasses.length == 0) {
            handleTabChange(undefined);
        }
    }, [courseClassesFetched, courseClasses, class_id, handleTabChange]);


    useEffect(() => {
        const params = {
            with_model: [],
            type: 'GENERAL',
            category_id: categoryId,
            day_of_week: dayOfWeek,
            finished: finished === "yes" ? 1 : 0
        };
        // handleTabChange(undefined);
        dispatch(getCourseClassesForCourseSchedule({
            params
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, dayOfWeek, finished, handleTabChange]);

    return (
        <Row>
            <Row type="flex" justify="space-between">
                <Col span={7}>
                    <Form.Item label='Category'>
                        <CourseCategoriesSelect style={{ width: '100%' }} allowClear value={categoryId} onChange={setCategoryId} />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item label='Day of week'>
                        <Select style={{ width: '100%' }} allowClear value={dayOfWeek} onChange={setDayOfWeek} >
                            <Select.Option value="monday">Monday</Select.Option>
                            <Select.Option value="tuesday">Tuesday</Select.Option>
                            <Select.Option value="wednesday">Wednesday</Select.Option>
                            <Select.Option value="thursday">Thursday</Select.Option>
                            <Select.Option value="friday">Friday</Select.Option>
                            <Select.Option value="saturday">Saturday</Select.Option>
                            <Select.Option value="sunday">Sunday</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item label='Hide from schedule'>
                        <Select style={{ width: '100%' }} allowClear value={finished} onChange={setFinished}>
                            <Select.Option value={"yes"}>Yes</Select.Option>
                            <Select.Option value={"no"}>No</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            {
                courseClassessLoading ?
                    <Skeleton active /> :
                    <div>
                        {courseClassesFetched && courseClasses.length == 0 ?
                            <Empty description="No class found" /> :
                            <Row type="flex" align="bottom">
                                <Col lg={3} md={24} sm={24}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{ width: '100%', marginBottom: 16 }}
                                        value={class_id}
                                        onChange={handleTabChange}
                                    >
                                        {
                                            courseClassesFetched &&
                                            courseClasses.map((courseClass, index) => {
                                                return (
                                                    <Select.Option key={index} value={courseClass.id.toString()}>{courseClass.name}</Select.Option>
                                                );
                                            })
                                        }
                                    </Select>
                                </Col>
                                <Col lg={21} md={24} sm={24}>
                                    <Tabs
                                        activeKey={class_id}
                                        tabPosition={'top'}
                                        onChange={handleTabChange}
                                    >
                                        {
                                            courseClassesFetched &&
                                            courseClasses.map((courseClass) => {
                                                return (
                                                    <TabPane tab={courseClass.name} key={courseClass.id}>
                                                    </TabPane>
                                                );
                                            })
                                        }
                                    </Tabs>
                                </Col>
                            </Row>
                        }
                    </div>
            }

        </Row>
    )
}
