import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

class DownloadInvoiceButton extends Component {
    state = {

    }

    componentDidMount() {
    }

    handleSendInvoice = (id) => {
        const { postSendInvoiceByEmail, intl } = this.props;
        postSendInvoiceByEmail({ id, intl });
    }

    render() {
        const { invoice } = this.props;
        return (
            <a href={invoice.download_url}>
                <Button style={{ marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: 3 }} />
                    Download Invoice
                    </Button>
            </a>
        );
    }
}

export default connect(
    state => ({
    }),
    {
    }
)(DownloadInvoiceButton);
