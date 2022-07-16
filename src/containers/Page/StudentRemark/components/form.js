import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button, Select, TimePicker, InputNumber, Checkbox, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const FormItem = Form.Item;
const { TextArea } = Input;

export default function ({ values, touched, errors, setFieldValue, setFieldTouched, handleSubmit }) {
    const dispatch = useDispatch();

    return (
        <Form onSubmit={handleSubmit}>
            <FormItem
                label={"Incident"}
                validateStatus={touched.remark && errors.remark !== undefined ? "error" : ""}
                help={touched.remark && errors.remark}
            >
                <TextArea
                    value={values.remark}
                    onChange={(event) => {
                        setFieldValue('remark', event.target.value)
                    }
                    }
                    onBlur={() => setFieldTouched('remark')}
                    
                />
            </FormItem>

            <FormItem>
                <Button htmlType="submit" type="primary" block onClick={handleSubmit}>
                    Submit
                         </Button>
                <Link to="/app/studentIncident">
                    <Button block>
                        Cancel
                             </Button>
                </Link>
            </FormItem>
        </Form>
    )
}