import { useEffect, useRef, useState } from 'react'
import liff from '@line/liff'
import './App.css'

function App() {
  
    useEffect(() => {
  liff
    .init({ liffId: '2011528910-NCBj8yBl' })
    .then(async () => {
      console.log('LIFF initialized successfully')

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile()
        console.log('LINE User:', profile)
        setLineProfile(profile)
      } else {
        console.log('LINE user is not logged in')
      }
    })
    .catch((error) => {
      console.error('LIFF initialization failed:', error)
    })
}, [])

  const [activePage, setActivePage] = useState('home')
  const [monitorMode, setMonitorMode] = useState('scan')
  const [selectedCamera, setSelectedCamera] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [lineProfile, setLineProfile] = useState(null)

  const fileInputRef = useRef(null)

  const cameras = [
    {
      id: 1,
      name: 'Camera 01',
      location: 'แปลง A',
      status: 'ONLINE',
      condition: 'ปกติ',
      health: 94,
      lastUpdate: 'วันนี้ 10:35 น.',
      imageClass: 'camera-one',
    },
    {
      id: 2,
      name: 'Camera 02',
      location: 'แปลง B',
      status: 'ONLINE',
      condition: 'เสี่ยง',
      health: 78,
      lastUpdate: 'วันนี้ 09:20 น.',
      imageClass: 'camera-two',
    },
    {
      id: 3,
      name: 'Camera 03',
      location: 'แปลง C',
      status: 'OFFLINE',
      condition: 'ไม่มีข้อมูล',
      health: 0,
      lastUpdate: 'เมื่อวาน 18:42 น.',
      imageClass: 'camera-three',
    },
  ]

  const goTo = (page) => {
    setActivePage(page)
    setSelectedCamera(null)
    setSelectedImage(null)
    setAiResult(null)
    setAnalyzing(false)
    setSelectedAlert(null)
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setSelectedImage(imageUrl)
    setAiResult(null)
  }

  const analyzeImage = () => {
    if (!selectedImage) return

    setAnalyzing(true)

    setTimeout(() => {
      setAnalyzing(false)

      setAiResult({
       status: 'เสี่ยงเล็กน้อย',
       disease: 'พบความผิดปกติบนใบ',
       confidence: 91,
       level: 'ควรตรวจสอบ',
       symptoms: [
           'พบจุดผิดปกติบริเวณผิวใบ',
           'สีของใบมีความไม่สม่ำเสมอ',
           'ควรตรวจสอบใบข้างเคียงเพิ่มเติม',
          ],
          advice:
           'แนะนำให้ตรวจดูใบและกิ่งบริเวณใกล้เคียงเพิ่มเติม ตัดส่วนที่มีอาการรุนแรงออก และติดตามอาการอย่างต่อเนื่อง',
      })
    }, 1800)
  }

  /* =====================================================
     HOME
  ===================================================== */

  const renderHome = () => (
    <>
      <section className="health-card">
        <div className="health-circle">
          <div>
            <strong>87</strong>
            <span>/100</span>
          </div>
        </div>

        <div className="health-info">
          <p className="section-label">GARDEN HEALTH</p>
          <h2>สุขภาพสวนดี</h2>
          <p>
            ภาพรวมสุขภาพต้นส้มโออยู่ในระดับดี
            แต่พบจุดที่ควรตรวจสอบ 2 จุด
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>สถานะสวน</h2>
          <span>วันนี้</span>
        </div>

        <div className="status-grid">
          <div className="stat-card">
            <span className="stat-icon">🌳</span>
            <strong>128</strong>
            <p>ต้นทั้งหมด</p>
          </div>

          <div className="stat-card">
            <span className="stat-icon">✓</span>
            <strong>116</strong>
            <p>ปกติ</p>
          </div>

          <div className="stat-card warning">
            <span className="stat-icon">!</span>
            <strong>12</strong>
            <p>ต้องตรวจสอบ</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>สภาพแวดล้อม</h2>
          <span>● Live</span>
        </div>

        <div className="environment-grid">
          <div className="environment-card">
            <span>💧</span>
            <div>
              <small>ความชื้น</small>
              <strong>68%</strong>
            </div>
          </div>

          <div className="environment-card">
            <span>💨</span>
            <div>
              <small>PM2.5</small>
              <strong>18 µg/m³</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="alert-card">
        <div className="alert-icon">!</div>

        <div>
          <p className="alert-label">ACTIVE ALERT</p>
          <h2>พบความผิดปกติ 2 จุด</h2>
          <p>มีภาพที่ AI ตรวจพบความเสี่ยง ควรตรวจสอบเพิ่มเติม</p>
        </div>

        <button onClick={() => goTo('alerts')}>ดู</button>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>กล้องประจำสวน</h2>
          <span>3 กล้อง</span>
        </div>

        <div className="camera-list">
          {cameras.slice(0, 2).map((camera) => (
            <button
              key={camera.id}
              className="camera-card"
              onClick={() => {
                setSelectedCamera(camera)
                setActivePage('camera')
              }}
            >
              <div className={`camera-image ${camera.imageClass}`}>
                <span>
                  ● {camera.status === 'ONLINE' ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>

              <div className="camera-info">
                <strong>{camera.name}</strong>
                <small>
                  {camera.location} • {camera.condition}
                </small>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  )

  /* =====================================================
     MONITOR
  ===================================================== */

  const renderMonitor = () => (
    <>
      <section className="monitor-header">
        <p className="section-label">PLANT MONITORING</p>
        <h2>ตรวจสุขภาพต้นส้มโอ</h2>
        <p>เลือกวิธีตรวจสอบสุขภาพต้นส้มโอของคุณ</p>
      </section>

      <div className="monitor-tabs">
        <button
          className={monitorMode === 'scan' ? 'active' : ''}
          onClick={() => setMonitorMode('scan')}
        >
          📷 ถ่ายภาพตรวจ
        </button>

        <button
          className={monitorMode === 'camera' ? 'active' : ''}
          onClick={() => setMonitorMode('camera')}
        >
          📹 กล้องประจำสวน
        </button>
      </div>

      {monitorMode === 'scan' && (
        <section className="scan-card">
          {!selectedImage ? (
            <>
              <div className="scan-visual">
                <div className="scan-icon">📷</div>
                <div className="scan-ring"></div>
              </div>

              <h3>ถ่ายภาพใบหรือผลส้มโอ</h3>

              <p>
                ถ่ายภาพให้เห็นส่วนของพืชชัดเจน
                ระบบจะนำภาพไปวิเคราะห์ด้วย AI
              </p>

              <button
                className="primary-button"
                onClick={() => fileInputRef.current?.click()}
              >
                📷 เปิดกล้อง / เลือกรูป
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                hidden
              />

              <div className="scan-tips">
                <span>✓ แสงเพียงพอ</span>
                <span>✓ ภาพไม่เบลอ</span>
                <span>✓ เห็นใบชัดเจน</span>
              </div>
            </>
          ) : (
            <>
              <div className="preview-container">
                <img src={selectedImage} alt="ภาพที่เลือกสำหรับตรวจสอบ" />
              </div>

              <div className="preview-label">
                <span>ภาพพร้อมวิเคราะห์</span>
                <small>ตรวจสอบภาพก่อนส่งให้ AI</small>
              </div>

              {analyzing ? (
                <div className="analyzing-box">
                  <div className="loading-spinner"></div>
                  <strong>กำลังวิเคราะห์ภาพ...</strong>
                  <span>AI กำลังตรวจสอบลักษณะของพืช</span>
                </div>
              ) : aiResult ? (
                <div className="ai-result-card">

  <div className="result-status">
    <span className="result-dot"></span>
    <span>AI ANALYSIS COMPLETE</span>
  </div>

  <div className="result-main">
    <div className="result-risk-icon">!</div>

    <div>
      <small>ผลการตรวจ</small>
      <h3>{aiResult.status}</h3>
    </div>
  </div>

  <div className="result-diagnosis">
    <span>โรค / ความผิดปกติ</span>
    <strong>{aiResult.disease}</strong>

    <div className="risk-badge">
      {aiResult.level}
    </div>
  </div>

  <div className="confidence">

    <div className="confidence-header">
      <span>ความมั่นใจของ AI</span>
      <strong>{aiResult.confidence}%</strong>
    </div>

    <div className="confidence-bar">
      <span
        style={{
          width: `${aiResult.confidence}%`,
        }}
      ></span>
    </div>

  </div>

  <div className="symptom-box">

    <div className="box-title">
      <span>🔎</span>
      <strong>อาการที่ตรวจพบ</strong>
    </div>

    {aiResult.symptoms.map((symptom, index) => (
      <div className="symptom-item" key={index}>
        <span>✓</span>
        <p>{symptom}</p>
      </div>
    ))}

  </div>

  <div className="result-advice">

    <div className="box-title">
      <span>💡</span>
      <strong>คำแนะนำ</strong>
    </div>

    <p>{aiResult.advice}</p>

  </div>

  <div className="result-source">
    <span>แหล่งข้อมูล</span>
    <strong>📷 Mobile Scan</strong>
  </div>

  <button
    className="secondary-button"
    onClick={() => {
      setSelectedImage(null)
      setAiResult(null)
    }}
  >
    ↻ ตรวจภาพใหม่
  </button>

</div>

                  
              ) : (
                <>
                  <button className="primary-button" onClick={analyzeImage}>
                    ✦ วิเคราะห์ด้วย AI
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => setSelectedImage(null)}
                  >
                    ↻ ถ่ายภาพใหม่
                  </button>
                </>
              )}
            </>
          )}
        </section>
      )}

      {monitorMode === 'camera' && (
        <section className="camera-monitor">
          <div className="camera-monitor-intro">
            <h3>กล้องประจำสวน</h3>
            <span>{cameras.length} จุด</span>
          </div>

          {cameras.map((camera) => (
            <button
              key={camera.id}
              className="camera-monitor-card"
              onClick={() => {
                setSelectedCamera(camera)
                setActivePage('camera')
              }}
            >
              <div className={`camera-thumb ${camera.imageClass}`}>
                <span className={camera.status === 'ONLINE' ? 'online' : 'offline'}>
                  ● {camera.status}
                </span>
              </div>

              <div className="camera-monitor-info">
                <div>
                  <strong>{camera.name}</strong>
                  <small>{camera.location}</small>
                </div>

                <div className="camera-health">
                  {camera.status === 'ONLINE' ? `${camera.health}%` : '--'}
                </div>
              </div>
            </button>
          ))}
        </section>
      )}
    </>
  )

  /* =====================================================
     CAMERA DETAIL
  ===================================================== */

  const renderCamera = () => {
    if (!selectedCamera) {
      return renderMonitor()
    }

    return (
      <>
        <button
          className="back-button"
          onClick={() => {
            setActivePage('monitor')
            setMonitorMode('camera')
          }}
        >
          ← กลับไปกล้องทั้งหมด
        </button>

        <section className="camera-detail">
          <div className={`camera-detail-image ${selectedCamera.imageClass}`}>
            <span
              className={
                selectedCamera.status === 'ONLINE' ? 'online' : 'offline'
              }
            >
              ● {selectedCamera.status}
            </span>
          </div>

          <div className="camera-detail-title">
            <div>
              <p className="section-label">FIXED CAMERA</p>
              <h2>{selectedCamera.name}</h2>
              <span>{selectedCamera.location}</span>
            </div>

            <div className="camera-score">
              <strong>
                {selectedCamera.health > 0 ? selectedCamera.health : '--'}
              </strong>
              <small>Health</small>
            </div>
          </div>

          <div className="detail-grid">
            <div>
              <span>สถานะ</span>
              <strong>{selectedCamera.condition}</strong>
            </div>

            <div>
              <span>อัปเดตล่าสุด</span>
              <strong>{selectedCamera.lastUpdate}</strong>
            </div>

            <div>
              <span>อุณหภูมิ</span>
              <strong>31°C</strong>
            </div>

            <div>
              <span>ความชื้น</span>
              <strong>68%</strong>
            </div>
          </div>

          <section className="camera-ai-box">
            <div className="result-status">
              <span className="result-dot"></span>
              <span>LATEST AI RESULT</span>
            </div>

            <h3>
              {selectedCamera.condition === 'เสี่ยง'
                ? 'พบความเสี่ยง'
                : selectedCamera.condition}
            </h3>

            <p>
              {selectedCamera.condition === 'เสี่ยง'
                ? 'AI ตรวจพบความผิดปกติบริเวณใบ ควรตรวจสอบแปลง B เพิ่มเติม'
                : 'ไม่พบความผิดปกติที่สำคัญจากภาพล่าสุด'}
            </p>
          </section>
        </section>
      </>
    )
  }

  /* =====================================================
     ALERTS
  ===================================================== */

  const renderAlerts = () => (
    <>
      <section className="page-heading">
        <p className="section-label">NOTIFICATIONS</p>
        <h2>แจ้งเตือน</h2>
        <p>ติดตามเหตุการณ์ที่ต้องตรวจสอบภายในสวน</p>
      </section>

      <section className="alert-list">
        <button className="alert-detail-card">
          <div className="alert-detail-icon danger">!</div>

          <div>
            <strong>พบความผิดปกติ 2 จุด</strong>
            <p>AI ตรวจพบความเสี่ยงบนใบส้มโอ</p>
            <small>วันนี้ 10:35 น. • Mobile Scan</small>
          </div>

          <span>›</span>
        </button>

        <button className="alert-detail-card warning-alert">
          <div className="alert-detail-icon warning">!</div>

          <div>
            <strong>Camera 02 ตรวจพบความเสี่ยง</strong>
            <p>ควรตรวจสอบบริเวณแปลง B</p>
            <small>วันนี้ 09:20 น. • Camera 02</small>
          </div>

          <span>›</span>
        </button>
      </section>
    </>
  )

  /* =====================================================
     AIR
  ===================================================== */

  const renderAir = () => (
    <>
      <section className="air-hero">
        <p className="section-label">ENVIRONMENT</p>

        <div className="air-weather-icon">☀️</div>

        <div className="big-number">31°</div>

        <strong>อากาศแจ่มใส</strong>
        <p>เหมาะสำหรับการดูแลสวน</p>
      </section>

      <section className="air-metrics">
        <div>
          <span>💧</span>
          <small>ความชื้น</small>
          <strong>68%</strong>
        </div>

        <div>
          <span>💨</span>
          <small>PM2.5</small>
          <strong>18</strong>
        </div>

        <div>
          <span>🌬️</span>
          <small>ความเร็วลม</small>
          <strong>12</strong>
        </div>
      </section>

      <section className="air-status">
        <div className="status-check">✓</div>
        <div>
          <strong>คุณภาพอากาศดี</strong>
          <p>ยังไม่พบสภาพอากาศที่น่าเป็นห่วงสำหรับสวน</p>
        </div>
      </section>
    </>
  )

  /* =====================================================
     HISTORY
  ===================================================== */

  const renderHistory = () => (
    <>
      <section className="page-heading">
        <p className="section-label">ACTIVITY</p>
        <h2>ประวัติการตรวจ</h2>
        <p>รวมประวัติการตรวจจากมือถือและกล้องประจำสวน</p>
      </section>

      <div className="history-filter">
        <button className="active">ทั้งหมด</button>
        <button>มือถือ</button>
        <button>กล้อง</button>
      </div>

      <section className="history-list">
        <div className="history-item">
          <span>📷</span>

          <div>
            <strong>ตรวจใบส้มโอ</strong>
            <small>วันนี้ 10:35 น. • Mobile Scan</small>
          </div>

          <b>ปกติ</b>
        </div>

        <div className="history-item">
          <span>📹</span>

          <div>
            <strong>Camera 02</strong>
            <small>วันนี้ 09:20 น. • แปลง B</small>
          </div>

          <b className="danger-text">เสี่ยง</b>
        </div>

        <div className="history-item">
          <span>📷</span>

          <div>
            <strong>ตรวจผลส้มโอ</strong>
            <small>เมื่อวาน 16:42 น. • Mobile Scan</small>
          </div>

          <b>ปกติ</b>
        </div>

        <div className="history-item">
          <span>📹</span>

          <div>
            <strong>Camera 01</strong>
            <small>เมื่อวาน 14:18 น. • แปลง A</small>
          </div>

          <b>ปกติ</b>
        </div>
      </section>
    </>
  )

  /* =====================================================
     PAGE CONTENT
  ===================================================== */

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return renderHome()

      case 'monitor':
        return renderMonitor()

      case 'camera':
        return renderCamera()

      case 'alerts':
        return renderAlerts()

      case 'air':
        return renderAir()

      case 'history':
        return renderHistory()

      default:
        return renderHome()
    }
  }

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <button
          className="brand-button"
          onClick={() => goTo('home')}
        >
          <div>
            <p className="eyebrow">SMART AGRICULTURE</p>
            <h1>Pomelo Garden</h1>

          {lineProfile && (
          <p className="line-user">
         👋 สวัสดี, {lineProfile.displayName}
          </p>
          )}

          <p className="location">สวนส้มโอ • นครปฐม</p>
          </div>
        </button>

        <div className="weather">
          <span>☀️</span>

          <div>
            <strong>31°C</strong>
            <small>ความชื้น 68%</small>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main>
        {renderPage()}
      </main>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">

        <button
          className={activePage === 'home' ? 'active' : ''}
          onClick={() => goTo('home')}
        >
          <span>⌂</span>
          <small>หน้าหลัก</small>
        </button>

        <button
          className={
            activePage === 'monitor' || activePage === 'camera'
              ? 'active'
              : ''
          }
          onClick={() => goTo('monitor')}
        >
          <span>📷</span>
          <small>ตรวจโรค</small>
        </button>

        <button
          className={activePage === 'alerts' ? 'active' : ''}
          onClick={() => goTo('alerts')}
        >
          <span>⚠</span>
          <small>แจ้งเตือน</small>
        </button>

        <button
          className={activePage === 'air' ? 'active' : ''}
          onClick={() => goTo('air')}
        >
          <span>💨</span>
          <small>อากาศ</small>
        </button>

        <button
          className={activePage === 'history' ? 'active' : ''}
          onClick={() => goTo('history')}
        >
          <span>◷</span>
          <small>ประวัติ</small>
        </button>

      </nav>
    </div>
  )
}

export default App