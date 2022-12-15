import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Button} from 'antd'
import { NavHashLink ,HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types'


class IndexPage extends Component {
  static propTypes = {

  }
  

  render() {
    const {history} =this.props
    return (

      <div>
        <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list} style={{height:'120px'}}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
        <NavHashLink to='/#screens'>Click to jumb</NavHashLink>
        <Button type="primary" onClick={()=>history.push('/user')}>go to user</Button>
        <p></p>
        <Button type="primary" onClick={()=>history.push('/user')}>go to user</Button>
        <p></p>
        <Button type="primary" onClick={()=>history.push('/user')}>go to user</Button>
        <p id ='screens'>aaa</p>
      </div>
      </div>
    )
  }
}

// function IndexPage(props) {
//   console.log(props)
//   const {history} =props
//   return (
//     <div>

//       <div className={styles.normal}>
//         <h1 className={styles.title}>Yay! Welcome to dva!</h1>
//         <div className={styles.welcome} />
//         <ul className={styles.list}>
//           <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
//           <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
//         </ul>
//         <Button type="primary" onClick={()=>history.push('/user')}>go to user</Button>
//       </div>
//     </div>
//   );
// }

IndexPage.propTypes = {
};

export default connect()(IndexPage);
