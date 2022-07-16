import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseCategoriesForSelection } from '../../../../redux/request/actions';
import { Select } from 'antd';
const { Option } = Select;

export default function ({ ...rest }) {
    const dispatch = useDispatch();

    //Get Courses Categories
    const courseCategories = useSelector(state => state.getCourseCategoriesForSelection.data);
    const courseCategoriesFetched = useSelector(state => state.getCourseCategoriesForSelection.dataFetched);
    const courseCategoriesLoading = useSelector(state => state.getCourseCategoriesForSelection.isFetching);
    useEffect(() => {
        dispatch(getCourseCategoriesForSelection());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            showSearch
            loading={courseCategoriesLoading}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                courseCategoriesFetched ?
                    courseCategories.map((category) => {
                        return <Option key={`category-${category.id}`} value={category.id}>{category.name}</Option>
                    })
                    : []
            }
        </Select>
    )
}