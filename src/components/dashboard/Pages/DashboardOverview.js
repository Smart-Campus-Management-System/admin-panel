
import DashboardCard from "../Utilities/DashboardCard";
import Header from "../Header";
import "./styles/DashboardOverview.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardOverview = () => {
    const [adminName, setAdminName] = useState("");
    const stats = [
        { title: "Total Tutors", count: 56, icon: "👩‍🏫", color: "#4caf50" },
        { title: "Total Students", count: 120, icon: "👩‍🎓", color: "#2196f3" },
        { title: "Subjects Offered", count: 20, icon: "📚", color: "#ff9800" },
        { title: "Pending Approvals", count: 5, icon: "⏳", color: "#f44336" },
    ];

    const recentActivities = [
        { id: 1, activity: "New student registered", time: "2 hours ago", icon: "🔔" },
        { id: 2, activity: "Tutor uploaded course material", time: "5 hours ago", icon: "📤" },
        { id: 3, activity: "Course updated", time: "Yesterday", icon: "✏️" },
    ];

    const upcomingActivities = [
        { id: 1, activity: "Weekly tutor meeting", time: "Tomorrow, 9:00 AM", icon: "👥" },
        { id: 2, activity: "Course registration deadline", time: "3 days left", icon: "📅" },
        { id: 3, activity: "Platform maintenance", time: "Next week", icon: "🔧" },
    ];

    const upcomingEvents = [
        { id: 1, event: "Math Workshop", date: "2025-03-25", time: "10:00 AM", location: "Room 101" },
        { id: 2, event: "Science Fair", date: "2025-03-30", time: "2:00 PM", location: "Main Hall" },
    ];

    const notifications = [
        { id: 1, message: "System maintenance scheduled", status: "Important", icon: "⚠️" },
        { id: 2, message: "New course available: AI Basics", status: "Info", icon: "ℹ️" },
    ];


    const fetchAdminDetails = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/auth/admin", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (response.data && response.data.firstName) {
                setAdminName(response.data.firstName);
            } else {
                console.warn("Admin name not found in response data");
            }
        } catch (error) {
            console.error("Error fetching admin details:", error);
        }
    };
    useEffect(() => {
        fetchAdminDetails();
    }, []);

    return (
        <div className="main">
            <div className="dashboard-overview main-2">
                <div className="welcome-banner">
                    <h1 className="text-3xl font-bold">Welcome back, {adminName || "Admin"}!</h1>
                    <p className="text-gray-400">Here's what's happening with your tutoring platform today</p>
                </div>

                {/* Stats Section - Equal width cards */}
                <div className="stats-container">
                    {stats.map((stat, index) => (
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
                        <button className="view-all-btn">Add Event</button>
                    </div>
                    <div className="responsive-table-container">
                        <table className="widget-table">
                            <thead>
                            <tr>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {upcomingEvents.map(event => (
                                <tr key={event.id}>
                                    <td><strong>{event.event}</strong></td>
                                    <td>{event.date}</td>
                                    <td>{event.time}</td>
                                    <td>{event.location}</td>
                                    <td><button className="action-btn">Details</button></td>
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
