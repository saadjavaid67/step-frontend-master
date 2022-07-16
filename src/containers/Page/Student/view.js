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
import ApplicationsTable from "./components/applications-table";
import StudentAsqsTable from "./components/student-asqs-table";
import RemarkTable from "./components/remark-table";
import StudentApplicationSessionView from "./studentApplicationSessionView";
import { getStudent } from '../../../redux/request/actions';

function Page(props) {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("#base-info-tab");

    // Mount & Unmount
    var hash = props.location.hash;
    const studentId = props.match.params.studentId;
    useEffect(() => {
        const params = {
            with_model: ['customer', 'emergency_contacts']
          };
        dispatch(getStudent({
            id: studentId,
            params
        }));
        if (hash) {
            setActiveTab(hash);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash])

    const student = useSelector(state => state.getStudent.data);
    const studentLoading = useSelector(state => state.getStudent.isFetching);
    if (studentLoading || !student) {
        return <LayoutWrapper>
            <PageHeader>
                Student
      </PageHeader>
            <LayoutContent>
                <Skeleton active />
            </LayoutContent>
        </LayoutWrapper>
    }
    return (
        <LayoutWrapper>
            <PageHeader>
                Student
                </PageHeader>
            <LayoutContent>
            <div className="isoContactControl">
                    <Link to={`/app/student`}>
                        <Button
                            icon="left"
                            style={{ margin: '8px' }}
                        >
                            Back
                                    </Button>
                    </Link>

                    <Link to={`/app/student/edit/${student.id}`}>
                        <Button
                            style={{ margin: '8px' }}
                        >Edit</Button>
                    </Link>
                </div>
                <Tabs className="isoTableDisplayTab" onChange={(tabIndex) => setActiveTab(tabIndex)} defaultActiveKey={activeTab}>
                    <TabPane tab="Base Info" key="#base-info-tab">
                        <BaseInfoView student={student} activeTab={activeTab} />
                    </TabPane>
                    <TabPane tab="Applications" key="#application-tab">
                        <ApplicationsTable student_id={student.id} activeTab={activeTab} />
                    </TabPane>
                    <TabPane tab="ASQ Record" key="#asq-tab">
                        <StudentAsqsTable student_id={student.id} activeTab={activeTab} />
                    </TabPane>
                    <TabPane tab={'Incident'} key="#remark-tab">
                        <RemarkTable student={student} activeTab={activeTab} />
                    </TabPane>
                    <TabPane tab={'Session'} key="#session-tab">
                        <StudentApplicationSessionView student={student} activeTab={activeTab} />
                    </TabPane>
                </Tabs>
            </LayoutContent>
        </LayoutWrapper>
    );
}
export default Page;