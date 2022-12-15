import React from 'react'
import PropTypes from 'prop-types'
import ContactPage from '../components/contact/ContactPage'
import {connect} from "dva"
 const propTypes = {
 }

 function Contact(props) {
   return (
     <div>
       <ContactPage {...props}/>
     </div>
   )
 }

 Contact.propTypes = propTypes

const mapStateToProps=({basicinfo})=>({basicinfo})
 export default connect (mapStateToProps)(Contact)
