import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input, Popconfirm, Table } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { toggleCreateInvoicePaymentModal } from '../../../redux/ui/actions'
import { getAllInvoice, deleteInvoice } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable } from '../../../components';
import SendInvoiceButton from './components/send-invoice-button'
import notification from '../../../components/notification';

const { Search } = Input;

class PageComponent extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "invoice_number desc",
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.deleteInvoiceResponse.isFetching && !nextProps.deleteInvoiceResponse.isFetching && nextProps.deleteInvoiceResponse.success && nextProps.deleteInvoiceResponse.data) {
      notification('success', 'Successfully', 'Invoice successfully deleted');
      this.handleRefershTable();
    }
    if (this.props.deleteInvoiceResponse.isFetching && !nextProps.deleteInvoiceResponse.isFetching && nextProps.deleteInvoiceResponse.error) {
      notification('error', 'Error', nextProps.deleteInvoiceResponse.error.errorCode);
    }

    if (this.props.createPaymentAndPayInvoiceResponse.isFetching && !nextProps.createPaymentAndPayInvoiceResponse.isFetching && nextProps.createPaymentAndPayInvoiceResponse.success && nextProps.createPaymentAndPayInvoiceResponse.data) {
      this.handleRefershTable();
    }
  }

  tableColumns = () => {
    return [
      {
        title: 'Invoice No.',
        dataIndex: 'invoice_number',
        key: 'invoice_number',
        sorter: true,
        defaultSortOrder: 'descend',
      },
      {
        title: 'Invoice Date',
        dataIndex: 'invoice_date',
        key: 'invoice_date',
        sorter: true,
      },
      {
        title: 'Parent Name',
        dataIndex: 'customer.full_name',
        key: 'customer.full_name',
        sorter: true,
        render: (text, object, index) => (
          <Link to={`/app/parent/view/${object.customer.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.customer.full_name}
          </Link>
        ),
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
        title: 'Amount',
        dataIndex: 'net_amount',
        key: 'net_amount',
        sorter: true,
      },
      {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
        sorter: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        rowKey: 'status',
        width: 100,
        sorter: true,
      },
      {
        title: 'Sent Email At',
        dataIndex: 'sent_email_at',
        key: 'sent_email_at',
        sorter: true,
      },
      {
        title: 'Last Update',
        dataIndex: 'updated_at',
        key: 'updated_at',
        sorter: true,
      },
      {
        title: '',
        dataIndex: 'view',
        rowKey: 'view',
        width: 300,
        render: (text, invoice) => (
          <div className="isoInvoiceBtnView">
            <Link to={`invoice/view/${invoice.id}`} target="_blank">
              <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }}>
                View
              </Button>
            </Link>
            <a href={invoice.public_url} target="_blank">
              <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }}>
                Public URL
              </Button>
            </a>
            {
              invoice.customer.email ?
                <SendInvoiceButton invoice={invoice} handleSendEmailSuccess={this.handleRefershTable} />
                : null
            }
            {
              invoice.status === "OPEN" || invoice.status === "PARTIAL" ?
                <Button  type="primary" style={{ marginRight: 3, marginBottom: 3 }} onClick={() => this.props.toggleCreateInvoicePaymentModal({ open: true, invoice: invoice })}>
                  Pay
                  </Button>
                : null
            }
            {
              invoice.status === "OPEN" ?
                <Popconfirm title="Are you sure delete this invoice?" onConfirm={() => this.handleDeleteInvoice(invoice.id)} okText="Yes" cancelText="No">
                  <Button type="danger" style={{ marginRight: 3, marginBottom: 3 }}>
                    Delete
                  </Button>
                </Popconfirm>
                : null
            }
          </div>
        ),
      },
    ];
  }

  expandedRowRender = (record) => {
    const columns = [
      {
        title: 'Receipt No.',
        dataIndex: 'payment_detail_number',
        key: 'payment_detail_number',
        sorter: true,
        defaultSortOrder: 'descend',
      },
      {
        title: 'Receipt Date',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        sorter: true,
      },
      {
        title: 'Paid',
        dataIndex: 'amount',
        key: 'amount',
        sorter: true,
      },
      {
        title: '',
        dataIndex: 'view',
        rowKey: 'view',
        width: 250,
        render: (text, receipt) => (
          <div className="isoInvoiceBtnView">
            <Link to={`/app/receipt/view/${receipt.id}`} target="_blank">
              <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }}>
                View
              </Button>
            </Link>
            <a href={`${process.env.REACT_APP_API_URL}/api/v1/invoice/downloadReceiptByPaymentDetailId/${receipt.id}`} download>
              <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }}>
                Download
                  </Button>
            </a>
          </div>
        ),
      },
    ];
    return <Table columns={columns} dataSource={record.payment_details} pagination={false} />;
  };

  searchFormRef = (form) => {
    this.searchForm = form;
  }

  handleTableChange = (page, size, sort_by) => {
    // if (sort_by) {
    //   let sortCol = sort_by.split(" ")[0];
    //   let sortDirection = sort_by.split(" ")[1];
    //   if (sortCol === "customer.full_name") {
    //     sort_by = `customer.last_name ${sortDirection},customer.first_name ${sortDirection}`;
    //   }
    //   if (sortCol === "student.full_name") {
    //     sort_by = `student.last_name ${sortDirection},student.first_name ${sortDirection}`;
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
    const { getAllInvoice } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['customer', 'student', 'payment_details'],
      search_text
    };
    getAllInvoice({ params });
  }

  handleDeleteInvoice = (id) => {
    const { deleteInvoice, intl } = this.props;
    deleteInvoice({ id, intl });
  }

  render() {
    const { getAllInvoiceResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Invoice
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Search
              placeholder="Keyword Search (Invoice Number / Parent Name / Student Name)"
              onSearch={this.handleSearchKeyword}
              enterButton
              style={{ width: 480 }}
            />
          </ActionContainer>
          <PaginationTable response={getAllInvoiceResponse} tableColumns={this.tableColumns()} expandedRowRender={record => this.expandedRowRender(record)} handleTableChange={this.handleTableChange} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllInvoiceResponse: state.getAllInvoice,
    deleteInvoiceResponse: state.deleteInvoice,
    createPaymentAndPayInvoiceResponse: state.createPaymentAndPayInvoice,
  }),
  {
    toggleCreateInvoicePaymentModal,
    deleteInvoice,
    getAllInvoice,
  }
)(PageComponent);
