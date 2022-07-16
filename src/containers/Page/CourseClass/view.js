import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { createCourseClass, updateCourseClass, getCourseClass } from '../../../redux/request/actions';
import moment from 'moment'
import * as Yup from 'yup'
import { useFormik } from 'formik'

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
  start_time: Yup
    .date()
    .nullable()
    .when('course', {
      is: (val) => val && val.type === "SUMMER_COURSE",
      then: Yup.date().required()
    })
    .label('Start Time'),
  duration: Yup
    .number()
    .transform(val => val === "" ? null : val)
    .nullable()
    .when('course', {
      is: (val) => val && val.type === "SUMMER_COURSE",
      then: Yup.number().required()
    })
    .label('Duration'),
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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Page(props) {
  const dispatch = useDispatch();
  let history = useHistory();

  const { values, touched, errors, setFieldValue, setValues, setFieldTouched, handleSubmit } = useFormik({
    initialValues: {
      location: undefined,
      course: undefined,
      level: undefined,
      price_group: undefined,
      teacher: undefined,
      name: '',
      camp_name: null,
      start_date: null,
      start_time: null,
      duration: null,
      capacity: '',
      venue: '',
      remark: '',
      finished: false,
      public_visible: false,
      auto_reserve: false,
      days_of_week: [],
      start_times: {},
      durations: {},
      disable: false,
    },
    validationSchema: Schema,
    onSubmit: async values => {
      const data = {
        location_id: values.location.id,
        course_id: values.course.id,
        price_group_id: values.price_group.id,
        teacher_id: values.teacher ? values.teacher.id : undefined,
        name: values.name,
        capacity: values.capacity,
        venue: values.venue,
        remark: values.remark,
        finished: values.finished,
        public_visible: values.public_visible,
        auto_reserve: values.auto_reserve,
        disable: values.disable,
      }

      if (values.course.type === "GENERAL") {
        data.level_id = values.level.id;
      }

      if (values.course.type === "SUMMER_COURSE") {
        data.camp_name = values.camp_name;
        data.start_date = values.start_date.format("YYYY-MM-DD");
        data.start_time = values.start_time.format("HH:mm");
        data.duration = values.duration;
        data.timeslot = [];
      }

      if (values.days_of_week && values.days_of_week.length === 1) {
        let _day = values.days_of_week[0];

        data.day_of_week = _day;
        data.start_time = values.start_times[_day].format("HH:mm");
        data.duration = values.durations[_day];
        data.timeslot = [];
      }

      if (values.days_of_week && values.days_of_week.length > 1) {
        let _timeslots = [];
        values.days_of_week.map(day => {
          let _timeslot = {
            day_of_week: day,
            start_time: values.start_times[day].format("HH:mm"),
            duration: values.durations[day]
          }

          _timeslots.push(_timeslot);
        })

        data.timeslot = _timeslots;
      }

      if (courseClassId === "new") {
        dispatch(createCourseClass({ data }));
      } else {
        dispatch(updateCourseClass({
          id: courseClassId,
          data
        }));
      }
    },
  });

  console.log(errors, values)

  const courseClassId = props.match.params.id || "new";

  useEffect(() => {
    if (courseClassId !== "new") {
      const params = {
        with_model: ['location', 'course', 'level', 'price_group', 'teacher', 'access_users'],
      };
      dispatch(getCourseClass({
        id: courseClassId,
        params
      }));
    }
  }, [courseClassId])

  const courseClass = useSelector(state => state.getCourseClass.data);
  const courseClassLoading = useSelector(state => state.getCourseClass.isFetching);
  const courseClassFetched = useSelector(state => state.getCourseClass.dataFetched);
  const prevCourseClassLoading = usePrevious(courseClassLoading);

  useEffect(() => {
    if (
      prevCourseClassLoading && !courseClassLoading && courseClass
    ) {
      const initValues = {
        location: courseClass.location,
        course: courseClass.course,
        level: courseClass.level || undefined,
        price_group: courseClass.price_group,
        teacher: courseClass.teacher || undefined,
        name: courseClass.name,
        camp_name: courseClass.camp_name ? courseClass.camp_name : null,
        start_date: courseClass.start_date ? moment(courseClass.start_date) : null,
        start_time: courseClass.start_time ? moment(courseClass.start_time, "HH:mm") : null,
        duration: courseClass.duration ? courseClass.duration : null,
        capacity: courseClass.capacity,
        venue: courseClass.venue,
        remark: courseClass.remark,
        finished: courseClass.finished,
        public_visible: courseClass.public_visible,
        auto_reserve: courseClass.auto_reserve,
        days_of_week: [],
        start_times: {},
        durations: {},
        disable: courseClass.disable,
      }

      let _days_of_week = [];
      let _start_times = {};
      let _durations = {};

      if (courseClass.day_of_week) {
          _days_of_week.push(courseClass.day_of_week);
      }

      if (courseClass.day_of_week && courseClass.start_time) {
          _start_times[courseClass.day_of_week] = moment(courseClass.start_time, "HH:mm");
      }

      if (courseClass.day_of_week && courseClass.duration) {
          _durations[courseClass.day_of_week] = courseClass.duration;
      }

      courseClass.timeslot.map(session => {
        let _day = session.day_of_week;

        if (_day && _day != "") {
          _days_of_week.push(_day);
          _start_times[_day] = moment(session.start_time, "HH:mm");
          _durations[_day] = session.duration;
        }
      })

      initValues['days_of_week'] = _days_of_week;
      initValues['start_times'] = _start_times;
      initValues['durations'] = _durations;

      setValues(initValues)
    }
  }, [prevCourseClassLoading, courseClassLoading, courseClass]);

  const handleApiResponse = useCallback((prevFetching, response, successAction) => {
    if (prevFetching && !response.isFetching && response.success) {
      history.push({
        pathname: "/app/courseClass",
      });
      successAction();
    }
    if (prevFetching && !response.isFetching && response.error) {

    }
  }, []);

  const createResponse = useSelector(state => state.createCourseClass);
  const updateResponse = useSelector(state => state.updateCourseClass);
  const saving = createResponse.isFetching || updateResponse.isFetching;

  // Create Response
  const prevCreateFetching = usePrevious(createResponse.isFetching);
  useEffect(() => {
    const action = () => {
      notification('success', 'Successfully', 'Successfully Created');
    }
    handleApiResponse(prevCreateFetching, createResponse, action);
  }, [prevCreateFetching, createResponse, handleApiResponse]);

  // Edit Response
  const prevUpdateFetching = usePrevious(updateResponse.isFetching);
  useEffect(() => {
    const action = () => {
      notification('success', 'Successfully', 'Successfully Updated');
    }
    handleApiResponse(prevUpdateFetching, updateResponse, action);
  }, [prevUpdateFetching, updateResponse, handleApiResponse]);

  return (
    <LayoutWrapper>
      <PageHeader>
        {
          courseClassId === "new"
            ? "Create Course Class"
            : "Edit Course Class"
        }
      </PageHeader>
      <LayoutContent>
        {
          courseClassLoading
            ? <Skeleton active />
            : <Form values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} handleSubmit={handleSubmit} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;
