import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input, Popconfirm, DatePicker } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllStudentAsq, deleteStudentAsq } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable, BooleanDisplay } from '../../../components';
import queryString from 'query-string';
import notification from '../../../components/notification';

const { Search } = Input;

class PageComponent extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "assign_date desc",
    search_text: undefined,
    completion_date: undefined,
  }
  componentDidMount() {
    this.handleRefershTable();
    console.log(this.props.location.search);
    const parsed = queryString.parse(this.props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.deleteStudentAsqResponse.isFetching && !nextProps.deleteStudentAsqResponse.isFetching && nextProps.deleteStudentAsqResponse.success && nextProps.deleteStudentAsqResponse.data) {
      notification('success', 'Successfully', 'Student Asq successfully deleted');
      this.handleRefershTable();
    }
    if (this.props.deleteStudentAsqResponse.isFetching && !nextProps.deleteStudentAsqResponse.isFetching && nextProps.deleteStudentAsqResponse.error) {
      notification('error', 'Error', nextProps.deleteStudentAsqResponse.errorMessage);
    }
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
        render: (text, object, index) => <BooleanDisplay value={object.finished} />
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        width: 150,
        render: (text, object, index) => (
          <>
            <Link to={`/app/studentAsq/edit/${object.id}`}>
              <Button icon="edit" />
            </Link>
            <Popconfirm title="Are you sure delete this Asq Record?" onConfirm={() => this.handleDeleteStudentAsq(object.id)} okText="Yes" cancelText="No">
              <Button color="primary" className="invoiceViewBtn" style={{ marginLeft: '5px' }}>
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }

  handleDeleteStudentAsq = (id) => {
    const { deleteStudentAsq } = this.props;
    deleteStudentAsq({ id: id });
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

  handleFromDateChange = (date, dateString) => {
    this.setState({ completion_date: date }, () => {
      this.handleRefershTable();
    });
  }

  handleRefershTable = () => {
    const { getAllStudentAsq } = this.props;
    const { page, size, sort_by, search_text, completion_date } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['student', 'teacher'],
      search_text,
      completion_date: completion_date ? moment(completion_date).format('YYYY-MM-DD') : undefined
    };
    getAllStudentAsq({ params });
  }

  render() {
    const { getAllStudentAsqResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Student ASQ
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/studentAsq/create">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add Student ASQ
                </Button>
            </Link>
          </ActionContainer>
          <ActionContainer>
            <Search
              placeholder="Keyword Search (Student Name / Teacher Name / Remarks)"
              onSearch={this.handleSearchKeyword}
              enterButton
              style={{ width: 450 }}
            />
            <DatePicker
              placeholder="Target Completion Date"
              format={"YYYY-MM-DD"}
              allowClear={true}
              style={{ marginLeft: 10, width: 300 }}
              value={this.state.completion_date}
              onChange={this.handleFromDateChange} />
          </ActionContainer>
          <PaginationTable response={getAllStudentAsqResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllStudentAsqResponse: state.getAllStudentAsq,
    deleteStudentAsqResponse: state.deleteStudentAsq,
  }),
  {
    getAllStudentAsq,
    deleteStudentAsq,
  }
)(PageComponent);
