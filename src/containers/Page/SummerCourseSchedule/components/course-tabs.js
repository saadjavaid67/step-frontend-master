import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummerCoursesForSchedule } from '../../../../redux/request/actions';
import { Row, Col, Form, Tabs, Select, Skeleton, Empty, DatePicker, Button } from 'antd';
import CourseCategoriesSelect from '../../CourseCategory/components/course-category-select';
import TeacherSelect from '../../User/components/teacher-select';
import StudentSelect from '../../Student/components/student-select';
import SummerCourseClassSelect from './course-class-select';
import _ from 'lodash';
import moment from 'moment';
import { dateToAPIString, } from '../../../../helpers/dateUtil';

const TabPane = Tabs.TabPane;
export default function ({ filter, handleFilterChange, handleTabChange, selectedCourseId, ...rest }) {
    const dispatch = useDispatch();

    const courses = useSelector(state => state.getSummerCoursesForSchedule.data);
    const coursesFetched = useSelector(state => state.getSummerCoursesForSchedule.dataFetched);
    const coursesLoading = useSelector(state => state.getSummerCoursesForSchedule.isFetching);

    useEffect(() => {
        const params = {
        };
        dispatch(getSummerCoursesForSchedule({
            params
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleTabChange]);

    return (
        <Row>
            <Row type="flex" justify="space-between">
                <Col span={7}>
                    <Form.Item label='Day of week'>
                        <Select
                            key='dayOfWeek'
                            value={filter.dayOfWeek}
                            style={{ width: '100%' }}
                            allowClear
                            onChange={(value) => handleFilterChange(value, 'dayOfWeek')}
                        >
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
                    <Form.Item label='Start Date'>
                        <DatePicker
                            key='startDate'
                            format={'YYYY-MM-DD'}
                            style={{ width: '100%' }}
                            allowClear
                            onChange={(value) => handleFilterChange(value ? value.format("YYYY-MM-DD") : undefined, 'startDate')}
                        />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item label='End Date'>
                        <DatePicker
                            key='endDate'
                            format={'YYYY-MM-DD'}
                            style={{ width: '100%' }}
                            allowClear
                            onChange={(value) => handleFilterChange(value ? value.format("YYYY-MM-DD"): undefined, 'endDate')}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span={7}>
                  <Form.Item label='Class Name'>
                      <SummerCourseClassSelect
                          key='className'
                          value={filter.className}
                          style={{width: '100%'}}
                          selectedCourseId={selectedCourseId}
                          allowClear
                          onChange={(value) => handleFilterChange(value, 'className')}
                          type='SUMMER_COURSE'
                      />
                  </Form.Item>
              </Col>
              <Col span={7}>
                  <Form.Item label='Teacher'>
                      <TeacherSelect
                          key='teacher'
                          value={filter.teacher}
                          style={{width: '100%'}}
                          allowClear
                          onChange={(value) => handleFilterChange(value, 'teacher')}
                      />
                  </Form.Item>
              </Col>
              <Col span={7}>
                  <Form.Item label='Student'>
                      <div style={{ display: 'flex', alignItems: 'center'}}>
                          <div style={{ flex: 1 }}>
                            <StudentSelect
                                key='student'
                                selectedValue={filter.student ? undefined : ''}
                                style={{ width: '100%' }}
                                allowClear
                                onSelectChange={(value) => handleFilterChange(value.student.id, 'student')}
                            />
                          </div>
                          {
                            filter.student && (
                              <Button icon="close" style={{ marginRight: 3, marginBottom: 3 }} onClick={() => handleFilterChange(undefined, 'student')} />
                            )
                          }
                      </div>
                  </Form.Item>
              </Col>
            </Row>
            {
                coursesLoading
                    ? <Skeleton active />
                    : <div>
                        {coursesFetched && courses.length == 0 ?
                            <Empty description="No Course found" /> :
                            <Row type="flex" align="bottom">
                                <Col lg={3} md={24}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{ width: '100%', marginBottom: 16 }}
                                        value={selectedCourseId}
                                        onChange={handleTabChange}
                                    >
                                        {
                                            coursesFetched &&
                                            courses.map((course, index) => {
                                                return (
                                                    <Select.Option key={index} value={course.id.toString()}>{course.name}</Select.Option>
                                                );
                                            })
                                        }
                                    </Select>
                                </Col>
                                <Col lg={21} md={24}>
                                    <Tabs
                                        activeKey={selectedCourseId}
                                        tabPosition={'top'}
                                        onChange={handleTabChange}
                                    >
                                        {
                                            coursesFetched &&
                                            courses.map((course) => {
                                                return (
                                                    <TabPane tab={course.name} key={course.id}>
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
