import React, { useEffect,useState } from "react"; // Removed useState since it's not used
import Sidebar from "../Sidebar";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import { Bell, CheckCircle, AlertTriangle } from "lucide-react";

const NotificationItem = ({ description, time, isRead }) => (
  <div
    className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${isRead ? "bg-gray-800" : "bg-gray-900"
      } hover:bg-gray-700 transition-colors`}
  >
    <div className="flex items-center space-x-3">
      <div
        className={`w-14 h-12 rounded-full flex items-center justify-center ${isRead === 'read' ? "bg-gray-300" : "bg-blue-500"
          }`}
      >
        <CheckCircle size={14} className="text-white " />
      </div>
      <div>
        <h3 className="text-sm font-medium text-white">{description}</h3>
      </div>
    </div>
    <div className="text-right">
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  </div>
);

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([{
    message:'',
    status:'',
    createdAt:''
  }])

  useEffect(() => {
    handleGetNotification()
  }, [])

  const handleGetNotification = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/notifications/all')
    setNotifications(response.data.data)
    console.log('====================================');
    console.log(notifications);
    console.log('====================================');
  }
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 overflow-hidden main">
      <div className="flex-1 flex flex-col overflow-hidden">


        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="container mx-auto max-w-7xl">
            {/* Page Title */}
            <div className="mb-6 p-4">
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <p className="text-sm text-gray-300">
                View and manage all your notifications.
              </p>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              
              {notifications.length > 0 && notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  description={notification.message}
                  time={notification.createdAt}
                  isRead={notification.status}
                />
              ))}
              {notifications.length === 0 && (
                <div>
                  <h3 className="ps-6 text-white font-semibold">No Notifications</h3>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default NotificationPage;
