import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllCourseCategory } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable, BooleanDisplay } from '../../../components';

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
        title: 'ASQ Needed',
        dataIndex: 'asq_needed',
        key: 'asq_needed',
        sorter: true,
        render: asq_needed => <BooleanDisplay value={asq_needed} />
      },
      {
        title: 'Public Visible',
        dataIndex: 'public_visible',
        key: 'public_visible',
        sorter: true,
        render: public_visible => <BooleanDisplay value={public_visible} />
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
          <Link to={`/app/courseCategory/edit/${object.id}`}>
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
    const { getAllCourseCategory } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: [],
      search_text
    };
    getAllCourseCategory({ params });
  }

  render() {
    const { getAllCourseCategoryResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Course Category
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/courseCategory/create">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add Course Category
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
          <PaginationTable response={getAllCourseCategoryResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllCourseCategoryResponse: state.getAllCourseCategory,
  }),
  {
    getAllCourseCategory,
  }
)(PageComponent);
