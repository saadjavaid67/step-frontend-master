import LayoutContent from '../../../components/utility/layoutContent';
import { Skeleton } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getInvoiceById, } from '../../../redux/request/actions'
import DownloadInvoiceButton from './components/download-invoice-button'
import SendInvoiceButton from './components/send-invoice-button'

class PageComponent extends Component {
    componentWillMount() {
        var params = this.props.match.params;
        var id = params.id;
        console.log(id);
        this.props.getInvoiceById({ params: { id } });
    }


    render() {
        const { invoice, loading, } = this.props;

        if (loading || !invoice) {
            return (
                <LayoutWrapper>
                    <PageHeader>
                        Invoice
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
                    Invoice
                </PageHeader>
                <LayoutContent style={{ flex: 1, display: 'flex',flexDirection: 'column' }}>
                    <div className="PageHeader">
                        <DownloadInvoiceButton invoice={invoice} />
                        <SendInvoiceButton invoice={invoice} />
                    </div>
                    <br />

                    <div className="PageContent" style={{ flexDirection: 'column', flex: 1 }}>
                        <embed src={invoice.preview_url} style={{ height: '100%', width: '100%' }} />
                    </div>
                </LayoutContent>
            </LayoutWrapper>
        );
    }
}

export default connect(
    state => ({
        invoice: state.getInvoiceById.data,
        loading: state.getInvoiceById.isFetching,
    }),
    {
        getInvoiceById,
    }
)(PageComponent);