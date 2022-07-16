import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllCourseLevel } from '../../../redux/request/actions'
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
        title: 'Course',
        dataIndex: 'course.name',
        key: 'course.name',
        sorter: true,
      },
      {
        title: 'Level',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        defaultSortOrder: 'ascend',
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
          <Link to={`/app/courseLevel/edit/${object.id}`}>
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
    const { getAllCourseLevel } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['course'],
      search_text
    };
    getAllCourseLevel({ params });
  }

  render() {
    const { getAllCourseLevelResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Course Level
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/courseLevel/create">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add Course Level
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
          <PaginationTable response={getAllCourseLevelResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllCourseLevelResponse: state.getAllCourseLevel,
  }),
  {
    getAllCourseLevel,
  }
)(PageComponent);
