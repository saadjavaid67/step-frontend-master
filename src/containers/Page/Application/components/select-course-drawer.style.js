import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../../../settings/withDirection';

const WDCardWrapper = styled.div`
    .ant-list-item-meta-content {
        -webkit-box-flex: 1;
        -webkit-flex: 1 0;
        -ms-flex: 1 0;
        flex: 1 0;
    }
    .ant-list-item:hover{
        background: ${palette('secondary', 8)};
        cursor: pointer;
    }
    .ant-list-item.selected{
        background: ${palette('secondary', 8)};
        cursor: pointer;
    }
    .item-header-title{
        width: 70px;
        display: inline-block;
    }
    .item-header-selected{
        font-size: 10px;
        font-weight: 900;
        margin-left: 10px;
    }
    .option-label{
        margin-bottom: 5px;
    }
`;
const CardWrapper = WithDirection(WDCardWrapper);

export { CardWrapper };