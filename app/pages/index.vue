<template>
  <div class="Main">
    <!--img class="logoVue" src="@/assets/logo.png" contain-->
    
    <template v-if="userLogged">
      <div class="dashboard">
        <div class="welcome">
          Bienvenido(a), <b>{{ userLogged }}</b>
        </div>

        <!-- ====== 1) Tablero de control (3ra imagen) ====== -->
        <h2 class="section-title">Tablero de control</h2>

        <div class="card filtros-card">
          <div class="filtros-grid">
            <div class="field">
              <label>Buscar</label>
              <div class="input-wrap">
                <svg class="input-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                </svg>
                <input v-model="buscar" type="text" class="input has-ico"
                  placeholder="Vendedor, cliente_id, nombre, nombre" />
              </div>
            </div>

            <div class="field">
              <label>Vendedor</label>
              <div ref="vendRef" class="ms">
                <button type="button" class="ms-toggle" @click="vendOpen = !vendOpen">
                  <span class="ms-text">{{ vendLabel }}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div v-if="vendOpen" class="ms-list">
                  <label v-for="v in vendedores" :key="v" class="ms-opt">
                    <input type="checkbox" :checked="vendedoresSel.includes(v)" @change="toggleVend(v)" />
                    <span>{{ v }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <label>Desde</label>
              <input v-model="fechaDesde" type="date" class="input" />
            </div>

            <div class="field">
              <label>Hasta</label>
              <input v-model="fechaHasta" type="date" class="input" />
            </div>
          </div>

          <div class="filtros-actions">
            <button type="button" class="btn btn-primary" @click="aplicarFiltros">Aplicar filtros</button>
            <button type="button" class="btn btn-outline" @click="limpiarFiltros">Limpiar filtros</button>
          </div>
        </div>

        <div class="stats-row">
          <div v-for="s in stats" :key="s.label" class="card stat">
            <span class="stat-num">{{ s.value }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>

        <!-- ====== 2) Tarjetas KPI (1ra imagen) ====== -->
        <div class="kpi-grid">
          <div v-for="k in kpis" :key="k.title" class="card kpi">
            <div class="kpi-head">
              <span class="kpi-ico" :style="{ background: k.bg, color: k.fg }" v-html="k.icon"></span>
              <span class="kpi-title">{{ k.title }}</span>
            </div>
            <div class="kpi-value">{{ k.value }}</div>
            <div class="kpi-sub">{{ k.sub }}</div>
          </div>
        </div>

        <!-- ====== 3) Gráficas (4ta imagen) ====== -->
        <div class="charts-row">
          <div class="card chart-card">
            <div class="card-title">Actividad por fecha</div>
            <div class="card-sub">Notas de pedido por día (fecha de emisión)</div>
            <div class="bars">
              <div v-for="(b, i) in actividad" :key="i" class="bar-col">
                <span class="bar-val">{{ b.v }}</span>
                <div class="bar" :style="{ height: barH(b.v) + 'px' }"></div>
              </div>
            </div>
            <div class="dates">
              <span v-for="(b, i) in actividad" :key="'d' + i" class="bar-date">{{ b.d }}</span>
            </div>
            <div class="fake-scroll">
              <div class="fake-thumb"></div>
            </div>
          </div>

          <div class="card metrics-card">
            <div class="card-title">Métricas cobradas por cliente</div>
            <div class="card-sub">Totales</div>
            <div v-for="m in metricas" :key="m.name" class="metric">
              <div class="metric-row">
                <span class="metric-name">{{ m.name }}</span>
                <span class="metric-amount">{{ m.amount }}</span>
              </div>
              <div class="metric-track">
                <div class="metric-fill" :style="{ width: metW(m.v) }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ====== 4) Saldos (2da imagen) ====== -->
        <div class="saldos-row">
          <div class="card saldo">
            <div class="saldo-label danger">Saldo vencido</div>
            <div class="saldo-value">$840.054.449,86</div>
          </div>
          <div class="card saldo">
            <div class="saldo-label">Saldo total</div>
            <div class="saldo-value">$1.652.312.511,01</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        AMAZING WEB SOFTWARE BY
      </div>
      <div class="imagen" />
      <div>
        <span>Made with Vue {{ VueVersion }} and Nuxt {{ NuxtVersion }}</span>
      </div>

      <div>
        Open Source Web-Ones Technology Framework developed with :
      </div>

      <div>
        <a href="https://vuejs.org/">VUE {{ version }},</a>
      </div>
      <div>
        <a href="https://nuxt.com/">NUXT {{ nuxtVersion }} for front-end Framework,</a>
      </div>
      <div>
        <a href="https://nodejs.org/en/">NODE,</a>

      </div>
      <div>
        <a href="http://expressjs.com/">EXPRESS for back-end </a>

      </div>
      <div>
        and
      </div>
      <div>
        Postgres or MSSQL as DataBase
      </div>
      <div>
        VUE/NUXT npm Packages:
      </div>
      <div>
        <a href="https://www.npmjs.com/package/@zip.js/zip.js/v/2.6.3">zip.js,</a>
        <a>zip.js is an open-source library (BSD-3-Clause license) for zipping and unzipping files in the browser and
          Deno</a>
      </div>
      <div> <a href="https://www.npmjs.com/package/alasql">alasql, </a>
        <a href="https://github.com/alasql/alasql/blob/HEAD/LICENSE">MIT licence information, </a>
      </div>
      <div> <a href="https://www.npmjs.com/package/axios">axios,</a>
      </div>
      <div> <a href="https://www.npmjs.com/package/file-saver/v/1.3.2">file-saver, </a>
      </div>
      <div> <a href="https://www.npmjs.com/package/pinia/v/0.5.2"> pinia, </a>
      </div>
      <div> <a href="https://www.npmjs.com/package/vue-sweetalert2">vue-sweetalert2,</a>
      </div>
      <div> <a href="https://www.npmjs.com/package/vue3-table-lite">vue3-table-lite,</a>
      </div>
      <div> <a href="https://beholdr.github.io/maska/v3">maska,</a>
      </div>
      <div> <a href="https://www.npmjs.com/package/xlsx">xlsx,</a>
      </div>
      <div> <a href="https://www.npmjs.com/package/whatsapp-web.js?activeTab=readme">whatsapp-web.js </a>
        <a href="http://www.apache.org/licenses/LICENSE-2.0."> Licensed under the Apache License, Version 2.0, </a>

      </div>
      <div> <a href="https://github.com/siavcom/web-ones-technology">front-end git-hub, </a>
      </div>
      <div> <a href="https://github.com/siavcom/VFP-NODE">back-end git-hub,</a>
      </div>
      <div> <a href="http://www.siavcom.com.mx">ERP Siavcom</a>
      </div>
      <div>
        NODE/Express npm Packages:
      </div>
      <div>
        <a href="https://sequelize.org/">sequelize</a>
      </div>
      <div>
        <a href="https://socket.io/">Socket.IO</a>
      </div>
      <div>
        <a href="https://sourceforge.net/projects/jasperreports/">Jasper reports library</a>
      </div>
      <div>
        <a href="https://www.npmjs.com/package/node-jasper-report">node jasper</a>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { version } from 'vue';
import { version as nuxtVersion } from 'nuxt/package.json'
const session = Session()
//import { getNuxtVersion } from '@nuxt/kit'
const VueVersion = ref(version)
const NuxtVersion = nuxtVersion

console.log(['hola mundo', Public.value])


const { id_con, user, nom_emp } = storeToRefs(session)
const userLogged = computed(() => (id_con.value ? user.value : ''))

/* ============================================================
   Dashboard - datos estáticos (maqueta)
   ============================================================ */
const buscar = ref('')
const fechaDesde = ref('2026-08-12')
const fechaHasta = ref('2026-11-10')

/* Multi-select de vendedores */
const vendedores = ['Juan Pérez', 'María Gómez', 'Carlos Ruiz', 'Ana Torres', 'Luis Fernández']
const vendedoresSel = ref<string[]>([])
const vendOpen = ref(false)
const vendRef = ref<HTMLElement | null>(null)

const vendLabel = computed(() =>
  vendedoresSel.value.length ? vendedoresSel.value.join(', ') : 'Todos'
)

const toggleVend = (v: string) => {
  const i = vendedoresSel.value.indexOf(v)
  if (i >= 0) vendedoresSel.value.splice(i, 1)
  else vendedoresSel.value.push(v)
}

const onDocClick = (e: MouseEvent) => {
  if (vendRef.value && !vendRef.value.contains(e.target as Node)) vendOpen.value = false
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

const aplicarFiltros = () => {
  vendOpen.value = false
}

const limpiarFiltros = () => {
  buscar.value = ''
  vendedoresSel.value = []
  fechaDesde.value = '2026-08-12'
  fechaHasta.value = '2026-11-10'
}

/* Stats de clientes */
const stats = [
  { value: '4020', label: 'Clientes en nómina' },
  { value: '1240', label: 'Clientes activos' },
  { value: '2780', label: 'Clientes inactivos' },
]

/* Tarjetas KPI (iconos SVG inline) */
const ico = (p: string) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`

const kpis = [
  {
    title: 'Clientes contactados', value: '6', sub: 'Únicos en período', bg: '#e7f6f0', fg: '#1c9b6c',
    icon: ico('<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  },
  {
    title: 'Visitas presenciales', value: '4', sub: '67% del total', bg: '#f4f8e6', fg: '#8aa624',
    icon: ico('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
  },
  {
    title: 'Contactos virtuales', value: '2', sub: '33% del total', bg: '#efedfb', fg: '#7b6fd0',
    icon: ico('<rect x="2" y="6" width="13" height="12" rx="2"/><path d="M22 8l-7 4 7 4V8z"/>'),
  },
  {
    title: 'Pedidos tomados', value: '16132', sub: 'En período seleccionado', bg: '#e8f1fb', fg: '#3d74b8',
    icon: ico('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'),
  },
  {
    title: 'Prom. productos por pedido', value: '8.0', sub: 'unidades por pedido', bg: '#faf3e3', fg: '#b78a2e',
    icon: ico('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'),
  },
  {
    title: 'Ticket promedio', value: '$238.994', sub: 'por pedido', bg: '#e8f1fb', fg: '#3d74b8',
    icon: ico('<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>'),
  },
  {
    title: 'Monto total', value: '$3.855.453.108', sub: 'cobrado en período', bg: '#f4f6e4', fg: '#8f9a2e',
    icon: ico('<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>'),
  },
]

/* Gráfica de barras: Actividad por fecha */
const actividad = [
  { v: 256, d: '12/08' }, { v: 249, d: '' }, { v: 273, d: '' }, { v: 16, d: '' }, { v: 4, d: '' },
  { v: 283, d: '' }, { v: 241, d: '' }, { v: 271, d: '' }, { v: 215, d: '21/08' }, { v: 11, d: '' },
  { v: 329, d: '' }, { v: 317, d: '' }, { v: 257, d: '' }, { v: 247, d: '' }, { v: 236, d: '' },
  { v: 3, d: '3/09' }, { v: 283, d: '' }, { v: 289, d: '' },
]
const maxAct = Math.max(...actividad.map(a => a.v))
const barH = (v: number) => Math.max(3, Math.round((v / maxAct) * 160))

/* Métricas cobradas por cliente */
const metricas = [
  { name: 'HYD EMPRENDIMIENTOS SAS', amount: '$42.879.122', v: 42879122 },
  { name: 'DANALUCAS S.R.L', amount: '$41.122.853', v: 41122853 },
  { name: 'CASEROS MOTOR S.R.L.', amount: '$40.418.043', v: 40418043 },
  { name: 'SOLENGHI CARINA FERNANDA', amount: '$35.137.720', v: 35137720 },
  { name: 'DICEN S.A.', amount: '$31.946.368', v: 31946368 },
  { name: 'DONOSO LORENA ADRIANA', amount: '$29.952.618', v: 29952618 },
  { name: 'BACCARO JUAN GABRIEL', amount: '$29.027.546', v: 29027546 },
  { name: 'VILLARREAL LUIS EDUARDO', amount: '$28.092.071', v: 28092071 },
]
const maxMet = Math.max(...metricas.map(m => m.v))
const metW = (v: number) => `${Math.round((v / maxMet) * 100)}%`
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #08315a;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.imagen {
  align-content: center;
  border: 2px solid green;
  border-radius: 10px;
  padding: 60px;
  background-color: #d5f5b5;
  /*height: 220x;
    width: 220px;
  se quita el directorio /public
  background-image: url("/img/ Logo_Empresa.bmp");
  */
  background-image: url("/logos/Siavcom.png");
  /* opacity: 0.5;*/

  background-position: center;
  background-size: 100% 100%;
  height: 100px;
  width: 160px;
}

/* =================== Dashboard =================== */
.dashboard {
  width: 100%;
  min-height: 100vh;
  background: #f4f6f8;
  padding: 28px 32px 60px;
  text-align: left;
  color: #1f2937;
  font-family: 'Segoe UI', Arial, sans-serif;
  box-sizing: border-box;
}

.dashboard * {
  box-sizing: border-box;
}

.welcome {
  font-size: 15px;
  color: #374151;
  margin-bottom: 14px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 14px;
}

.card {
  background: #fff;
  border: 1px solid #e8eaee;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, .05);
}

/* ---- Filtros ---- */
.filtros-card {
  padding: 20px 22px;
}

.filtros-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 20px;
}

.field label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .4px;
  text-transform: uppercase;
  color: #8a94a6;
  margin-bottom: 6px;
}

.input {
  width: 100%;
  height: 40px;
  border: 1px solid #e3e6eb;
  border-radius: 9px;
  padding: 0 12px;
  font-size: 14px;
  color: #374151;
  background: #fff;
  outline: none;
}

.input:focus {
  border-color: #2da8e0;
  box-shadow: 0 0 0 3px rgba(45, 168, 224, .15);
}

.input-wrap {
  position: relative;
}

.input-ico {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9aa3b2;
}

.input.has-ico {
  padding-left: 36px;
  border-radius: 20px;
}

/* ---- Multi-select ---- */
.ms {
  position: relative;
}

.ms-toggle {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #e3e6eb;
  border-radius: 9px;
  background: #fff;
  padding: 0 12px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}

.ms-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ms-list {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e3e6eb;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(16, 24, 40, .12);
  max-height: 220px;
  overflow: auto;
  padding: 6px;
}

.ms-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 7px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}

.ms-opt:hover {
  background: #f2f7fb;
}

.ms-opt input {
  accent-color: #2da8e0;
}

.filtros-actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}

.btn {
  height: 38px;
  padding: 0 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn-primary {
  background: #1c9be0;
  color: #fff;
}

.btn-primary:hover {
  background: #1789c6;
}

.btn-outline {
  background: #fff;
  border-color: #9ec9e2;
  color: #1c9be0;
}

.btn-outline:hover {
  background: #f0f8fd;
}

/* ---- Stats ---- */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.stat {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 20px 24px;
}

.stat-num {
  font-size: 34px;
  font-weight: 600;
  color: #111827;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
}

/* ---- KPI cards ---- */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  margin-top: 22px;
}

.kpi {
  padding: 18px 20px;
}

.kpi:nth-child(-n+4) {
  grid-column: span 3;
}

.kpi:nth-child(n+5) {
  grid-column: span 4;
}

.kpi-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.kpi-ico {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.kpi-title {
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
}

.kpi-value {
  font-size: 30px;
  font-weight: 700;
  color: #111827;
  line-height: 1.1;
}

.kpi-sub {
  font-size: 12px;
  color: #9aa3b2;
  margin-top: 6px;
}

/* ---- Gráficas ---- */
.charts-row {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 16px;
  margin-top: 22px;
}

.chart-card,
.metrics-card {
  padding: 20px 22px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.card-sub {
  font-size: 12px;
  color: #9aa3b2;
  margin: 2px 0 18px;
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 185px;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 4px;
}

.bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 30px;
  height: 100%;
}

.bar-val {
  font-size: 9px;
  color: #6b7280;
  margin-bottom: 3px;
}

.bar {
  width: 22px;
  background: #3b82f6;
  border-radius: 3px 3px 0 0;
}

.dates {
  display: flex;
  gap: 5px;
  padding: 0 4px;
  margin-top: 8px;
}

.bar-date {
  width: 30px;
  font-size: 9px;
  color: #9aa3b2;
  text-align: center;
  transform: rotate(-45deg);
  transform-origin: center;
  white-space: nowrap;
}

.fake-scroll {
  height: 6px;
  background: #eceff3;
  border-radius: 3px;
  margin-top: 26px;
  position: relative;
}

.fake-thumb {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 34%;
  background: #6b7280;
  border-radius: 3px;
}

/* ---- Métricas por cliente ---- */
.metric {
  margin-bottom: 14px;
}

.metric-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.metric-name {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .3px;
  color: #4b5563;
}

.metric-amount {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
}

.metric-track {
  height: 8px;
  background: #eef2f6;
  border-radius: 4px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background: #1da9e9;
  border-radius: 4px;
}

/* ---- Saldos ---- */
.saldos-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 22px;
}

.saldo {
  padding: 20px 24px;
}

.saldo-label {
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 10px;
}

.saldo-label.danger {
  color: #e11d48;
}

.saldo-value {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
}

@media (max-width: 1000px) {
  .filtros-grid {
    grid-template-columns: 1fr 1fr;
  }

  .kpi:nth-child(-n+4),
  .kpi:nth-child(n+5) {
    grid-column: span 6;
  }

  .charts-row,
  .stats-row,
  .saldos-row {
    grid-template-columns: 1fr;
  }

  .dashboard {
    padding: 20px 14px 48px;
  }
}
</style>
