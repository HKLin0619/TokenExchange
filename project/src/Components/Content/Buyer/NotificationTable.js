import React, { useState, useEffect } from 'react';
import "./NotificationTableStlye.css"

function NotificationTable({ userData }) {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch(`/notifications?userId=${userData.userID}`)
          .then((response) => response.json())
          .then((data) => {
            setNotifications(data);
          })
          .catch((error) => {
            console.error(error);
          });
    }, [userData.userID]);


    const handleSendedClick = async (userData, notification) => {
        try {
            
            const response = await fetch('/api/update-notification', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userID: userData.userID,
                  awardID: notification.awardid
                })
              });
              
            if (!response.ok) {
                throw new Error('Failed to update notification');
            }
      
          // Optionally update local state to reflect the change (e.g., set notification.emailsended = 'sended')
            } catch (error) {
                console.error('Error sending email:', error);
          // Display an error message to the user
            }
      };


    return (

        <div className="s-card">

            <div className='noti-title'>

                <h3>Notification</h3>

            </div>

            <div className='noti-contant'>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Supplier Name</th>
                            <th>Supplier Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {notifications.map((notification, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{notification.supplierName}</td>
                            <td>{notification.supplierEmail}</td>
                            {notification.emailsended === 'sended' ? (
                                <td>You already send email</td>
                                ) : (
                                <td>Please send the email</td>
                            )}
                            {notification.emailsended === 'sended' ? (
                                <td>Done</td>
                                ) : (
                                <td>
                                    <button onClick={() => handleSendedClick(userData, notification)}>Sended</button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>            
                </table>
            </div>

        </div>
            
    )
}

export default NotificationTable