import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutContent from '../../../components/utility/layoutContent';
import { Skeleton, } from 'antd';
import Tabs, { TabPane } from '../../../components/uielements/tabs';
import Button from "../../../components/uielements/button";
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import { Link } from 'react-router-dom';
import PageHeader from '../../../components/utility/pageHeader';
import BaseInfoView from "./components/base-info-view";
import InvoiceView from "./invoiceView";
import ReceiptView from "./receiptView";
import { getCustomer } from '../../../redux/request/actions';
import StudentsTable from "./components/students-table";

function Page(props) {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("base-info");

    // Mount & Unmount
    const customerId = props.match.params.customerId;
    useEffect(() => {
        dispatch(getCustomer({
            id: customerId,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const customer = useSelector(state => state.getCustomer.data);
    const customerLoading = useSelector(state => state.getCustomer.isFetching);
    if (customerLoading || !customer) {
        return <LayoutWrapper>
            <PageHeader>
                Parent
      </PageHeader>
            <LayoutContent>
                <Skeleton active />
            </LayoutContent>
        </LayoutWrapper>
    }
    return (
        <LayoutWrapper>
            <PageHeader>
                Parent
                </PageHeader>
            <LayoutContent>
                <div className="isoContactControl">
                    <Link to={`/app/parent`}>
                        <Button
                            icon="left"
                            style={{ margin: '8px' }}
                        />
                    </Link>

                    <Link to={`/app/parent/edit/${customer.id}`}>
                        <Button
                            style={{ margin: '8px' }}
                        >Edit</Button>
                    </Link>
                </div>
                <Tabs className="isoTableDisplayTab" onChange={(tabIndex) => setActiveTab(tabIndex)}>
                    <TabPane tab={'Base Info'} key="base-info">
                        <BaseInfoView customer={customer} />
                    </TabPane>
                    <TabPane tab={'Student'} key="student">
                        <StudentsTable customer_id={customer.id} activeTab={activeTab} />
                    </TabPane>
                    <TabPane tab={'Invoice'} key="invoice">
                        <InvoiceView customer={customer} activeTab={activeTab} />
                    </TabPane>
                    <TabPane tab={'Receipt'} key="receipt">
                        <ReceiptView customer={customer} activeTab={activeTab} />
                    </TabPane>
                </Tabs>
            </LayoutContent>
        </LayoutWrapper>
    );
}
export default Page;