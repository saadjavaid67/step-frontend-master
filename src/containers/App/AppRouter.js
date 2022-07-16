import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('../Page/Dashboard')),
  },
  {
    path: 'dashboard',
    component: asyncComponent(() => import('../Page/Dashboard')),
  },
  {
    path: 'user',
    component: asyncComponent(() => import('../Page/User')),
  },
  {
    path: 'user/create',
    component: asyncComponent(() => import('../Page/User/create')),
  },
  {
    path: 'user/edit/:userId',
    component: asyncComponent(() => import('../Page/User/edit')),
  },
  {
    path: 'priceGroup',
    component: asyncComponent(() => import('../Page/PriceGroup')),
  },
  {
    path: 'priceGroup/create',
    component: asyncComponent(() => import('../Page/PriceGroup/create')),
  },
  {
    path: 'priceGroup/edit/:priceGroupId',
    component: asyncComponent(() => import('../Page/PriceGroup/edit')),
  },
  {
    path: 'location',
    component: asyncComponent(() => import('../Page/Location')),
  },
  {
    path: 'location/create',
    component: asyncComponent(() => import('../Page/Location/create')),
  },
  {
    path: 'location/edit/:locationId',
    component: asyncComponent(() => import('../Page/Location/edit')),
  },
  {
    path: 'courseCategory',
    component: asyncComponent(() => import('../Page/CourseCategory')),
  },
  {
    path: 'courseCategory/create',
    component: asyncComponent(() => import('../Page/CourseCategory/create')),
  },
  {
    path: 'courseCategory/edit/:categoryId',
    component: asyncComponent(() => import('../Page/CourseCategory/edit')),
  },
  {
    path: 'course',
    component: asyncComponent(() => import('../Page/Course')),
  },
  {
    path: 'course/create',
    component: asyncComponent(() => import('../Page/Course/create')),
  },
  {
    path: 'course/edit/:courseId',
    component: asyncComponent(() => import('../Page/Course/edit')),
  },
  {
    path: 'courseLevel',
    component: asyncComponent(() => import('../Page/CourseLevel')),
  },
  {
    path: 'courseLevel/create',
    component: asyncComponent(() => import('../Page/CourseLevel/create')),
  },
  {
    path: 'courseLevel/edit/:levelId',
    component: asyncComponent(() => import('../Page/CourseLevel/edit')),
  },
  {
    path: 'courseClass',
    component: asyncComponent(() => import('../Page/CourseClass')),
  },
  {
    path: 'courseClass/:id',
    component: asyncComponent(() => import('../Page/CourseClass/view')),
  },
  {
    path: 'paymentMethod',
    component: asyncComponent(() => import('../Page/PaymentMethod')),
  },
  {
    path: 'paymentMethod/create',
    component: asyncComponent(() => import('../Page/PaymentMethod/create')),
  },
  {
    path: 'paymentMethod/edit/:paymentMethodId',
    component: asyncComponent(() => import('../Page/PaymentMethod/edit')),
  },
  {
    path: 'parent',
    component: asyncComponent(() => import('../Page/Customer')),
  },
  {
    path: 'parent/create',
    component: asyncComponent(() => import('../Page/Customer/create')),
  },
  {
    path: 'parent/edit/:customerId',
    component: asyncComponent(() => import('../Page/Customer/edit')),
  },
  {
    path: 'parent/view/:customerId',
    component: asyncComponent(() => import('../Page/Customer/view')),
  },
  {
    path: 'student',
    component: asyncComponent(() => import('../Page/Student')),
  },
  {
    path: 'student/create',
    component: asyncComponent(() => import('../Page/Student/create')),
  },
  {
    path: 'student/edit/:studentId',
    component: asyncComponent(() => import('../Page/Student/edit')),
  },
  {
    path: 'student/view/:studentId',
    component: asyncComponent(() => import('../Page/Student/view')),
  },
  {
    path: 'studentIncident',
    component: asyncComponent(() => import('../Page/StudentRemark')),
  },
  {
    path: 'studentIncident/edit/:id',
    component: asyncComponent(() => import('../Page/StudentRemark/edit')),
  },
  {
    path: 'studentAsq',
    component: asyncComponent(() => import('../Page/StudentAsq')),
  },
  {
    path: 'studentAsq/create',
    component: asyncComponent(() => import('../Page/StudentAsq/create')),
  },
  {
    path: 'studentAsq/create/student_id=:student_id&&next_asq=:next_asq',
    component: asyncComponent(() => import('../Page/StudentAsq/create')),
  },
  {
    path: 'studentAsq/edit/:studentAsqId',
    component: asyncComponent(() => import('../Page/StudentAsq/edit')),
  },
  {
    path: 'application',
    component: asyncComponent(() => import('../Page/Application')),
  },
  {
    path: 'application/create',
    component: asyncComponent(() => import('../Page/Application/create')),
  },
  {
    path: 'application/edit/:applicationId',
    component: asyncComponent(() => import('../Page/Application/edit')),
  },
  {
    path: 'classSchedule',
    component: asyncComponent(() => import('../Page/ClassSchedule')),
  },
  {
    path: 'classSchedule/:id',
    component: asyncComponent(() => import('../Page/ClassSchedule')),
  },
  {
    path: 'campSchedule',
    component: asyncComponent(() => import('../Page/SummerCourseSchedule')),
  },
  {
    path: 'campSchedule/:id',
    component: asyncComponent(() => import('../Page/SummerCourseSchedule')),
  },
  {
    path: 'payment',
    component: asyncComponent(() => import('../Page/Payment')),
  },
  {
    path: 'payment/create',
    component: asyncComponent(() => import('../Page/Payment/create')),
  },
  {
    path: 'payment/edit/:id',
    component: asyncComponent(() => import('../Page/Payment/edit')),
  },
  {
    path: 'receipt/view/:id',
    component: asyncComponent(() => import('../Page/Receipt/view')),
  },
  {
    path: 'invoice',
    component: asyncComponent(() => import('../Page/Invoice')),
  },
  {
    path: 'invoice/create',
    component: asyncComponent(() => import('../Page/Invoice/create')),
  },
  {
    path: 'invoice/edit/:id',
    component: asyncComponent(() => import('../Page/Invoice/edit')),
  },
  {
    path: 'invoice/view/:id',
    component: asyncComponent(() => import('../Page/Invoice/view')),
  },
  {
    path: 'email-record',
    component: asyncComponent(() => import('../Page/EmailRecord')),
  },
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </>
    );
  }
}

export default AppRouter;
