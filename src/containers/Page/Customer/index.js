import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllCustomer } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable, BooleanDisplay } from '../../../components';

const { Search } = Input;

class PageComponent extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "full_name asc",
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  tableColumns = () => {
    return [
      {
        title: 'Full Name',
        dataIndex: 'full_name',
        key: 'full_name',
        sorter: true,
        defaultSortOrder: 'ascend',
        render: (text, object, index) => (
          <Link to={`/app/parent/view/${object.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.full_name}
          </Link>
        ),
      },
      {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
        sorter: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: true,
        render: (text, object, index) => (
          <a href={`mailto:${object.email}`}>{object.email}</a>
        ),
      },
      {
        title: 'Mobile',
        dataIndex: 'mobile_phone_number',
        key: 'mobile_phone_number',
        sorter: true,
      },
      {
        title: 'Other Contact Number',
        dataIndex: 'other_contact_number',
        key: 'other_contact_number',
        sorter: true,
      },
      {
        title: 'District',
        dataIndex: 'district',
        key: 'district',
        sorter: true,
      },
      {
        title: 'Terms and Conditions',
        dataIndex: 'agreed_terms_and_conditions',
        key: 'agreed_terms_and_conditions',
        sorter: true,
        render: (text, object, index) => <BooleanDisplay value={object.agreed_terms_and_conditions} />
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, object, index) => (
          <>
            <Link to={`/app/parent/edit/${object.id}`}>
              <Button icon="edit" />
            </Link>
            <Link to={`/app/parent/view/${object.id}`} style={{ marginLeft: 5 }}>
              <Button icon="eye" />
            </Link>
          </>
        ),
      },
    ];
  }

  searchFormRef = (form) => {
    this.searchForm = form;
  }

  handleTableChange = (page, size, sort_by) => {
    // if (sort_by) {
    //   let sortCol = sort_by.split(" ")[0];
    //   let sortDirection = sort_by.split(" ")[1];
    //   if (sortCol === "full_name") {
    //     sort_by = `last_name ${sortDirection},first_name ${sortDirection}`;
    //   }
    // }
    this.setState({ page, size, sort_by }, () => {
      this.handleRefershTable();
    });
  }


  handleSearchKeyword = (value) => {
    this.setState({
      page: 1,
      search_text: value || undefined,
    }, () => {
      this.handleRefershTable();
    });
  }

  handleRefershTable = () => {
    const { getAllCustomer } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: [],
      search_text
    };
    getAllCustomer({ params });
  }

  render() {
    const { getAllCustomerResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Parent
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/parent/create">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add Parent
                </Button>
            </Link>
          </ActionContainer>
          <ActionContainer>
            <Search
              placeholder="Keyword Search (Name / Username / Phone / Email)"
              onSearch={this.handleSearchKeyword}
              enterButton
              style={{ width: 400 }}
            />
          </ActionContainer>
          <PaginationTable response={getAllCustomerResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllCustomerResponse: state.getAllCustomer,
  }),
  {
    getAllCustomer,
  }
)(PageComponent);
