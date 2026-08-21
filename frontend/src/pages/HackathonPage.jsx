import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import * as LucideIcons from 'lucide-react'
import { Target, Users, Check, Trophy, Medal, Star, ClipboardList, Calendar, Rocket, X, ArrowRight, Edit2, Trash2, Plus, HelpCircle } from 'lucide-react'
import './HackathonPage.css'

const renderLucideIcon = (iconStr, fallbackIcon, size = 16) => {
  if (!iconStr) return fallbackIcon;
  const name = iconStr.trim();
  const Icon = LucideIcons[name];
  if (Icon) {
    return <Icon size={size} />;
  }
  return <span style={{ fontSize: `${size}px` }}>{iconStr}</span>;
}

const formatNumber = (num) => String(num).padStart(2, '0')

export default function HackathonPage({ 
  siteConfig = {}, 
  navigateTo, 
  adminMode, 
  hkTracks = [], 
  setHkTracks, 
  hkEligibility = [], 
  setHkEligibility, 
  hkTeamComp = [], 
  setHkTeamComp, 
  hkPrizes = [], 
  setHkPrizes, 
  hkSpecialPrizes = [], 
  setHkSpecialPrizes, 
  hkRules = [], 
  setHkRules, 
  hkTimeline = [], 
  setHkTimeline, 
  hkSteps = [], 
  setHkSteps, 
  openModal, 
  editRecord, 
  deleteRecord 
}) {
  const [selectedTrack, setSelectedTrack] = useState(null)
  
  const sortedTracks = [...(hkTracks || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const sortedEligibility = [...(hkEligibility || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const sortedTeamComp = [...(hkTeamComp || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const sortedPrizes = [...(hkPrizes || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const sortedSpecialPrizes = [...(hkSpecialPrizes || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const sortedRules = [...(hkRules || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const sortedTimeline = [...(hkTimeline || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const sortedSteps = [...(hkSteps || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  return (
    <div className="hackathon-body" id="hackathon">
      <Helmet>
        <title>Hackathon - OOSC 4.0 | IIIT Allahabad</title>
        <meta name="description" content="Participate in the OOSC 4.0 Hackathon at IIIT Allahabad, Aug 28–30, 2026. Build the future of open-source systems, compete for ₹1,00,000+ in prizes, and showcase your projects." />
        <meta name="keywords" content="OOSC 4.0 hackathon, open source hackathon, IIIT Allahabad hackathon, coding competition, prizes, open source projects, Prayagraj" />
        <link rel="canonical" href="https://oosc.iiita.ac.in/hackathon" />
        <meta property="og:title" content="Hackathon - OOSC 4.0 | IIIT Allahabad" />
        <meta property="og:description" content="Participate in the OOSC 4.0 Hackathon. Build the future of open-source systems, compete for ₹1,00,000+ in prizes, and showcase your projects." />
        <meta property="og:url" content="https://oosc.iiita.ac.in/hackathon" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://oosc.iiita.ac.in/OOSC_logo.png" />
        <meta property="og:image:alt" content="OOSC 4.0 Hackathon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hackathon - OOSC 4.0 | IIIT Allahabad" />
        <meta name="twitter:description" content="Join the OOSC 4.0 Hackathon. Compete for prizes at IIIT Allahabad." />
        <meta name="twitter:image" content="https://oosc.iiita.ac.in/OOSC_logo.png" />
        <meta name="twitter:image:alt" content="OOSC 4.0 Hackathon" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "OOSC 4.0 Hackathon",
              "description": "Participate in the OOSC 4.0 Hackathon at IIIT Allahabad. Build the future of open-source systems and compete for prizes.",
              "url": "https://oosc.iiita.ac.in/hackathon",
              "startDate": "2026-08-28T09:00:00+05:30",
              "endDate": "2026-08-30T21:00:00+05:30",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "IIIT Allahabad",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Prayagraj",
                  "addressRegion": "UP",
                  "addressCountry": "IN"
                }
              },
              "offers": {
                "@type": "Offer",
                "url": "https://oosc.iiita.ac.in/register",
                "price": "0",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
              }
            }
          `}
        </script>
      </Helmet>

      {/* ── 1. HERO BANNER ── */}
      {(siteConfig.hackathonHidden !== 'true' || adminMode) && (
        <section className="hackathon-hero">
          <div className="hackathon-hero-inner">
            <div className="hackathon-badge">
              <span className="badge-dot"></span>
              <span>{siteConfig.hackathonBadge || 'OOSC 4.0 · HACKATHON 2026'}</span>
            </div>
            
            <h1 className="hackathon-hero-title">
              {siteConfig.hackathonTitle || 'BUILD THE FUTURE'}
            </h1>
            
            <div className="hackathon-theme-box">
              <span className="theme-label">Event Theme</span>
              <p className="theme-name">
                "{siteConfig.hackathonTheme || 'Problem Statements are live...'}"
              </p>
            </div>

            {siteConfig.hackathonHidden !== 'true' && (
              <div className="hackathon-stat-strip">
                <div className="hstat">
                  <span className="hstat-value">{siteConfig.hackathonPrizePool || '₹40,000+'}</span>
                  <span className="hstat-label">Prize Pool</span>
                </div>
                <div className="hstat">
                  <span className="hstat-value">{siteConfig.hackathonTeamSize || '2–3'}</span>
                  <span className="hstat-label">Team Size</span>
                </div>
                <div className="hstat">
                  <span className="hstat-value">{siteConfig.hackathonDates || 'Aug 18–30'}</span>
                  <span className="hstat-label">Event Dates</span>
                </div>
                <div className="hstat">
                  <span className="hstat-value">{siteConfig.hackathonVenue || 'IIIT Allahabad'}</span>
                  <span className="hstat-label">Venue</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {siteConfig.hackathonHidden === 'true' && adminMode && (
        <div className="admin-status-message error" style={{ margin: '0 auto 2rem', maxWidth: '1200px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-error)', borderRadius: '12px', padding: '16px 20px' }}>
          🚨 <strong>Admin Notice:</strong> The Hackathon page content is currently HIDDEN from the public. Only admins can see the sections below.
        </div>
      )}

      {siteConfig.hackathonHidden === 'true' && !adminMode ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', minHeight: '45vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="hk-icon" style={{ marginBottom: '1.25rem' }}><Rocket size={48} color="var(--color-brand-blue)" /></div>
          <h2 style={{ fontSize: '2rem', color: 'var(--color-heading-bright)' }}>Hackathon Details Coming Soon</h2>
          <p style={{ marginTop: '1rem', color: 'var(--color-text-warm-muted)', maxWidth: '600px', lineHeight: '1.7' }}>
            We are currently finalizing the details, problem statements, and rules for the upcoming OOSC 4.0 Hackathon. 
            Stay tuned!
          </p>
        </div>
      ) : (
        <div className="hackathon-content-container">
          
          {/* ── GOOGLE TECHNOLOGY FOCUS ── */}
          <section className="hk-card hk-section-google-focus" style={{ borderLeft: '4px solid #4285f4', backgroundColor: 'rgba(66, 133, 244, 0.04)' }}>
            <div className="hk-card-header" style={{ borderBottom: '1px solid rgba(66, 133, 244, 0.1)' }}>
              <div className="hk-title-group">
                <div className="hk-icon"><Star size={22} color="#4285f4" /></div>
                <h2 className="hk-section-heading" style={{ color: '#4285f4' }}>Google Technology Focus</h2>
              </div>
            </div>
            <div style={{ padding: '1.5rem', paddingTop: '1.25rem' }}>
              <p style={{ color: 'var(--color-text-bright)', lineHeight: '1.6', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                We are actively encouraging the adoption of <strong>Google technologies</strong> and the modern Google developer ecosystem throughout the hackathon.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Participants are encouraged to explore tools such as <strong>Google Antigravity, Gemini, Gemini APIs, Google AI Studio, Firebase</strong>, and other Google developer technologies while building their solutions. Leverage these powerful tools to build innovative and scalable projects!
              </p>
            </div>
          </section>

          {/* ── 2. WHO CAN PARTICIPATE (FULL WIDTH COMPACT) ── */}
          <section className="hk-card hk-section-participation">
            <div className="hk-card-header">
              <div className="hk-title-group">
                <div className="hk-icon"><Users size={22} color="var(--color-brand-blue)" /></div>
                <h2 className="hk-section-heading">Who Can Participate</h2>
              </div>
            </div>

            <div className="participation-content-grid">
              {/* Eligibility Sub-block */}
              <div className="hk-subgroup">
                <div className="hk-subgroup-header">
                  <span className="hk-subheading-tag">ELIGIBILITY</span>
                  {adminMode && (
                    <button type="button" className="btn btn-admin-mini" onClick={() => openModal('hackathon-eligibility', 'create')}>
                      <Plus size={13} /> Add
                    </button>
                  )}
                </div>
                <div className="clean-eligibility-list">
                  {sortedEligibility.length > 0 ? sortedEligibility.map((item) => (
                    <div key={item.id} className="clean-eligibility-row">
                      <div className="clean-check-icon">
                        <Check size={16} />
                      </div>
                      <div className="clean-elig-content">
                        <p>{item.content}</p>
                      </div>
                      {adminMode && (
                        <div className="hk-item-admin">
                          <button type="button" className="btn-icon" onClick={() => editRecord('hackathon-eligibility', item)}>
                            <Edit2 size={13} />
                          </button>
                          <button type="button" className="btn-icon btn-delete" onClick={() => deleteRecord('hackathon-eligibility', item.id, setHkEligibility)}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="hk-empty-state light">
                      <p>No eligibility criteria added yet.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Team Composition Sub-block */}
              <div className="hk-subgroup">
                <div className="hk-subgroup-header">
                  <span className="hk-subheading-tag">TEAM COMPOSITION</span>
                  {adminMode && (
                    <button type="button" className="btn btn-admin-mini" onClick={() => openModal('hackathon-team-comp', 'create')}>
                      <Plus size={13} /> Add
                    </button>
                  )}
                </div>
                <div className="team-pill-list">
                  {sortedTeamComp.length > 0 ? sortedTeamComp.map((t) => (
                    <div key={t.id} className="team-comp-pill">
                      <span className="pill-icon">{renderLucideIcon(t.icon, <Users size={15} />, 15)}</span>
                      <span className="pill-text">{t.label}</span>
                      {adminMode && (
                        <div className="pill-admin-actions">
                          <span role="button" title="Edit" onClick={() => editRecord('hackathon-team-comp', t)}>✎</span>
                          <span role="button" title="Delete" className="pill-del" onClick={() => deleteRecord('hackathon-team-comp', t.id, setHkTeamComp)}>×</span>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="hk-empty-state light">
                      <p>No team rules added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. PROBLEM STATEMENTS (FULL WIDTH 2-COLUMN GRID) ── */}
          <section className="hk-card hk-section-tracks">
            <div className="hk-card-header">
              <div className="hk-title-group">
                <div className="hk-icon"><Target size={22} color="var(--color-brand-blue)" /></div>
                <h2 className="hk-section-heading">Problem Statements</h2>
              </div>
              {adminMode && (
                <button type="button" className="btn btn-admin-mini" onClick={() => openModal('hackathon-tracks', 'create')}>
                  <Plus size={14} /> Add Track
                </button>
              )}
            </div>

            {siteConfig.hackathonProblemStatement && (
              <div className="hk-intro-text">
                {siteConfig.hackathonProblemStatement.split('\n').filter(p => p.trim()).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            <div className="track-cards-grid">
              {sortedTracks.length > 0 ? sortedTracks.map((t, i) => (
                <div 
                  key={t.id || i} 
                  className="track-card"
                  onClick={() => setSelectedTrack(t)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTrack(t); } }}
                >
                  <div className="track-card-top">
                    <span className="track-num">{formatNumber(i + 1)}</span>
                    {adminMode && (
                      <div className="hk-item-admin" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="btn-icon" title="Edit" onClick={() => editRecord('hackathon-tracks', t)}>
                          <Edit2 size={13} />
                        </button>
                        <button type="button" className="btn-icon btn-delete" title="Delete" onClick={() => deleteRecord('hackathon-tracks', t.id, setHkTracks)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                  <h3 className="track-title">{t.title}</h3>
                  <div className="track-card-footer">
                    <span className="track-link">
                      More Details <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              )) : (
                <div className="hk-empty-state">
                  <p>No problem statements available yet.</p>
                </div>
              )}
            </div>

            <div className="hk-footnote">
              <p>All solutions must be open-source, reproducible, and include a live demo or working prototype.</p>
            </div>
          </section>

          {/* ── 3. PRIZES & REWARDS ── */}
          <section className="hk-card hk-section-prizes">
            <div className="hk-card-header">
              <div className="hk-title-group">
                <div className="hk-icon"><Trophy size={24} color="#f59e0b" /></div>
                <h2 className="hk-section-heading">Prizes &amp; Rewards</h2>
              </div>
              {adminMode && (
                <button type="button" className="btn btn-admin-mini" onClick={() => openModal('hackathon-prizes', 'create')}>
                  <Plus size={14} /> Add Prize
                </button>
              )}
            </div>

            <div className="prizes-podium-grid">
              {sortedPrizes.length > 0 ? sortedPrizes.map((prize, idx) => {
                const isFirst = idx === 0 || (prize.colorClass && prize.colorClass.toLowerCase().includes('gold')) || prize.position?.toLowerCase().includes('1');
                return (
                  <div key={prize.id || idx} className={`prize-podium-card ${isFirst ? 'prize-primary-winner' : 'prize-runner-up'} ${prize.colorClass || ''}`}>
                    {adminMode && (
                      <div className="hk-item-admin top-right">
                        <button type="button" className="btn-icon" onClick={() => editRecord('hackathon-prizes', prize)}>
                          <Edit2 size={13} />
                        </button>
                        <button type="button" className="btn-icon btn-delete" onClick={() => deleteRecord('hackathon-prizes', prize.id, setHkPrizes)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                    <div className="prize-badge-icon">
                      {isFirst ? <Trophy size={38} className="trophy-icon" /> : <Medal size={30} className="medal-icon" />}
                    </div>
                    <span className="prize-position-tag">{prize.position}</span>
                    <h3 className="prize-amount-display">{prize.amount}</h3>
                    {prize.description && <p className="prize-desc-text">{prize.description}</p>}
                  </div>
                )
              }) : (
                <div className="hk-empty-state">
                  <p>No prizes added yet.</p>
                </div>
              )}
            </div>

            {/* Special Category Awards */}
            <div className="special-awards-block">
              <div className="hk-subgroup-header">
                <span className="hk-subheading-tag">SPECIAL CATEGORY AWARDS</span>
                {adminMode && (
                  <button type="button" className="btn btn-admin-mini" onClick={() => openModal('hackathon-special-prizes', 'create')}>
                    <Plus size={13} /> Add
                  </button>
                )}
              </div>
              <div className="special-awards-pills">
                {sortedSpecialPrizes.length > 0 ? sortedSpecialPrizes.map((p) => (
                  <div key={p.id} className="special-award-pill">
                    <span className="award-icon">{renderLucideIcon(p.icon, <Star size={15} />, 15)}</span>
                    <span className="award-text">{p.label}</span>
                    {adminMode && (
                      <div className="pill-admin-actions">
                        <span role="button" title="Edit" onClick={() => editRecord('hackathon-special-prizes', p)}>✎</span>
                        <span role="button" title="Delete" className="pill-del" onClick={() => deleteRecord('hackathon-special-prizes', p.id, setHkSpecialPrizes)}>×</span>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="hk-empty-state light">
                    <p>No special category awards added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── 4. RULES & GUIDELINES + IMPORTANT DATES ── */}
          <div className="hk-grid-2">
            {/* Left: Rules & Guidelines */}
            <div className="hk-card hk-section-rules">
              <div className="hk-card-header">
                <div className="hk-title-group">
                  <div className="hk-icon"><ClipboardList size={22} color="var(--color-brand-blue)" /></div>
                  <h2 className="hk-section-heading">Rules &amp; Guidelines</h2>
                </div>
                {adminMode && (
                  <button type="button" className="btn btn-admin-mini" onClick={() => openModal('hackathon-rules', 'create')}>
                    <Plus size={14} /> Add Rule
                  </button>
                )}
              </div>

              <div className="clean-rules-table">
                {sortedRules.length > 0 ? sortedRules.map((rule, i) => (
                  <div key={rule.id || i} className="clean-rule-row">
                    <div className="rule-num-col">
                      <span className="clean-rule-num">{formatNumber(i + 1)}</span>
                    </div>
                    <div className="rule-content-col">
                      <p>{rule.content}</p>
                    </div>
                    {adminMode && (
                      <div className="hk-item-admin">
                        <button type="button" className="btn-icon" onClick={() => editRecord('hackathon-rules', rule)}>
                          <Edit2 size={13} />
                        </button>
                        <button type="button" className="btn-icon btn-delete" onClick={() => deleteRecord('hackathon-rules', rule.id, setHkRules)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="hk-empty-state">
                    <p>No rules added yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Important Dates (Vertical Timeline) */}
            <div className="hk-card hk-section-timeline">
              <div className="hk-card-header">
                <div className="hk-title-group">
                  <div className="hk-icon"><Calendar size={22} color="var(--color-brand-blue)" /></div>
                  <h2 className="hk-section-heading">Important Dates</h2>
                </div>
                {adminMode && (
                  <button type="button" className="btn btn-admin-mini" onClick={() => openModal('hackathon-timeline', 'create')}>
                    <Plus size={14} /> Add Date
                  </button>
                )}
              </div>

              <div className="clean-vertical-timeline">
                {sortedTimeline.length > 0 ? sortedTimeline.map((d, idx) => (
                  <div key={d.id || idx} className="timeline-node">
                    <div className="timeline-line-track">
                      <div className={`timeline-dot ${d.status === 'active' ? 'active' : ''}`}></div>
                      {idx < sortedTimeline.length - 1 && <div className="timeline-connector-line"></div>}
                    </div>
                    <div className="timeline-node-content">
                      <div className="timeline-header-row">
                        <h4 className="timeline-item-label">{d.label}</h4>
                        <span className="timeline-item-value">{d.value}</span>
                      </div>
                      {d.description && <p className="timeline-item-desc">{d.description}</p>}
                    </div>
                    {adminMode && (
                      <div className="hk-item-admin">
                        <button type="button" className="btn-icon" onClick={() => editRecord('hackathon-timeline', d)}>
                          <Edit2 size={13} />
                        </button>
                        <button type="button" className="btn-icon btn-delete" onClick={() => deleteRecord('hackathon-timeline', d.id, setHkTimeline)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="hk-empty-state">
                    <p>No timeline dates added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── 5. HOW TO REGISTER & SUBMIT ── */}
          <section className="hk-card hk-section-steps">
            <div className="hk-card-header">
              <div className="hk-title-group">
                <div className="hk-icon"><Rocket size={22} color="var(--color-brand-blue)" /></div>
                <h2 className="hk-section-heading">How to Register &amp; Submit</h2>
              </div>
              {adminMode && (
                <button type="button" className="btn btn-admin-mini" onClick={() => openModal('hackathon-steps', 'create')}>
                  <Plus size={14} /> Add Step
                </button>
              )}
            </div>

            <div className="clean-steps-grid">
              {sortedSteps.length > 0 ? sortedSteps.map((step, i) => (
                <div key={step.id || i} className="clean-step-card">
                  <div className="clean-step-header">
                    <span className="clean-step-num">{formatNumber(i + 1)}</span>
                    {adminMode && (
                      <div className="hk-item-admin">
                        <button type="button" className="btn-icon" onClick={() => editRecord('hackathon-steps', step)}>
                          <Edit2 size={13} />
                        </button>
                        <button type="button" className="btn-icon btn-delete" onClick={() => deleteRecord('hackathon-steps', step.id, setHkSteps)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="clean-step-body">
                    <h4 className="clean-step-title">{step.title}</h4>
                    <p className="clean-step-desc">{step.description}</p>
                  </div>
                </div>
              )) : (
                <div className="hk-empty-state">
                  <p>No submission steps added yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* ── 6. BOTTOM CTA ── */}
          {siteConfig.registrationFormUrl && (
            <section className="hackathon-cta-banner">
              <div className="cta-banner-content">
                <h2 className="cta-banner-title">{siteConfig.hackathonCtaReady || 'READY TO BUILD?'}</h2>
                <p className="cta-banner-desc">
                  {siteConfig.hackathonCtaDesc || 'Registration is open. Spots are limited — secure your team today.'}
                </p>
              </div>
              <div className="cta-banner-actions">
                <button 
                  type="button" 
                  className="btn btn-primary btn-cta-main" 
                  onClick={() => window.open(siteConfig.registrationFormUrl, '_blank')}
                >
                  Register Your Team <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline btn-cta-secondary" 
                  onClick={() => navigateTo('contact')}
                >
                  <HelpCircle size={16} style={{ marginRight: '6px' }} /> Ask a Question
                </button>
              </div>
            </section>
          )}

        </div>
      )}

      {/* ── 7. PROBLEM STATEMENT MODAL ── */}
      {selectedTrack && (
        <div 
          className="admin-modal-backdrop" 
          role="dialog" 
          aria-modal="true" 
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedTrack(null) }} 
          style={{ zIndex: 9999 }}
        >
          <div className="hk-track-modal-panel">
            <div className="hk-track-modal-header">
              <div className="hk-modal-title-wrap">
                <span className="hk-modal-tag">PROBLEM STATEMENT</span>
                <h3 className="hk-modal-title">{selectedTrack.title}</h3>
              </div>
              <button 
                type="button" 
                className="btn-close-modal" 
                onClick={() => setSelectedTrack(null)} 
                aria-label="Close dialog"
              >
                <X size={22} />
              </button>
            </div>
            <div className="hk-track-modal-body">
              <div 
                dangerouslySetInnerHTML={{ __html: selectedTrack.description }} 
                className="track-description-html" 
              />
            </div>
            <div className="hk-track-modal-footer">
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={() => setSelectedTrack(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

