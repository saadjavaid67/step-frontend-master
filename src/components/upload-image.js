import React from 'react';
import { Upload, Icon } from 'antd';

export default function ({ imageUrl, handleUploadedImage }) {

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function handleChange(info) {
        const file = info.fileList[0];
        getBase64(file.originFileObj, imageUrl =>{
            handleUploadedImage(imageUrl);
        });
    };

    const uploadButton = (
        <div>
            <Icon type={'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <Upload
            showUploadList={false}
            listType="picture-card"
            className="upload-image"
            beforeUpload={() => false}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    )
}