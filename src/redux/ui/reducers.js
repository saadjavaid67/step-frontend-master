import * as cons from './constants'
import { uiReducerMaker } from './helper'
import { getAccessToken } from '../../helpers/auth';
const authInfo = ( state = { accessToken: getAccessToken() } , action) => uiReducerMaker(cons.AUTH_INFO,state,action);
const toggleSelectCourseDrawer = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_SELECT_COURSE_DRAWER,state,action);
const toggleUpdateApplicationSessionModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_UPDATE_APPLICATION_SESSION_MODAL,state,action);
const toggleUpdateApplicationSessionByDayModal = ( state = { open: false, session: {} } , action) => uiReducerMaker(cons.TOGGLE_UPDATE_APPLICATION_SESSION_BY_DAY_MODAL,state,action);
const toggleUpdateStatusModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_UPDATE_STATUS_MODAL,state,action);
const toggleRescheduleSessionModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_RESCHEDULE_SESSION_MODAL,state,action);
const toggleRescheduleApplicationSessionModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_RESCHEDULE_APPLICATION_SESSION_MODAL,state,action);
const toggleReserveApplicationModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_RESERVE_APPLICATION_MODAL,state,action);
const toggleCreateStudentRemarkModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_CREATE_STUDENT_REMARK_MODAL,state,action);
const togglePayInvoiceModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_PAY_INVOICE_MODAL,state,action);
const toggleCreateStudentAsqModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_CREATE_STUDENT_ASQ_MODAL,state,action);
const toggleCreateInvoiceModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_CREATE_INVOICE_MODAL,state,action);
const toggleCancelSessionModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLE_CANCEL_SESSION_MODAL,state,action);
const toggleSwapClassModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_SWAP_CLASS_MODAL,state,action);

const toggleAcceptApplicationModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_ACCEPT_APPLICATION_MODAL,state,action);
const toggleCreateInvoicePaymentModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_CREATE_INVOICE_PAYMENT_MODAL,state,action);
const toggleApplicationSessionCreateRemarkModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_APPLICATION_SESSION_CREATE_REMARK_MODAL,state,action);
const toggleApplicationSessionUpdateRemarkModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_APPLICATION_SESSION_UPDATE_REMARK_MODAL,state,action);
const toggleApplicationSessionCancelModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_APPLICATION_SESSION_CANCEL_MODAL,state,action);
const toggleApplicationSessionRescheduleModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_APPLICATION_SESSION_RESCHEDULE_MODAL,state,action);
const toggleCampApplicationSessionRescheduleModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_CAMP_APPLICATION_SESSION_RESCHEDULE_MODAL,state,action);
const toggleApplicationSessionSwapClassModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_APPLICATION_SESSION_SWAP_CLASS_MODAL,state,action);
const toggleApplicationSessionUpdateAttendanceModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_APPLICATION_SESSION_UPDATE_ATTENDANCE_MODAL,state,action);
const toggleCourseSessionCancelModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_COURSE_SESSION_CANCEL_MODAL,state,action);
const toggleCourseSessionRescheduleModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_COURSE_SESSION_RESCHEDULE_MODAL,state,action);
const toggleCourseSessionUpdateAttendanceModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_COURSE_SESSION_UPDATE_ATTENDANCE_MODAL,state,action);
const toggleCourseSessionUpdateInfoModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_COURSE_SESSION_UPDATE_INFO_MODAL,state,action);
const toggleApplicationSessionUpdateSessionNumberModal = ( state = { open: false } , action) => uiReducerMaker(cons.TOGGLT_APPLICATION_SESSION_UPDATE_SESSION_NUMBER_MODAL,state,action);

export default {
    authInfo,
    toggleSelectCourseDrawer,
    toggleUpdateApplicationSessionModal,
    toggleUpdateApplicationSessionByDayModal,
    toggleUpdateStatusModal,
    toggleRescheduleSessionModal,
    toggleRescheduleApplicationSessionModal,
    toggleReserveApplicationModal,
    toggleCreateStudentRemarkModal,
    togglePayInvoiceModal,
    toggleCreateStudentAsqModal,
    toggleCreateInvoiceModal,
    toggleCancelSessionModal,
    toggleSwapClassModal,

    toggleAcceptApplicationModal,
    toggleCreateInvoicePaymentModal,
    toggleApplicationSessionCreateRemarkModal,
    toggleApplicationSessionUpdateRemarkModal,
    toggleApplicationSessionCancelModal,
    toggleApplicationSessionRescheduleModal,
    toggleCampApplicationSessionRescheduleModal,
    toggleApplicationSessionSwapClassModal,
    toggleApplicationSessionUpdateAttendanceModal,
    toggleCourseSessionCancelModal,
    toggleCourseSessionRescheduleModal,
    toggleCourseSessionUpdateAttendanceModal,
    toggleCourseSessionUpdateInfoModal,
    toggleApplicationSessionUpdateSessionNumberModal,
}
