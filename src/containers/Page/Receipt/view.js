import LayoutContent from '../../../components/utility/layoutContent';
import { Button, Skeleton } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getReceiptById, } from '../../../redux/request/actions'

class PageComponent extends Component {
    componentWillMount() {
        var params = this.props.match.params;
        var id = params.id;
        console.log(id);
        this.props.getReceiptById({ id });
    }

    render() {
        const { response, loading, } = this.props;
        if (loading || !response) {
            return (
                <LayoutWrapper>
                    <PageHeader>
                        Receipt
                    </PageHeader>
                    <LayoutContent>
                        <Skeleton active />
                    </LayoutContent>
                </LayoutWrapper>
            );
        }
        return (
            <LayoutWrapper style={{ height: '100%', flexDirection: 'column' }}>
                <PageHeader>
                    Receipt
                </PageHeader>
                <LayoutContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="PageHeader">
                        <a href={response.download_url}>
                            <Button type="primary" className="isoInvoPrint" style={{ marginRight: '10px' }}>
                                <span>Download Receipt</span>
                            </Button>
                        </a>
                    </div>
                    <br />

                    <div className="PageContent" style={{ flexDirection: 'column', flex: 1 }}>
                        <embed src={response.preview_url} style={{ height: '100%', width: '100%' }} />
                    </div>
                </LayoutContent>
            </LayoutWrapper>
        );
    }
}

export default connect(
    state => ({
        response: state.getReceiptById.data,
        loading: state.getReceiptById.isFetching,
    }),
    {
        getReceiptById,
    }
)(PageComponent);