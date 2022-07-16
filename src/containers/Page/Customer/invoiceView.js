import { Table, Button, Popconfirm } from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllInvoiceBySpecification } from '../../../redux/request/actions'
import { Link } from 'react-router-dom';

class PageComponent extends Component {
  componentDidMount() {
    const { getAllInvoiceBySpecification, customer } = this.props;
    if (customer && customer.id) {
      let params = {
        size: 20,
        page: 1,
        sort: "display_invoice_number desc",
        customerId: customer.id,
      }
      getAllInvoiceBySpecification({ params });
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
        title: 'Amount',
        dataIndex: 'total_amount',
        key: 'total_amount',
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
        render: (text, invoice) => {
          return <div>
            {text}
          </div>;
        },
      },
      {
        title: '',
        dataIndex: 'view',
        rowKey: 'view',
        width: 250,
        render: (text, invoice) => (
          <div className="isoInvoiceBtnView">
            <Link to={`/app/invoice/view/${invoice.id}`} target="_blank">
              <Button color="primary" className="invoiceViewBtn">
                View
                  </Button>
            </Link>
            {'  '}
            <a href={invoice.public_url} target="_blank">
              <Button color="primary" style={{ marginRight: 3, marginBottom: 3 }}>
                Public URL
              </Button>
            </a>
            {
              invoice.state === "open" ?
                <Popconfirm title="Are you sure delete this invoice?" onConfirm={() => this.handleDeleteInvoice(invoice.id)} okText="Yes" cancelText="No">
                  <Button color="primary" className="invoiceViewBtn" style={{ marginLeft: '5px' }}>
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

  handleTableChange = (pagination, filters, sorter) => {
    console.log("pagination", pagination, "filters", filters, "sorter", sorter);
    const { getAllInvoiceBySpecification, customer } = this.props;
    if (customer) {
      let params = {
        size: pagination.pageSize,
        page: pagination.current,
        sort: sorter.columnKey ? (sorter.columnKey + " " + (sorter.order === "ascend" ? "asc" : "desc")) : null,
        customerId: customer.id,
      }
      getAllInvoiceBySpecification({ params });
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
    response: state.getAllInvoiceBySpecification.data,
    loading: state.getAllInvoiceBySpecification.isFetching,
  }),
  {
    getAllInvoiceBySpecification,
  }
)(PageComponent);