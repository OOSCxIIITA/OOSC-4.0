import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  Users, Activity, Clock, ArrowUpRight, ArrowDownRight,
  Eye, ArrowLeft, MonitorPlay, ChevronDown, CheckCircle2, Copy, AlertCircle,
  BarChart3, LayoutDashboard, LogOut
} from 'lucide-react'
import './AnalyticsPage.css'

const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0)
  const isNumeric = typeof value === 'number'

  useEffect(() => {
    if (!isNumeric) return
    
    let start = 0
    const duration = 1500
    const increment = value / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, isNumeric])

  if (!isNumeric) return <span>{prefix}{value}{suffix}</span>
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function AnalyticsPage({ adminMode }) {
  const navigate = useNavigate()
  const dashboardUrl = import.meta.env.VITE_POSTHOG_DASHBOARD_URL
  const isDemoMode = !dashboardUrl || dashboardUrl === 'your_shared_dashboard_iframe_url_here'

  const [iframeOpen, setIframeOpen] = useState(!isDemoMode)
  const [copied, setCopied] = useState(false)
  const [lastUpdated] = useState(new Date())

  const trafficCanvasRef = useRef(null)
  const topPagesCanvasRef = useRef(null)

  // If not admin, redirect to admin login
  if (!adminMode) {
    return <Navigate to="/admin" replace />
  }

  // Canvas drawing functions
  const drawTrafficChart = (canvas) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    const data = [120, 150, 180, 140, 210, 190, 280]
    const max = Math.max(...data) * 1.2
    const paddingX = 40
    const paddingY = 30
    
    // Draw horizontal grid lines
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    for(let i=0; i<=4; i++) {
        const y = paddingY + (height - paddingY * 2) * (i / 4)
        ctx.moveTo(paddingX, y)
        ctx.lineTo(width - paddingX, y)
    }
    ctx.stroke()

    // Draw Line
    ctx.beginPath()
    ctx.strokeStyle = '#0EA5E9'
    ctx.lineWidth = 3
    data.forEach((val, i) => {
      const x = paddingX + (width - paddingX * 2) * (i / (data.length - 1))
      const y = height - paddingY - ((val / max) * (height - paddingY * 2))
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Draw Area underneath
    ctx.lineTo(width - paddingX, height - paddingY)
    ctx.lineTo(paddingX, height - paddingY)
    ctx.closePath()
    const gradient = ctx.createLinearGradient(0, paddingY, 0, height - paddingY)
    gradient.addColorStop(0, 'rgba(14, 165, 233, 0.25)')
    gradient.addColorStop(1, 'rgba(14, 165, 233, 0)')
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw points
    ctx.fillStyle = '#0EA5E9'
    data.forEach((val, i) => {
      const x = paddingX + (width - paddingX * 2) * (i / (data.length - 1))
      const y = height - paddingY - ((val / max) * (height - paddingY * 2))
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#0B1120'
      ctx.lineWidth = 2
      ctx.stroke()
    })
    
    // X-Axis Labels
    ctx.fillStyle = '#64748B'
    ctx.font = '12px Inter'
    ctx.textAlign = 'center'
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    days.forEach((day, i) => {
       const x = paddingX + (width - paddingX * 2) * (i / (days.length - 1))
       ctx.fillText(day, x, height - 10)
    })
  }

  const drawTopPagesChart = (canvas) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    const data = [
      { label: '/', val: 4521 },
      { label: '/hackathon', val: 3204 },
      { label: '/schedule', val: 2150 },
      { label: '/speakers', val: 1890 },
      { label: '/sponsors', val: 945 },
    ]
    const max = Math.max(...data.map(d => d.val)) * 1.15
    const paddingX = 20
    const paddingY = 20
    const barHeight = 28
    const spacing = (height - paddingY * 2) / data.length
    const labelWidth = 90

    data.forEach((item, i) => {
      const y = paddingY + (i * spacing) + (spacing - barHeight) / 2
      const barWidth = (item.val / max) * (width - labelWidth - paddingX * 2)

      // Background bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.beginPath()
      ctx.roundRect(labelWidth + paddingX, y, width - labelWidth - paddingX * 2, barHeight, 6)
      ctx.fill()

      // Foreground bar
      ctx.fillStyle = '#14B8A6'
      ctx.beginPath()
      ctx.roundRect(labelWidth + paddingX, y, barWidth, barHeight, 6)
      ctx.fill()

      // Label
      ctx.fillStyle = '#E2E8F0'
      ctx.font = '13px Inter'
      ctx.textAlign = 'right'
      ctx.fillText(item.label, labelWidth + paddingX - 15, y + 18)

      // Value
      ctx.fillStyle = '#94A3B8'
      ctx.textAlign = 'left'
      ctx.fillText(item.val.toLocaleString(), labelWidth + paddingX + barWidth + 10, y + 18)
    })
  }

  useEffect(() => {
    const handleResize = () => {
       if (trafficCanvasRef.current) {
          const parent = trafficCanvasRef.current.parentElement
          trafficCanvasRef.current.width = parent.clientWidth
          trafficCanvasRef.current.height = 280
          drawTrafficChart(trafficCanvasRef.current)
       }
       if (topPagesCanvasRef.current) {
          const parent = topPagesCanvasRef.current.parentElement
          topPagesCanvasRef.current.width = parent.clientWidth
          topPagesCanvasRef.current.height = 280
          drawTopPagesChart(topPagesCanvasRef.current)
       }
    }
    
    // Delay slightly to ensure layout is done
    setTimeout(handleResize, 100)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText('VITE_POSTHOG_DASHBOARD_URL="your_url_here"')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Demo Feed Data
  const feedEvents = [
    { page: '/hackathon', time: 'Just now', user: 'Anonymous' },
    { page: '/', time: '2 min ago', user: 'Anonymous' },
    { page: '/speakers', time: '5 min ago', user: 'Anonymous' },
    { page: '/schedule', time: '12 min ago', user: 'Anonymous' },
    { page: '/', time: '15 min ago', user: 'Anonymous' },
    { page: '/contact', time: '22 min ago', user: 'Anonymous' },
    { page: '/sponsors', time: '28 min ago', user: 'Anonymous' },
  ]

  return (
    <div className="analytics-page">
      {isDemoMode && (
        <div className="demo-banner">
          <AlertCircle size={18} />
          <span>
            <strong>Demo Mode:</strong> PostHog is not fully configured. Showing mock data for demonstration. 
            <a href="#setup-guide" onClick={(e) => {
              e.preventDefault()
              setIframeOpen(true)
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
      
      {/* KPI STAT CARDS */}
      <div className="analytics-stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon"><Eye size={20} /></div>
            <div className="stat-card-trend up">
              <ArrowUpRight size={14} /> 12.5%
            </div>
          </div>
          <div className="stat-card-value">
            <AnimatedCounter value={12458} />
          </div>
          <div className="stat-card-label">Total Page Views</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon"><Users size={20} /></div>
            <div className="stat-card-trend up">
              <ArrowUpRight size={14} /> 8.2%
            </div>
          </div>
          <div className="stat-card-value">
            <AnimatedCounter value={8234} />
          </div>
          <div className="stat-card-label">Unique Visitors</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon"><Clock size={20} /></div>
            <div className="stat-card-trend up">
              <ArrowUpRight size={14} /> 4.1%
            </div>
          </div>
          <div className="stat-card-value">
            <AnimatedCounter value="3m 42s" />
          </div>
          <div className="stat-card-label">Avg. Session Duration</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon"><Activity size={20} /></div>
            <div className="stat-card-trend up">
              <ArrowDownRight size={14} /> 2.4%
            </div>
          </div>
          <div className="stat-card-value">
            <AnimatedCounter value="42.3%" />
          </div>
          <div className="stat-card-label">Bounce Rate</div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="analytics-charts-grid">
        <div className="chart-panel">
          <div className="chart-panel-header">
            <div className="chart-panel-title">
              <BarChart3 size={18} />
              Traffic Over Time
            </div>
            <div className="chart-panel-subtitle">Past 7 Days</div>
          </div>
          <div className="chart-canvas-wrap" style={{ height: '280px' }}>
            <canvas ref={trafficCanvasRef}></canvas>
          </div>
        </div>

        <div className="chart-panel">
          <div className="chart-panel-header">
            <div className="chart-panel-title">
              <LayoutDashboard size={18} />
              Top Pages
            </div>
            <div className="chart-panel-subtitle">By Pageviews</div>
          </div>
          <div className="chart-canvas-wrap" style={{ height: '280px' }}>
            <canvas ref={topPagesCanvasRef}></canvas>
          </div>
        </div>
      </div>

      {/* ACTIVITY FEED */}
      <div className="analytics-feed-section">
        <div className="feed-panel">
          <div className="feed-panel-header">
            <div className="feed-panel-title">
              <MonitorPlay size={18} />
              Live Activity Feed
            </div>
            <div className="feed-count-badge">{feedEvents.length} Recent Events</div>
          </div>
          <ul className="feed-list">
            {feedEvents.map((event, idx) => (
              <li key={idx} className="feed-item">
                <div className="feed-item-dot"></div>
                <div className="feed-item-content">
                  <div className="feed-item-page">Visited {event.page}</div>
                  <div className="feed-item-meta">User: {event.user}</div>
                </div>
                <div className="feed-item-time">{event.time}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COLLAPSIBLE IFRAME SECTION */}
      <div className="analytics-iframe-section" id="setup-guide">
        <button 
          className={`iframe-toggle-btn ${iframeOpen ? 'open' : ''}`}
          onClick={() => setIframeOpen(!iframeOpen)}
        >
          <div className="iframe-toggle-left">
            <LayoutDashboard size={18} />
            Full PostHog Dashboard
          </div>
          <ChevronDown size={20} className="iframe-toggle-chevron" />
        </button>
        
        <div className={`iframe-collapse-body ${iframeOpen ? 'open' : ''}`}>
          <div className="iframe-inner">
            {!isDemoMode ? (
              <iframe 
                src={dashboardUrl}
                frameBorder="0"
                allowFullScreen
                title="PostHog Shared Dashboard"
                className="posthog-iframe"
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
