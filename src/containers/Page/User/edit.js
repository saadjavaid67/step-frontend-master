import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { getUser, updateUser } from '../../../redux/request/actions';

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
  const userId = props.match.params.userId;
  useEffect(() => {
    dispatch(getUser({
      id: userId,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const user = useSelector(state => state.getUser.data);
  const userLoading = useSelector(state => state.getUser.isFetching);

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

  const updateResponse = useSelector(state => state.updateUser);
  const saving = updateResponse.isFetching;

  // Update Response
  const prevUpdateLoading = usePrevious(updateResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevUpdateLoading, updateResponse, '/app/user');
  }, [prevUpdateLoading, updateResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(updateUser({
      id: user.id,
      data
    }));
  }
  return (
    <LayoutWrapper>
      <PageHeader>
        Edit User
      </PageHeader>
      <LayoutContent>
        {
          userLoading || !user ?
            <Skeleton active /> :
            <Form initValues={user} handleSubmit={handleSubmit} loading={saving} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;