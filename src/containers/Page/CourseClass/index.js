import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input, Popconfirm } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllCourseClass, deleteCourseClass } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable, BooleanDisplay } from '../../../components';
import notification from '../../../components/notification';

const { Search } = Input;

class PageComponent extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "created_at desc",
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.deleteCourseClassResponse.isFetching && !nextProps.deleteCourseClassResponse.isFetching && nextProps.deleteCourseClassResponse.success && nextProps.deleteCourseClassResponse.data) {
      notification('success', 'Successfully', 'Course Class successfully deleted');
      this.handleRefershTable();
    }
    if (this.props.deleteCourseClassResponse.isFetching && !nextProps.deleteCourseClassResponse.isFetching && nextProps.deleteCourseClassResponse.error) {
      console.log(nextProps.deleteCourseClassResponse)
      notification('error', 'Error', nextProps.deleteCourseClassResponse.errorMessage);
    }
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
        dataIndex: 'level.name',
        key: 'level.name',
        sorter: true,
      },
      {
        title: 'Location',
        dataIndex: 'location.name',
        key: 'location.name',
        sorter: true,
      },
      {
        title: 'Code',
        dataIndex: 'name',
        key: 'name',
        defaultSortOrder: 'ascend',
        sorter: true,
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        key: 'remark',
        sorter: true,
      },
      {
        title: 'Hide From Schedule',
        key: 'finished',
        sorter: (a, b) => a.finished - b.finished,
        render: object => <BooleanDisplay value={object.finished} />
      },
      {
        title: 'Public Visible',
        dataIndex: 'public_visible',
        key: 'public_visible',
        sorter: (a, b) => a.public_visible - b.public_visible,
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
        width: 150,
        render: (text, object, index) => (
          <>
            <Link to={`/app/courseClass/${object.id}`}>
              <Button icon="edit" />
            </Link>
            <Popconfirm title="Are you sure delete this class?" onConfirm={() => this.handleDeleteCourseClass(object.id)} okText="Yes" cancelText="No">
              <Button color="primary" className="invoiceViewBtn" style={{ marginLeft: '5px' }}>
                Delete
              </Button>
            </Popconfirm>
          </>
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
    const { getAllCourseClass } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['course', 'level', 'location'],
      search_text
    };
    getAllCourseClass({ params });
  }

  handleDeleteCourseClass = (id) => {
    const { deleteCourseClass } = this.props;
    deleteCourseClass({ id: id });
  }

  render() {
    const { getAllCourseClassResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Course Class
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/courseClass/new">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add Course Class
                </Button>
            </Link>
          </ActionContainer>
          <ActionContainer>
            <Search
              placeholder="Keyword Search (Name / Remark)"
              onSearch={this.handleSearchKeyword}
              enterButton
              style={{ width: 300 }}
            />
          </ActionContainer>
          <PaginationTable response={getAllCourseClassResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllCourseClassResponse: state.getAllCourseClass,
    deleteCourseClassResponse: state.deleteCourseClass,
  }),
  {
    getAllCourseClass,
    deleteCourseClass,
  }
)(PageComponent);
