import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllStudent } from '../../../redux/request/actions'
import { ActionContainer, PaginationTable, BooleanDisplay } from '../../../components';

const { Search } = Input;

class PageComponent extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "full_name asc",
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
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
        title: 'Contact',
        dataIndex: 'customer.mobile_phone_number',
        key: 'customer.mobile_phone_number',
        sorter: true,
        render: (text, object, index) => object.customer.mobile_phone_number
      },
      {
        title: 'Email',
        dataIndex: 'customer.email',
        key: 'customer.email',
        sorter: true,
        render: (text, object, index) => (
          <a href={`mailto:${object.customer.email}`}>{object.customer.email}</a>
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
        title: 'Terms and Conditions',
        dataIndex: 'agreed_terms_and_conditions',
        key: 'agreed_terms_and_conditions',
        sorter: true,
        render: (text, object, index) => <BooleanDisplay value={object.agreed_terms_and_conditions} />
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, object, index) => (
          <>
            <Link to={`/app/student/edit/${object.id}`}>
              <Button icon="edit" />
            </Link>
            <Link to={`/app/student/view/${object.id}`}>
              <Button icon="eye" style={{ marginLeft: 5 }} />
            </Link>
          </>
        ),
      },
    ];
  }

  searchFormRef = (form) => {
    this.searchForm = form;
  }

  handleTableChange = (page, size, sort_by) => {
    // if (sort_by) {
    //   let sortCol = sort_by.split(" ")[0];
    //   let sortDirection = sort_by.split(" ")[1];
    //   if (sortCol === "full_name") {
    //     sort_by = `last_name ${sortDirection},first_name ${sortDirection}`;
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
    const { getAllStudent } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['customer'],
      search_text
    };
    getAllStudent({ params });
  }

  render() {
    const { getAllStudentResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Student
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/student/create">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add Student
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
          <PaginationTable response={getAllStudentResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllStudentResponse: state.getAllStudent,
  }),
  {
    getAllStudent,
  }
)(PageComponent);
