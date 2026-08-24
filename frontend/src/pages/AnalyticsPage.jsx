import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  CheckCircle2, Copy, AlertCircle, LayoutDashboard, LogOut
} from 'lucide-react'
import './AnalyticsPage.css'



export default function AnalyticsPage({ adminMode }) {
  const navigate = useNavigate()
  const dashboardUrl = import.meta.env.VITE_POSTHOG_DASHBOARD_URL
  const isDemoMode = !dashboardUrl || dashboardUrl === 'your_shared_dashboard_iframe_url_here'

  const [copied, setCopied] = useState(false)
  const [lastUpdated] = useState(new Date())

  // If not admin, redirect to admin login
  if (!adminMode) {
    return <Navigate to="/admin" replace />
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText('VITE_POSTHOG_DASHBOARD_URL="your_url_here"')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="analytics-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {isDemoMode && (
        <div className="demo-banner">
          <AlertCircle size={18} />
          <span>
            <strong>Demo Mode:</strong> PostHog dashboard iframe is not configured. 
            <a href="#setup-guide" onClick={(e) => {
              e.preventDefault()
              document.getElementById('setup-guide')?.scrollIntoView({ behavior: 'smooth' })
            }}> View setup instructions.</a>
          </span>
        </div>
      )}

      <header className="analytics-header">
        <div className="analytics-header-left">
          <h1>Analytics Dashboard</h1>
          <p>Real-time traffic and visitor statistics</p>
        </div>
        <div className="analytics-header-right">
          <span className="analytics-updated">
            Last updated: {lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
          <div className={`analytics-badge ${isDemoMode ? 'demo' : 'live'}`}>
            <div className="analytics-badge-dot"></div>
            {isDemoMode ? 'Demo Data' : 'Live Tracking'}
          </div>
          <button className="btn-analytics-back" onClick={() => navigate('/admin')}>
            <LogOut size={16} /> Exit
          </button>
        </div>
      </header>
      
      {/* FULL IFRAME SECTION */}
      <div className="analytics-iframe-section" id="setup-guide" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '1rem', padding: '0 2rem 2rem 2rem' }}>
        <div className="iframe-collapse-body open" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="iframe-inner" style={{ flex: 1, minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
            {!isDemoMode ? (
              <iframe 
                src={dashboardUrl}
                frameBorder="0"
                allowFullScreen
                title="PostHog Shared Dashboard"
                className="posthog-iframe"
                style={{ flex: 1, width: '100%', border: 'none', borderRadius: '12px' }}
              />
            ) : (
              <div className="analytics-setup-card">
                <div className="setup-card-header">
                  <div className="setup-card-icon">
                    <LayoutDashboard size={28} />
                  </div>
                  <h2>Dashboard Setup Required</h2>
                  <p>Connect your PostHog account to view real live data here.</p>
                </div>
                <ol className="setup-steps">
                  <li className="setup-step">
                    <div className="setup-step-num">1</div>
                    <div className="setup-step-text">Create a Dashboard in your PostHog project.</div>
                  </li>
                  <li className="setup-step">
                    <div className="setup-step-num">2</div>
                    <div className="setup-step-text">Add insights (Total Visitors, Unique Visitors, Pageviews, Top Pages, etc.).</div>
                  </li>
                  <li className="setup-step">
                    <div className="setup-step-num">3</div>
                    <div className="setup-step-text">Click on "Share" in the dashboard header and enable "Share dashboard publicly".</div>
                  </li>
                  <li className="setup-step">
                    <div className="setup-step-num">4</div>
                    <div className="setup-step-text">
                      Copy the iframe URL and add it to your <code>.env</code> file:
                      <div className="setup-code-block">
                        <code>VITE_POSTHOG_DASHBOARD_URL="your_url_here"</code>
                        <button 
                          className={`setup-copy-btn ${copied ? 'copied' : ''}`} 
                          onClick={copyToClipboard}
                          title="Copy to clipboard"
                        >
                          {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </li>
                </ol>
                <div className="setup-card-footer">
                  <AlertCircle size={16} />
                  Note: Make sure VITE_POSTHOG_KEY is also configured for data collection to work.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
