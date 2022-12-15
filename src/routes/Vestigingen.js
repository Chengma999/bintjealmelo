import React from 'react'
import PropTypes from 'prop-types'
import VestigingenPage from '../components/vestigingen/VestigingenPage'

 const propTypes = {
 }

 function Vestigingen(props) {
   return (
     <div>
       <VestigingenPage {...props}/>
     </div>
   )
 }

 Vestigingen.propTypes = propTypes


 export default Vestigingen
