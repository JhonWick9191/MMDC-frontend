import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function AdminDashboardHome() {
    const [data, setData] = useState({
        products: 0,
        brands: 0,
        users: 0,
        brandData: [],
    });
    const [loading, setLoading] = useState(true);

    const colors = [
        "#4f46e5",
        "#06b6d4",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#ec4899",
        "#f97316",
    ];

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setLoading(true);

                const statsRes = await fetch(`${BASE_URL}/totalCountBrandsAndProducts`);
                const statsData = await statsRes.json();

                const userRes = await fetch(`${BASE_URL}/pendingUsers`);
                const userData = await userRes.json();

                setData({
                    products: statsData.totalProducts || 0,
                    brands: statsData.totalBrands || 0,
                    users: userData.users?.length || 0,
                    brandData: statsData.brandWiseCount || [],
                });
            } catch (error) {
                console.error("Dashboard error:", error);
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

    // 👉 ALL brands (sorted only)
    const brandEntries = [...data.brandData].sort(
        (a, b) => b.productCount - a.productCount
    );

    const maxVal = Math.max(...brandEntries.map(b => b.productCount), 1);

    return (
        <div className="mmdc-admin-dashboard-home">
            <div className="mmdc-admin-header">
                <h1>Dashboard Overview</h1>
                <p className="mmdc-admin-subtitle">
                    Essential metrics and brand-wise distribution
                </p>
            </div>

            <div className="mmdc-stats-row">
                {stats.map((stat, idx) => (
                    <div key={idx} className="mmdc-stat-minimal">
                        <div className="mmdc-stat-label">{stat.label}</div>
                        <div className="mmdc-stat-value">
                            {loading ? "..." : stat.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mmdc-graph-section">
                <div className="mmdc-graph-header">
                    <h2>Brand-wise Products</h2>
                    <span className="mmdc-graph-unit">
                        Total Products: {data.products}
                    </span>
                </div>

                {/* ✅ scrollable container */}
                <div
                    className="mmdc-bar-graph-container"
                    style={{ overflowX: "auto" }}
                >
                    {loading ? (
                        <div className="mmdc-graph-placeholder">
                            Loading graph...
                        </div>
                    ) : brandEntries.length > 0 ? (
                        brandEntries.map((item, index) => (
                            <div key={index} className="mmdc-bar-item">
                                <div
                                    className="mmdc-bar-fill"
                                    style={{
                                        height: `${(item.productCount / maxVal) * 100}%`,
                                        backgroundColor:
                                            colors[index % colors.length],
                                    }}
                                >
                                    <span className="mmdc-bar-value-tooltip">
                                        {item.productCount}
                                    </span>
                                </div>
                                <div
                                    className="mmdc-bar-label"
                                    title={item._id}
                                >
                                    {item._id}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mmdc-graph-placeholder">
                            No brand data found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
