
import DashboardCard from "../Utilities/DashboardCard";
import Header from "../Header";
import "./styles/DashboardOverview.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { color } from "framer-motion";

const DashboardOverview = () => {
    const [adminName, setAdminName] = useState("");
    const [statsData, setStatsData] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [upcomingActivities, setUpcomingActivities] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // const notifications = [
    //     { id: 1, message: "System maintenance scheduled", status: "Important", icon: "⚠️" },
    //     { id: 2, message: "New course available: AI Basics", status: "Info", icon: "ℹ️" },
    // ];


    const fetchAdminDetails = async () => {
        try {
            // const response = await axios.get("http://localhost:4000/api/v1/auth/admin", {
            //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            // });
            // if (response.data && response.data.firstName) {
            //     setAdminName(response.data.firstName);
            // } else {
            //     console.warn("Admin name not found in response data");
            // }
        } catch (error) {
            console.error("Error fetching admin details:", error);
        }
    };

    const fetchDashboardOverview = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/tutor/count");
            const json = {
                title: 'Total Tutors',
                count: response.data.data,
                icon: '👩‍🏫',
                color: '#4caf50'
            };

            setStatsData(prev => {
                const exists = prev.some(item => item.title === json.title);
                if (exists) return prev;
                return [...prev, json];
            });

            // ==========================

            const response1 = await axios.get("http://localhost:4000/api/v1/student/count");
            const json1 = {
                title: 'Total Students',
                count: response1.data.data,
                icon: '👩‍🎓',
                color: '#2196f3'
            };
            setStatsData(prev => {
                const exists = prev.some(item => item.title === json1.title);
                if (exists) return prev;
                return [...prev, json1];
            });

            // ==========================

            const response2 = await axios.get("http://localhost:4000/api/v1/sections/count/all");
            const json2 = {
                title: 'Subjects Offered',
                count: response2.data.data,
                icon: '📚',
                color: '#ff9800',
            }

            setStatsData(prev => {
                const exists = prev.some(item => item.title === json2.title);
                if (exists) return prev;
                return [...prev, json2];
            });

            // ===========================

            const response3 = await axios("http://localhost:4000/api/v1/requests/count/all")
            const json3 = {
                title: 'Pending Approvals',
                count: response3.data.data,
                icon: '⏳',
                color: '#f44336'
            }

            setStatsData(prev => {
                const exists = prev.some(item => item.title === json3.title);
                if (exists) return prev;
                return [...prev, json3];
            })

        } catch (error) {
            console.log(error);
        }
    };

    const fetchActivities = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/events/recent")

            res.data.data.forEach(item => {
                let json = {
                    id: item._id,
                    activity: item.description,
                    time: item.start,
                    icon: '🔔'
                };
                setRecentActivities(prev => {
                    const exists = prev.some(activity => activity.id === json.id);
                    if (exists) return prev;
                    return [...prev, json];
                });
            });

            // =====================================

            const res1 = await axios.get("http://localhost:4000/api/v1/events/future")

            res1.data.data.forEach(item => {
                let json = {
                    id: item._id,
                    activity: item.description,
                    time: item.start,
                    icon: '🔔'
                };
                setUpcomingActivities(prev => {
                    const exists = prev.some(activity => activity.id === json.id);
                    if (exists) return prev;
                    return [...prev, json];
                });
            });

        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    const fetchUpcomingEvents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/events/all")
            response.data.forEach(item => {
                let json = {
                    id: item._id,
                    activity: item.description,
                    title: item.title,
                    start: item.start,
                    end: item.end,
                };
                setUpcomingEvents(prev => {
                    const exists = prev.some(activity => activity.id === json.id);
                    if (exists) return prev;
                    return [...prev, json];
                });
            });
        } catch (error) {
            console.log(error);

        }
    }

    const fetchNotification = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/notifications/all")
            response.data.data.forEach(item=>{
                let json = {
                    id: item._id,
                    message: item.message,
                    status: item.status,
                    icon: '🔔'
                };
                setNotifications(prev => {
                    const exists = prev.some(activity => activity.id === json.id)
                    if(exists) return prev;
                    return [...prev, json];
                })
            })
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchAdminDetails();
        fetchDashboardOverview();
        fetchActivities();
        fetchUpcomingEvents();
        fetchNotification();
    }, []);

    useEffect(() => {
        console.log("Updated notification:", notifications);
    }, [statsData, recentActivities, upcomingActivities, upcomingEvents, notifications]);


    return (
        <div className="main">
            <div className="dashboard-overview main-2">
                <div className="welcome-banner">
                    <h1 className="text-3xl font-bold">Welcome back, {adminName || "Admin"}!</h1>
                    <p className="text-gray-400">Here's what's happening with your tutoring platform today</p>
                </div>

                {/* Stats Section - Equal width cards */}
                <div className="stats-container">
                    {statsData.map((stat, index) => (
                        <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
                            <div className="stat-content">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-info">
                                    <h3 className="stat-title">{stat.title}</h3>
                                    <p className="stat-count">{stat.count}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Three-column layout for widgets */}
                <div className="widgets-container">
                    {/* Recent Activities Widget */}
                    <div className="widget">
                        <div className="widget-header">
                            <h3 className="widget-title">Recent Activities</h3>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <ul className="widget-list">
                            {recentActivities.map(activity => (
                                <li key={activity.id} className="widget-item">
                                    <span className="activity-icon">{activity.icon}</span>
                                    <div className="activity-content">
                                        <div className="activity-text">{activity.activity}</div>
                                        <span className="timestamp">{activity.time}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Upcoming Activities Widget */}
                    <div className="widget">
                        <div className="widget-header">
                            <h3 className="widget-title">Upcoming Activities</h3>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <ul className="widget-list">
                            {upcomingActivities.map(activity => (
                                <li key={activity.id} className="widget-item">
                                    <span className="activity-icon">{activity.icon}</span>
                                    <div className="activity-content">
                                        <div className="activity-text">{activity.activity}</div>
                                        <span className="timestamp">{activity.time}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Notifications Widget */}
                    <div className="widget">
                        <div className="widget-header">
                            <h3 className="widget-title">Notifications</h3>
                            <button className="view-all-btn">Mark All Read</button>
                        </div>
                        <ul className="widget-list">
                            {notifications.map(notification => (
                                <li key={notification.id} className={`widget-item notification-item ${notification.status.toLowerCase()}`}>
                                    <span className="notification-icon">{notification.icon}</span>
                                    <div className="notification-content">
                                        <div className="notification-text">{notification.message}</div>
                                        <span className="badge">{notification.status}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Upcoming Events Widget */}
                <div className="widget events-widget">
                    <div className="widget-header">
                        <h3 className="widget-title">Upcoming Events</h3>
                    </div>
                    <div className="responsive-table-container">
                        <table className="widget-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Start</th>
                                    <th>End</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingEvents.map(event => (
                                    <tr key={event.id}>
                                        <td><strong>{event.id}</strong></td>
                                        <td>{event.title}</td>
                                        <td>{event.activity}</td>
                                        <td>{event.start}</td>
                                        <td>{event.end}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
