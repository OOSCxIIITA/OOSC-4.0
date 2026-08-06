import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Check, Globe, Mail, MapPin, Calendar, Cpu, Users, Code, Award, BookOpen, Compass, ArrowRight, GraduationCap, FlaskConical, GitBranch, Rocket, Handshake, Sparkles } from 'lucide-react'
import './aboutpage.css'

export default function AboutPage({ siteConfig = {}, about = {} }) {
  // Fallbacks using siteConfig or about data where appropriate
  const heading = siteConfig.aboutTitle || about.heading || 'About OOSC 4.0'

  return (
    <div className="about-page-container">
      <Helmet>
        <title>About - OOSC 4.0 | IIIT Allahabad</title>
        <meta name="description" content="Learn about OOSC 4.0 - the Opportunity Open Source Conference at IIIT Allahabad, Aug 28–30, 2026. Discover our history, host city Prayagraj, past keynote speakers, and what to expect." />
        <meta name="keywords" content="OOSC 4.0, about, Opportunity Open Source Conference, IIIT Allahabad, Prayagraj, open source history, keynote speakers, conference overview" />
        <link rel="canonical" href="https://oosc.iiita.ac.in/about" />
        <meta property="og:title" content="About - OOSC 4.0 | IIIT Allahabad" />
        <meta property="og:description" content="Learn about OOSC 4.0 - the Opportunity Open Source Conference at IIIT Allahabad. Discover our history, host city, past speakers, and what to expect." />
        <meta property="og:url" content="https://oosc.iiita.ac.in/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://oosc.iiita.ac.in/OOSC_logo.png" />
        <meta property="og:image:alt" content="OOSC 4.0 About" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About - OOSC 4.0 | IIIT Allahabad" />
        <meta name="twitter:description" content="Learn about OOSC 4.0 - the Opportunity Open Source Conference at IIIT Allahabad. Discover our history, host city, and past speakers." />
        <meta name="twitter:image" content="https://oosc.iiita.ac.in/OOSC_logo.png" />
        <meta name="twitter:image:alt" content="OOSC 4.0 About" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://oosc.iiita.ac.in/about"
              },
              "name": "About - OOSC 4.0 | IIIT Allahabad",
              "description": "Learn about OOSC 4.0 - the Opportunity Open Source Conference at IIIT Allahabad, Aug 28–30, 2026. Discover our history, host city Prayagraj, past keynote speakers, and what to expect.",
              "publisher": {
                "@type": "Organization",
                "name": "OOSC IIITA Team",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://oosc.iiita.ac.in/OOSC_logo.png"
                }
              }
            }
          `}
        </script>
      </Helmet>
      {/* Logos and contact row */}
      <div className="about-hero-header-row">
        <div className="about-hero-logos">
          <img src="/OOSC_LOGO_COMPLETE.svg" alt="OOSC 4.0 Opportunity Open Source Conference logo" className="about-logo-oosc" width="160" height="45" />
          <span className="logo-divider">|</span>
          <a href="https://iiita.ac.in" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }} aria-label="IIIT Allahabad">
            <img src="/IIIT_logo_transparent.gif" alt="IIIT Allahabad institute logo" className="about-logo-iiita" width="80" height="80" />
          </a>
          <span className="logo-divider">|</span>
          <a href="https://gdsc.iiita.ac.in" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }} aria-label="GDG Prayagraj">
            <img src="/gdglogo.png" alt="Google Developer Groups logo" className="about-logo-gdg" width="80" height="80" />
          </a>
        </div>
        <div className="about-hero-contacts">
          <div className="about-contact-item">
            <Globe size={16} />
            <a href="https://oosc.iiita.ac.in" target="_blank" rel="noopener noreferrer">oosc.iiita.ac.in</a>
          </div>
          <div className="about-contact-item">
            <Mail size={16} />
            <a href="mailto:oosc@iiita.ac.in">oosc@iiita.ac.in</a>
          </div>
        </div>
      </div>
      {/* ─── SECTION 2: WHAT TO EXPECT AT OOSC 4.0 ──────────────────────────────── */}
      <section className="about-expect-section" id="expectations">
        <div className="about-eyebrow">About the Event</div>
        <h1 className="about-section-title">What to Expect at OOSC 4.0</h1>

        <div className="about-section-desc">
          <p>
            The event features a variety of activities including talks, panels, Q&A sessions,
            interactive workshops, demos, and hackathons. It offers a unique opportunity for both
            programmers and non-programmers to contribute to and learn from the open-source community.
          </p>
          <p>
            Attendees will have the chance to delve into topics like system components, cloud computing,
            IoT, OS distribution integration, and more. Last year, the event was a huge success. This year,
            we aim to raise the bar even higher at IIIT Allahabad, from August 28 to August 30.
          </p>
        </div>

        {/* Expect Grid (6 Cards) */}
        <div className="about-expect-grid">
          <article className="about-expect-card">
            <h2>Keynote Talks</h2>
            <p>Distinguished speakers from the global open-source ecosystem presenting groundbreaking ideas and innovations.</p>
          </article>
          <article className="about-expect-card">
            <h2>Panel Discussions</h2>
            <p>In-depth conversations between industry leaders, developers, and community organizers on key open-source topics.</p>
          </article>
          <article className="about-expect-card">
            <h2>Workshops</h2>
            <p>Hands-on sessions covering tools, frameworks, and best practices for open-source contribution and development.</p>
          </article>
          <article className="about-expect-card">
            <h2>Hackathon</h2>
            <p>A competitive event where participants build solutions to real-world open-source challenges under time constraints.</p>
          </article>
          <article className="about-expect-card">
            <h2>Demos & Showcases</h2>
            <p>Live demonstrations of open-source projects, tools, and technologies by contributors and organizations.</p>
          </article>
          <article className="about-expect-card">
            <h2>Networking Sessions</h2>
            <p>Structured and informal networking opportunities including a dedicated networking dinner for attendees.</p>
          </article>
        </div>
      </section>

      {/* ─── SECTION 3: WHO ATTENDS OOSC ? ──────────────────────────────────────── */}
      <section className="about-audience-section" id="audience">
        {/* Page Line Decoration */}
        {/* <div className="about-page-header-line">
          <span className="page-number">04</span>
          <span className="header-line-divider"></span>
          <span className="header-line-label">Who Attends</span>
        </div> */}

        <div className="about-eyebrow" style={{ marginTop: '1.5rem' }}>Audience</div>
        <h2 className="about-section-title">Who Attends OOSC ?</h2>

        <p className="about-section-desc">
          OOSC 4.0 draws a diverse, multi-disciplinary audience from across India and beyond.
          Whether you're a developer, operations engineer, community leader, or academic researcher,
          OOSC is the place to connect, collaborate, and grow.
        </p>

        {/* Grid of 4 cards */}
        <div className="about-audience-grid">
          <article className="about-audience-card">
            <h3>Developers</h3>
            <p>Systems, Embedded, Applications, Kernel & Operating Systems developers from across the country contributing to open-source projects.</p>
          </article>
          <article className="about-audience-card">
            <h3>Operations</h3>
            <p>Architects, SRE, Site Reliability Engineers, DevOps practitioners, and SysAdmins managing and scaling open-source infrastructure.</p>
          </article>
          <article className="about-audience-card">
            <h3>Community and Leadership</h3>
            <p>Technical Managers, Community Managers, Executive Leaders, Legal & Compliance, Operations Management, and OSPO Teams.</p>
          </article>
          <article className="about-audience-card">
            <h3>Academics / Media / Other</h3>
            <p>Professors, Students, Media professionals, Analysts, Product managers, Business Development, and Marketing experts.</p>
          </article>
        </div>

        {/* Why Attend Subsection */}
        <div className="about-why-attend-container">
          <h3 className="about-sub-title">Why Attend</h3>
          <ul className="about-why-attend-list">
            <li>
              <span className="check-bullet">•</span>
              <p>Network with India's most active open-source community in one place.</p>
            </li>
            <li>
              <span className="check-bullet">•</span>
              <p>Learn from 100+ industry pioneers through talks, panels, and workshops.</p>
            </li>
            <li>
              <span className="check-bullet">•</span>
              <p>Contribute to and discover real-world open-source projects.</p>
            </li>
            <li>
              <span className="check-bullet">•</span>
              <p>Compete in hackathons and win recognition for your innovations.</p>
            </li>
            <li>
              <span className="check-bullet">•</span>
              <p>Access exclusive mentorship from Linux Foundation and Canonical experts.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* ─── SECTION 1: HERO (HOST CITY & VENUE) ─────────────────────────────────── */}
      <section className="about-hero" id="host-city-venue">
        <div className="about-hero-content">
          {/* Eyebrow and Title */}
          <div className="about-eyebrow">Host City & Venue</div>
          <h2 className="about-hero-title">IIIT Allahabad, India</h2>

          {/* Description Grid */}
          <div className="about-hero-description-grid">
            <article className="about-description-col">
              <h3>India</h3>
              <p>
                A diverse and vibrant nation, blending rich cultural heritage with rapid technological growth.
                As a leading democracy and innovation hub, it bridges tradition and modernity across all aspects of life.
              </p>
            </article>
            <article className="about-description-col">
              <h3>Allahabad (Prayagraj)</h3>
              <p>
                Located in Uttar Pradesh, Allahabad is a key industrial and educational hub of North India,
                known for its historic significance and a unique blend of tradition and modernity.
              </p>
            </article>
            <article className="about-description-col">
              <h3>IIIT Allahabad</h3>
              <p>
                One of India's premier institutes for engineering, science, and innovation.
                Known for its academic excellence, cutting-edge research, and vibrant campus life,
                IIIT Allahabad fosters creativity, critical thinking, and leadership.
              </p>
            </article>
          </div>

          {/* Three side-by-side vertical images */}
          <div className="about-hero-image-grid">
            <div className="about-hero-img-wrapper">
              <img src="/about-country.png" alt="Map of India, host country of OOSC 4.0" className="about-hero-img" width="600" height="400" loading="eager" />
            </div>
            <div className="about-hero-img-wrapper">
              <img src="/about-city.png" alt="Prayagraj city skyline, venue city for OOSC 4.0" className="about-hero-img" width="600" height="400" loading="eager" />
            </div>
            <div className="about-hero-img-wrapper">
              <img src="/about-college.png" alt="IIIT Allahabad campus, venue of OOSC 4.0" className="about-hero-img" width="600" height="400" loading="eager" />
            </div>
          </div>

          {/* Bottom dates & venue banner */}
          <div className="about-hero-banner-card">
            <div className="about-hero-banner-item">
              <span className="banner-item-label">Conference Dates</span>
              <span className="banner-item-value">August 28 - 30, 2026</span>
            </div>
            <div className="about-hero-banner-item">
              <span className="banner-item-label">Venue</span>
              <span className="banner-item-value">IIIT Allahabad, Prayagraj, UP, India</span>
            </div>
          </div>



        </div>
      </section>

      {/* ─── SECTION: IIIT ALLAHABAD - THE HOST INSTITUTE ────────────────────────── */}
      <section className="about-institute-section" id="host-institute">
        <div className="about-eyebrow" style={{ marginTop: '1.5rem' }}>The Host Institute</div>
        <h2 className="about-section-title">IIIT Allahabad</h2>

        <div className="about-institute-intro">
          <div className="about-institute-text">
            <p className="about-section-desc">
              Indian Institute of Information Technology, Allahabad (IIITA) is one of India's foremost
              institutes for information technology, computer science, and electronics engineering.
              Established in 1999 as a centre of excellence in IT, IIITA has grown into a nationally
              recognized institution known for its rigorous academics, pioneering research, and a deeply
              embedded culture of innovation and open-source contribution.
            </p>
            <p className="about-section-desc">
              With a legacy of nurturing some of India's finest technologists, IIITA is the natural home
              for OOSC 4.0 - a place where open-source philosophy is not just taught but actively lived
              through initiatives like OpenCode, numerous hackathons, and a thriving developer community.
            </p>
          </div>
          <div className="about-institute-img-wrapper">
            <img src="/about-college.png" alt="IIIT Allahabad campus aerial view" className="about-institute-img" width="600" height="400" loading="lazy" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="about-institute-grid">
          <article className="about-institute-card">
            <div className="institute-card-icon">
              <GraduationCap size={28} />
            </div>
            <h3>Academic Excellence</h3>
            <p>
              Consistently ranked among India's top IT institutes, IIITA offers world-class
              B.Tech, M.Tech, MBA and Ph.D. programs in IT, ECE, and allied disciplines. Its graduates
              are sought by top global tech companies and research labs.
            </p>
          </article>
          <article className="about-institute-card">
            <div className="institute-card-icon">
              <FlaskConical size={28} />
            </div>
            <h3>Innovation & Research</h3>
            <p>
              Home to 20+ specialized research centres spanning AI, NLP, cybersecurity, IoT, and
              biomedical informatics. IIITA's faculty and students actively publish in top-tier venues
              and collaborate with industry partners worldwide.
            </p>
          </article>
          <article className="about-institute-card">
            <div className="institute-card-icon">
              <GitBranch size={28} />
            </div>
            <h3>Open Source Culture</h3>
            <p>
              Through programs like OpenCode, IIITA has cultivated 2,000+ open-source contributors.
              Students regularly participate in GSoC, MLH, and maintain upstream projects across
              the Linux, Mozilla, and CNCF ecosystems.
            </p>
          </article>
        </div>

        {/* Stats Banner */}
        <div className="about-institute-banner">
          <div className="about-institute-stat">
            <span className="institute-stat-value">1999</span>
            <span className="institute-stat-label">Established</span>
          </div>
          <div className="about-institute-stat">
            <span className="institute-stat-value">3,000+</span>
            <span className="institute-stat-label">Students</span>
          </div>
          <div className="about-institute-stat">
            <span className="institute-stat-value">20+</span>
            <span className="institute-stat-label">Research Labs</span>
          </div>
          <div className="about-institute-stat">
            <span className="institute-stat-value">100+</span>
            <span className="institute-stat-label">Faculty Members</span>
          </div>
        </div>
      </section>

      {/* ─── SECTION: GDG ON CAMPUS - IIIT ALLAHABAD ─────────────────────────────── */}
      <section className="about-gdg-section" id="gdg-iiita">
        <div className="about-eyebrow" style={{ marginTop: '1.5rem' }}>Community Partner</div>
        <h2 className="about-section-title">GDG On Campus - IIIT Allahabad</h2>

        <div className="about-gdg-intro">
          <div className="about-gdg-logo-showcase">
            <img src="/gdglogo.png" alt="Google Developer Groups On Campus IIIT Allahabad logo" width="160" height="160" loading="lazy" />
          </div>
          <div className="about-gdg-text">
            <p className="about-section-desc">
              Google Developer Groups (GDG) On Campus at IIIT Allahabad is the premier student developer
              community driving the open-source movement on campus. As one of the most active GDG chapters
              in India, the group organizes technical workshops, study jams, codelabs, and speaker sessions
              throughout the year, empowering students to build with Google technologies and contribute to
              the global open-source ecosystem.
            </p>
            <p className="about-section-desc">
              GDG IIITA plays a central role in organizing OOSC 4.0, bringing together its extensive
              network of developers, mentors, and industry connections to deliver a conference experience
              that inspires the next generation of open-source contributors.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="about-gdg-grid">
          <article className="about-gdg-card">
            <div className="gdg-card-icon">
              <Rocket size={28} />
            </div>
            <h3>Developer Ecosystem</h3>
            <p>
              Organizing workshops, study jams, codelabs, and DevFest events that equip students
              with hands-on experience in Android, Web, Cloud, ML, and emerging technologies
              through Google's developer platforms.
            </p>
          </article>
          <article className="about-gdg-card">
            <div className="gdg-card-icon">
              <Handshake size={28} />
            </div>
            <h3>Open Source Advocacy</h3>
            <p>
              Mentoring students through GSoC, GSoD, and contributing to upstream projects.
              GDG IIITA champions open-source values by organizing contribution sprints, code
              reviews, and community-driven development.
            </p>
          </article>
          <article className="about-gdg-card">
            <div className="gdg-card-icon">
              <Sparkles size={28} />
            </div>
            <h3>Community Impact</h3>
            <p>
              With 500+ active members and a pan-India hackathon reach, GDG IIITA has built
              one of the strongest developer communities in the country, bridging campus talent
              with global tech opportunities.
            </p>
          </article>
        </div>

        {/* Highlight Banner */}
        <div className="about-gdg-banner">
          <div className="about-gdg-stat">
            <span className="gdg-stat-value">500+</span>
            <span className="gdg-stat-label">Active Members</span>
          </div>
          <div className="about-gdg-stat">
            <span className="gdg-stat-value">50+</span>
            <span className="gdg-stat-label">Events Per Year</span>
          </div>
          <div className="about-gdg-stat">
            <span className="gdg-stat-value">30+</span>
            <span className="gdg-stat-label">GSoC Selections</span>
          </div>
          <div className="about-gdg-stat">
            <span className="gdg-stat-value">10+</span>
            <span className="gdg-stat-label">Years Active</span>
          </div>
        </div>
      </section>

      {/*
       ─── SECTION 5: PROVEN TRACK RECORD ──────────────────────────────────────── }
      <section className="about-track-record-section" id="track-record">
        {/* Page Line Decoration }
        {/*<div className="about-page-header-line">
          <span className="page-number">07</span>
          <span className="header-line-divider"></span>
          <span className="header-line-label">Our Legacy</span>
        </div>}

        <div className="about-eyebrow" style={{ marginTop: '1.5rem' }}>Our Legacy</div>
        <h2 className="about-section-title">Proven Track Record</h2>

        <p className="about-section-desc">
          IIIT Allahabad has consistently delivered impactful, large-scale student-led technical events
          that attract participants from across India. Entrusted with hosting OOSC 4.0 for the first time,
          IIITA is committed to an edition that sets new benchmarks.
        </p>

        {/* Two-column bullet lists }
        <div className="about-track-columns">
          <div className="about-track-col">
            <ul className="about-track-list">
              <li>
                <span className="bullet-dot">•</span>
                <p>Multiple successful editions of Aproksha, HITN, OpenCode, Code Red, CICADA, CTF, III, and OOC</p>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <p>130+ colleges engaged through flagship events</p>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <p>Pan-India reach across leading technical institutes</p>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <p>2,000+ open-source contributors through OpenCode program</p>
              </li>
            </ul>
          </div>
          <div className="about-track-col">
            <ul className="about-track-list">
              <li>
                <span className="bullet-dot">•</span>
                <p>10,000+ registrations across Aproksha</p>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <p>80+ institutions represented through HITN</p>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <p>Proven track record of delivering impactful student-led technical events</p>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <p>1,800+ cybersecurity competitors through the CTF competition</p>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 side-by-side stats highlight cards }
        <div className="about-stats-grid">
          <article className="about-stat-card">
            <div className="stat-value">10,000+</div>
            <div className="stat-label">Registrations - Aproksha</div>
          </article>
          <article className="about-stat-card">
            <div className="stat-value">130+</div>
            <div className="stat-label">Colleges Engaged</div>
          </article>
          <article className="about-stat-card">
            <div className="stat-value">1,800+</div>
            <div className="stat-label">CTF Participants</div>
          </article>
          <article className="about-stat-card">
            <div className="stat-value">2,000+</div>
            <div className="stat-label">OpenCode Contributors</div>
          </article>
        </div>

        {/* Wide bottom banner card }
        <div className="about-track-banner-card">
          <p>
            Entrusted with hosting OOSC 4.0 for the first time, IIIT Allahabad is committed to delivering an
            edition that not only upholds the legacy established at IIT Mandi and IIT Kanpur but also sets
            new benchmarks for the future of OOSC. By partnering with OOSC 4.0, sponsors gain access to a
            highly engaged community of developers, designers, innovators, cybersecurity enthusiasts,
            and future technology leaders.
          </p>
        </div>
      </section>
    */}
      {/* ─── SECTION 6: KEYNOTE SPEAKERS & LEADERS ────────────────────────────────── */}
      <section className="about-speakers-section" id="keynote-speakers">
        <div className="about-eyebrow" style={{ marginTop: '1.5rem' }}>Past Highlights</div>
        <h2 className="about-section-title">Keynote Speakers & Leaders</h2>

        <p className="about-section-desc">
          OOSC has been privileged to host distinguished voices from the open-source ecosystem. The previous
          editions featured <strong>100+ keynote speakers and panelists</strong> who are pioneers in their
          domains-ranging from foundational software development to open governance, security, and
          cloud-native infrastructure.
        </p>

        {/* Speaker Cards Grid (2 cols × 3 rows) */}
        <div className="about-speakers-grid">
          <article className="about-speaker-card">
            <h4>Till Kamppeter</h4>
            <p>Leader Open Printing, Linux Foundation Fellow.</p>
          </article>
          <article className="about-speaker-card">
            <h4>Aveek Basu</h4>
            <p>Org Admin – The Linux Foundation GSoC projects, Zephyr Ambassador.</p>
          </article>
          <article className="about-speaker-card">
            <h4>Pierre Clisson</h4>
            <p>Creator of Timeflux.</p>
          </article>
          <article className="about-speaker-card">
            <h4>Oliver Völckers</h4>
            <p>Founder, BEST Berliner Sensortechnik GmbH.</p>
          </article>
          <article className="about-speaker-card">
            <h4>Manuel Haro</h4>
            <p>Professor at the Autonomous University of Zacatecas. Leader of the Open Source Innovation Labs Network.</p>
          </article>
          <article className="about-speaker-card">
            <h4>Jonas Remmert</h4>
            <p>Embedded Systems Engineer at PHYTEC Messtechnik GmbH.</p>
          </article>
        </div>

        {/* Speaker Photo Gallery */}
        <div className="about-speakers-photo-gallery">
          <div className="about-speakers-photo-wrapper">
            <img src="/Till-kampetter.png" alt="Till Kamppeter, past OOSC keynote speaker" className="about-speakers-photo" width="200" height="200" loading="lazy" />
          </div>
          <div className="about-speakers-photo-wrapper">
            <img src="/Pierre-clisson.png" alt="Pierre Clisson, past OOSC keynote speaker" className="about-speakers-photo" width="200" height="200" loading="lazy" />
          </div>
          <div className="about-speakers-photo-wrapper">
            <img src="/Aveek-Basu.png" alt="Aveek Basu, past OOSC keynote speaker" className="about-speakers-photo" width="200" height="200" loading="lazy" />
          </div>
        </div>
      </section>



    </div>
  )
}
