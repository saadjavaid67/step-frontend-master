import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Modal, Button, Popconfirm } from 'antd';
import { connect } from "react-redux";
import { toggleAcceptApplicationModal, toggleCreateInvoiceModal } from '../../../../redux/ui/actions'
import { getApplicationsForStudentDetail, restoreApplication, deleteApplication } from '../../../../redux/request/actions'
import { PaginationTable } from '../../../../components';
import notification from '../../../../components/notification';

const { confirm } = Modal;

class StudentAsqTable extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "created_at asc",
    student_id: undefined,
    search_text: undefined
  }
  componentDidMount() {
    this.setState({
      student_id: this.props.student_id
    }, () => this.handleRefershTable());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reserveApplicationResponse.isFetching && !nextProps.reserveApplicationResponse.isFetching && nextProps.reserveApplicationResponse.success) {
      this.handleRefershTable();
    }

    if (this.props.restoreApplicationResponse.isFetching && !nextProps.restoreApplicationResponse.isFetching && nextProps.restoreApplicationResponse.success && nextProps.restoreApplicationResponse.data) {
      notification('success', 'Successfully', 'Successfully Reserve');
      this.handleRefershTable();
    }
    if (this.props.restoreApplicationResponse.isFetching && !nextProps.restoreApplicationResponse.isFetching && nextProps.restoreApplicationResponse.error) {
      notification('error', 'Error', nextProps.restoreApplicationResponse.error.errorCode);
    }

    if (this.props.deleteApplicationResponse.isFetching && !nextProps.deleteApplicationResponse.isFetching && nextProps.deleteApplicationResponse.success && nextProps.deleteApplicationResponse.data) {
      notification('success', 'Successfully', 'Application successfully deleted');
      this.handleRefershTable();
    }
    if (this.props.deleteApplicationResponse.isFetching && !nextProps.deleteApplicationResponse.isFetching && nextProps.deleteApplicationResponse.error) {
      notification('error', 'Error', nextProps.deleteApplicationResponse.error.errorCode);
    }
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
        title: 'Class Name',
        dataIndex: 'class.name',
        key: 'class.name',
        sorter: true,
        render: (text, object, index) => (
          <Link
            to={(object.class.course.type === "GENERAL") ? `/app/classSchedule/${object.class_id}` : `/app/campSchedule/${object.class.course.id}`}
            className="action-button"
            style={{ margin: '0px 5px 0px 0px' }}
          >
            {object.class.name}
          </Link>
        ),
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        sorter: true,
        render: (text, object, index) => {
          let priority = "Normal";
          if (object.priority === -1) {
            priority = "Low";
          } else if(object.priority === 1) {
            priority = "High";
          }
          return priority;
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
      },
      {
        title: '',
        key: 'operation',
        sorter: false,
        render: (text, object, index) => {
          if (object.status === "WAITING") {
            return <div>
              <Button color="primary" onClick={() => this.handleAcceptApplication(object)}>
                Accept
                </Button>
              <Popconfirm title="Are you sure delete this application?" onConfirm={() => this.handleDeleteApplication(object.id)} okText="Yes" cancelText="No">
                <Button type="danger" style={{ marginLeft: 5 }}>
                  Delete
              </Button>
              </Popconfirm>
              <Link to={`/app/application/edit/${object.id}`}>
                <Button icon="edit" style={{ marginLeft: 5 }} />
              </Link>
            </div>
          } else if (object.status === "RESERVED" && object.invoice_id === null) {
            return <div>
              <Button color="primary" onClick={() => this.handleCreateInvoice(object)}>
                Create Invoice
              </Button>
              <Popconfirm title="Are you sure restore this application?" onConfirm={() => this.handleRestoreApplicationToWaitingList(object.id)} okText="Yes" cancelText="No">
                <Button color="primary" style={{ marginLeft: 5 }}>
                  Restore To Waiting List
              </Button>
              </Popconfirm>
            </div>
          } else {
            return <div></div>
          }
        },
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
    const { getApplicationsForStudentDetail } = this.props;
    const { page, size, sort_by, search_text, student_id } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['student.customer', 'class', 'class.course'],
      search_text,
      student_id,
    };
    getApplicationsForStudentDetail({ params });
  }

  handleAcceptApplication(application) {
    const { toggleAcceptApplicationModal } = this.props;
    toggleAcceptApplicationModal({ open: true, application_id: application.id });
  }

  handleRestoreApplicationToWaitingList(applicationId) {
    const { restoreApplication } = this.props;
    restoreApplication({ id: applicationId });
  }

  handleDeleteApplication(applicationId){
    const { deleteApplication } = this.props;
    deleteApplication({ id: applicationId });
  }

  handleCreateInvoice(application){
    const { toggleCreateInvoiceModal } = this.props;
    toggleCreateInvoiceModal({ open: true, studentId: application.student.id, student: application.student, applicationIds: [application.id], totalAmount: application.net_amount });
  }


  render() {
    const { getApplicationsForStudentDetailResponse } = this.props;
    return (
      <PaginationTable response={getApplicationsForStudentDetailResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
    );
  }
}

export default connect(
  state => ({
    getApplicationsForStudentDetailResponse: state.getApplicationsForStudentDetail,
    reserveApplicationResponse: state.reserveApplication,
    restoreApplicationResponse: state.restoreApplication,
    deleteApplicationResponse: state.deleteApplication
  }),
  {
    getApplicationsForStudentDetail,
    restoreApplication,
    deleteApplication,
    toggleAcceptApplicationModal,
    toggleCreateInvoiceModal
  }
)(StudentAsqTable);
