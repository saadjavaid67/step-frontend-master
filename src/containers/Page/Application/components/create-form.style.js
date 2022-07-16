import styled from 'styled-components';

const FormStyle = styled.div`
  width: 100%;
  background-color: #ffffff;
  height: 100%;
  .ant-row::before, .ant-row::after {
    content: "" !important;
    display: table !important;
  }
  .ant-row::after {
      clear: both !important;
  }
  .steps-content{
      margin-top: 40px;
  }
  .steps-action{
      text-align: center;
  }
  .course-detail{
      display: block;
      margin-top: 5px;
      margin-bottom: 5px;
  }
  .course-detail-title{
      font-size: 14px;
      display: inline-block;
      margin-right: 5px;
  }
  .course-detail-value{
      font-size: 14px;
      display: inline-block;
  }
  .ant-form-item-control{
      height: 58px;
  }
`;

export default FormStyle;