import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Popconfirm } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { postSendInvoiceByEmail } from '../../../../redux/request/apis'
import notification from '../../../../components/notification';

class SendInvoiceButton extends Component {
    state = {
        loading: false
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.sendInvoiceLoading && !nextProps.sendInvoiceLoading && nextProps.sendInvoiceFetched && nextProps.sendInvoiceResponse.invoiceId === this.props.invoice.id
        // ) {
        //     notification('info', 'Info', 'Email sent successfully!');
        // }
        // if (nextProps.sendInvoiceErrorResponse && this.props.sendInvoiceLoading && !nextProps.sendInvoiceLoading
        // ) {
        //     notification('error', 'Error', nextProps.sendInvoiceErrorResponse.message);
        // }
    }

    handleSendInvoice = async (id) => {
        this.setState({ loading: true });
        await postSendInvoiceByEmail({ id });
        this.setState({ loading: false });
        notification('info', 'Info', 'Email sent successfully!');
        if (this.props.handleSendEmailSuccess) {
            this.props.handleSendEmailSuccess();
        }
    }

    render() {
        const { invoice } = this.props;
        return (
            <Popconfirm title={`Are you sure you want to email invoice to ${invoice.customer.email}?`} onConfirm={() => this.handleSendInvoice(invoice.id)} okText="Yes" cancelText="No">
                <Button loading={this.state.loading} style={{ marginRight: 3, marginBottom: 3 }}>
                    <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: 3 }} />
                    Send By Email
                </Button>
            </Popconfirm>
        );
    }
}

export default connect(
    state => ({
    }),
    {
    }
)(SendInvoiceButton);
