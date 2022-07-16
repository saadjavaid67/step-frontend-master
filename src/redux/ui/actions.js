import * as cons from './constants'
import { uiActionMaker } from './helper'

export const setAuthInfo = (option)=>(uiActionMaker({cons: cons.AUTH_INFO, ...option}))
export const toggleSelectCourseDrawer = (option)=>(uiActionMaker({cons: cons.TOGGLE_SELECT_COURSE_DRAWER, ...option}))
export const toggleUpdateApplicationSessionModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_UPDATE_APPLICATION_SESSION_MODAL, ...option}))
export const toggleUpdateApplicationSessionByDayModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_UPDATE_APPLICATION_SESSION_BY_DAY_MODAL, ...option}))
export const toggleUpdateStatusModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_UPDATE_STATUS_MODAL, ...option}))
export const toggleRescheduleSessionModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_RESCHEDULE_SESSION_MODAL, ...option}))
export const toggleRescheduleApplicationSessionModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_RESCHEDULE_APPLICATION_SESSION_MODAL, ...option}))
export const toggleReserveApplicationModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_RESERVE_APPLICATION_MODAL, ...option}))
export const toggleCreateStudentRemarkModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_CREATE_STUDENT_REMARK_MODAL, ...option}))
export const togglePayInvoiceModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_PAY_INVOICE_MODAL, ...option}))
export const toggleCreateStudentAsqModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_CREATE_STUDENT_ASQ_MODAL, ...option}))
export const toggleCreateInvoiceModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_CREATE_INVOICE_MODAL, ...option}))
export const toggleCancelSessionModal = (option)=>(uiActionMaker({cons: cons.TOGGLE_CANCEL_SESSION_MODAL, ...option}))
export const toggleSwapClassModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_SWAP_CLASS_MODAL, ...option}))

export const toggleAcceptApplicationModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_ACCEPT_APPLICATION_MODAL, ...option}))
export const toggleCreateInvoicePaymentModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_CREATE_INVOICE_PAYMENT_MODAL, ...option}))
export const toggleApplicationSessionCreateRemarkModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_APPLICATION_SESSION_CREATE_REMARK_MODAL, ...option}))
export const toggleApplicationSessionUpdateRemarkModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_APPLICATION_SESSION_UPDATE_REMARK_MODAL, ...option}))
export const toggleApplicationSessionCancelModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_APPLICATION_SESSION_CANCEL_MODAL, ...option}))
export const toggleApplicationSessionRescheduleModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_APPLICATION_SESSION_RESCHEDULE_MODAL, ...option}))
export const toggleCampApplicationSessionRescheduleModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_CAMP_APPLICATION_SESSION_RESCHEDULE_MODAL, ...option}))
export const toggleApplicationSessionSwapClassModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_APPLICATION_SESSION_SWAP_CLASS_MODAL, ...option}))
export const toggleApplicationSessionUpdateAttendanceModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_APPLICATION_SESSION_UPDATE_ATTENDANCE_MODAL, ...option}))
export const toggleCourseSessionCancelModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_COURSE_SESSION_CANCEL_MODAL, ...option}))
export const toggleCourseSessionRescheduleModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_COURSE_SESSION_RESCHEDULE_MODAL, ...option}))
export const toggleCourseSessionUpdateAttendanceModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_COURSE_SESSION_UPDATE_ATTENDANCE_MODAL, ...option}))
export const toggleCourseSessionUpdateInfoModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_COURSE_SESSION_UPDATE_INFO_MODAL, ...option}))
export const toggleApplicationSessionUpdateSessionNumberModal = (option)=>(uiActionMaker({cons: cons.TOGGLT_APPLICATION_SESSION_UPDATE_SESSION_NUMBER_MODAL, ...option}))
