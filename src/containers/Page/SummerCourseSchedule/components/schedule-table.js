import React from 'react';
import { Table } from 'antd';
import WithDirection from '../../../../settings/withDirection';
import styled from 'styled-components';

const TableStyle = styled.div`
    .highlight-dox{
        background: #ffebee;
    }
    th, td{
        position: relative;
    }
    .popover-triangle-right{
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 12px 12px 0;
        border-color: transparent #ff0000 transparent transparent;
        cursor: pointer;
        width: 100%;
    }
    .popover-triangle-left{
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 12px 12px 0px 0px;
        border-color: #ff0000 transparent transparent transparent;
        cursor: pointer;
    }
    .grey-triangle-left{
        border-color: #d9d9d9 transparent transparent transparent;
    }

    .pointer{
        cursor: pointer;
    }
    .action-button{
        margin-bottom: 5px;
    }
    .asq-col{
    }
    div {
        width: fit-content;
        overflow-x: visible !important;
    }
`;
const TableWrapper = WithDirection(TableStyle);

export default function ({ ...rest }) {
    return (
        <TableWrapper>
            <Table {...rest} />
        </TableWrapper>
    )
}
