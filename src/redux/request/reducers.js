import * as applicationReducers from "./application/reducers"
import * as applicationSessionReducers from "./application_session/reducers"
import * as applicationSessionRemarkReducers from "./application_session_remark/reducers"
import * as authReducers from "./auth/reducers"
import * as courseReducers from "./course/reducers"
import * as courseCategoryReducers from "./course_category/reducers"
import * as courseClassReducers from "./course_class/reducers"
import * as courseLevelReducers from "./course_level/reducers"
import * as courseSessionReducers from "./course_session/reducers"
import * as customerReducers from "./customer/reducers"
import * as emailReducers from "./email/reducers"
import * as invoiceReducers from "./invoice/reducers"
import * as locationReducers from "./location/reducers"
import * as paymentReducers from "./payment/reducers"
import * as paymentMethodReducers from "./payment_method/reducers"
import * as priceGroupReducers from "./price_group/reducers"
import * as studentReducers from "./student/reducers"
import * as studentRemarkReducers from "./student_remark/reducers"
import * as studentAsqReducers from "./student_asq/reducers"
import * as userReducers from "./user/reducers"

export default {
    ...applicationReducers,
    ...applicationSessionReducers,
    ...applicationSessionRemarkReducers,
    ...authReducers,
    ...courseReducers,
    ...courseCategoryReducers,
    ...courseClassReducers,
    ...courseLevelReducers,
    ...courseSessionReducers,
    ...customerReducers,
    ...emailReducers,
    ...invoiceReducers,
    ...locationReducers,
    ...paymentReducers,
    ...paymentMethodReducers,
    ...priceGroupReducers,
    ...studentReducers,
    ...studentRemarkReducers,
    ...studentAsqReducers,
    ...userReducers
};
