import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { getLocation, updateLocation } from '../../../redux/request/actions';

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
  const locationId = props.match.params.locationId;
  useEffect(() => {
    dispatch(getLocation({
      id: locationId,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const location = useSelector(state => state.getLocation.data);
  const locationLoading = useSelector(state => state.getLocation.isFetching);

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

  const updateResponse = useSelector(state => state.updateLocation);
  const saving = updateResponse.isFetching;

  // Update Response
  const prevUpdateLoading = usePrevious(updateResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevUpdateLoading, updateResponse, '/app/location');
  }, [prevUpdateLoading, updateResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(updateLocation({ 
      id: location.id,
      data 
    }));
  }
  return (
    <LayoutWrapper>
      <PageHeader>
        Edit Location
      </PageHeader>
      <LayoutContent>
        {
          locationLoading || !location ?
          <Skeleton active /> :
          <Form initValues={location} handleSubmit={handleSubmit} loading={saving} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;