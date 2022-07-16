import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input, Popconfirm } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { toggleAcceptApplicationModal, toggleCreateInvoiceModal } from '../../../redux/ui/actions'
import { getAllApplication, restoreApplication, deleteApplication } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable } from '../../../components';
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
        title: 'Student Name',
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
        title: 'Parent Name',
        dataIndex: 'student.customer.full_name',
        key: 'student.customer.full_name',
        sorter: true,
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
        title: 'Class Code',
        dataIndex: 'class.name',
        key: 'class.name',
        sorter: true,
        render: (text, object, index) => {
          if (object.class.course.type === "GENERAL") {
            return <Link to={`/app/classSchedule/${object.class_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
              {object.class.name}
            </Link>
          } else {
            return <Link to={`/app/campSchedule/${object.class.course_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
              {object.class.name}
            </Link>
          }
        }
      },
      {
        title: 'Priority',
        key: 'priority',
        sorter: true,
        render: (text, object, index) => {
          let priority = "Normal";
          if (object.priority === -1) {
            priority = "Low";
          } else if (object.priority === 1) {
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
              <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }} onClick={() => this.handleAcceptApplication(object)}>
                Accept
                </Button>
              <Popconfirm title="Are you sure delete this application?" onConfirm={() => this.handleDeleteApplication(object.id)} okText="Yes" cancelText="No">
                <Button type="danger" style={{ marginRight: 3, marginBottom: 3 }}>
                  Delete
              </Button>
              </Popconfirm>
              <Link to={`/app/application/edit/${object.id}`}>
                <Button icon="edit" style={{ marginRight: 3, marginBottom: 3 }} />
              </Link>
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
              <Link to={`/app/application/edit/${object.id}`}>
                <Button icon="edit" style={{ marginRight: 3, marginBottom: 3 }} />
              </Link>
            </div>
          } else {
            return <Link to={`/app/application/edit/${object.id}`}>
              <Button icon="edit" style={{ marginRight: 3, marginBottom: 3 }} />
            </Link>
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
  const { getAllApplication } = this.props;
  const { page, size, sort_by, search_text } = this.state;
  const params = {
    page,
    size,
    sort_by,
    with_model: ['student.customer', 'class.course'],
    search_text
  };
  getAllApplication({ params });
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
  const { getAllApplicationResponse } = this.props;
  return (
    <LayoutWrapper>
      <PageHeader>
        Application
        </PageHeader>
      <LayoutContent>
        <ActionContainer>
          <Link to="/app/application/create">
            <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
              Add Application
            </Button>
          </Link>
        </ActionContainer>
        <ActionContainer>
          <Search
            placeholder="Keyword Search (Student Name / Parent Name / Contact / Email)"
            onSearch={this.handleSearchKeyword}
            enterButton
            style={{ width: 480 }}
          />
        </ActionContainer>
        <PaginationTable response={getAllApplicationResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
      </LayoutContent>
    </LayoutWrapper>
  );
}
}

export default connect(
  state => ({
    getAllApplicationResponse: state.getAllApplication,
    reserveApplicationResponse: state.reserveApplication,
    restoreApplicationResponse: state.restoreApplication,
    deleteApplicationResponse: state.deleteApplication,
  }),
  {
    getAllApplication,
    restoreApplication,
    deleteApplication,
    toggleAcceptApplicationModal,
    toggleCreateInvoiceModal,
  }
)(PageComponent);
