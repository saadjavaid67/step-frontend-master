import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button, Select, TimePicker, InputNumber, Checkbox, DatePicker, Row, Col } from 'antd';
import { timeToAPIString, timeStringToDate } from '../../../../helpers/dateUtil';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LocationSelect from '../../Location/components/location-select';
import CourseSelect from '../../Course/components/course-select';
import CourseLevelSelect from '../../CourseLevel/components/course-level-select';
import TeacherSelect from '../../User/components/teacher-select';
import PriceGroupSelect from '../../PriceGroup/components/price-group-select';
import UserAccessSelect from '../../User/components/user-access-select';
import moment from 'moment'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { getLocationsForSelection, getCoursesForSelection, getCourseLevelsForSelection, getPriceGroupsForSelection, getUsersForSelection } from '../../../../redux/request/actions';
import basicStyle from '../../../../settings/basicStyle';

const { Option } = Select;
const FormItem = Form.Item;

const Schema = Yup.object().shape({
    location: Yup
        .object()
        .required()
        .label('Location'),
    course: Yup
        .object()
        .required()
        .label('Course'),
    level: Yup
        .object()
        .when('course', {
            is: (val) => val && val.type === "GENERAL",
            then: Yup.object().required()
        })
        .label('Level'),
    price_group: Yup
        .object()
        .required()
        .label('Price Group'),
    name: Yup
        .string()
        .required()
        .label('Name'),
    camp_name: Yup
        .string()
        .nullable()
        .when('course', {
            is: (val) => val && val.type === "SUMMER_COURSE",
            then: Yup.string()
        })
        .label('Camp Name'),
    start_date: Yup
        .date()
        .nullable()
        .when('course', {
            is: (val) => val && val.type === "SUMMER_COURSE",
            then: Yup.date().required()
        })
        .label('Start Date'),
    capacity: Yup
        .number()
        .required()
        .label('Capacity'),
    days_of_week: Yup
        .array()
        .when('course', {
            is: (val) => val && val.type === "GENERAL",
            then: Yup.array().required()
        })
        .label('Days of Week'),
    start_times: Yup
        .object()
        .when('days_of_week', {
            is: (val) => val.length > 0,
            then: Yup.object().required()
        })
        .label('Start Times'),
    durations: Yup
        .object()
        .when('days_of_week', {
            is: (val) => val.length > 0,
            then: Yup.object().required()
        })
        .label('Durations'),
    auto_reserve: Yup
        .boolean()
        .label('Auto Reserve'),
    remark: Yup
        .string()
        .nullable()
        .label('Remark'),
});


export default function ({ values, touched, errors, setFieldValue, setFieldTouched, handleSubmit }) {
    const dispatch = useDispatch();

    const locations = useSelector(state => state.getLocationsForSelection.data);
    const locationsFetched = useSelector(state => state.getLocationsForSelection.dataFetched);
    const locationsLoading = useSelector(state => state.getLocationsForSelection.isFetching);

    const courses = useSelector(state => state.getCoursesForSelection.data);
    const coursesFetched = useSelector(state => state.getCoursesForSelection.dataFetched);
    const coursesLoading = useSelector(state => state.getCoursesForSelection.isFetching);

    const courseLevels = useSelector(state => state.getCourseLevelsForSelection.data);
    const courseLevelsFetched = useSelector(state => state.getCourseLevelsForSelection.dataFetched);
    const courseLevelsLoading = useSelector(state => state.getCourseLevelsForSelection.isFetching);

    const priceGroups = useSelector(state => state.getPriceGroupsForSelection.data);
    const priceGroupsFetched = useSelector(state => state.getPriceGroupsForSelection.dataFetched);
    const priceGroupsLoading = useSelector(state => state.getPriceGroupsForSelection.isFetching);

    const teachers = useSelector(state => state.getUsersForSelection.data);
    const teachersFetched = useSelector(state => state.getUsersForSelection.dataFetched);
    const teachersLoading = useSelector(state => state.getUsersForSelection.isFetching);

    //Get Locations
    useEffect(() => {
        dispatch(getLocationsForSelection());
        dispatch(getCoursesForSelection());
        dispatch(getPriceGroupsForSelection());
        dispatch(getUsersForSelection());
    }, []);


    const courseId = _.get(values, 'course.id')
    useEffect(() => {
        const params = {
            course_id: courseId
        };
        dispatch(getCourseLevelsForSelection({
            params
        }));
    }, [courseId]);

    const handleSelectLocation = (locationId) => {
        const location = _.find(locations, f => f.id === locationId)
        setFieldValue('location', location)
    }

    const handleSelectCourse = (courseId) => {
        const course = _.find(courses, f => f.id === courseId)
        setFieldValue('course', course)
    }

    const handleSelectLevel = (levelId) => {
        const level = _.find(courseLevels, f => f.id === levelId)
        setFieldValue('level', level)
    }

    const handleSelectPriceGroup = (priceGroupId) => {
        const priceGroup = _.find(priceGroups, f => f.id === priceGroupId)
        setFieldValue('price_group', priceGroup)
    }

    const handleSelectTeacher = (teacherId) => {
        const teacher = _.find(teachers, f => f.id === teacherId)
        setFieldValue('teacher', teacher)
    }

    const handlePushStartTimes = (time, day) => {
        const temp = values.start_times;
        temp[day] = time;

        setFieldValue('start_times', temp)
    }

    const handlePushDuration = (duration, day) => {
        const temp = values.durations;
        temp[day] = duration;

        setFieldValue('durations', temp)
    }

    const { rowStyle, colStyle } = basicStyle;

    return (
        <Form onSubmit={handleSubmit}>
            <FormItem
                label={'Location'}
                hasFeedback
                required
                validateStatus={touched.location && errors.location !== undefined ? "error" : ""}
                help={touched.location && errors.location}
            >
                <Select
                    showSearch
                    loading={locationsLoading}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    value={values.location ? values.location.id : ''}
                    onChange={handleSelectLocation}
                    onBlur={() => setFieldTouched('location')}
                >
                    {
                        locationsFetched ?
                            locations.map((location) => {
                                return <Option key={`location-${location.id}`} value={location.id}>{location.name}</Option>
                            })
                            : []
                    }
                </Select>
            </FormItem>
            <FormItem
                label={'Course'}
                hasFeedback
                required
                validateStatus={touched.course && errors.course !== undefined ? "error" : ""}
                help={touched.course && errors.course}
            >
                <Select
                    showSearch
                    loading={coursesLoading}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    value={values.course ? values.course.id : ''}
                    onChange={handleSelectCourse}
                    onBlur={() => setFieldTouched('course')}
                >
                    {
                        coursesFetched ?
                            courses.map((course) => {
                                return <Option key={`course-${course.id}`} value={course.id}>{course.name}</Option>
                            })
                            : []
                    }
                </Select>
            </FormItem>

            {
                values.course && values.course.type === "GENERAL" &&
                <FormItem
                    label='Level'
                    hasFeedback
                    required
                    validateStatus={touched.level && errors.level !== undefined ? "error" : ""}
                    help={touched.level && errors.level}
                >
                    <Select
                        showSearch
                        loading={courseLevelsLoading}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={values.level ? values.level.id : ''}
                        onChange={handleSelectLevel}
                        onBlur={() => setFieldTouched('level')}
                    >
                        {
                            courseLevelsFetched ?
                                courseLevels.map((level) => {
                                    return <Option key={`level-${level.id}`} value={level.id}>{level.name}</Option>
                                })
                                : []
                        }
                    </Select>
                </FormItem>
            }
            <FormItem
                label={'Price Group'}
                hasFeedback
                required
                validateStatus={touched.price_group && errors.price_group !== undefined ? "error" : ""}
                help={touched.price_group && errors.price_group}
            >
                <Select
                    showSearch
                    loading={priceGroupsLoading}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    value={values.price_group ? values.price_group.id : ''}
                    onChange={handleSelectPriceGroup}
                    onBlur={() => setFieldTouched('price_group')}
                >
                    {
                        priceGroupsFetched ?
                            priceGroups.map((priceGroup) => {
                                return <Option key={`price-group-${priceGroup.id}`} value={priceGroup.id}>{priceGroup.name}</Option>
                            })
                            : []
                    }
                </Select>
            </FormItem>
            <FormItem
                label={"Code"}
                required
                validateStatus={touched.name && errors.name !== undefined ? "error" : ""}
                help={touched.name && errors.name}
            >
                <Input
                    value={values.name}
                    onChange={(event) => setFieldValue('name', event.target.value)}
                    onBlur={() => setFieldTouched('name')}
                />
            </FormItem>
            {
                values.course && values.course.type === "SUMMER_COURSE" &&
                <FormItem
                    label='Camp Name'
                    validateStatus={touched.camp_name && errors.camp_name !== undefined ? "error" : ""}
                    help={touched.camp_name && errors.camp_name}
                >
                    <Input
                        value={values.camp_name}
                        onChange={(event) => setFieldValue('camp_name', event.target.value)}
                        onBlur={() => setFieldTouched('camp_name')}
                    />
                </FormItem>
            }
            <FormItem
                label={'Teacher'}
                hasFeedback
                validateStatus={touched.teacher && errors.teacher !== undefined ? "error" : ""}
                help={touched.teacher && errors.teacher}
            >
                <Select
                    showSearch
                    loading={teachersLoading}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    value={values.teacher ? values.teacher.id : ''}
                    onChange={handleSelectTeacher}
                    onBlur={() => setFieldTouched('teacher')}
                >
                    {
                        teachersFetched ?
                            teachers.map((teacher) => {
                                return <Option key={`teacher-${teacher.id}`} value={teacher.id}>{teacher.name}</Option>
                            })
                            : []
                    }
                </Select>
            </FormItem>

            {
                // values.course && values.course.type === "GENERAL" &&
                // <FormItem
                //     label='Day of week'
                //     required
                //     validateStatus={touched.day_of_week && errors.day_of_week !== undefined ? "error" : ""}
                //     help={touched.day_of_week && errors.day_of_week}
                // >
                //     <Select
                //         value={values.day_of_week}
                //         onChange={(value) => setFieldValue('day_of_week', value)}
                //         onBlur={() => setFieldTouched('day_of_week')}
                //     >
                //         <Select.Option value="monday">Monday</Select.Option>
                //         <Select.Option value="tuesday">Tuesday</Select.Option>
                //         <Select.Option value="wednesday">Wednesday</Select.Option>
                //         <Select.Option value="thursday">Thursday</Select.Option>
                //         <Select.Option value="friday">Friday</Select.Option>
                //         <Select.Option value="saturday">Saturday</Select.Option>
                //         <Select.Option value="sunday">Sunday</Select.Option>
                //     </Select>
                // </FormItem>
            }

            {
                values.course && values.course.type === "GENERAL" &&
                <FormItem
                    label='Days of week'
                    required
                    validateStatus={touched.days_of_week && errors.days_of_week !== undefined ? "error" : ""}
                    help={touched.days_of_week && errors.days_of_week}
                >
                    <Select
                        value={values.days_of_week}
                        onChange={(value) => setFieldValue('days_of_week', value)}
                        mode="multiple"
                    >
                        <Select.Option value="monday">Monday</Select.Option>
                        <Select.Option value="tuesday">Tuesday</Select.Option>
                        <Select.Option value="wednesday">Wednesday</Select.Option>
                        <Select.Option value="thursday">Thursday</Select.Option>
                        <Select.Option value="friday">Friday</Select.Option>
                        <Select.Option value="saturday">Saturday</Select.Option>
                        <Select.Option value="sunday">Sunday</Select.Option>
                    </Select>
                </FormItem>
            }

            {
                values.course && values.course.type === "SUMMER_COURSE" &&
                <FormItem
                    label='Start Date'
                    required
                    validateStatus={touched.start_date && errors.start_date !== undefined ? "error" : ""}
                    help={touched.start_date && errors.start_date}
                >
                    <DatePicker
                        format={'YYYY-MM-DD'}
                        disabledDate={(current) => current < moment().startOf('day')}
                        style={{ width: '100%' }}
                        value={values.start_date}
                        onChange={(date) => setFieldValue('start_date', date)}
                        onBlur={() => setFieldTouched('start_date')}
                    />
                </FormItem>
            }

            {
                values.course && values.course.type === "GENERAL" &&
                values.days_of_week && values.days_of_week.map((day, index) => {
                  return (
                      <Row key={'Session_config_' + day} style={rowStyle} gutter={0} justify="start">
                        <Col lg={12} md={12} sm={12} xs={12} style={colStyle}>
                          <FormItem
                              label={day.charAt(0).toUpperCase() + day.slice(1) + ' Session Start Time'}
                              required
                          >
                              <TimePicker
                                  minuteStep={5}
                                  format={"HH:mm"}
                                  value={values.start_times[day]}
                                  onChange={(date) => { handlePushStartTimes(date, day) }}
                              />
                          </FormItem>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12} style={colStyle}>
                          <FormItem
                              label={day.charAt(0).toUpperCase() + day.slice(1) + ' Session Duration'}
                              required
                          >
                              <InputNumber
                                  min={0}
                                  value={values.durations[day]}
                                  onChange={(value) => { handlePushDuration(value, day) }}
                              />
                              <span className="ant-form-text"> Minutes</span>
                          </FormItem>
                        </Col>
                      </Row>
                  )
                })
            }

            {
                values.course && values.course.type === "SUMMER_COURSE" &&
                <FormItem
                    label='Start Time'
                    required
                    validateStatus={touched.start_time && errors.start_time !== undefined ? "error" : ""}
                    help={touched.start_time && errors.start_time}
                >
                    <TimePicker
                        minuteStep={5}
                        format={"HH:mm"}
                        value={values.start_time}
                        onChange={(date) => setFieldValue('start_time', date)}
                        onBlur={() => setFieldTouched('start_time')}
                    />
                </FormItem>
            }

            {
                values.course && values.course.type === "SUMMER_COURSE" &&
                <FormItem
                    label='Duration'
                    required
                    validateStatus={touched.duration && errors.duration !== undefined ? "error" : ""}
                    help={touched.duration && errors.duration}
                >
                    <InputNumber
                        min={0}
                        value={values.duration}
                        onChange={(value) => setFieldValue('duration', value)}
                        onBlur={() => setFieldTouched('duration')}
                    />
                    <span className="ant-form-text"> Minutes</span>
                </FormItem>
            }

            <FormItem
                label='Capacity'
                required
                validateStatus={touched.capacity && errors.capacity !== undefined ? "error" : ""}
                help={touched.capacity && errors.capacity}
            >
                <InputNumber
                    min={0}
                    value={values.capacity}
                    onChange={(value) => {
                      setFieldValue('capacity', value)}}
                    onBlur={() => setFieldTouched('capacity')}
                />
            </FormItem>
            <FormItem
                label={"Venue"}
                validateStatus={touched.venue && errors.venue !== undefined ? "error" : ""}
                help={touched.venue && errors.venue}
            >
                <Input
                    value={values.venue}
                    onChange={(e) => setFieldValue('venue', e.target.value)}
                    onBlur={() => setFieldTouched('venue')}
                />
            </FormItem>
            <FormItem
                label={"Remark"}
                validateStatus={touched.remark && errors.remark !== undefined ? "error" : ""}
                help={touched.remark && errors.remark}
            >
                <Input
                    value={values.remark}
                    onChange={(e) => setFieldValue('remark', e.target.value)}
                    onBlur={() => setFieldTouched('remark')}
                />
            </FormItem>
            <FormItem
            >
                <Checkbox
                    checked={values.finished}
                    onChange={(event) => setFieldValue('finished', event.target.checked)}
                >
                    Hide From Schedule
                    </Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox
                    checked={values.disable}
                    onChange={(event) => setFieldValue('disable', event.target.checked)}
                >
                    Disable
                </Checkbox>
            </FormItem>
            <Form.Item>
                <Checkbox
                    checked={values.public_visible}
                    onChange={(event) => setFieldValue('public_visible', event.target.checked)}
                >
                    Public Visible
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Checkbox
                    checked={values.auto_reserve}
                    onChange={(event) => setFieldValue('auto_reserve', event.target.checked)}
                >
                    Auto Reserve
                </Checkbox>
            </Form.Item>

            <FormItem>
                <Button htmlType="submit" type="primary" block onClick={handleSubmit}>
                    Submit
                         </Button>
                <Link to="/app/courseClass">
                    <Button block>
                        Cancel
                             </Button>
                </Link>
            </FormItem>
        </Form>
    )
}
