import React, { useContext } from 'react'
import { AlertContext } from 'context/alert'

const Alerts = () => {
  const alertContext = useContext(AlertContext)

  return (
    !!alertContext.alerts.length &&
    alertContext.alerts.map(alert => (
      <div className={`ui message ${alert.type || ''}`} key={alert.id}>
        {/* <i className="close icon" />
        <div className="header">Changes in Service</div> */}
        <p>{alert.msg}</p>
      </div>
    ))
  )
}

export default Alerts
