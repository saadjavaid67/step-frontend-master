import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from "react-redux";
import { getStudentAsqsForStudentDetail } from '../../../../redux/request/actions'
import { PaginationTable, BooleanDisplay } from '../../../../components';

class StudentAsqsTable extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "assign_date desc",
    student_id: undefined,
    search_text: undefined
  }
  componentDidMount() {
    this.setState({
      student_id: this.props.student_id
    }, () => this.handleRefershTable());
  }

  tableColumns = () => {
    return [
      {
        title: 'Student Name',
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
        title: 'Remarks',
        dataIndex: 'remark',
        key: 'remark',
        sorter: true,
      },
      {
        title: 'ASQ Level',
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
        title: 'Assigned teacher',
        dataIndex: 'teacher.name',
        key: 'teacher.name',
        sorter: true,
      },
      {
        title: 'Target Completion Date',
        dataIndex: 'target_completion_date',
        key: 'target_completion_date',
        sorter: true,
      },
      {
        title: 'Report Finished Date',
        dataIndex: 'report_finished_date',
        key: 'report_finished_date',
        sorter: true,
      },
      {
        title: 'Coordinator Checked',
        dataIndex: 'coordinator_checked',
        key: 'coordinator_checked',
        sorter: true,
        render: (text, object, index) => <BooleanDisplay value={object.coordinator_checked} />
      },
      {
        title: 'Appointment Date',
        dataIndex: 'appointment_date',
        key: 'appointment_date',
        sorter: true,
      },
      {
        title: 'Finish',
        dataIndex: 'finished',
        key: 'finished',
        sorter: true,
        render: (text, object, index) => <BooleanDisplay value={object.coordinator_checked} />
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
      if(sortCol === "student.full_name"){
        sort_by = `student.last_name ${sortDirection},student.first_name ${sortDirection}`;
      }
      if(sortCol === "student.age"){
        sort_by = `student.birthday ${sortDirection}`;
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
    const { getStudentAsqsForStudentDetail } = this.props;
    const { page, size, sort_by, search_text, student_id } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['student'],
      search_text,
      student_id,
    };
    getStudentAsqsForStudentDetail({ params });
  }

  render() {
    const { getStudentAsqsForStudentDetailResponse } = this.props;
    return (
      <PaginationTable response={getStudentAsqsForStudentDetailResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
    );
  }
}

export default connect(
  state => ({
    getStudentAsqsForStudentDetailResponse: state.getStudentAsqsForStudentDetail,
  }),
  {
    getStudentAsqsForStudentDetail,
  }
)(StudentAsqsTable);