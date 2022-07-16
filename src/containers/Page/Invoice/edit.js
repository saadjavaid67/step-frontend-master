import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import { Skeleton, } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import EditForm from './form';
import { getCustomerById, putUpdateCustomer } from '../../../redux/request/actions';

class PageComponent extends Component {
  componentDidMount() {
    const { match, getCustomerById } = this.props;
    const id = match.params.id;
    getCustomerById({ id });
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (this.props.putUpdateCustomerResponse !== nextProps.putUpdateCustomerResponse &&
      nextProps.putUpdateCustomerFetched
    ) {
      history.push('/app/parent');
      notification('success', 'Successfully', 'Successfully Updated');
    }
    if (this.props.putUpdateCustomerErrorResponse !== nextProps.putUpdateCustomerErrorResponse &&
      nextProps.putUpdateCustomerError
    ) {
      notification('error', 'Error', nextProps.putUpdateCustomerErrorResponse.message);
    }
  }

  handleSubmit = (formValues) => {
    const { getCustomerByIdResponse, putUpdateCustomer, } = this.props;
    let data = {
      id: getCustomerByIdResponse.id,
      ...formValues,
    }
    putUpdateCustomer({ data });
  }

  render() {
    const { getCustomerByIdResponse, getCustomerByIdLoading, getCustomerByIdFetched, putUpdateCustomerLoading } = this.props;
    if (getCustomerByIdLoading || !getCustomerByIdFetched) {
      return (
        <LayoutWrapper>
          <PageHeader>
            Edit Parent
        </PageHeader>
          <LayoutContent>
            <Skeleton active />
          </LayoutContent>
        </LayoutWrapper>
      );
    }
    return (
      <LayoutWrapper>
        <PageHeader>
        Edit Parent
        </PageHeader>
        <LayoutContent>
          <EditForm initValues={getCustomerByIdResponse} handleSubmit={this.handleSubmit} loading={putUpdateCustomerLoading} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getCustomerByIdResponse: state.getCustomerById.data,
    getCustomerByIdLoading: state.getCustomerById.isFetching,
    getCustomerByIdFetched: state.getCustomerById.dataFetched,
    getCustomerByIdError: state.getCustomerById.error,
    getCustomerByIdErrorResponse: state.getCustomerById.errorData,
    putUpdateCustomerResponse: state.putUpdateCustomer.data,
    putUpdateCustomerLoading: state.putUpdateCustomer.isFetching,
    putUpdateCustomerFetched: state.putUpdateCustomer.dataFetched,
    putUpdateCustomerError: state.putUpdateCustomer.error,
    putUpdateCustomerErrorResponse: state.putUpdateCustomer.errorData,
  }),
  {
    getCustomerById,
    putUpdateCustomer,
  }
)(PageComponent);