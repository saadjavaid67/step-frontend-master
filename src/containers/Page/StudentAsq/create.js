import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { createStudentAsq, getStudent } from '../../../redux/request/actions';

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

  const student_id = props.match.params.student_id;
  const asq_level = props.match.params.next_asq;
  const params = {
    with_model: ['customer']
  };
  useEffect(() => {
      if (student_id && asq_level) {
          dispatch(getStudent({
              id: student_id,
              params
          }));
      }
  }, [])

  const studentResponse = useSelector(state => state.getStudent.data);
  const studentResponseLoading = useSelector(state => state.getStudent.isFetching);

  const handleApiResponse = useCallback((prevCreateLoading, response, redirect) => {
    if (prevCreateLoading === true && !response.isFetching && response.success && response.data) {
      history.push({
        pathname: redirect,
      });
      notification('success', 'Successfully', 'Successfully Added');
    }
    if (prevCreateLoading === true && !response.isFetching && response.error) {
      notification('error', 'Error', response.errorMessage);
    }
  }, [history]);

  const createResponse = useSelector(state => state.createStudentAsq);
  const saving = createResponse.isFetching;

  // Create Response
  const prevCreateLoading = usePrevious(createResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevCreateLoading, createResponse, '/app/studentAsq');
  }, [prevCreateLoading, createResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(createStudentAsq({ data }));
  }

  return (
    <LayoutWrapper>
      <PageHeader>
        Create Student ASQ
      </PageHeader>
      <LayoutContent>
        {
          student_id && (studentResponseLoading || !studentResponse) ?
            <Skeleton active /> :
            <Form initValues={{ student: studentResponse, student_id: student_id, asq_level: asq_level }} handleSubmit={handleSubmit} loading={saving} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;
