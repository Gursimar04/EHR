import {Layout, Menu} from 'antd'
import navStyle from './Nav.module.scss'
function Nav() {
  return (
    <Layout>
    <Menu className = {navStyle.navbar}  mode="horizontal" defaultSelectedKeys={['2']}>
      {new Array(15).fill(null).map((_, index) => {
        const key = index + 1;
        return <Menu.Item className = {navStyle.item} key={key}>{`nav ${key}`}</Menu.Item>;
      })}
    </Menu>
  </Layout>
  );
}

export default Nav;