import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { getPriceGroup, updatePriceGroup } from '../../../redux/request/actions';

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
  const priceGroupId = props.match.params.priceGroupId;
  useEffect(() => {
    const params = {
      with_model: ["details"]
    }
    dispatch(getPriceGroup({
      id: priceGroupId,
      params
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const priceGroup = useSelector(state => state.getPriceGroup.data);
  const priceGroupLoading = useSelector(state => state.getPriceGroup.isFetching);

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

  const updateResponse = useSelector(state => state.updatePriceGroup);
  const saving = updateResponse.isFetching;

  // Update Response
  const prevUpdateLoading = usePrevious(updateResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevUpdateLoading, updateResponse, '/app/priceGroup');
  }, [prevUpdateLoading, updateResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(updatePriceGroup({
      id: priceGroup.id,
      data
    }));
  }
  return (
    <LayoutWrapper>
      <PageHeader>
        Edit Price Group
      </PageHeader>
      <LayoutContent>
        {
          priceGroupLoading || !priceGroup ?
            <Skeleton active /> :
            <Form initValues={priceGroup} handleSubmit={handleSubmit} loading={saving} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;