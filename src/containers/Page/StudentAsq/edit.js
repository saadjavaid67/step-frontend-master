import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { getStudentAsq, updateStudentAsq } from '../../../redux/request/actions';

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

  // Mount & Unmount
  const studentAsqId = props.match.params.studentAsqId;
  useEffect(() => {
    let params = {
      with_model: ["student.customer"]
    }
    dispatch(getStudentAsq({
      id: studentAsqId,
      params
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const studentAsq = useSelector(state => state.getStudentAsq.data);
  const studentAsqLoading = useSelector(state => state.getStudentAsq.isFetching);

  const handleApiResponse = useCallback((prevCreateLoading, response, redirect) => {
    if (prevCreateLoading === true && !response.isFetching && response.success && response.data) {
      history.push({
        pathname: redirect,
      });
      notification('success', 'Successfully', 'Successfully Updated');
    }
    if (prevCreateLoading === true && !response.isFetching && response.error) {
      notification('error', 'Error', response.errorMessage);
    }
  }, [history]);

  const updateResponse = useSelector(state => state.updateStudentAsq);
  const saving = updateResponse.isFetching;

  // Update Response
  const prevUpdateLoading = usePrevious(updateResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevUpdateLoading, updateResponse, '/app/studentAsq');
  }, [prevUpdateLoading, updateResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(updateStudentAsq({
      id: studentAsq.id,
      data
    }));
  }
  return (
    <LayoutWrapper>
      <PageHeader>
        Edit Student ASQ
      </PageHeader>
      <LayoutContent>
        {
          studentAsqLoading || !studentAsq ?
            <Skeleton active /> :
            <Form initValues={studentAsq} handleSubmit={handleSubmit} loading={saving} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;