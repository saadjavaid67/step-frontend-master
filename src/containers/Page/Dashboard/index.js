import { Row, Col } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import basicStyle from '../../../settings/basicStyle';
import IsoWidgetsWrapper from './components/widgets-wrapper';
import IsoWidgetBox from './components/widget-box';
import NewApplicationTable from './components/newApplicationTable';
import UnpaidInvoiceTable from './components/unpaidInvoiceTable';
import AsqReminderTable from './components/asqReminderTable';
import UnfinishedAsqTable from './components/unfinishedAsqTable';
import OverCapacitySessionsTable from './components/sessionsCapacityTable';
import { connect } from "react-redux";
import { getAllUserBySpecification } from '../../../redux/request/actions'

class PageComponent extends Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <IsoWidgetBox>
                    <h3 className="isoWidgetLabel" style={{marginBottom: '10px'}}>Waiting</h3>
                    <NewApplicationTable />
                </IsoWidgetBox>
              </IsoWidgetsWrapper>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <IsoWidgetBox>
                    <h3 className="isoWidgetLabel" style={{marginBottom: '10px'}}>Unpaid Invoice</h3>
                    <UnpaidInvoiceTable />
                </IsoWidgetBox>
              </IsoWidgetsWrapper>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <IsoWidgetBox>
                    <h3 className="isoWidgetLabel" style={{marginBottom: '10px'}}>ASQ Now</h3>
                    <AsqReminderTable />
                </IsoWidgetBox>
              </IsoWidgetsWrapper>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <IsoWidgetBox>
                    <h3 className="isoWidgetLabel" style={{marginBottom: '10px'}}>Unfinished ASQ</h3>
                    <UnfinishedAsqTable />
                </IsoWidgetBox>
              </IsoWidgetsWrapper>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <IsoWidgetBox>
                    <h3 className="isoWidgetLabel" style={{marginBottom: '10px'}}>Over Capacity Sessions</h3>
                    <OverCapacitySessionsTable />
                </IsoWidgetBox>
              </IsoWidgetsWrapper>
            </Col>
          </Row>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    response: state.getAllUserBySpecification.data,
    loading: state.getAllUserBySpecification.isFetching,
  }),
  {
    getAllUserBySpecification,
  }
)(PageComponent);
