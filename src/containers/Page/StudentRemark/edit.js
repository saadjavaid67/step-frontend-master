import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { updateStudentRemark, getStudentRemark } from '../../../redux/request/actions';
import moment from 'moment'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const Schema = Yup.object().shape({
  remark: Yup
    .string()
    .required()
    .label('Incident'),
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
      student_id: undefined,
      remark: '',
    },
    validationSchema: Schema,
    onSubmit: async values => {
      const data = {
        student_id: values.student_id,
        remark: values.remark,
      }
      if (studentRemarkId === "new") {
        
      } else {
        dispatch(updateStudentRemark({
          id: studentRemarkId,
          data
        }));
      }
    },
  });

  const studentRemarkId = props.match.params.id || "new";

  useEffect(() => {
    if (studentRemarkId !== "new") {
      const params = {
      };
      dispatch(getStudentRemark({
        id: studentRemarkId,
        params
      }));
    }
  }, [studentRemarkId])

  const studentRemark = useSelector(state => state.getStudentRemark.data);
  const studentRemarkLoading = useSelector(state => state.getStudentRemark.isFetching);
  const studentRemarkFetched = useSelector(state => state.getStudentRemark.dataFetched);
  const prevStudentRemarkLoading = usePrevious(studentRemarkLoading);
  useEffect(() => {
    if (
      prevStudentRemarkLoading && !studentRemarkLoading && studentRemark
    ) {
      const initValues = {
        student_id: studentRemark.student_id,
        remark: studentRemark.remark,
      }
      setValues(initValues)
    }
  }, [prevStudentRemarkLoading, studentRemarkLoading, studentRemark]);

  const handleApiResponse = useCallback((prevFetching, response, successAction) => {
    if (prevFetching && !response.isFetching && response.success) {
      history.push({
        pathname: "/app/studentIncident",
      });
      successAction();
    }
    if (prevFetching && !response.isFetching && response.error) {

    }
  }, []);

  const updateResponse = useSelector(state => state.updateStudentRemark);
  const saving = updateResponse.isFetching;

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
          studentRemarkId === "new"
            ? "Create Incident"
            : "Edit Incident"
        }
      </PageHeader>
      <LayoutContent>
        {
          studentRemarkLoading
            ? <Skeleton active />
            : <Form values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} handleSubmit={handleSubmit} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;