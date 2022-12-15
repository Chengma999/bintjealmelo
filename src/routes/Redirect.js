import React from 'react'
import PropTypes from 'prop-types'
import RedirectPage from '../components/redirect/RedirectPage'
import {connect } from 'dva'

 const propTypes = {
  redirect: PropTypes.object.isRequired,
 }
 
 function Redirect(props) {
   return (
     <div>
       <RedirectPage {...props}/>
     </div>
   )
 }
 
 Redirect.propTypes = propTypes
 
const mapStateToProps=({redirect,loading})=>({
    redirect,
    loading
    
})

 export default connect(mapStateToProps)(Redirect)
 