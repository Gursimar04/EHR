import {List, Modal,Button, Upload, message, Progress, Result} from 'antd';
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import dummyStyle from './Dummy.module.scss'
import {
    WarningTwoTone
  } from '@ant-design/icons';
import { useState } from 'react';


function Nav() {
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

      const beforeUpload = (file) => {
        if(file.name !== "normal_retina.jpg")
          setThreat(true);
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

      const uploadImage = (info) => {
        // if (info.file.status === 'uploading') {
        //   setImageLoading(true);
        //   return;
        // }
        setTimeout(function() {
            getBase64(info.file.originFileObj, imageUrl =>
                setImageUrl(imageUrl),
                setImageLoading(false),
            );
        }, 2000)
      };

    const [data,setData] = useState([
        {
            title: 'Missing Diabetic retinopathy Scan',
        },
      ]);

      const [visible,setVisible] = useState(false);
      const [loading,setLoading] = useState(false);
      const [imageLoading,setImageLoading] = useState(false);

      const [imageUrl,setImageUrl] = useState(false);
      const [percent,setPercent] = useState(0);
      const [progress,setProgress] = useState(false);
      const [result,setResult] = useState(false);
      const [main,setMain] = useState(true);
      const[threat,setThreat] = useState(false);

      const uploadButton = (
        <div>
          {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setMain(false);
      setProgress(true);
        
        let p = 0;
      const increase = setInterval(() => {
          p+=10;
        if(p <= 100){
            if (p> 100) {
                setPercent(100);
            }
            else{
                setPercent(p);
            }
        }
        else{
            setProgress(false);
            setResult(true);
            clearInterval(increase);
        }
    }, 400);

    }, 3000);
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  return (
    <div className = {dummyStyle.notif}>
    { main &&
    <div>
    <div className = {dummyStyle.header}>
        <h1>Notifications</h1>
    </div>
    
    <List
        style = {{width: "100%"}}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
        <List.Item onClick ={()=>{showModal()}}className = {dummyStyle.lItem}>
            <List.Item.Meta
                avatar={<WarningTwoTone />}
                title={<div style = {{color: "#1890ff"}}>{item.title}</div>}
                description="The due date for the scan has passed, kindly update it for prompt diagnosis"
            />
        </List.Item>
        )}
    />
    </div>
        }

    <Modal
          title="Scan Results"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Upload Image Below</p>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={uploadImage}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </Modal>
    
    {progress && 
        <div style = {{height:'80vh',flexGrow:'1',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Progress type="circle" width= "250px" percent={percent} />
        </div>
    }
    
    { result && ((threat && <Result
                status="warning"
                title="Image Uploaded"
                subTitle="Retina Detection Result"
                extra={
                    <div style = {{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <img height="300px" width="300px" alt = "img" src="/normal_retina.jpg"/>
                    <h2 style={{marginTop:'1%',color:'rgb(247, 11, 11)'}}>Diabetic Retina Detected</h2>
                    <div style = {{flexGrow:'1',display:'flex',justifyContent:'space-between'}}>
                    <Button style ={{marginRight:'2%'}} type="primary" onClick = {()=>{
                        setMain(true);
                        setResult(false);
                        setData([]);
                    }} key="console">
                    Return to Console
                    </Button>
                    <Button type="primary" onClick = {()=>{
                        setMain(true);
                        setResult(false);
                        setData([]);
                    }} key="console">
                    Contact Doctor
                    </Button>
                    </div>
                    </div>
                }
                />)||
                <Result
                status="success"
                title="Image Uploaded"
                subTitle="Retina Detection Result"
                extra={
                    <div style = {{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <img height="300px" width="300px" alt = "img" src="/normal_retina.jpg"/>
                    <h2 style={{marginTop:'1%',color:'rgb(27, 172, 27)'}}>Normal Retina Detected</h2>
                    <Button type="primary" onClick = {()=>{
                        setMain(true);
                        setResult(false);
                        setData([]);
                    }} key="console">
                    Return to Console
                    </Button>
                    </div>
                }
                />
              )
    }
</div> 
  );

}

export default Nav;