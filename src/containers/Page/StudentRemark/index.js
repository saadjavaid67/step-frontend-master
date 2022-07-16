import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input, Popconfirm } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { toggleApplicationSessionUpdateRemarkModal } from '../../../redux/ui/actions';
import { getAllStudentRemark, deleteStudentRemark, getAllApplicationSessionRemark, deleteApplicationSessionRemark } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable } from '../../../components';
import notification from '../../../components/notification';

const { Search } = Input;

class PageComponent extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "created_at desc",
    search_text: undefined,
    applicationRemarkSize: 20,
    applicationRemarkPage: 1,
    applicationRemarkSort_by: "created_at desc",
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.deleteStudentRemarkResponse.isFetching && !nextProps.deleteStudentRemarkResponse.isFetching && nextProps.deleteStudentRemarkResponse.success && nextProps.deleteStudentRemarkResponse.data) {
      notification('success', 'Successfully', 'Incident successfully deleted');
      this.handleRefershTable();
    }
    if (this.props.deleteStudentRemarkResponse.isFetching && !nextProps.deleteStudentRemarkResponse.isFetching && nextProps.deleteStudentRemarkResponse.error) {
      notification('error', 'Error', nextProps.deleteStudentRemarkResponse.errorMessage);
    }

    if (this.props.deleteApplicationSessionRemarkResponse.isFetching && !nextProps.deleteApplicationSessionRemarkResponse.isFetching && nextProps.deleteApplicationSessionRemarkResponse.success && nextProps.deleteApplicationSessionRemarkResponse.data) {
      notification('success', 'Successfully', 'Incident successfully deleted');
      this.handleRefershTable();
    }
    if (this.props.deleteApplicationSessionRemarkResponse.isFetching && !nextProps.deleteApplicationSessionRemarkResponse.isFetching && nextProps.deleteApplicationSessionRemarkResponse.error) {
      notification('error', 'Error', nextProps.deleteApplicationSessionRemarkResponse.errorMessage);
    }
  }

  tableColumns = () => {
    return [
      {
        title: 'Create Date',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        defaultSortOrder: 'descend',
      },
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
        title: 'Incident',
        dataIndex: 'remark',
        key: 'remark',
        sorter: true,
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        width: 150,
        render: (text, object, index) => (
          <>
            <Link to={`/app/studentIncident/edit/${object.id}`}>
              <Button icon="edit" />
            </Link>
            <Popconfirm title="Are you sure delete this Incident?" onConfirm={() => this.handleDeleteRemark(object.id)} okText="Yes" cancelText="No">
              <Button color="primary" className="invoiceViewBtn" style={{ marginLeft: '5px' }}>
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }

  applicationRemarksTableColumns = () => {
    return [
      {
        title: 'Create Date',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        defaultSortOrder: 'descend',
      },
      {
        title: 'Student Name',
        dataIndex: 'application_session.application.student.full_name',
        key: 'application_session.application.student.full_name',
        sorter: true,
        render: (text, object, index) => {
          return (object.application_session) ? (
            <Link to={`/app/student/view/${object.application_session.application.student_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
              {object.application_session.application.student.full_name}
            </Link>
          ) : null
        },
      },
      {
        title: 'Course Class',
        dataIndex: 'application_session.application.class.name',
        key: 'application_session.application.class.name',
        sorter: true,
        render: (text, object, index) => {
          return (object.application_session) ? (
            <Link to={`/app/classSchedule/${object.application_session.application.class_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
              {object.application_session.application.class.name}
            </Link>
          ) : null
        }
      },
      {
        title: 'Incident',
        dataIndex: 'remark',
        key: 'remark',
        sorter: true,
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        width: 150,
        render: (text, object, index) => (
          <>
            <Button icon="edit" onClick={() => this.handleClickUpdateIncidentButton(object)}/>
            <Popconfirm title="Are you sure delete this Incident?" onConfirm={() => this.handleDeleteApplicationSessionRemark(object.id)} okText="Yes" cancelText="No">
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
    // if (sort_by) {
    //   let sortCol = sort_by.split(" ")[0];
    //   let sortDirection = sort_by.split(" ")[1];
    //   if (sortCol === "student.full_name") {
    //     sort_by = `student.last_name ${sortDirection},student.first_name ${sortDirection}`;
    //   }
    // }
    this.setState({ page, size, sort_by }, () => {
      this.handleRefershTable();
    });
  }

  handleApplicationRemarkTableChange = (applicationRemarkPage, applicationRemarkSize, applicationRemarkSort_by) => {
    this.setState({ applicationRemarkPage, applicationRemarkSize, applicationRemarkSort_by }, () => {
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
    const { getAllStudentRemark, getAllApplicationSessionRemark } = this.props;
    const { page, size, sort_by, search_text, applicationRemarkPage, applicationRemarkSize, applicationRemarkSort_by } = this.state;

    getAllStudentRemark({ params: {
      page,
      size,
      sort_by,
      with_model: ['student'],
      search_text
    }});

    getAllApplicationSessionRemark({ params: {
      page: applicationRemarkPage,
      size: applicationRemarkSize,
      sort_by: applicationRemarkSort_by,
      with_model: ['application_session.application.student', 'application_session.application.class'],
      search_text
    }});
  }

  handleDeleteRemark = (id) => {
    const { deleteStudentRemark } = this.props;
    deleteStudentRemark({ id: id });
  }

  handleDeleteApplicationSessionRemark = (id) => {
    const { deleteApplicationSessionRemark } = this.props;
    deleteApplicationSessionRemark({ id: id });
  }

  handleClickUpdateIncidentButton = (remark) => {
    const { toggleApplicationSessionUpdateRemarkModal } = this.props;
    toggleApplicationSessionUpdateRemarkModal({ open: true, callback: () => this.handleRefershTable(), remark });
  }

  render() {
    const { getAllStudentRemarkResponse, getAllApplicationSessionRemarkResponse } = this.props;
    console.log(getAllApplicationSessionRemarkResponse);
    return (
      <LayoutWrapper>
        <PageHeader>
          Incident
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Search
              placeholder="Keyword Search (Student Name / Incident)"
              onSearch={this.handleSearchKeyword}
              enterButton
              style={{ width: 350 }}
            />
          </ActionContainer>
          <PaginationTable response={getAllStudentRemarkResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
          <PaginationTable response={getAllApplicationSessionRemarkResponse} tableColumns={this.applicationRemarksTableColumns()} handleTableChange={this.handleApplicationRemarkTableChange}  />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllStudentRemarkResponse: state.getAllStudentRemark,
    deleteStudentRemarkResponse: state.deleteStudentRemark,
    getAllApplicationSessionRemarkResponse: state.getAllApplicationSessionRemark,
    deleteApplicationSessionRemarkResponse: state.deleteApplicationSessionRemark,
  }),
  {
    getAllStudentRemark,
    deleteStudentRemark,
    getAllApplicationSessionRemark,
    deleteApplicationSessionRemark,
    toggleApplicationSessionUpdateRemarkModal,
  }
)(PageComponent);
