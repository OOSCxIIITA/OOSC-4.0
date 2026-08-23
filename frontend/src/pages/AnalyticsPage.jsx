import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function AnalyticsPage({ adminMode }) {
  const dashboardUrl = import.meta.env.VITE_POSTHOG_DASHBOARD_URL

  useEffect(() => {
    // Optional: Log pageview using PostHog or any other logic if needed
  }, [])

  // If not admin, redirect to admin login
  if (!adminMode) {
    return <Navigate to="/admin" replace />
  }


  return (
    <div className="analytics-page">
      <header className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Real-time traffic and visitor statistics from PostHog</p>
      </header>
      
      <div className="dashboard-container">
        {dashboardUrl && dashboardUrl !== 'your_shared_dashboard_iframe_url_here' ? (
          <iframe 
            src={dashboardUrl}
            frameBorder="0"
            allowFullScreen
            title="PostHog Shared Dashboard"
            className="posthog-iframe"
          />
        ) : (
          <div className="dashboard-setup-message glass-card">
            <h2>Dashboard Setup Required</h2>
            <p>To view analytics here, follow these steps:</p>
            <ol>
              <li>Create a Dashboard in your PostHog project.</li>
              <li>Add insights (Total Visitors, Unique Visitors, Pageviews, Top Pages, etc.).</li>
              <li>Click on "Share" in the dashboard header.</li>
              <li>Enable "Share dashboard publicly".</li>
              <li>Copy the provided iframe URL (just the URL in the `src` attribute).</li>
              <li>Add it to your <code>.env</code> file as <code>VITE_POSTHOG_DASHBOARD_URL</code>.</li>
            </ol>
            <p className="dashboard-note">Note: Make sure `VITE_POSTHOG_KEY` is also configured for data collection to work.</p>
          </div>
        )}
      </div>
    </div>
  )
}
