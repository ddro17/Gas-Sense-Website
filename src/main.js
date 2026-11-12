import './style.css';
import { createExhibit } from './scene.js';

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.6"/></svg>';
const flame = '<svg viewBox="0 0 40 48" fill="none" aria-hidden="true"><path d="M23 2c2 12-12 15-12 27a9 9 0 0 0 18 0c0-5-3-9-3-12 10 9 13 16 8 24C28 51 12 49 6 40-3 27 10 14 23 2Z" fill="currentColor"/></svg>';

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#overview">Skip to content</a>
  <header class="site-header">
    <a class="wordmark" href="#" aria-label="Gas Sense home">${flame}<span>gas<span class="wordmark-light">sense</span></span></a>
    <nav aria-label="Main navigation"><a href="#explore">The system</a><a href="#intelligence">The thinking</a><a href="#build">The build</a></nav>
    <a href="#film" class="nav-film">Watch the film <span>↗</span></a>
    <button class="menu-button" aria-label="Open navigation" aria-expanded="false">Menu <span>＋</span></button>
  </header>

  <main>
    <section class="hero" id="overview" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> A COMPUTER SCIENCE THESIS PROJECT</p>
        <h1 id="hero-title">Safety that<br>makes <span class="serif">sense.</span></h1>
        <p class="hero-intro">A little more awareness.<br>A lot more peace of mind.</p>
        <p class="hero-description">Meet Gas Sense. A connected propane monitoring system that brings gas sensing, tank monitoring, and automatic response into one thoughtful design.</p>
        <a class="button button-dark" href="#explore">Meet the system ${arrow}</a>
        <div class="hero-footnote"><span>01 — SENSE</span><span>02 — UNDERSTAND</span><span>03 — RESPOND</span></div>
      </div>
      <div class="hero-visual">
        <div class="hero-stage-meta"><span>GAS SENSE / SYSTEM STUDY</span><span>FIG. 01</span></div>
        <div class="hero-watermark" aria-hidden="true">GS.</div>
        <div id="hero-model" class="hero-model" role="img" aria-label="Interactive 3D model of the Gas Sense controller and propane tank. Drag to rotate."></div>
        <div class="hero-model-label"><span class="status-dot"></span> Designed to keep you informed.</div>
        <div class="hero-stage-bottom"><span>ENCLOSURE + TANK + WEIGHING PLATFORM</span><span>↔ DRAG TO ROTATE</span></div>
      </div>
    </section>

    <div class="principles-strip" aria-label="System capabilities"><span>One connected system.</span><span>LPG sensing <i>+</i> Pressure analysis <i>+</i> Weight monitoring <i>+</i> Local & remote alerts</span></div>

    <section class="intro section-wrap" aria-labelledby="intro-title">
      <div><p class="eyebrow section-label">THE IDEA / 01</p><h2 id="intro-title">The things you<br>can’t see.<br><span class="serif">Now in view.</span></h2></div>
      <div class="intro-copy"><p class="large-copy">Your gas cylinder has a story to tell.<br>Gas Sense helps you read it.</p><p>Is gas present in the surrounding air? How is line pressure changing? How much LPG is left? The project brings these questions together, turning separate sensor readings into useful monitoring information.</p><p>Built around an ESP32, the system connects physical sensors, on-device alerts, a shut-off command, and a companion app.</p><a class="text-link" href="#intelligence">From readings to decisions ${arrow}</a></div>
    </section>

    <section class="explore-section" id="explore" aria-labelledby="explore-title">
      <div class="section-wrap explore-heading"><div><p class="eyebrow section-label">THE SYSTEM / 02</p><h2 id="explore-title">A closer look.<br><span class="serif">Every part has a purpose.</span></h2></div><p>Turn it around. Take it apart.<br>Discover what makes Gas Sense work.</p></div>
      <div class="explorer-shell">
        <div class="explorer-stage">
          <div class="stage-top"><span><span class="status-dot"></span> INTERACTIVE SYSTEM MODEL</span><button id="reset-view" class="subtle-button" aria-label="Reset 3D camera view">Reset view ↺</button></div>
          <div id="explorer-model" role="img" aria-label="Rotatable Gas Sense system model. Use component buttons to explore the hardware."></div>
          <div class="model-loader" id="model-loader">Preparing the model…</div>
          <div class="view-control" role="group" aria-label="Model assembly mode"><button class="active" data-view="assembled" aria-pressed="true">Assembled</button><button data-view="exploded" aria-pressed="false">Exploded view <span>↗</span></button></div>
          <div class="stage-hint">Drag to rotate <span>·</span> Scroll to zoom <span>·</span> Select a part to explore</div>
        </div>
        <aside class="component-panel">
          <p class="eyebrow">INSIDE THE SYSTEM</p>
          <div class="component-tabs" role="group" aria-label="System components">
            <button class="active" data-component="overview" aria-pressed="true"><span>00</span> Complete system <span>↗</span></button>
            <button data-component="enclosure" aria-pressed="false"><span>01</span> Control enclosure <span>↗</span></button>
            <button data-component="sensing" aria-pressed="false"><span>02</span> Sensing & processing <span>↗</span></button>
            <button data-component="valve" aria-pressed="false"><span>03</span> Pressure & shut-off <span>↗</span></button>
            <button data-component="weight" aria-pressed="false"><span>04</span> Weighing platform <span>↗</span></button>
            <button data-component="power" aria-pressed="false"><span>05</span> Power & distribution <span>↗</span></button>
          </div>
          <div class="component-description" aria-live="polite"><p class="component-kicker" id="part-kicker"></p><h3 id="part-title"></h3><p id="part-description"></p><div class="part-tags" id="part-tags"></div></div>
        </aside>
      </div>
      <p class="model-caption">Recreated from the original AVP geometry. The enclosure is a stylized prototype concept, not a manufacturing-ready CAD model. Component spacing is expanded for clarity.</p>
    </section>

    <section class="intelligence section-wrap" id="intelligence" aria-labelledby="intelligence-title">
      <div class="section-heading"><div><p class="eyebrow section-label">THE THINKING / 03</p><h2 id="intelligence-title">More than a reading.<br><span class="serif">A clearer picture.</span></h2></div><p>Three analytical approaches.<br>One connected view of the system.</p></div>
      <div class="analytics-grid">
        <article><span class="method-number">01 /</span><div class="method-graphic threshold-graphic" aria-hidden="true"><span></span><i></i><b></b><em>LIMIT</em></div><h3>Threshold-based</h3><p>Compares a sensor reading with a configured limit. A reading crossing that limit can trigger a programmed warning or response.</p><span class="method-question">“Has a reading crossed the line?”</span></article>
        <article><span class="method-number">02 /</span><div class="method-graphic rate-graphic" aria-hidden="true"><svg viewBox="0 0 250 80"><path d="M0 17h45l20 3 20-3 25 8 25 25 25 11 35 3 55 8" fill="none" stroke="currentColor" stroke-width="3"/><path d="M103 21v47h90" fill="none" stroke="#999c94" stroke-dasharray="4 5"/></svg><em>ΔP / Δt</em></div><h3>Pressure rate-of-change</h3><p>Looks at how pressure changes over time. The change between readings adds context that a single pressure measurement cannot provide.</p><span class="method-question">“How quickly is pressure changing?”</span></article>
        <article><span class="method-number">03 /</span><div class="method-graphic fusion-graphic" aria-hidden="true"><span>GAS</span><span>PRESSURE</span><span>CONTEXT</span><b>+</b></div><h3>Sensor fusion</h3><p>Interprets multiple sensor inputs together. Gas, pressure, and supporting measurements help build a more complete picture of system conditions.</p><span class="method-question">“What do the readings say together?”</span></article>
      </div>

      <div class="simulation">
        <div class="simulation-copy"><p class="eyebrow">TRY THE LOGIC</p><h3>Change the scene.<br>Follow the response.</h3><p>Explore how different signals can lead to different system states.</p><div class="scenario-buttons" role="group" aria-label="Choose demonstration scenario"><button data-scenario="normal" class="active" aria-pressed="true">Normal operation</button><button data-scenario="pressure" aria-pressed="false">Pressure change</button><button data-scenario="critical" aria-pressed="false">Critical condition</button><button data-scenario="recovery" aria-pressed="false">After the alert</button></div><p class="demo-note">Illustrative scenarios, not live sensor data. Trace shapes show relative changes; they do not represent calibrated thresholds or the deployed fusion algorithm.</p></div>
        <div class="simulation-output" aria-live="polite"><div class="simulation-top"><span>ANALYTICS / DEMONSTRATION</span><span class="sim-status" id="sim-status">MONITORING</span></div><div class="trace-header"><span>RELATIVE SENSOR TREND</span><div><span class="legend-gas">Gas</span><span class="legend-pressure">Pressure</span></div></div><svg class="trace-chart" viewBox="0 0 600 160" role="img" aria-label="Illustrative gas and pressure trends"><path class="chart-grid" d="M0 20h600M0 60h600M0 100h600M0 140h600"/><path id="gas-trace"/><path id="pressure-trace"/></svg><div class="trace-axis"><span>EARLIER</span><span>NOW</span></div><h4 id="sim-title"></h4><p id="sim-description"></p><div class="response-row"><div><span>LOCAL ALERT</span><strong id="sim-alert"></strong></div><div><span>VALVE COMMAND</span><strong id="sim-valve"></strong></div><div><span>APP / SMS</span><strong id="sim-app"></strong></div></div></div>
      </div>
    </section>

    <section class="journey-section"><div class="section-wrap"><p class="eyebrow">FROM THE PHYSICAL WORLD TO YOUR PHONE</p><div class="journey"><div><span>01</span><h3>Sense.</h3><p>Gas, pressure, weight,<br>temperature & humidity.</p></div><i>→</i><div><span>02</span><h3>Process.</h3><p>ESP32 reads the inputs<br>and evaluates conditions.</p></div><i>→</i><div><span>03</span><h3>Respond.</h3><p>Display, sound an alert,<br>and command shut-off.</p></div><i>→</i><div><span>04</span><h3>Connect.</h3><p>Wi-Fi links monitoring<br>to the companion app.</p></div></div></div></section>

    <section class="app-section section-wrap" aria-labelledby="app-title"><div class="app-copy"><p class="eyebrow section-label">THE COMPANION / 04</p><h2 id="app-title">In the room.<br><span class="serif">And in your hand.</span></h2><p>Local feedback when you’re nearby. A connected view when you need to check in.</p><div class="app-tabs" role="group" aria-label="Companion app screens"><button class="active" data-screen="normal" aria-pressed="true"><span>01</span><div><strong>At-a-glance monitoring</strong><p>Gas, pressure, room conditions, and an estimate of LPG remaining.</p></div>${arrow}</button><button data-screen="critical" aria-pressed="false"><span>02</span><div><strong>Know when something changes</strong><p>A critical state, shut-off command, and alerts for the registered owner.</p></div>${arrow}</button><button data-screen="history" aria-pressed="false"><span>03</span><div><strong>Look back at the readings</strong><p>Review historical sensor readings and changes over time.</p></div>${arrow}</button></div><p class="small-note">Screens from the project AVP. Remote updates and SMS depend on connectivity and service availability. Offline means current readings are unavailable.</p></div><div class="app-visual"><span class="eyebrow app-visual-title">GAS SENSE / COMPANION APP</span><div class="phone-frame"><img id="app-screen" src="/assets/app-normal.png" alt="Gas Sense companion app: normal monitoring dashboard" loading="lazy" width="1080" height="1920" /></div><div class="app-visual-bottom"><span>CONNECTED MONITORING</span><span id="screen-count">01 / 03</span></div></div></section>

    <section class="build-section" id="build" aria-labelledby="build-title"><div class="section-wrap"><div class="section-heading"><div><p class="eyebrow section-label">THE BUILD / 05</p><h2 id="build-title">Many parts.<br><span class="serif">One considered system.</span></h2></div><p>A closer look at the architecture<br>behind the prototype.</p></div><div class="build-layout"><div class="build-image"><img src="/assets/assembly-reference.jpg" alt="Original Gas Sense AVP assembly showing the enclosure, external power supply, valve assembly and tank on a weighing platform" loading="lazy" width="1920" height="1080"/><span>FIG. 02 — ORIGINAL AVP ASSEMBLY REFERENCE</span></div><div class="build-steps"><details open><summary><span>01</span> Package the electronics <b>+</b></summary><div>The concept enclosure brings together the ESP32, sensing modules, relay, converters, and wiring. The front panel presents the LCD, with openings for sensing and the audible alert.</div></details><details><summary><span>02</span> Separate the gas-line assembly <b>+</b></summary><div>The pressure transducer and solenoid remain outside the electronics enclosure. The transducer monitors line pressure; the relay switches the solenoid circuit when the controller issues a shut-off command. The command does not confirm physical valve position.</div></details><details><summary><span>03</span> Measure the cylinder’s weight <b>+</b></summary><div>A single supporting plate rests on four load sensors. Their combined signal passes through an amplifier. Calibrated weight and the empty-cylinder tare support an estimate of remaining LPG; the estimate is not inferred from pressure.</div></details><details><summary><span>04</span> Power, process & connect <b>+</b></summary><div>An external supply feeds three voltage converters and distribution connections. The ESP32 processes the readings and links the device to the companion app through built-in Wi-Fi. The LCD and buzzer provide local feedback.</div></details></div></div><div class="hardware-list"><span>ESP32</span><span>MQ-6</span><span>Pressure transducer</span><span>4 × load sensors</span><span>Signal amplifier</span><span>Temperature / humidity</span><span>Relay + solenoid</span><span>LCD + buzzer</span></div></div></section>

    <section class="film-section section-wrap" id="film" aria-labelledby="film-title"><div class="section-heading"><div><p class="eyebrow section-label">THE STORY / 06</p><h2 id="film-title">See it all<br><span class="serif">come together.</span></h2></div><p>From the first question to the complete system.<br>The original three-minute project AVP.</p></div><div class="film-player"><video id="avp-video" controls preload="none" playsinline poster="/assets/assembly-reference.jpg" aria-label="Gas Sense project audiovisual presentation"><source src="/assets/gas-sense-avp.mp4" type="video/mp4"/>Your browser does not support video playback. <a href="/assets/gas-sense-avp.mp4">Download the project AVP</a>.</video></div><div class="film-caption"><span>GAS SENSE — THE PROJECT FILM</span><span>03:00 / ORIGINAL AVP</span></div></section>

    <section class="closing section-wrap"><p class="eyebrow">A THESIS. A PROTOTYPE. A MORE INFORMED HOME.</p><h2>Sense more.<br><span class="serif">Understand better.</span></h2><a href="#explore" class="button button-dark">Explore it again ${arrow}</a><p class="project-title">IoT-Based Propane Monitoring System using Threshold-Based,<br>Pressure Rate-of-Change, and Sensor Fusion Analytics.</p></section>
  </main>
  <footer class="site-footer"><a href="#" class="wordmark">${flame}<span>gas<span class="wordmark-light">sense</span></span></a><p>A Computer Science / Software Engineering thesis project.<br>Research prototype & conceptual visualization.</p><a href="#">Back to top ↑</a></footer>
`;

const componentInfo = {
  overview: { kicker:'THE COMPLETE PICTURE', title:'Connected by design.', description:'An electronics enclosure, a separate gas-line assembly, and a tank on a weighing platform. Each contributes a different piece of the monitoring picture.', tags:['SENSE','PROCESS','RESPOND'] },
  enclosure: { kicker:'01 / CONTROL ENCLOSURE', title:'A home for the hardware.', description:'A dedicated enclosure houses the electronics. The front cover carries the LCD and includes openings for the gas sensor and audible alert. Open the exploded view to look inside.', tags:['FRONT PANEL','LCD','BUZZER'] },
  sensing: { kicker:'02 / SENSING & PROCESSING', title:'Small inputs. Useful context.', description:'The MQ-6 senses LPG in surrounding air. A separate module reads temperature and humidity. The ESP32 processes the readings and uses built-in Wi-Fi to connect with the companion app.', tags:['MQ-6','ESP32','ENVIRONMENT'] },
  valve: { kicker:'03 / PRESSURE & SHUT-OFF', title:'Read the line. Command a response.', description:'The external transducer monitors gas-line pressure. Through a relay, the controller can command the solenoid valve to shut off flow. This is a command, not confirmed valve-position feedback.', tags:['TRANSDUCER','RELAY','SOLENOID'] },
  weight: { kicker:'04 / WEIGHING PLATFORM', title:'Know what remains.', description:'Four load sensors sit beneath one supporting plate. An amplifier carries their combined signal to the controller. Calibrated weight and empty-cylinder tare help estimate the LPG remaining.', tags:['4 LOAD SENSORS','AMPLIFIER','TARE WEIGHT'] },
  power: { kicker:'05 / POWER & DISTRIBUTION', title:'Behind every reading.', description:'An external supply powers the system. Three voltage converters provide the required power levels, while distribution connections route power to the electronics.', tags:['EXTERNAL SUPPLY','3 CONVERTERS','DISTRIBUTION'] }
};

let activePart = 'overview';
let explorer;
function selectPart(id, fromModel = false) {
  activePart = id;
  const part = componentInfo[id];
  document.querySelectorAll('[data-component]').forEach(b => { b.classList.toggle('active', b.dataset.component === id); b.setAttribute('aria-pressed', b.dataset.component === id); });
  document.querySelector('#part-kicker').textContent = part.kicker;
  document.querySelector('#part-title').textContent = part.title;
  document.querySelector('#part-description').textContent = part.description;
  document.querySelector('#part-tags').innerHTML = part.tags.map(tag => `<span>${tag}</span>`).join('');
  explorer?.select(id);
  if (id === 'sensing') setView('exploded');
}
function setView(mode) {
  document.querySelectorAll('[data-view]').forEach(b => { b.classList.toggle('active', b.dataset.view === mode); b.setAttribute('aria-pressed', b.dataset.view === mode); });
  explorer?.setExploded(mode === 'exploded');
}
document.querySelectorAll('[data-component]').forEach(b => b.addEventListener('click', () => selectPart(b.dataset.component)));
document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
document.querySelector('#reset-view').addEventListener('click', () => { explorer?.reset(); setView('assembled'); selectPart('overview'); });
selectPart('overview');

try {
  createExhibit(document.querySelector('#hero-model'), { hero: true });
} catch (error) {
  document.querySelector('#hero-model').innerHTML = '<img class="model-fallback" src="/assets/assembly-reference.jpg" alt="Gas Sense system assembly" />';
  console.warn('Hero 3D unavailable', error);
}
try {
  explorer = createExhibit(document.querySelector('#explorer-model'), { onSelect: selectPart });
  document.querySelector('#model-loader').remove();
} catch (error) {
  document.querySelector('#explorer-model').innerHTML = '<img class="model-fallback" src="/assets/assembly-reference.jpg" alt="Gas Sense system assembly" />';
  document.querySelector('#model-loader').textContent = '3D is unavailable in this browser. Explore the component descriptions alongside the assembly reference.';
  document.querySelectorAll('[data-view], #reset-view').forEach(b => b.disabled = true);
  console.warn('Explorer 3D unavailable', error);
}

const scenarios = {
  normal: { status:'MONITORING', title:'Readings are steady. Monitoring continues.', description:'The demonstration shows stable gas and pressure trends. The controller continues to observe the inputs, while the app presents the latest available readings.', alert:'Standby', valve:'No shut-off', app:'Monitoring', gas:[123,121,123,119,121,122,120,121,122,120,121,122], pressure:[42,43,41,44,42,41,43,44,42,41,43,42] },
  pressure: { status:'REVIEW SIGNAL', title:'A changing pressure trend needs context.', description:'A pressure change is visible even without a rising gas signal. Rate-of-change analysis highlights the change; other sensor inputs help interpret it. A pressure drop alone is not proof of a leak.', alert:'Observe', valve:'No demo command', app:'Trend visible', gas:[123,121,123,121,122,121,122,120,122,121,120,121], pressure:[42,43,42,44,51,65,83,100,111,121,126,130] },
  critical: { status:'CRITICAL / DEMO', title:'Detect a critical condition. Trigger a response.', description:'In this example, rising gas and changing pressure accompany a critical state. The system activates the local alert, issues a shut-off command, and initiates remote notifications.', alert:'Buzzer active', valve:'Shut-off issued', app:'Alert + SMS', gas:[123,120,118,112,99,82,64,44,31,22,18,15], pressure:[42,43,45,50,61,72,88,100,116,125,132,138] },
  recovery: { status:'HELD CLOSED', title:'Lower readings do not mean an automatic restart.', description:'The AVP shows the valve remaining held closed even as readings fall, pending inspection. Acknowledging the alert does not demonstrate that the gas line is safe to reopen.', alert:'Alert retained', valve:'Held closed', app:'Review alert', gas:[20,25,39,54,70,85,99,110,117,120,122,123], pressure:[133,132,133,134,133,132,133,134,133,134,133,133] }
};
function trace(points) { return points.map((p,i) => `${i ? 'L' : 'M'}${i * 600 / (points.length - 1)} ${p}`).join(' '); }
function setScenario(id) {
  const s = scenarios[id];
  document.querySelectorAll('[data-scenario]').forEach(b => { b.classList.toggle('active', b.dataset.scenario === id); b.setAttribute('aria-pressed', b.dataset.scenario === id); });
  for (const key of ['status','title','description','alert','valve','app']) document.querySelector(`#sim-${key}`).textContent = s[key];
  document.querySelector('.simulation-output').dataset.state = id;
  document.querySelector('#gas-trace').setAttribute('d', trace(s.gas));
  document.querySelector('#pressure-trace').setAttribute('d', trace(s.pressure));
}
document.querySelectorAll('[data-scenario]').forEach(b => b.addEventListener('click', () => setScenario(b.dataset.scenario)));
setScenario('normal');

document.querySelectorAll('[data-screen]').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('[data-screen]').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); });
  const screen = document.querySelector('#app-screen');
  screen.src = `/assets/app-${b.dataset.screen}.png`;
  screen.alt = `Gas Sense companion app: ${b.dataset.screen === 'normal' ? 'normal monitoring dashboard' : b.dataset.screen === 'critical' ? 'critical condition alert' : 'sensor reading history'}`;
  document.querySelector('#screen-count').textContent = `${({normal:'01',critical:'02',history:'03'})[b.dataset.screen]} / 03`;
}));
const menu = document.querySelector('.menu-button');
menu.addEventListener('click', () => { const isOpen = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', isOpen); document.querySelector('.site-header').classList.toggle('menu-open', isOpen); });
document.querySelectorAll('.site-header nav a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('aria-expanded', false); document.querySelector('.site-header').classList.remove('menu-open'); }));
document.addEventListener('keydown', e => { if(e.key === 'Escape') { menu.setAttribute('aria-expanded', false); document.querySelector('.site-header').classList.remove('menu-open'); } });
