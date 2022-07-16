import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllInvoiceBySpecification } from '../../../../redux/request/actions'

class NewApplicationTable extends Component {
  componentDidMount() {
    const { getAllInvoiceBySpecification } = this.props;
    let params = {
      size: 5,
      page: 1,
      sort: "created_at asc",
      unpaid: true,
    }
    getAllInvoiceBySpecification({ params });
  }

  tableColumns = () => {
    return [
      {
        title: 'Invoice No.',
        dataIndex: 'invoice_number',
        key: 'invoice_number',
        render: (text, object, index) => (
          <Link to={`/app/invoice/view/${object.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.invoice_number}
          </Link>
        ),
      },
      {
        title: 'Invoice Date',
        dataIndex: 'invoice_date',
        key: 'invoice_date',
      },
      {
        title: 'Total Amount',
        dataIndex: 'total_amount',
        key: 'total_amount',
      },
    ];
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log("pagination", pagination, "filters", filters, "sorter", sorter);
    const { getAllInvoiceBySpecification } = this.props;
    let params = {
      size: pagination.pageSize,
      page: pagination.current,
      sort: sorter.columnKey ? (sorter.columnKey + " " + (sorter.order === "ascend" ? "asc" : "desc")) : null,
      unpaid: true,
    }
    getAllInvoiceBySpecification({ params });
    this.setState({ sorter });
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
      <Table
        className="components-table-demo-nested"
        rowKey={record => record.id}
        columns={this.tableColumns()}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
        size="middle" />
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
)(NewApplicationTable);