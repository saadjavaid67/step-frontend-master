import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { createStudent } from '../../../redux/request/actions';

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

  const createResponse = useSelector(state => state.createStudent);
  const saving = createResponse.isFetching;

  // Create Response
  const prevCreateLoading = usePrevious(createResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevCreateLoading, createResponse, '/app/student');
  }, [prevCreateLoading, createResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(createStudent({ data }));
  }

  return (
    <LayoutWrapper>
      <PageHeader>
        Create Student
      </PageHeader>
      <LayoutContent>
        <Form initValues={{}} handleSubmit={handleSubmit} loading={saving} />
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;
