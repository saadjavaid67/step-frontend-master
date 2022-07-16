import React, { Component } from 'react';
import {
    Drawer,
    Divider,
    List,
    Collapse,
    Button,
} from 'antd';
import { connect } from "react-redux";
import moment from 'moment';
import { CardWrapper } from './select-course-drawer.style';
import { toggleSelectCourseDrawer } from '../../../../redux/ui/actions'
import { getCourseCategoriesForNewApplication } from '../../../../redux/request/actions'
import _ from 'lodash';

class SelectCourseDrawer extends Component {
    state = {
        activePanel: 'category',
        selectedCategory: undefined,
        selectedCourse: undefined,
        selectedLevel: undefined,
        selectedClass: undefined,
    }

    componentDidMount() {
        const { getCourseCategoriesForNewApplication } = this.props;
        const params = {
            with_model: ['courses.levels.classes.price_group.details', 'courses.classes.price_group.details', 'courses.classes.timeslot'],
        };
        getCourseCategoriesForNewApplication({ params });
    }

    handleChangePanel = (key) => {
        this.setState({ activePanel: key });
    }

    handleSelectCategory = (category) => {
        this.setState({
            activePanel: 'course',
            selectedCategory: category,
            selectedCourse: undefined,
            selectedLevel: undefined,
            selectedClass: undefined,
        });
    }

    handleSelectCourse = (course) => {
        if (course.type === "GENERAL") {
            this.setState({
                activePanel: 'level',
                selectedCourse: course,
                selectedLevel: undefined,
                selectedClass: undefined,
            });
        } else {
            this.setState({
                activePanel: 'courseClass',
                selectedCourse: course,
                selectedLevel: undefined,
                selectedClass: undefined,
            });
        }
    }

    handleSelectLevel = (level) => {
        this.setState({
            activePanel: 'courseClass',
            selectedLevel: level,
            selectedClass: undefined,
        });
    }

    handleSelectClass = (courseClass) => {
        this.setState({
            selectedClass: courseClass,
        });
    }

    renderPanelHeader = (title, selectedValue) => {
        let selectedElement = null;
        if (selectedValue) {
            selectedElement = <span className='item-header-selected'>Selected: {selectedValue}</span>
        } else {
            selectedElement = <span className='item-header-selected'>Select a {title}</span>
        }
        return <span><span className='item-header-title'>{title}</span> {selectedElement}</span>
    }

    handleAddCourse = () => {
        let { selectedCategory, selectedCourse, selectedLevel, selectedClass } = this.state;
        let { callback } = this.props;
        let data = {
            selectedCategory,
            selectedCourse,
            selectedLevel,
            selectedClass,
            price_group_detail_id: undefined,
            original_price: undefined,
            unit_price: undefined,
            recurring_times: undefined,
            recurring_type: undefined,
            amount_discount_title: undefined,
            amount_discount: undefined,
            session_number_prefix: undefined,
            priority: undefined,
            expected_date: undefined,
            application_remark: undefined,
            invoice_remark: undefined
        }
        if (callback) {
            this.props.callback(data);
        }
        this.setState({
            activePanel: 'category',
            selectedCategory: undefined,
            selectedCourse: undefined,
            selectedLevel: undefined,
            selectedClass: undefined,
        });
    }

    sortTimeslot = (timeslot) => {
        let res = [];
        let weekday = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

        weekday.map(day => {
            timeslot.map(session => {
                if (session.day_of_week === day) {
                    res.push(session);
                }
            })
        })

        return res;
    }

    sortByDateAndTime = (classes) => {
      let res = [];
      let weekday = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

      classes.sort((a, b) => {
        let date = moment().format('YYYY-MM-DD');
        let a_time = a.start_time ? moment(date + ' ' + a.start_time) : moment(date + ' ' + '23:59:59');
        let b_time = b.start_time ? moment(date + ' ' + b.start_time) : moment(date + ' ' + '23:59:59');

        return a_time > b_time ? 1 : -1
      });

      let tempClasses;

      if (this.state.selectedCourse.type === 'GENERAL') {
        tempClasses = this.sortTimeslot(classes);
        classes.map(courseClass => {
          if (courseClass.timeslot && courseClass.timeslot.length > 0) {
            tempClasses.push(courseClass);
          }
        })
      } else {
        classes.sort((a, b) => {
          let a_time = moment(a.start_date + ' ' + a.start_time);
          let b_time = moment(b.start_date + ' ' + b.start_time);

          return a_time > b_time ? 1 : -1
        });

        tempClasses = classes;
      }

      return tempClasses;
    }

    getDisplayClassHeader = (selected) => {
        var _header = "";
        if (selected.day_of_week && selected.start_time && selected.duration) {
            _header += this.getDisplayClassTitle(selected) + " ";
            _header += this.getDisplayClassDescription(selected);
        } else if (selected.timeslot && selected.timeslot.length > 0) {
            _header += this.getDisplayClassTitle(selected) + " ";
            _header += "Multiple Session";
        }

        return _header;
    }

    getDisplayClassTitle = (item) => {
        var _title = `${item.name} - `;
        if (item.day_of_week) {
            _title += `${(item.day_of_week.charAt(0).toUpperCase() + item.day_of_week.slice(1))}`
        } else if (item.timeslot && item.timeslot.length > 0) {
            item.timeslot.map((session, index) => {
                _title += `${(session.day_of_week.charAt(0).toUpperCase() + session.day_of_week.slice(1))}${(index === item.timeslot.length - 1) ? '' : ', '}`
            })
        }

        return _title;
    }

    getDisplayClassDescription = (item) => {
        var _description = '';

        if (item.day_of_week && item.start_time && item.duration) {
            _description += moment(item.start_time, "HH:mm:ss").format('HH:mm') + ' - ' + moment(item.start_time, "HH:mm:ss").add(item.duration, 'minutes').format('HH:mm')
        } else if (item.timeslot && item.timeslot.length > 0) {
            item.timeslot.map((session, index) => {
                _description += session.day_of_week.charAt(0).toUpperCase() + session.day_of_week.slice(1) + ' ';
                _description += moment(session.start_time, "HH:mm:ss").format('HH:mm') + ' - ' + moment(session.start_time, "HH:mm:ss").add(session.duration, 'minutes').format('HH:mm');
                _description += (index === item.timeslot.length - 1) ? '' : '\n';
            })
        }

        return _description;
    }

    render() {
        const { courseCategoriesLoading, courseCategories, } = this.props;
        let { activePanel, selectedCategory, selectedCourse, selectedLevel, selectedClass, } = this.state;
        let courses = [];
        let levels = [];
        let classes = [];
        if (selectedCategory) {
            courses = selectedCategory.courses;
        }
        if (selectedCourse) {
            levels = selectedCourse.levels;
        }
        if (selectedCourse) {
            classes = selectedCourse.classes;
            _.remove(classes, function (n) {
                return n.finished;
            });

            classes = this.sortByDateAndTime(classes);

            classes.map(courseClass => {
                if (courseClass.timeslot && courseClass.timeslot.length > 0) {
                    courseClass.timeslot = this.sortTimeslot(courseClass.timeslot);
                }
            })
        }

        return (
            <Drawer
                width={400}
                placement="right"
                closable={false}
                onClose={() => this.props.toggleSelectCourseDrawer({ open: false })}
                visible={this.props.open}
            >
                <CardWrapper>
                    <Divider>New Course Enrolment</Divider>
                    <Collapse accordion bordered={false} activeKey={activePanel} onChange={this.handleChangePanel}>
                        <Collapse.Panel
                            header={this.renderPanelHeader('Category', selectedCategory ? selectedCategory.name : null)}
                            key="category">
                            <List
                                itemLayout="horizontal"
                                dataSource={courseCategories}
                                bordered
                                loading={courseCategoriesLoading}
                                renderItem={item => (
                                    <List.Item className={item === selectedCategory ? 'selected' : ''} onClick={() => this.handleSelectCategory(item)}>
                                        <List.Item.Meta
                                            title={item.name}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>

                        {
                            selectedCategory &&
                            <Collapse.Panel
                                header={this.renderPanelHeader('Course', selectedCourse ? selectedCourse.name : null)}
                                key="course"
                                disabled={selectedCategory === undefined}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={courses}
                                    bordered
                                    renderItem={item => (
                                        <List.Item className={item === selectedCourse ? 'selected' : ''} onClick={() => this.handleSelectCourse(item)}>
                                            <List.Item.Meta
                                                title={item.name}
                                                description={item.description}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Collapse.Panel>
                        }

                        {
                            selectedCourse && selectedCourse.type === "GENERAL" &&
                            <Collapse.Panel
                                header={this.renderPanelHeader('Level', selectedLevel ? selectedLevel.name : null)}
                                key="level"
                                disabled={selectedCourse === undefined}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={levels}
                                    bordered
                                    renderItem={item => (
                                        <List.Item className={item === selectedLevel ? 'selected' : ''} onClick={() => this.handleSelectLevel(item)}>
                                            <List.Item.Meta
                                                title={item.name}
                                                description={item.description}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Collapse.Panel>
                        }

                        {
                            selectedCourse && selectedCourse.type === "SUMMER_COURSE" &&
                            <Collapse.Panel
                                header={this.renderPanelHeader('Class', selectedClass ? selectedClass.name : null)}
                                key="courseClass"
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={classes}
                                    bordered
                                    renderItem={item => (
                                        <List.Item className={item === selectedClass ? 'selected' : ''} onClick={() => this.handleSelectClass(item)}>
                                            <List.Item.Meta
                                                title={`${item.name}`}
                                                description={`${(moment(item.start_date).format('YYYY-MM-DD ddd'))} (${moment(item.start_time, "HH:mm:ss").format('HH:mm')})  -  ${moment(item.start_time, "HH:mm:ss").add(item.duration, 'minutes').format('HH:mm')}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                                <Button icon="check" size='large' type="primary" block style={{ marginTop: '40px' }} onClick={this.handleAddCourse}>Confirm</Button>
                            </Collapse.Panel>
                        }

                        {
                            selectedLevel &&
                            <Collapse.Panel
                                header={this.renderPanelHeader('Time', (selectedClass ? this.getDisplayClassHeader(selectedClass) : null))}
                                key="courseClass"
                                disabled={selectedLevel === undefined}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={classes}
                                    bordered
                                    renderItem={item => (
                                        <List.Item className={item === selectedClass ? 'selected' : ''} onClick={() => this.handleSelectClass(item)}>
                                            <List.Item.Meta
                                                title={this.getDisplayClassTitle(item)}
                                                description={this.getDisplayClassDescription(item)}
                                                style={{whiteSpace: 'pre-line'}}
                                            />
                                        </List.Item>
                                    )}
                                />
                                <Button icon="check" size='large' type="primary" block style={{ marginTop: '40px' }} onClick={this.handleAddCourse}>Confirm</Button>
                            </Collapse.Panel>
                        }
                    </Collapse>
                </CardWrapper>
            </Drawer >
        );
    }
}

export default connect(
    state => ({
        open: state.toggleSelectCourseDrawer.open,
        courseCategories: state.getCourseCategoriesForNewApplication.data,
        courseCategoriesLoading: state.getCourseCategoriesForNewApplication.isFetching
    }),
    {
        toggleSelectCourseDrawer,
        getCourseCategoriesForNewApplication,
    }
)(SelectCourseDrawer);
