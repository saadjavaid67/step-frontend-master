import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { getCourseCategory, updateCourseCategory } from '../../../redux/request/actions';

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
  const categoryId = props.match.params.categoryId;
  useEffect(() => {
    dispatch(getCourseCategory({
      id: categoryId,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const courseCategory = useSelector(state => state.getCourseCategory.data);
  const courseCategoryLoading = useSelector(state => state.getCourseCategory.isFetching);

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

  const updateResponse = useSelector(state => state.updateCourseCategory);
  const saving = updateResponse.isFetching;

  // Update Response
  const prevUpdateLoading = usePrevious(updateResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevUpdateLoading, updateResponse, '/app/courseCategory');
  }, [prevUpdateLoading, updateResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(updateCourseCategory({
      id: courseCategory.id,
      data
    }));
  }
  return (
    <LayoutWrapper>
      <PageHeader>
        Edit Course Category
      </PageHeader>
      <LayoutContent>
        {
          courseCategoryLoading || !courseCategory ?
            <Skeleton active /> :
            <Form initValues={courseCategory} handleSubmit={handleSubmit} loading={saving} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;