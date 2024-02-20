import React from 'react';
import "./NotificationTableStlye.css"

function NotificationTable({ userData }) {

  return (

    <div className="s-card">

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
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>

    </div>
        
  )
}

export default NotificationTable