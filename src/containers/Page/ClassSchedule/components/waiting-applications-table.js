import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Popconfirm, Row, Col, Typography } from 'antd';
import { connect } from "react-redux";
import { toggleAcceptApplicationModal, toggleCreateInvoiceModal } from '../../../../redux/ui/actions'
import { getWaitingApplications, restoreApplication, deleteApplication } from '../../../../redux/request/actions'
import { PaginationTable } from '../../../../components';
import notification from '../../../../components/notification';
const { Title } = Typography;

class WaitingApplicationsTable extends Component {
  state = {
    size: 5,
    page: 1,
    sort_by: "priority desc",
    class_id: undefined,
    search_text: undefined
  }
  componentDidMount() {
    this.setState({
      class_id: this.props.class_id
    }, () => this.handleRefershTable());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.class_id !== this.state.class_id) {
      this.setState({
        class_id: nextProps.class_id
      }, () => this.handleRefershTable());
    }
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
        width: 160
      },
      {
        title: 'Student Name',
        dataIndex: 'student.full_name',
        key: 'student.full_name',
        sorter: true,
        width: 200,
        render: (text, object, index) => (
          <Link to={`/app/student/view/${object.student_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.student.full_name}
          </Link>
        ),
      },
      {
        title: 'Student Birthday',
        dataIndex: 'student.birthday',
        key: 'student.birthday',
        sorter: true,
      },
      {
        title: 'Student Age',
        dataIndex: 'student.age_year',
        key: 'student.age_year',
        sorter: true,
      },
      {
        title: 'Parent Name',
        dataIndex: 'student.customer.full_name',
        key: 'student.customer.full_name',
        sorter: true,
        width: 200,
        render: (text, object, index) => (
          <Link to={`/app/parent/view/${object.student.customer_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.student.customer.full_name}
          </Link>
        ),
      },
      {
        title: 'Contact',
        dataIndex: 'student.customer.mobile_phone_number',
        key: 'student.customer.mobile_phone_number',
        sorter: true,
      },
      {
        title: 'Email',
        dataIndex: 'student.customer.email',
        key: 'student.customer.email',
        sorter: true,
        render: (text, object, index) => (
          <a href={`mailto:${object.student.customer.email}`}>{object.student.customer.email}</a>
        ),
      },
      {
        title: 'Priority',
        key: 'priority',
        sorter: true,
        render: (text, object, index) => (
          object.priority === 0 ? 'Normal' : 'High'
        ),
      },
      {
        title: 'Remark',
        dataIndex: 'application_remark',
        key: 'application_remark',
        sorter: true,
      },
      {
        title: '',
        key: 'operation',
        sorter: false,
        width: 250,
        render: (text, object, index) => {
          if (object.status === "WAITING") {
            return <div>
              <Link to={`/app/application/edit/${object.id}`}>
                <Button icon="edit" style={{ marginRight: 3, marginBottom: 3 }} />
              </Link>
              <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }} onClick={() => this.handleAcceptApplication(object)}>
                Accept
                </Button>
              <Popconfirm title="Are you sure delete this application?" onConfirm={() => this.handleDeleteApplication(object.id)} okText="Yes" cancelText="No">
                <Button type="danger" style={{ marginRight: 3, marginBottom: 3 }}>
                  Delete
              </Button>
              </Popconfirm>
            </div>
          } else if (object.status === "RESERVED" && object.invoice_id === null) {
            return <div>
              <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }} onClick={() => this.handleCreateInvoice(object)}>
                Create Invoice
              </Button>
              <Popconfirm title="Are you sure restore this application?" onConfirm={() => this.handleRestoreApplicationToWaitingList(object.id)} okText="Yes" cancelText="No">
                <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }}>
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
    // if (sort_by) {
    //   let sortCol = sort_by.split(" ")[0];
    //   let sortDirection = sort_by.split(" ")[1];
    //   if (sortCol === "student.full_name") {
    //     sort_by = `student.last_name ${sortDirection},student.first_name ${sortDirection}`;
    //   }
    //   if (sortCol === "student.customer.full_name") {
    //     sort_by = `student.customer.last_name ${sortDirection},student.customer.first_name ${sortDirection}`;
    //   }
    // }
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
    const { getWaitingApplications } = this.props;
    const { page, size, sort_by, search_text, class_id } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['student.customer', 'class'],
      search_text,
      class_id,
    };
    getWaitingApplications({ params });
  }

  handleAcceptApplication(application) {
    const { toggleAcceptApplicationModal } = this.props;
    toggleAcceptApplicationModal({ open: true, application_id: application.id });
  }

  handleRestoreApplicationToWaitingList(applicationId) {
    const { restoreApplication } = this.props;
    restoreApplication({ id: applicationId });
  }

  handleDeleteApplication(applicationId) {
    const { deleteApplication } = this.props;
    deleteApplication({ id: applicationId });
  }

  handleCreateInvoice(application) {
    const { toggleCreateInvoiceModal } = this.props;
    toggleCreateInvoiceModal({ open: true, studentId: application.student.id, student: application.student, applicationIds: [application.id], totalAmount: application.net_amount });
  }

  handleNewApplication = () => {
    this.props.history.push(`/app/application/create?classId=${this.props.class_id}`);
  }

  render() {
    const { getWaitingApplicationsResponse } = this.props;
    return (
      <PaginationTable bordered
        title={() => <Row type="flex" justify="space-between">
          <Col span={4}><Title level={4}>Waiting Applications</Title></Col>
          <Col span={4}>
            <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleNewApplication}>
              New Application
          </Button>
          </Col>
        </Row>
        }
        response={getWaitingApplicationsResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
    );
  }
}

export default connect(
  state => ({
    getWaitingApplicationsResponse: state.getWaitingApplications,
    reserveApplicationResponse: state.reserveApplication,
    restoreApplicationResponse: state.restoreApplication,
    deleteApplicationResponse: state.deleteApplication,
  }),
  {
    getWaitingApplications,
    restoreApplication,
    deleteApplication,
    toggleAcceptApplicationModal,
    toggleCreateInvoiceModal,
  }
)(withRouter(WaitingApplicationsTable));
