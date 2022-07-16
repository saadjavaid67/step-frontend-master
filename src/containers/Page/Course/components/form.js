import React, { Component } from 'react';
import { Input, Form, Button, Select, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import CourseCategorySelect from '../../CourseCategory/components/course-category-select'
import { UploadImage } from '../../../../components';
import PriceGroupSelect from '../../PriceGroup/components/price-group-select';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
const FormItem = Form.Item;

class CourseForm extends Component {
    state = {
        thumbnail_image: undefined,
    }

    componentDidMount() {
        const { initValues } = this.props;
        if (initValues) {
            this.setState({
                thumbnail_image: initValues.thumbnail_image,
            });
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState(initValues.content)
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { thumbnail_image, course_content } = this.state;
                let data = {
                    ...values,
                    thumbnail_image,
                    content: values.content.toHTML(),
                    public_visible: values.public_visible ? true : false,
                    display_schedule: values.display_schedule ? true : false
                }
                this.props.handleSubmit(data);
            }
        });
    };

    handleUploadedThumbnailImage = (base64Image) => {
        this.setState({
            thumbnail_image: base64Image
        });
    }

    onEditorStateChange = content => {
        console.log("onEditorStateChange");
        this.setState({ course_content: content });
    };

    render() {
        const { thumbnail_image, course_content } = this.state;
        const { form, initValues, loading } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label={'Category'}
                    hasFeedback
                >
                    {getFieldDecorator('category_id', {
                        rules: [
                            { required: true },
                        ],
                        initialValue: initValues.category_id,
                    })(
                        <CourseCategorySelect />
                    )}
                </FormItem>

                <FormItem
                    label={'Type'}
                    hasFeedback
                >
                    {getFieldDecorator('type', {
                        rules: [
                            { required: true },
                        ],
                        initialValue: initValues.type,
                    })(
                        <Select disabled={initValues.type}>
                            <Select.Option value="GENERAL">
                                General
                            </Select.Option>
                            <Select.Option value="SUMMER_COURSE">
                                Camp
                            </Select.Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    label={'Price Group'}
                    hasFeedback
                >
                    {getFieldDecorator('price_group_id', {
                        rules: [
                            { required: true },
                        ],
                        initialValue: initValues.price_group_id,
                    })(
                        <PriceGroupSelect />
                    )}
                </FormItem>

                <FormItem label={"Name"}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.name,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={"Short Desceiption"}>
                    {getFieldDecorator('short_description', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.short_description,
                    })(
                        <Input.TextArea />
                    )}
                </FormItem>
                <Form.Item>
                    {getFieldDecorator('public_visible', {
                        valuePropName: 'checked',
                        initialValue: initValues.public_visible,
                    })(
                        <Checkbox>Public Visible</Checkbox>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('display_schedule', {
                        valuePropName: 'checked',
                        initialValue: initValues.display_schedule,
                    })(
                        <Checkbox>Display in Schedule Table</Checkbox>
                    )}
                </Form.Item>
                <FormItem label={"Thumbnail Image"}>
                    <UploadImage imageUrl={thumbnail_image} handleUploadedImage={this.handleUploadedThumbnailImage} />
                </FormItem>
                {/* <FormItem label={"Content"}>
                    <BraftEditor
                        language="en"

                    />
                    <HtmlEditor value={course_content} handleEditorChange={this.onEditorStateChange} />
                </FormItem> */}
                <FormItem label="Content">
                    {getFieldDecorator('content', {
                    })(
                        <BraftEditor
                            language="en"
                            className="my-editor"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/course">
                        <Button block loading={loading}>
                            Cancel
                            </Button>
                    </Link>
                </FormItem>
            </Form>
        );
    }
}

const WrappedFormWIthSubmissionButton = Form.create()(CourseForm);
export default WrappedFormWIthSubmissionButton;
