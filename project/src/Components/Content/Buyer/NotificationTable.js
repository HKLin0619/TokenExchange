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
      }, []);

      const handleSendedClick = (notification) => {
        // 更新数据库中的 `notification.emailsended` 或根据您的需求进行处理
        console.log(`Sending email for notification: ${notification.id}`);
      
        // 模拟更新（替换为实际的数据库交互）
        const updatedNotifications = notifications.map((item) =>
          item.id === notification.id
            ? { ...item, emailsended: 'sended' }
            : item
        );
      
        setNotifications(updatedNotifications);
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
                            <td>{notification.status}</td>
                            {notification.emailsended === 'sended' ? (
                                <td>Done</td>
                                ) : (
                                <td>
                                    <button onClick={() => handleSendedClick(notification)}>Sended</button>
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