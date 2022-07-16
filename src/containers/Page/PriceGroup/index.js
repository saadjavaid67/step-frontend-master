import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllPriceGroup } from '../../../redux/request/actions'
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
        title: 'Create Date',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, object, index) => (
          <Link to={`/app/priceGroup/edit/${object.id}`}>
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
    const { getAllPriceGroup } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: [],
      search_text
    };
    getAllPriceGroup({ params });
  }

  render() {
    const { getAllPriceGroupResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Price Group
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/priceGroup/create">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add Price Group
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
          <PaginationTable response={getAllPriceGroupResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllPriceGroupResponse: state.getAllPriceGroup,
  }),
  {
    getAllPriceGroup,
  }
)(PageComponent);
