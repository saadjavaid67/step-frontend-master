import { Table, } from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllApplicationSessionBySpecification } from '../../../redux/request/actions'
import { Link } from 'react-router-dom';

class PageComponent extends Component {
    componentDidMount() {
        const { getAllApplicationSessionBySpecification } = this.props;
        let params = {
            size: 20,
            page: 1,
            sort: "start_date desc",
            studentId: this.props.student.id,
        }
        getAllApplicationSessionBySpecification({ params });
    }

    tableColumns = () => {
        return [
            {
                title: 'Date',
                dataIndex: 'session.start_date',
                key: 'created_at',
            },
            {
                title: 'Class Name',
                dataIndex: 'class.name',
                key: 'class.name',
                render: (text, object, index) => {
                    if (object.class) {
                        return (
                          <Link to={`/classSchedule/${object.class_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
                              {object.class.name}
                          </Link>
                        )
                    } else {
                        return;
                    }
                }
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                sorter: true,
                defaultSortOrder: 'ascend',
            },
            {
                title: 'Doctor Cert',
                dataIndex: 'doctor_cert_file',
                key: 'doctor_cert_file',
                render: (text, object, index) => {
                    if(object.doctor_cert_file){
                        return <img alt='doctor cert' src={object.doctor_cert_file}/>
                    }
                    return <p></p>
                },
            },
        ];
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log("pagination", pagination, "filters", filters, "sorter", sorter);
        const { getAllApplicationSessionBySpecification } = this.props;
        let params = {
            size: pagination.pageSize,
            page: pagination.current,
            sort: sorter.columnKey ? (sorter.columnKey + " " + (sorter.order === "ascend" ? "asc" : "desc")) : null
        }
        getAllApplicationSessionBySpecification({ params });
        this.setState({ sorter });
    }

    handleReloadTable = () => {
        const { getAllApplicationSessionBySpecification } = this.props;
        let params = {
            size: 20,
            page: 1,
            sort: "created_at desc",
            studentId: this.props.student.id,
        }
        getAllApplicationSessionBySpecification({ params });
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
        response: state.getAllApplicationSessionBySpecification.data,
        loading: state.getAllApplicationSessionBySpecification.isFetching,
    }),
    {
        getAllApplicationSessionBySpecification,
    }
)(PageComponent);
