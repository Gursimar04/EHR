import { Skeleton, Card, Avatar, List, Menu, Modal, Dropdown, Button,Calendar, Badge} from 'antd';
import {EditOutlined, EllipsisOutlined, ProfileOutlined,InfoOutlined,WarningOutlined, setTwoToneColor,   DownOutlined  } from '@ant-design/icons';
import dummyStyle from './Dummy.module.scss'
import {
    WarningTwoTone
  } from '@ant-design/icons';
import { useState } from 'react';
import Loader from './Loader'
function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'error', content: 'Symptoms' },
        ];
        break;
      case 10:
        listData = [
          { type: 'error', content: "Doctor's Visit" },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'Pathology Result' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <div className="events">
        {listData.map(item => (
          <p key={item.content}>
            <Badge status={item.type} text={item.content} />
          </p>
        ))}
      </div>
    );
  }
  
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <span>Created ID Number {num}</span>
      </div>
    ) : null;
  }

function Nav() {

    const [data,setData] = useState([
        {
            title: 'Diabetes Detected',
        },
      ]);

      const [visible,setVisible] = useState(false);
      const [loading,setLoading] = useState(false);
      const [progress,setProgress] = useState(false);
      const [result,setResult] = useState(false);
      const [main,setMain] = useState(true);
      const [final,setFinal] = useState(true);
      const [card,setCard] = useState(true);

        setTwoToneColor('rgb(247, 11, 11)')
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

      setTimeout(() => {
        setProgress(false);
        setResult(true);
    }, 2000);

    }, 3000);
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  const { Meta } = Card;

  const funcDoc = () =>{
      setFinal(false)
      setTimeout(()=> {
        setCard(false)
      },2000)
      
  }
  
  const menu = (
    <Menu>
      <Menu.Item key="0">
        Date
      </Menu.Item>
      <Menu.Item key="1" onClick={funcDoc}>
        Doctor
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Disease</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Organs</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Tratements</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Prognosis</Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item key="0">
        All Details
      </Menu.Item>
      <Menu.Item key="1">
        Medicine
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Symptoms</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Pathology Report</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Allergies</Menu.Item>
    </Menu>
  );
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
                avatar={<WarningTwoTone style = {{color:"rgb(247, 11, 11)"}}/>}
                title={<div style = {{color: "red"}}>{item.title}</div>}
                description="Mr.Kumars diagnostic results are undesirable. Check immidiately."
            />
        </List.Item>
        )}
    />
    </div>
        }

    <Modal
          title="Dr. Kumars Patholgy Result"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="back" loading={loading} onClick={handleOk}>
                View Medical Records
            </Button>,
            <Button key="submit" type="primary" >
              Contact Paitient
            </Button>,
          ]}
        >
        <div style = {{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <img height="300px" width="300px" alt = "img" src="/diabetic_retina.jpg"/>
                    <h2 style={{marginTop:'1%',color:'rgb(247, 11, 11)'}}>Diabetic Retina Detected</h2>
        </div>
    </Modal>
    
    {progress && 
        <div style = {{height:'100vh',flexGrow:'1',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Loader/>
        </div>
    }
    
    { result && 
    <div style = {{height:'90vh', padding:"1%"}}> 
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                View By <DownOutlined />
            </a>
            </Dropdown>
            <Dropdown overlay={menu2} trigger={['click']}>
            <a style={{marginLeft:'3%'}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Restrict To <DownOutlined />
            </a>
            </Dropdown>

            {final && <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />}
            {!final && <div style = {{display:'flex'}}>
                <Card style={{ width: 300, marginTop: 16,marginRight:12 }}
                actions={[
                    <ProfileOutlined key="setting" />,
                    <InfoOutlined key="edit" />,
                    <WarningOutlined key="ellipsis" />,
                  ]}
                   loading={card}>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Dr.ABC Sharma"
            description="Eye Specialist"
          />
        </Card>

        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <ProfileOutlined key="setting" />,
            <InfoOutlined key="edit" />,
            <WarningOutlined key="ellipsis" />,
          ]}
        >
          <Skeleton loading={card} avatar active>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Dr.XYZ Gupta"
              description="General Physician"
            />
          </Skeleton>
        </Card>
                </div> }
    </div>
    }
</div> 
  );

}

export default Nav;