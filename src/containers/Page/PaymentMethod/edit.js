import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Skeleton, } from 'antd';
import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import Form from './components/form';
import { getPaymentMethod, updatePaymentMethod } from '../../../redux/request/actions';

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
  const paymentMethodId = props.match.params.paymentMethodId;
  useEffect(() => {
    dispatch(getPaymentMethod({
      id: paymentMethodId,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const paymentMethod = useSelector(state => state.getPaymentMethod.data);
  const paymentMethodLoading = useSelector(state => state.getPaymentMethod.isFetching);

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

  const updateResponse = useSelector(state => state.updatePaymentMethod);
  const saving = updateResponse.isFetching;

  // Update Response
  const prevUpdateLoading = usePrevious(updateResponse.isFetching);
  useEffect(() => {
    handleApiResponse(prevUpdateLoading, updateResponse, '/app/paymentMethod');
  }, [prevUpdateLoading, updateResponse, handleApiResponse]);

  function handleSubmit(formValues) {
    let data = {
      ...formValues,
    }
    dispatch(updatePaymentMethod({
      id: paymentMethod.id,
      data
    }));
  }
  return (
    <LayoutWrapper>
      <PageHeader>
        Edit Payment Method
      </PageHeader>
      <LayoutContent>
        {
          paymentMethodLoading || !paymentMethod ?
            <Skeleton active /> :
            <Form initValues={paymentMethod} handleSubmit={handleSubmit} loading={saving} />
        }
      </LayoutContent>
    </LayoutWrapper>
  );
}
export default Page;