import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, } from 'antd';
import { connect } from "react-redux";
import { getAsqReminderStudents } from '../../../../redux/request/actions'
import { PaginationTable } from '../../../../components';

class AsqReminderTable extends Component {
  state = {
    size: 5,
    page: 1,
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  tableColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'full_name',
        key: 'full_name',
        sorter: true,
        render: (text, object, index) => (
          <Link to={`/app/student/view/${object.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.full_name}
          </Link>
        ),
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: true,
      },
      {
        title: 'Pre ASQ',
        dataIndex: 'asq_level',
        key: 'asq_level',
        sorter: true,
        render: (text, object, index) => (
          <>{object.asq_level ? object.asq_level : "Initial needed"}</>
        ),
      },
      {
        title: 'Next ASQ',
        dataIndex: 'next_asq',
        key: 'next_asq',
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, object, index) => (
          <Link to={`/app/studentAsq/create/student_id=${object.id}&&next_asq=${object.next_asq}`}>
            <Button icon="plus" />
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
    const { getAsqReminderStudents } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['customer'],
      search_text
    };
    getAsqReminderStudents({ params });
  }

  render() {
    const { getAsqReminderStudentsResponse } = this.props;
    return (
      <PaginationTable response={getAsqReminderStudentsResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
    );
  }
}

export default connect(
  state => ({
    getAsqReminderStudentsResponse: state.getAsqReminderStudents,
  }),
  {
    getAsqReminderStudents,
  }
)(AsqReminderTable);
