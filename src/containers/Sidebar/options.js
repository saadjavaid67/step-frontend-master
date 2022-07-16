const options = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        leftIcon: 'ion-ios-timer',
    },
    {
        key: 'parent',
        label: 'Parent',
        leftIcon: 'ion-ios-contact-outline',
    },
    {
        key: 'student',
        label: 'Student',
        leftIcon: 'ion-ios-people',
    },
    {
        key: 'studentIncident',
        label: 'Incident',
        leftIcon: 'ion-speakerphone',
    },
    {
        key: 'studentAsq',
        label: 'ASQ',
        leftIcon: 'ion-ios-chatboxes',
    },
    {
        key: 'application',
        label: 'Application',
        leftIcon: 'ion-social-buffer',
    },
    {
        key: 'classSchedule',
        label: 'Class Schedule',
        leftIcon: 'ion-ios-albums-outline',
    },
    {
        key: 'campSchedule',
        label: 'Camp Schedule',
        leftIcon: 'ion-ios-albums-outline',
    },
    {
        key: 'payment',
        label: 'Credit Balance',
        leftIcon: 'ion-cash',
    },
    {
        key: 'invoice',
        label: 'Invoice',
        leftIcon: 'ion-ios-list-outline',
    },
    {
        key: 'setting',
        label: 'Setting',
        leftIcon: 'ion-ios-book-outline',
        children: [
            {
                key: 'priceGroup',
                label: 'Price Group',
            },
            {
                key: 'location',
                label: 'Location',
            },
            {
                key: 'courseCategory',
                label: 'Category',
            },
            {
                key: 'course',
                label: 'Course',
            },
            {
                key: 'courseLevel',
                label: 'Level',
            },
            {
                key: 'courseClass',
                label: 'Class',
            },
            {
                key: 'paymentMethod',
                label: 'Payment Method',
            },
            //   {
            //       key: 'import/parent',
            //       label: 'Import Parnet',
            //   },
            //   {
            //       key: 'import/student',
            //       label: 'Import Student',
            //   },
        ],
    },
    {
        key: 'user',
        label: 'User',
        leftIcon: 'ion-ios-person',
    },
    {
        key: 'email-record',
        label: 'Email Records',
        leftIcon: 'ion-android-mail',
    },
];
export default options;
