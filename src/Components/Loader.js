import {Spin} from 'antd';
import dummyStyle from './Dummy.module.scss'

function Nav() {
  return (
    <div className = {dummyStyle.mainContent}>
        <Spin tip="Loading..."/>
    </div>
  );

}
export default Nav;