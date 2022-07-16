import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { getCourseClass, updateCourseClass } from '../../../redux/request/actions';

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
  const courseClassId = props.match.params.courseClassId;
  useEffect(() => {
    const params = {
      with_model: ['level', 'access_users'],
    };
    dispatch(getCourseClass({
      id: courseClassId,
      params
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const courseClass = useSelector(state => state.getCourseClass.data);
  const courseClassLoading = useSelector(state => state.getCourseClass.isFetching);

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

  const updateResponse = useSelector(state => state.updateCourseClass);
  const saving = updateResponse.isFetching;

  // Update Response
  const prevUpdateLoading = usePrevious(updateResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevUpdateLoading, updateResponse, '/app/courseClass');
  }, [prevUpdateLoading, updateResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(updateCourseClass({ 
      id: courseClass.id,
      data 
    }));
  }
  return (
    <LayoutWrapper>
      <PageHeader>
        Edit Course Class
      </PageHeader>
      <LayoutContent>
        {
          courseClassLoading || !courseClass ?
          <Skeleton active /> :
          <Form initValues={courseClass} handleSubmit={handleSubmit} loading={saving} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;
