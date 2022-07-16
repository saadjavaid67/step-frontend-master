import LayoutContent from '../../../components/utility/layoutContent';
import { Table, } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllEmailRecordBySpecification } from '../../../redux/request/actions'

class PageComponent extends Component {
  componentDidMount() {
    const { getAllEmailRecordBySpecification } = this.props;
    let params = {
      size: 20,
      page: 1,
      sort: "created_at desc"
    }
    getAllEmailRecordBySpecification({ params });
  }

  tableColumns = () => {
    return [
      {
        title: 'Email To',
        dataIndex: 'mail_to',
        key: 'mail_to',
        sorter: true,
      },
      {
        title: 'Create Date',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        defaultSortOrder: 'descend',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        sorter: true,
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        key: 'remark',
        sorter: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
      },
    ];
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log("pagination", pagination, "filters", filters, "sorter", sorter);
    const { getAllEmailRecordBySpecification } = this.props;
    let params = {
      size: pagination.pageSize,
      page: pagination.current,
      sort: sorter.columnKey ? (sorter.columnKey + " " + (sorter.order === "ascend" ? "asc" : "desc")) : null
    }
    getAllEmailRecordBySpecification({ params });
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
      <LayoutWrapper>
        <PageHeader>
          Email Record
        </PageHeader>
        <LayoutContent>
          <Table
            className="components-table-demo-nested"
            rowKey={record => record.id}
            columns={this.tableColumns()}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
            size="middle" />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    response: state.getAllEmailRecordBySpecification.data,
    loading: state.getAllEmailRecordBySpecification.isFetching,
  }),
  {
    getAllEmailRecordBySpecification,
  }
)(PageComponent);