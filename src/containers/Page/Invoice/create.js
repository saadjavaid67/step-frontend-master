import LayoutContent from '../../../components/utility/layoutContent';
import notification from '../../../components/notification';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import CreateForm from './form';
import { postCreateCusotmer } from '../../../redux/request/actions';

class PageComponent extends Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (this.props.postCreateCusotmerResponse !== nextProps.postCreateCusotmerResponse &&
      nextProps.postCreateCusotmerFetched
    ) {
      history.push('/app/parent');
      notification('success', 'Successfully', 'Successfully Added');
    }
    if (this.props.postCreateCusotmerErrorResponse !== nextProps.postCreateCusotmerErrorResponse &&
      nextProps.postCreateCusotmerError
    ) {
      notification('error', 'Error', nextProps.postCreateCusotmerErrorResponse.message);
    }
  }

  handleSubmit = (formValues) => {
    const { postCreateCusotmer, } = this.props;
    let data = {
      ...formValues,
    }
    postCreateCusotmer({ data });
  }

  render() {
    const { postCreateCusotmerLoading } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Create Parent
        </PageHeader>
        <LayoutContent>
          <CreateForm initValues={{}} handleSubmit={this.handleSubmit} loading={postCreateCusotmerLoading} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    postCreateCusotmerResponse: state.postCreateCusotmer.data,
    postCreateCusotmerLoading: state.postCreateCusotmer.isFetching,
    postCreateCusotmerFetched: state.postCreateCusotmer.dataFetched,
    postCreateCusotmerError: state.postCreateCusotmer.error,
    postCreateCusotmerErrorResponse: state.postCreateCusotmer.errorData,
  }),
  {
    postCreateCusotmer,
  }
)(PageComponent);