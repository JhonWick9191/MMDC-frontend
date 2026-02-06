import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function AdminDashboardHome() {
    const [data, setData] = useState({
        products: 0,
        brands: 0,
        users: 0,
        categories: {},
    });
    const [loading, setLoading] = useState(true);

    // Array of colors for the bars
    const colors = [
        "#4f46e5", // Indigo
        "#06b6d4", // Cyan
        "#10b981", // Emerald
        "#f59e0b", // Amber
        "#ef4444", // Red
        "#8b5cf6", // Violet
        "#ec4899", // Pink
        "#f97316", // Orange
    ];

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setLoading(true);

                // 1. Fetch consolidated stats (Products, Brands, AND Category Distribution)
                // Research shows this endpoint already returns 'categoryCount'
                const statsRes = await fetch(`${BASE_URL}/totalCountBrandsAndProducts`);
                const statsData = await statsRes.json();

                // 2. Fetch users separately (this seems to be the standard way in the app)
                const userRes = await fetch(`${BASE_URL}/pendingUsers`);
                const userData = await userRes.json();

                if (statsData.success) {
                    setData({
                        products: statsData.totalProducts || 0,
                        brands: statsData.totalBrands || 0,
                        users: userData.users?.length || 0,
                        // Reusing the existing working field from the stats API
                        categories: statsData.categoryCount || {},
                    });
                }
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData();
    }, []);

    const stats = [
        { label: "Total Products", value: data.products },
        { label: "Total Users", value: data.users },
        { label: "Total Brands", value: data.brands },
    ];

    // Prepare graph data (top 8 categories to keep it clean)
    const categoryEntries = Object.entries(data.categories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);

    const maxVal = Math.max(...categoryEntries.map(e => e[1]), 1);

    return (
        <div className="mmdc-admin-dashboard-home">
            <div className="mmdc-admin-header">
                <h1>Dashboard Overview</h1>
                <p className="mmdc-admin-subtitle">Essential metrics and product distribution</p>
            </div>

            <div className="mmdc-stats-row">
                {stats.map((stat, idx) => (
                    <div key={idx} className="mmdc-stat-minimal">
                        <div className="mmdc-stat-label">{stat.label}</div>
                        <div className="mmdc-stat-value">{loading ? "..." : stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="mmdc-graph-section">
                <div className="mmdc-graph-header">
                    <h2>Category-wise Products</h2>
                    <span className="mmdc-graph-unit">Total Count</span>
                </div>

                <div className="mmdc-bar-graph-container">
                    {loading ? (
                        <div className="mmdc-graph-placeholder">Loading distribution data...</div>
                    ) : categoryEntries.length > 0 ? (
                        categoryEntries.map(([name, count], idx) => (
                            <div key={idx} className="mmdc-bar-item">
                                <div
                                    className="mmdc-bar-fill"
                                    style={{
                                        height: `${(count / maxVal) * 100}%`,
                                        backgroundColor: colors[idx % colors.length]
                                    }}
                                >
                                    <span className="mmdc-bar-value-tooltip">{count}</span>
                                </div>
                                <div className="mmdc-bar-label" title={name}>{name}</div>
                            </div>
                        ))
                    ) : (
                        <div className="mmdc-graph-placeholder">No product data found for categories</div>
                    )}
                </div>
            </div>
        </div>
    );
}
