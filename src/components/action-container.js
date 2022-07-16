import styled from 'styled-components';
import WithDirection from '../settings/withDirection';

const StyleWrapper = styled.div`
    margin-bottom: 10px;
`;

const ActionContainer = WithDirection(StyleWrapper);

export default ActionContainer;