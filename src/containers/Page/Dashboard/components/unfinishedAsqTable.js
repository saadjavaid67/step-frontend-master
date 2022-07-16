import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, } from 'antd';
import { connect } from "react-redux";
import { getAllStudentAsq } from '../../../../redux/request/actions'
import { PaginationTable } from '../../../../components';

class UnfinishedAsqTable extends Component {
  state = {
    size: 5,
    page: 1,
    sort_by: "assign_date asc",
    search_text: undefined,
    finished: false,
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  tableColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'student.full_name',
        key: 'student.full_name',
        sorter: true,
        render: (text, object, index) => (
          <Link to={`/app/student/view/${object.student.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.student.full_name}
          </Link>
        ),
      },
      {
        title: 'Age',
        dataIndex: 'student.age',
        key: 'student.age',
        sorter: true,
      },
      {
        title: 'ASQ level',
        dataIndex: 'asq_level',
        key: 'asq_level',
        sorter: true,
      },
      {
        title: 'Assigned Date',
        dataIndex: 'assign_date',
        key: 'assign_date',
        sorter: true,
        defaultSortOrder: 'descend',
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, object, index) => (
          <Link to={`/app/studentAsq/edit/${object.id}`}>
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
    if(sort_by){
      let sortCol = sort_by.split(" ")[0];
      let sortDirection = sort_by.split(" ")[1];
      if(sortCol === "full_name"){
        sort_by = `last_name ${sortDirection},first_name ${sortDirection}`;
      }
      if(sortCol === "age"){
        sort_by = `birthday ${sortDirection}`;
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
    const { getAllStudentAsq } = this.props;
    const { page, size, sort_by, search_text, finished } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['student'],
      search_text,
      finished
    };
    getAllStudentAsq({ params });
  }

  render() {
    const { getAllStudentAsqResponse } = this.props;
    return (
      <PaginationTable response={getAllStudentAsqResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
    );
  }
}

export default connect(
  state => ({
    getAllStudentAsqResponse: state.getAllStudentAsq,
  }),
  {
    getAllStudentAsq,
  }
)(UnfinishedAsqTable);
