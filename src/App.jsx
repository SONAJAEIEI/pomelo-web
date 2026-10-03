import { useEffect, useRef, useState } from 'react'
import liff from '@line/liff'
import './App.css'

const photos = {
  orchard:
    'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1080',
  fruit:
    'https://images.unsplash.com/photo-1528580152190-66d551db2e06?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
  leaves:
    'https://images.unsplash.com/photo-1536657464919-892534f60d6e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
}

const iconPaths = {
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><circle cx="12" cy="12" r="3" /></>,
  garden: <><path d="M12 21V10M12 14c-5 0-7-3-7-7 5 0 7 3 7 7ZM12 11c4 0 6-2.5 6-6-4 0-6 2.5-6 6Z" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
  camera: <><path d="M4 7h3l2-3h6l2 3h3v12H4V7Z" /><circle cx="12" cy="13" r="4" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 15-5-5L5 20" /></>,
  leaf: <><path d="M20 4C10 4 5 9 5 16c0 2 1 4 3 5 8-1 12-7 12-17Z" /><path d="M5 21c3-5 7-8 12-11" /></>,
  warning: <><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 9v5M12 17h.01" /></>,
  video: <><rect x="3" y="5" width="13" height="14" rx="2" /><path d="m16 10 5-3v10l-5-3" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  cloud: <><path d="M7 18h10a4 4 0 0 0 .4-8A5.5 5.5 0 0 0 7 8a5 5 0 0 0 0 10Z" /></>,
  wind: <><path d="M3 8h10a3 3 0 1 0-3-3M3 12h14a3 3 0 1 1-3 3M3 16h8" /></>,
}

function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

function Tap({ children, className = '', onClick, ariaLabel }) {
  return <button type="button" aria-label={ariaLabel} onClick={onClick} className={`tap ${className}`}>{children}</button>
}

function SectionTitle({ title, action, onAction }) {
  return (
    <div className="section-title-new">
      <h2>{title}</h2>
      {action && <button type="button" onClick={onAction}>{action}</button>}
    </div>
  )
}

function Header({ title, lineProfile, onBell, showGreeting = false }) {
  return (
    <header className="top-header">
      <div className="top-header-copy">
        {showGreeting ? (
          <>
            <p className="header-kicker">สวัสดีตอนเช้า</p>
            <h1>{lineProfile?.displayName || 'เกษตรกร'}</h1>
          </>
        ) : (
          <h1>{title}</h1>
        )}
        {showGreeting && <p className="header-location"><span className="status-dot" /> สวนส้มโอ • นครปฐม</p>}
      </div>
      <Tap ariaLabel="เปิดการแจ้งเตือน" onClick={onBell} className="icon-button notification-button">
        <Icon name="bell" size={20} />
        <span className="notification-dot" />
      </Tap>
    </header>
  )
}

function Home({ navigate, lineProfile, onBell }) {
  return (
    <>
      <Header lineProfile={lineProfile} showGreeting onBell={onBell} />
      <main className="content-new">
        <section className="hero-new">
          <img src={photos.orchard} alt="สวนส้มโอ" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-pill"><span className="status-dot mint" /> AI พร้อมตรวจ</span>
            <h2>สังเกตโรคไว<br />ดูแลสวนได้ทัน</h2>
            <p>ถ่ายภาพใบ ผล หรือกิ่ง<br />เพื่อวิเคราะห์เบื้องต้นด้วย AI</p>
            <Tap onClick={() => navigate('monitor')} className="hero-action"><Icon name="scan" size={18} /> เริ่มตรวจโรค</Tap>
          </div>
        </section>

        <section className="shortcut-section">
          <SectionTitle title="ทางลัด" />
          <div className="shortcut-grid">
            <Tap onClick={() => navigate('monitor')} className="shortcut-card"><span className="shortcut-icon green"><Icon name="scan" size={21} /></span><span>ตรวจโรค</span></Tap>
            <Tap onClick={() => navigate('garden')} className="shortcut-card"><span className="shortcut-icon blue"><Icon name="garden" size={21} /></span><span>สถานะสวน</span></Tap>
            <Tap onClick={onBell} className="shortcut-card"><span className="shortcut-icon amber"><Icon name="bell" size={21} /></span><span>แจ้งเตือน</span></Tap>
            <Tap onClick={() => navigate('history')} className="shortcut-card"><span className="shortcut-icon violet"><Icon name="history" size={21} /></span><span>ประวัติ</span></Tap>
          </div>
        </section>

        <section className="garden-summary-card">
          <div className="garden-summary-head">
            <div><p>สวนของฉัน</p><h3>สวนส้มโอ บ้านแพ้ว</h3></div>
            <span className="health-pill"><span className="status-dot mint" /> ปกติ</span>
          </div>
          <div className="garden-stats">
            <div><strong>128</strong><span>ต้นทั้งหมด</span></div>
            <div><strong>116</strong><span>ปกติ</span></div>
            <div><strong className="coral-text">12</strong><span>ต้องตรวจสอบ</span></div>
          </div>
          <Tap onClick={() => navigate('garden')} className="garden-summary-action">ดูแดชบอร์ดสวน <Icon name="chevron" size={16} /></Tap>
        </section>

        <section className="section-new">
          <SectionTitle title="สภาพแวดล้อม" action="ดูทั้งหมด" onAction={() => navigate('air')} />
          <div className="metric-grid">
            <div className="metric-card"><span className="metric-icon blue"><Icon name="cloud" size={19} /></span><div><small>ความชื้น</small><strong>68%</strong></div></div>
            <div className="metric-card"><span className="metric-icon amber"><Icon name="wind" size={19} /></span><div><small>PM2.5</small><strong>18 <em>µg/m³</em></strong></div></div>
          </div>
        </section>

        <section className="alert-banner-new">
          <span className="alert-circle"><Icon name="warning" size={17} /></span>
          <div><p>ACTIVE ALERT</p><h3>พบความผิดปกติ 2 จุด</h3><small>มีภาพที่ AI ตรวจพบความเสี่ยง ควรตรวจสอบเพิ่มเติม</small></div>
          <Tap onClick={() => navigate('alerts')} className="alert-arrow"><Icon name="chevron" size={17} /></Tap>
        </section>

        <section className="section-new">
          <SectionTitle title="กล้องประจำสวน" action="ดูทั้งหมด" onAction={() => navigate('garden')} />
          <div className="camera-grid-new">
            <HomeCamera image={photos.orchard} name="Camera 01" location="แปลง A" status="ONLINE" onClick={() => navigate('camera', 1)} />
            <HomeCamera image={photos.leaves} name="Camera 02" location="แปลง B" status="ONLINE" risk onClick={() => navigate('camera', 2)} />
          </div>
        </section>
      </main>
    </>
  )
}

function HomeCamera({ image, name, location, status, risk, onClick }) {
  return (
    <Tap onClick={onClick} className="home-camera-card">
      <div className="home-camera-image"><img src={image} alt={name} /><span className={status === 'ONLINE' ? 'live-tag' : 'offline-tag'}><i /> {status === 'ONLINE' ? 'LIVE' : 'OFFLINE'}</span></div>
      <div className="home-camera-info"><strong>{name}</strong><small>{location} · {risk ? 'เสี่ยง' : 'ปกติ'}</small></div>
    </Tap>
  )
}

function Monitor({ selectedImage, setSelectedImage, analyzing, aiResult, analyzeImage, fileInputRef, resetScan, navigate }) {
  return (
    <>
      <Header title="ตรวจโรคจากภาพ" onBell={() => navigate('alerts')} />
      <main className="content-new">
        <div className="page-intro"><span className="eyebrow-new">PLANT MONITORING</span><p>ถ่ายภาพใบ ผล หรือกิ่งที่ต้องการตรวจสอบ</p></div>

        <div className="monitor-tabs-new">
          <button className="active"><Icon name="camera" size={17} /> ถ่ายภาพตรวจ</button>
          <button onClick={() => navigate('garden')}><Icon name="video" size={17} /> กล้องประจำสวน</button>
        </div>

        {!selectedImage ? (
          <section className="scan-card-new">
            <div className="scan-visual-new"><div className="scan-glow" /><div className="scan-icon-new"><Icon name="camera" size={32} /></div></div>
            <h2>ถ่ายภาพใบหรือผลส้มโอ</h2>
            <p>ถ่ายภาพให้เห็นส่วนของพืชชัดเจน<br />ระบบจะนำภาพไปวิเคราะห์ด้วย AI</p>
            <Tap onClick={() => fileInputRef.current?.click()} className="primary-new"><Icon name="camera" size={18} /> เปิดกล้อง / เลือกรูป</Tap>
            <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files?.[0]))} hidden />
            <div className="scan-tips-new"><span>✓ แสงเพียงพอ</span><span>✓ ภาพไม่เบลอ</span><span>✓ เห็นใบชัดเจน</span></div>
          </section>
        ) : (
          <section className="scan-card-new preview-card-new">
            <div className="preview-image-new"><img src={selectedImage} alt="ภาพที่เลือก" /></div>
            <div className="preview-head-new"><strong>ภาพพร้อมวิเคราะห์</strong><small>ตรวจสอบภาพก่อนส่งให้ AI</small></div>
            {analyzing ? (
              <div className="analyzing-new"><div className="loader-new" /><strong>กำลังวิเคราะห์ภาพ...</strong><span>AI กำลังตรวจสอบลักษณะของพืช</span></div>
            ) : aiResult ? (
              <AIResult aiResult={aiResult} onReset={resetScan} />
            ) : (
              <>
                <Tap onClick={analyzeImage} className="primary-new"><Icon name="scan" size={18} /> วิเคราะห์ด้วย AI</Tap>
                <Tap onClick={resetScan} className="secondary-new">↻ ถ่ายภาพใหม่</Tap>
              </>
            )}
          </section>
        )}
      </main>
    </>
  )
}

function AIResult({ aiResult, onReset }) {
  return (
    <div className="ai-result-new">
      <div className="result-complete"><span className="status-dot" /> AI ANALYSIS COMPLETE</div>
      <div className="result-hero-row"><div className="result-risk-icon"><Icon name="warning" size={18} /></div><div><small>ผลการตรวจ</small><h2>{aiResult.status}</h2></div></div>
      <div className="diagnosis-row"><div><small>โรค / ความผิดปกติ</small><strong>{aiResult.disease}</strong></div><span>{aiResult.level}</span></div>
      <div className="confidence-new"><div><span>ความมั่นใจของ AI</span><strong>{aiResult.confidence}%</strong></div><div className="confidence-track"><span style={{ width: `${aiResult.confidence}%` }} /></div></div>
      <div className="result-box-new"><div className="box-title-new"><Icon name="search" size={16} /><strong>อาการที่ตรวจพบ</strong></div>{aiResult.symptoms.map((x, i) => <p key={i}><span>✓</span>{x}</p>)}</div>
      <div className="result-advice-new"><div className="box-title-new"><span>💡</span><strong>คำแนะนำ</strong></div><p>{aiResult.advice}</p></div>
      <div className="result-source-new"><span>แหล่งข้อมูล</span><strong><Icon name="camera" size={15} /> Mobile Scan</strong></div>
      <Tap onClick={onReset} className="secondary-new">↻ ตรวจภาพใหม่</Tap>
    </div>
  )
}

function Garden({ cameras, onCamera, navigate }) {
  return (
    <>
      <Header title="แดชบอร์ดสวน" onBell={() => navigate('alerts')} />
      <main className="content-new">
        <section className="garden-hero-new">
          <div><span className="eyebrow-new light">MY GARDEN</span><h2>สวนส้มโอ บ้านแพ้ว</h2><p><span className="status-dot mint" /> ระบบทำงานปกติ</p></div>
          <div className="health-score-new"><strong>87</strong><small>/100</small><span>สุขภาพสวน</span></div>
        </section>
        <div className="metric-grid three"><div className="metric-card center"><strong>128</strong><small>ต้นทั้งหมด</small></div><div className="metric-card center"><strong className="green-text">116</strong><small>ปกติ</small></div><div className="metric-card center"><strong className="coral-text">12</strong><small>ต้องตรวจสอบ</small></div></div>
        <section className="section-new"><SectionTitle title="กล้องประจำสวน" action={`${cameras.length} จุด`} /><div className="camera-grid-large-new">{cameras.map((camera) => <HomeCamera key={camera.id} image={camera.id === 1 ? photos.orchard : camera.id === 2 ? photos.leaves : camera.id === 3 ? photos.fruit : null} name={camera.name} location={camera.location} status={camera.status} risk={camera.condition === 'เสี่ยง'} onClick={() => onCamera(camera)} />)}</div></section>
        <section className="latest-detection-new"><SectionTitle title="การตรวจพบล่าสุด" /><div className="detection-row-new"><img src={photos.leaves} alt="ผลตรวจ" /><div><strong>สงสัยความผิดปกติบนใบ</strong><small>Camera 02 · แปลง B</small><span>วันนี้ 09:20 · ความมั่นใจ 82%</span></div><Icon name="chevron" size={18} /></div></section>
      </main>
    </>
  )
}

function CameraDetail({ camera, navigate }) {
  if (!camera) return null
  return (
    <>
      <Header title={camera.name} onBell={() => navigate('alerts')} />
      <main className="content-new">
        <Tap onClick={() => navigate('garden')} className="back-link-new">← กลับไปแดชบอร์ดสวน</Tap>
        <section className="camera-detail-new">
          <div className="camera-detail-photo">{camera.id !== 3 && <img src={camera.id === 1 ? photos.orchard : photos.leaves} alt={camera.name} />}<span className={camera.status === 'ONLINE' ? 'live-tag' : 'offline-tag'}><i /> {camera.status}</span></div>
          <div className="camera-detail-head"><div><span className="eyebrow-new">FIXED CAMERA</span><h2>{camera.name}</h2><p>{camera.location}</p></div><div className="health-score-small"><strong>{camera.health || '--'}</strong><span>Health</span></div></div>
          <div className="detail-grid-new"><div><small>สถานะ</small><strong>{camera.condition}</strong></div><div><small>อัปเดตล่าสุด</small><strong>{camera.lastUpdate}</strong></div><div><small>อุณหภูมิ</small><strong>31°C</strong></div><div><small>ความชื้น</small><strong>68%</strong></div></div>
          <div className="camera-ai-new"><div className="result-complete"><span className="status-dot" /> LATEST AI RESULT</div><h3>{camera.condition === 'เสี่ยง' ? 'พบความเสี่ยง' : camera.condition}</h3><p>{camera.condition === 'เสี่ยง' ? 'AI ตรวจพบความผิดปกติบริเวณใบ ควรตรวจสอบแปลง B เพิ่มเติม' : camera.status === 'OFFLINE' ? 'กล้องออฟไลน์ จึงยังไม่มีผลวิเคราะห์ล่าสุด' : 'ไม่พบความผิดปกติที่สำคัญจากภาพล่าสุด'}</p></div>
        </section>
      </main>
    </>
  )
}

function Alerts({ navigate }) {
  return (
    <>
      <Header title="แจ้งเตือน" onBell={() => {}} />
      <main className="content-new">
        <div className="page-intro"><span className="eyebrow-new">NOTIFICATIONS</span><p>ติดตามเหตุการณ์ที่ต้องตรวจสอบภายในสวน</p></div>
        <section className="alert-list-new">
          <Tap onClick={() => navigate('monitor')} className="alert-item-new danger"><span className="alert-item-icon"><Icon name="warning" size={19} /></span><div><strong>พบความผิดปกติ 2 จุด</strong><p>AI ตรวจพบความเสี่ยงบนใบส้มโอ</p><small>วันนี้ 10:35 น. · Mobile Scan</small></div><Icon name="chevron" size={18} /></Tap>
          <Tap onClick={() => navigate('camera', 2)} className="alert-item-new warning"><span className="alert-item-icon"><Icon name="video" size={19} /></span><div><strong>Camera 02 ตรวจพบความเสี่ยง</strong><p>ควรตรวจสอบบริเวณแปลง B</p><small>วันนี้ 09:20 น. · Camera 02</small></div><Icon name="chevron" size={18} /></Tap>
          <div className="alert-item-new good"><span className="alert-item-icon"><Icon name="check" size={19} /></span><div><strong>สรุปการตรวจประจำวัน</strong><p>ตรวจทั้งหมด 126 ภาพ ไม่พบเหตุรุนแรง</p><small>เมื่อวาน</small></div></div>
        </section>
      </main>
    </>
  )
}

function Air({ navigate }) {
  return (
    <>
      <Header title="สภาพอากาศและ PM2.5" onBell={() => navigate('alerts')} />
      <main className="content-new">
        <section className="weather-hero-new"><span className="weather-sun">☀️</span><span className="eyebrow-new light">TODAY · NAKHON PATHOM</span><strong>31°</strong><h2>อากาศแจ่มใส</h2><p>เหมาะสำหรับการดูแลสวน</p></section>
        <div className="metric-grid three air-metrics-new"><div className="metric-card center"><span>💧</span><strong>68%</strong><small>ความชื้น</small></div><div className="metric-card center"><span>💨</span><strong>18</strong><small>PM2.5</small></div><div className="metric-card center"><span>🌬️</span><strong>12</strong><small>km/h</small></div></div>
        <section className="air-status-new"><span><Icon name="check" size={20} /></span><div><strong>คุณภาพอากาศดี</strong><p>ยังไม่พบสภาพอากาศที่น่าเป็นห่วงสำหรับสวน</p></div></section>
      </main>
    </>
  )
}

function History({ navigate }) {
  const items = [
    { icon: 'camera', title: 'ตรวจใบส้มโอ', detail: 'วันนี้ 10:35 น. · Mobile Scan', result: 'ปกติ', good: true },
    { icon: 'video', title: 'Camera 02', detail: 'วันนี้ 09:20 น. · แปลง B', result: 'เสี่ยง' },
    { icon: 'camera', title: 'ตรวจผลส้มโอ', detail: 'เมื่อวาน 16:42 น. · Mobile Scan', result: 'ปกติ', good: true },
    { icon: 'video', title: 'Camera 01', detail: 'เมื่อวาน 14:18 น. · แปลง A', result: 'ปกติ', good: true },
  ]
  return (
    <>
      <Header title="ประวัติการตรวจ" onBell={() => navigate('alerts')} />
      <main className="content-new">
        <div className="page-intro"><span className="eyebrow-new">ACTIVITY</span><p>รวมประวัติการตรวจจากมือถือและกล้องประจำสวน</p></div>
        <div className="history-filter-new"><button className="active">ทั้งหมด</button><button>มือถือ</button><button>กล้อง</button></div>
        <section className="history-list-new">{items.map((item, i) => <div className="history-item-new" key={i}><span className="history-icon"><Icon name={item.icon} size={18} /></span><div><strong>{item.title}</strong><small>{item.detail}</small></div><b className={item.good ? 'good-text' : 'danger-text'}>{item.result}</b></div>)}</section>
      </main>
    </>
  )
}

function App() {
  const [activePage, setActivePage] = useState('home')
  const [selectedCamera, setSelectedCamera] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [lineProfile, setLineProfile] = useState(null)
  const fileInputRef = useRef(null)

  const cameras = [
    { id: 1, name: 'Camera 01', location: 'แปลง A', status: 'ONLINE', condition: 'ปกติ', health: 94, lastUpdate: 'วันนี้ 10:35 น.' },
    { id: 2, name: 'Camera 02', location: 'แปลง B', status: 'ONLINE', condition: 'เสี่ยง', health: 78, lastUpdate: 'วันนี้ 09:20 น.' },
    { id: 3, name: 'Camera 03', location: 'แปลง C', status: 'OFFLINE', condition: 'ไม่มีข้อมูล', health: 0, lastUpdate: 'เมื่อวาน 18:42 น.' },
  ]

  useEffect(() => {
    liff.init({ liffId: '2011528910-NCBj8yBl' }).then(async () => {
      console.log('LIFF initialized successfully')
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile()
        setLineProfile(profile)
      }
    }).catch((error) => console.error('LIFF initialization failed:', error))
  }, [])

  const resetView = () => {
    setSelectedImage(null)
    setAiResult(null)
    setAnalyzing(false)
  }

  const navigate = (page, cameraId) => {
    setActivePage(page)
    if (cameraId) setSelectedCamera(cameras.find((camera) => camera.id === cameraId) || null)
    if (page !== 'camera') setSelectedCamera(null)
    if (page !== 'monitor') resetView()
  }

  const analyzeImage = () => {
    if (!selectedImage) return
    setAnalyzing(true)
    window.setTimeout(() => {
      setAnalyzing(false)
      setAiResult({
        status: 'เสี่ยงเล็กน้อย',
        disease: 'พบความผิดปกติบนใบ',
        confidence: 91,
        level: 'ควรตรวจสอบ',
        symptoms: ['พบจุดผิดปกติบริเวณผิวใบ', 'สีของใบมีความไม่สม่ำเสมอ', 'ควรตรวจสอบใบข้างเคียงเพิ่มเติม'],
        advice: 'แนะนำให้ตรวจดูใบและกิ่งบริเวณใกล้เคียงเพิ่มเติม ตัดส่วนที่มีอาการรุนแรงออก และติดตามอาการอย่างต่อเนื่อง',
      })
    }, 1800)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'monitor': return <Monitor selectedImage={selectedImage} setSelectedImage={setSelectedImage} analyzing={analyzing} aiResult={aiResult} analyzeImage={analyzeImage} fileInputRef={fileInputRef} resetScan={resetView} navigate={navigate} />
      case 'garden': return <Garden cameras={cameras} onCamera={(camera) => { setSelectedCamera(camera); setActivePage('camera') }} navigate={navigate} />
      case 'camera': return <CameraDetail camera={selectedCamera} navigate={navigate} />
      case 'alerts': return <Alerts navigate={navigate} />
      case 'air': return <Air navigate={navigate} />
      case 'history': return <History navigate={navigate} />
      default: return <Home navigate={navigate} lineProfile={lineProfile} onBell={() => navigate('alerts')} />
    }
  }

  const navActive = activePage === 'camera' ? 'garden' : activePage

  return (
    <div className="app-shell">
      {renderPage()}
      <nav className="bottom-nav-new">
        <Tap onClick={() => navigate('home')} className={navActive === 'home' ? 'active' : ''}><Icon name="home" size={21} /><span>หน้าหลัก</span></Tap>
        <Tap onClick={() => navigate('garden')} className={navActive === 'garden' ? 'active' : ''}><Icon name="garden" size={21} /><span>สวน</span></Tap>
        <Tap onClick={() => navigate('monitor')} className={`scan-nav ${navActive === 'monitor' ? 'active' : ''}`}><span><Icon name="scan" size={24} /></span><small>ตรวจโรค</small></Tap>
        <Tap onClick={() => navigate('alerts')} className={navActive === 'alerts' ? 'active' : ''}><Icon name="bell" size={21} /><span>แจ้งเตือน</span></Tap>
        <Tap onClick={() => navigate('history')} className={navActive === 'history' ? 'active' : ''}><Icon name="history" size={21} /><span>ประวัติ</span></Tap>
      </nav>
    </div>
  )
}

export default App
