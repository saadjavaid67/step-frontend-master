import { Button } from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { toggleCreateStudentRemarkModal } from '../../../../redux/ui/actions'
import { getAllStudentRemarkForStudentDetail, getApplicationSessionRemarksByStudentId } from '../../../../redux/request/actions'
import { ActionContainer, PaginationTable } from '../../../../components';

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

  componentWillReceiveProps(nextProps){
    if(this.props.createStudentRemarkResponse.isFetching && !nextProps.createStudentRemarkResponse.isFetching && nextProps.createStudentRemarkResponse.success){
      this.handleRefershTable();
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
        title: 'Incident',
        dataIndex: 'remark',
        key: 'remark',
        sorter: true,
      },
    ];
  }

  searchFormRef = (form) => {
    this.searchForm = form;
  }

  handleTableChange = (page, size, sort_by) => {
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
    const { getAllStudentRemarkForStudentDetail, getApplicationSessionRemarksByStudentId, student } = this.props;
    const { page, size, sort_by, search_text, applicationRemarkPage, applicationRemarkSize, applicationRemarkSort_by } = this.state;

    getAllStudentRemarkForStudentDetail({ params: {
      page,
      size,
      sort_by,
      search_text,
      student_id: student.id
    }});

    getApplicationSessionRemarksByStudentId({ params: {
      page: applicationRemarkPage,
      size: applicationRemarkSize,
      sort_by: applicationRemarkSort_by,
      search_text,
      student_id: student.id
    }});
  }

  openCreateStudentRemarkModal = () => {
    const { student, toggleCreateStudentRemarkModal } = this.props;
    toggleCreateStudentRemarkModal({
      open: true,
      student: student,
    });
  }

  render() {
    const { getAllStudentRemarkForStudentDetailResponse, getApplicationSessionRemarksByStudentIdResponse } = this.props;
    return (
      <div>
        <ActionContainer>
          <Button
            type="primary"
            style={{ marginRight: '10px', marginBottom: '10px' }}
            onClick={this.openCreateStudentRemarkModal}
            >
            New Incident
          </Button>
        </ActionContainer>
        <PaginationTable response={getAllStudentRemarkForStudentDetailResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
        <PaginationTable response={getApplicationSessionRemarksByStudentIdResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleApplicationRemarkTableChange} />
      </div>
    );
  }
}

export default connect(
  state => ({
    getAllStudentRemarkForStudentDetailResponse: state.getAllStudentRemarkForStudentDetail,
    createStudentRemarkResponse: state.createStudentRemark,
    getApplicationSessionRemarksByStudentIdResponse: state.getApplicationSessionRemarksByStudentId,
  }),
  {
    getAllStudentRemarkForStudentDetail,
    toggleCreateStudentRemarkModal,
    getApplicationSessionRemarksByStudentId,
  }
)(PageComponent);
