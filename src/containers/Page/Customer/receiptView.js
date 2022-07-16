import { Table, Button, } from 'antd';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllReceiptBySpecification } from '../../../redux/request/actions';

class PageComponent extends Component {
  componentDidMount() {
    const { getAllReceiptBySpecification, customer } = this.props;
    if (customer && customer.id) {
      let params = {
        size: 20,
        page: 1,
        sort: "payment_detail_number desc",
        customerId: customer.id,
      }
      getAllReceiptBySpecification({ params });
    }
  }

  tableColumns = () => {
    return [
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
      },
      {
        title: 'Invoice No.',
        dataIndex: 'invoice.display_invoice_number',
        key: 'invoice.display_invoice_number',
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
              <Button color="primary" className="invoiceViewBtn">
                View
              </Button>
            </Link>
            <a href={`${process.env.REACT_APP_API_URL}/api/v1/invoice/downloadReceiptByPaymentDetailId/${receipt.id}`} download>
              <Button color="primary" className="invoiceViewBtn">
                Download
                  </Button>
            </a>
          </div>
        ),
      },
    ];
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log("pagination", pagination, "filters", filters, "sorter", sorter);
    const { getAllReceiptBySpecification, customer } = this.props;
    if (customer) {
      let params = {
        size: pagination.pageSize,
        page: pagination.current,
        sort: sorter.columnKey ? (sorter.columnKey + " " + (sorter.order === "ascend" ? "asc" : "desc")) : null,
        customerId: customer.id,
      }
      getAllReceiptBySpecification({ params });
      this.setState({ sorter });
    }
  }

  render() {
    const { loading, response } = this.props;
    let data = [];
    let pagination = {}
    if (response) {
      data = response.data;
      pagination = {
        total: response.total,
        current: response.current_page,
        pageSize: response.per_page,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      };
    }

    return (
      <div>
        <Table
          className="components-table-demo-nested"
          rowKey={record => record.id}
          columns={this.tableColumns()}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
          size="middle" />
      </div>
    );
  }
}

export default connect(
  state => ({
    response: state.getAllReceiptBySpecification.data,
    loading: state.getAllReceiptBySpecification.isFetching,
  }),
  {
    getAllReceiptBySpecification,
  }
)(PageComponent);