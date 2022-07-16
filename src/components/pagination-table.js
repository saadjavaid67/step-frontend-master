import React from 'react';
import { Table } from 'antd';

export default function ({ tableColumns, response, handleTableChange, ...rest }) {

    function onChange(pagination, filters, sorter) {
        const page = pagination.current;
        const size = Number(pagination.pageSize);
        const sort_by = sorter.columnKey ? (sorter.columnKey + " " + (sorter.order === "ascend" ? "asc" : "desc")) : null;
        handleTableChange(page, size, sort_by);
    }

    let data = response.data;
    let pagination = data && {
        total: data.total,
        current: data.current_page,
        pageSize: Number(data.per_page),
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    };
    let loading = response.isFetching;

    return <div style={{ overflow: 'auto' }}>
        <Table
            rowKey={record => record.id}
            columns={tableColumns}
            dataSource={data && data.data}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
            size="middle"
            {...rest} />
    </div>
}