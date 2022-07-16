import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getOverCapacitySessions } from '../../../../redux/request/actions'
import { PaginationTable } from '../../../../components';

class SessionCapacityTable extends Component {
  state = {
    size: 5,
    page: 1,
    sort_by: "start_date asc",
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  tableColumns = () => {
    return [
      {
        title: 'Class Name',
        dataIndex: 'class.name',
        key: 'class.name',
        sorter: true,
        render: (text, object, index) => (
          <Link to={`/app/classSchedule/${object.class.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.class.name}
          </Link>
        ),
      },
      {
        title: 'Date',
        dataIndex: 'start_date',
        key: 'start_date',
        sorter: true,
      },
      {
        title: 'Application Count',
        dataIndex: 'application_sessions_count',
        key: 'application_sessions_count',
        sorter: true
      },
      {
        title: 'Capacity',
        dataIndex: 'capacity',
        key: 'capacity',
        sorter: true,
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
      if(sortCol === "age"){
        sort_by = `birthday ${sortDirection}`;
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
    const { getOverCapacitySessions } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['class'],
      search_text
    };
    getOverCapacitySessions({ params });
  }

  render() {
    const { getOverCapacitySessionsResponse } = this.props;
    return (
      <PaginationTable response={getOverCapacitySessionsResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
    );
  }
}

export default connect(
  state => ({
    getOverCapacitySessionsResponse: state.getOverCapacitySessions,
  }),
  {
    getOverCapacitySessions,
  }
)(SessionCapacityTable);