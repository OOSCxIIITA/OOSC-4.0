import * as LucideIcons from 'lucide-react'
import { Check, ExternalLink, Ticket, Zap, Shield, Pencil, Trash2 } from 'lucide-react'
import './Registration.css'

export default function Registration({ siteConfig = {}, registrationCards = [], setRegistrationCards, infoCards = [], setInfoCards, adminMode, editRecord, deleteRecord }) {
  const sortedCards = [...registrationCards].sort((a, b) => a.sortOrder - b.sortOrder)
  const sortedInfoCards = [...infoCards].sort((a, b) => a.sortOrder - b.sortOrder)

  const getIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName] || Ticket;
    return <IconComponent size={32} />;
  }
  const formatPrice = (price) => {
    if (!price) return '';
    const trimmed = price.trim();
    if (trimmed.toLowerCase() === 'free') return trimmed;
    if (/[₹$€£]/.test(trimmed)) return trimmed;
    if (!/\d/.test(trimmed)) return trimmed;
    return `₹${trimmed}`;
  };

  return (
    <div className="registration-page">
      {/* Passes Overview Section */}
      <section className="content-section">
        <div className="section-heading text-center">
          <span>OOSC 4.0 Registration</span>
          <h2>Secure Your Access Key</h2>
          <p>Join over 500+ developers, researchers, and open-source advocates at the premier technical conference.</p>
        </div>

        <div className="passes-grid">
          {sortedCards.length > 0 ? (
            sortedCards.map((card) => (
              <div key={card.id} className={`pass-card glass-card ${card.type === 'featured' ? 'featured' : ''}`} style={{ position: 'relative' }}>
                {adminMode && (
                  <div className="admin-card-controls admin-card-actions" style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px', zIndex: 10 }}>
                    <button type="button" className="btn btn-admin-mini" onClick={() => editRecord('registration-cards', card)}>Edit</button>
                    <button type="button" className="btn-delete" onClick={() => deleteRecord('registration-cards', card.id, setRegistrationCards)}>Delete</button>
                  </div>
                )}
                <div className="pass-icon">{getIcon(card.icon)}</div>
                <h3>{card.title}</h3>
                <div className="pass-price">{formatPrice(card.price)}</div>
                <p className="pass-desc">{card.description}</p>
                <ul className="pass-features">
                  {(card.features || '').split('\n').map((feature, i) => {
                    if (!feature.trim()) return null;
                    return <li key={i}><Check size={16} /> {feature.trim()}</li>
                  })}
                </ul>
              </div>
            ))
          ) : (
            <div className="registration-soon glass-card" style={{ padding: '60px 40px', textAlign: 'center', margin: 'auto', gridColumn: '1 / -1' }}>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '16px' }}>Information to be coming soon</h3>
              <p style={{ color: 'var(--color-text-warm)' }}>Passes and registration details will be announced shortly. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="content-section" id="register">
        <div className="contact-layout-grid">
          {/* Info Left Side */}
          <div className="contact-info-panel">
            <div className="section-heading">
              <span>Ready to join?</span>
              <h2>Get Your Pass</h2>
              <p>Grab your access key for OOSC 4.0. We have partnered with KonfHub for a seamless ticketing experience.</p>
            </div>

            <div className="contact-details-cards">
              {sortedInfoCards.length > 0 ? (
                sortedInfoCards.map((info) => (
                  <div key={info.id} className="contact-detail-card glass-card" style={{ position: 'relative' }}>
                    {adminMode && (
                      <div className="admin-card-controls admin-card-actions" style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px', zIndex: 10 }}>
                        <button type="button" className="btn btn-admin-mini" onClick={() => editRecord('info-cards', info)}>Edit</button>
                        <button type="button" className="btn-delete" onClick={() => deleteRecord('info-cards', info.id, setInfoCards)}>Delete</button>
                      </div>
                    )}
                    <div>
                      <h4>{info.title}</h4>
                      <div dangerouslySetInnerHTML={{ __html: info.content }} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="contact-detail-card glass-card">
                  <div>
                    <h4>No Information Available</h4>
                    <p>Details will be updated soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ticket Booking Right Side */}
          <div className="contact-form-panel glass-card registration-form-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 40px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--color-accent)', marginBottom: '15px', fontSize: '2rem' }}>Official Ticketing Partner</h3>
            <p style={{ color: 'var(--color-text-warm)', marginBottom: '30px', fontSize: '1.1rem', maxWidth: '400px' }}>
              We have partnered with KonfHub to provide you with a smooth and secure registration experience. Grab your pass now!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '300px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '-10px', background: '#ff3366', color: 'white', fontSize: '0.8rem', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', zIndex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  Coupon Applied: Early100
                </div>
                <a 
                  href="https://konfhub.com/checkout/oosc?ticketId=115832%7C1%3B&selectedCode=EARLY100&utm_source=Website"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ width: '100%', padding: '16px 20px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderRadius: '8px', textDecoration: 'none', background: 'var(--color-accent)', color: '#000', fontWeight: 'bold' }}
                >
                  Buy Early Bird Pass <ExternalLink size={20} />
                </a>
              </div>
              
              <a 
                href="https://konfhub.com/oosc"
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ width: '100%', padding: '14px 20px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderRadius: '8px', textDecoration: 'none', border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}
              >
                Regular Pass <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
