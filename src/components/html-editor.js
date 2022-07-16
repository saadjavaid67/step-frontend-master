import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import QuillEditor from './uielements/styles/editor.style';

export default function ({ value, handleEditorChange }) {
    let modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    return (
        <QuillEditor>
            <ReactQuill
                theme={'snow'}
                value={value || ''}
                onChange={handleEditorChange}
                modules={modules}
            />
        </QuillEditor>
    )
}