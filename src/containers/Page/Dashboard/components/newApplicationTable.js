import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getNewApplications } from '../../../../redux/request/actions'
import { PaginationTable } from '../../../../components';

class NewApplicationTable extends Component {
  state = {
    size: 5,
    page: 1,
    sort_by: "created_at desc",
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  tableColumns = () => {
    return [
      {
        title: 'Date',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        defaultSortOrder: 'descend',
      },
      {
        title: 'Name',
        dataIndex: 'student.full_name',
        key: 'student.full_name',
        sorter: true,
        render: (text, object, index) => (
          <Link to={`/app/student/view/${object.student_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.student.full_name}
          </Link>
        ),
      },
      {
        title: 'Class Name',
        dataIndex: 'class.name',
        key: 'class.name',
        sorter: true,
        render: (text, object, index) => (
          <Link to={`/app/classSchedule/${object.class_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.class.name}
          </Link>
        ),
      }
    ];
  }

  searchFormRef = (form) => {
    this.searchForm = form;
  }

  handleTableChange = (page, size, sort_by) => {
    if(sort_by){
      let sortCol = sort_by.split(" ")[0];
      let sortDirection = sort_by.split(" ")[1];
      if(sortCol === "student.full_name"){
        sort_by = `student.last_name ${sortDirection},student.first_name ${sortDirection}`;
      }
      if(sortCol === "student.customer.full_name"){
        sort_by = `student.customer.last_name ${sortDirection},student.customer.first_name ${sortDirection}`;
      }
    }
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
    const { getNewApplications } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['student.customer', 'class'],
      search_text
    };
    getNewApplications({ params });
  }

  render() {
    const { getNewApplicationsResponse } = this.props;
    return (
      <PaginationTable response={getNewApplicationsResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
    );
  }
}

export default connect(
  state => ({
    getNewApplicationsResponse: state.getNewApplications,
  }),
  {
    getNewApplications,
  }
)(NewApplicationTable);