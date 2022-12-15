import React from 'react'
import PropTypes from 'prop-types'
import {List } from 'antd'
import {Link } from 'dva/router'
import styles from '../../css/list.less'
import gegevens from 'Utilities/gegevens'
const propTypes = {

}



function Explorer(props) {
  let {categories,error} = props.categories
   let datasource=[]
    if (Array.isArray(categories)){

      datasource=categories
    }


  return (
    <List
      className={styles.customList}
      size="small"

      dataSource={datasource}
      renderItem={(item,index) => {
        const link = gegevens.homePage?`/online_bestellen#${item.cat_code}`:`/#${item.cat_code}`
       return <List.Item key ={index}><Link to={link}>{item.cat_name}</Link></List.Item>}}

    />
  )
}

Explorer.propTypes = propTypes

export default Explorer
