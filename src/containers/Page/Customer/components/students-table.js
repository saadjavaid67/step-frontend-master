import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from "react-redux";
import { getStudentsForCustomerDetail } from '../../../../redux/request/actions'
import { PaginationTable } from '../../../../components';

class StudentTable extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "full_name asc",
    customer_id: undefined,
    search_text: undefined
  }
  componentDidMount() {
    this.setState({
      customer_id: this.props.customer_id
    }, () => this.handleRefershTable());
  }

  tableColumns = () => {
    return [
      {
        title: 'Student Name',
        dataIndex: 'full_name',
        key: 'full_name',
        sorter: true,
        defaultSortOrder: 'ascend',
        render: (text, object, index) => (
          <Link to={`/app/student/view/${object.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.full_name}
          </Link>
        ),
      },
      {
        title: 'Relationship',
        dataIndex: 'guardian_relationship',
        key: 'guardian_relationship',
        sorter: true,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        sorter: true,
      },
      {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday',
        sorter: true,
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, object, index) => (
          <Link to={`/app/student/edit/${object.id}`}>
            <Button icon="edit" />
          </Link>
        ),
      },
    ];
  }

  searchFormRef = (form) => {
    this.searchForm = form;
  }

  handleTableChange = (page, size, sort_by) => {
    if(sort_by){
      let sortCol = sort_by.split(" ")[0];
      let sortDirection = sort_by.split(" ")[1];
      if(sortCol === "full_name"){
        sort_by = `last_name ${sortDirection},first_name ${sortDirection}`;
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
    const { getStudentsForCustomerDetail } = this.props;
    const { page, size, sort_by, search_text, customer_id } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: [],
      search_text,
      customer_id,
    };
    getStudentsForCustomerDetail({ params });
  }

  render() {
    const { getStudentsForCustomerDetailResponse } = this.props;
    return (
      <PaginationTable response={getStudentsForCustomerDetailResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
    );
  }
}

export default connect(
  state => ({
    getStudentsForCustomerDetailResponse: state.getStudentsForCustomerDetail,
  }),
  {
    getStudentsForCustomerDetail,
  }
)(StudentTable);