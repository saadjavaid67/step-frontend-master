import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllUser } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable } from '../../../components';

const { Search } = Input;

class PageComponent extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "name asc",
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  tableColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        defaultSortOrder: 'ascend',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: true,
      },
      {
        title: 'Create Date',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, object, index) => (
          <Link to={`/app/user/edit/${object.id}`}>
            <Button icon="edit" />
          </Link>
        ),
      },
    ];
  }

  searchFormRef = (form) => {
    this.searchForm = form;
  }

  handleTableChange = (page, size, sort_by) => {
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
    const { getAllUser } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: [],
      search_text
    };
    getAllUser({ params });
  }

  render() {
    const { getAllUserResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          User
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/user/create">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add User
                </Button>
            </Link>
          </ActionContainer>
          <ActionContainer>
            <Search
              placeholder="Keyword Search (Name)"
              onSearch={this.handleSearchKeyword}
              enterButton
              style={{ width: 300 }}
            />
          </ActionContainer>
          <PaginationTable response={getAllUserResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllUserResponse: state.getAllUser,
  }),
  {
    getAllUser,
  }
)(PageComponent);
