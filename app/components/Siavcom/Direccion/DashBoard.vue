<template>
  <template v-if="cargando">
    <div style="margin: 100px auto;">
      <img src="/Iconos/svg/Loading.gif" alt="Cargando..." style="display: block; margin: 0 auto;">
      <div class="loading" style="text-align: center;">Cargando...</div>
    </div>

  </template>
  <div v-else class="dashboard" :id="Id">
    <div class="welcome">
      Bienvenido(a), <b>{{ user }}</b>
    </div>

    <!-- ====== 1) Tablero de control (3ra imagen) ====== -->
    <h2 class="section-title">Tablero de control</h2>

    <div class="card filtros-card">
      <div class="filtros-grid">
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
              <label v-for="v in vendedores" :key="v.ven_ven" class="ms-opt">
                <input type="checkbox" :checked="vendedoresSel.includes(v.ven_ven)" @change="toggleVend(v.ven_ven)" />
                <span>{{ v.nom_usu }}</span>
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
        <div class="chart-scroll" tabindex="0" role="region" aria-label="Actividad por fecha">
          <div class="bars">
            <div v-for="(b, i) in actividad" :key="i" class="bar-col">
              <div class="bar-plot">
                <span class="bar-val">{{ b.v }}</span>
                <div class="bar" :style="{ height: barH(b.v) + 'px' }"></div>
              </div>
              <span class="bar-date">{{ b.d }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card metrics-card">
        <div class="card-title">Métricas cobradas por cliente</div>
        <div class="card-sub">Totales</div>
        <div v-for="m in metricas" :key="m.name" class="metric">
          <div class="metric-row">
            <span class="metric-name">{{ m.name }}</span>
            <span class="metric-amount">{{ m.amount }} | {{ m.percentage }}% | {{ m.accumulated }}%</span>
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
        <div class="saldo-value">$ {{ saldos.saldo_vencido }}</div>
      </div>
      <div class="card saldo">
        <div class="saldo-label">Saldo total</div>
        <div class="saldo-value">$ {{ saldos.saldo_total }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup vapor>

import { storeToRefs } from 'pinia'

//import {monthLastDay} from '@/composables/Functions'

const session = Session()
const { id_con, url, dialect, nom_emp, user, fpo_pge, pass } = storeToRefs(session)


const emit = defineEmits(["updateIsOpen"])
const props = defineProps<{
  ThisForm: {};
}>();



// Original
//const ThisForm = reactive(new props.ThisForm) // no quitar el new

const Component = toRef(() => props.ThisForm)
const ThisForm = Component.value

const Id = ThisForm.prop.Name + '_' + Math.floor(Math.random() * 1000).toString()
ThisForm.Id = Id

useSeoMeta({
  title: ThisForm.prop.Name,
  ogTitle: 'Dessing and programing with web-ones-technology',
})

ThisForm.user = user.value

const empresa = nom_emp.value// Public.value.nem_pge
const fecha = fpo_pge.value.split('-') //Public.value.fpo_pge  EL SPLIT TE GENERA UN ARREGLO DONDE CADA '-' ES EL SEPARADOR

//const company = 'ShelPrueba'
console.log('Dashboat empresad', empresa, fecha)
const flag = empresa == 'DEMO-SIAVCOM'


const fechaDesde = flag ? ref('2023-01-01') : ref(`${fecha[0]}-${fecha[1]}-01`)
const fechaHasta = flag ? ref('2023-01-31') : ref(`${fecha[0]}-${fecha[1]}-${monthLastDay(fecha[0], fecha[1])}`)

//const data = await SQLExec(`exec p_pedidos_dia '[1,12,33]','${fechaDesde}','${fechaHasta}'`)

//ThisForm.cargaDatos(fechaDesde, fechaHasta)

/* ============================================================
   Dashboard - datos estáticos (maqueta)
   ============================================================ */

const bbdd = dialect.value
const cargando = ref(false);

/* Multi-select de vendedores */
type Vendedor = { ven_ven: number; nom_usu: string }

const vendedores = ref([])
const vendedoresSel = ref([])
const vendOpen = ref(false)
const vendRef = ref(null)

const saldos = ref({ saldo_vencido: 0, saldo_total: 0 })

const getVendedores = async () => {
  const data = await SQLExec(
    'SELECT ven_ven, nom_usu FROM vi_cap_comeusu WHERE ven_ven > 0 and ven_ven is not null',
    'dashboard_vendedores',
  )

  if (!Array.isArray(data)) {
    console.error('No se pudieron cargar los vendedores del dashboard')
    return
  }

  vendedores.value = data.map((row: Vendedor) => ({
    ven_ven: row.ven_ven,
    nom_usu: row.nom_usu.trim(),
  }))
}


getVendedores()

const vendLabel = computed(() =>
  vendedoresSel.value.length
    ? vendedoresSel.value.map(id => vendedores.value.find(v => v.ven_ven === id)?.nom_usu).join(', ')
    : 'Todos'
)

const toggleVend = (v: number) => {
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
  ejecutarQuery(Object.values(vendedoresSel.value), fechaDesde.value, fechaHasta.value)
}

const limpiarFiltros = () => {
  vendedoresSel.value = []
  fechaDesde.value = flag ? '2023-01-01' : `${fecha[0]}-${fecha[1]}-01`
  fechaHasta.value = flag ? '2023-01-31' : `${fecha[0]}-${fecha[1]}-28`
  ejecutarQuery([], fechaDesde.value, fechaHasta.value)
}



/* Stats de clientes */
const stats = ref([
  { value: '0', label: 'Clientes' },
  { value: '0', label: 'Clientes activos' },
  { value: '0', label: 'Clientes inactivos' },
])

/* Tarjetas KPI (iconos SVG inline) */
const ico = (p: string) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`

const kpis = ref([
  {
    title: 'Pedidos tomados', value: '0', sub: '', bg: '#e7f6f0', fg: '#1c9b6c',
    icon: ico('<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  },
  {
    title: 'Productos totales', value: '0', sub: '', bg: '#f4f8e6', fg: '#8aa624',
    icon: ico('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
  },
  {
    title: 'Productos surtidos', value: '0', sub: '', bg: '#efedfb', fg: '#7b6fd0',
    icon: ico('<rect x="2" y="6" width="13" height="12" rx="2"/><path d="M22 8l-7 4 7 4V8z"/>'),
  },
  {
    title: 'Productos por surtir', value: '0', sub: '', bg: '#e8f1fb', fg: '#3d74b8',
    icon: ico('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'),
  },
  {
    title: 'Prom. productos por pedido', value: '0', sub: '', bg: '#faf3e3', fg: '#b78a2e',
    icon: ico('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'),
  },
  {
    title: 'Venta promedio', value: '$0', sub: '', bg: '#e8f1fb', fg: '#3d74b8',
    icon: ico('<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>'),
  },
  {
    title: 'Monto total de pedidos', value: '$0', sub: '', bg: '#f4f6e4', fg: '#8f9a2e',
    icon: ico('<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>'),
  },
]
)
/* Gráfica de barras: Actividad por fecha */
const actividad = ref<{ v: number; d: string }[]>([])
const maxAct = computed(() => actividad.value.reduce((max, item) => Math.max(max, item.v), 0))
const barH = (v: number) => maxAct.value > 0 && v > 0
  ? Math.max(3, Math.round((v / maxAct.value) * 160))
  : 0

/* Métricas cobradas por cliente */
const metricas = ref([
  // { name: 'HYD EMPRENDIMIENTOS SAS', amount: '$0', v: 0, percentage: 0 },
])

const maxMet = computed(() => Math.max(0, ...metricas.value.map(m => m.v)))
const metW = (v: number) => maxMet.value > 0 ? `${(v / maxMet.value) * 100}%` : '0%'

const validarStoreProcedure = async () => {
  const procedures = ['p_inf_pedidos', 'p_pedidos_dia', 'p_cobranza_cte', 'p_inf_cobranza']


  let data
  if (bbdd == 'mssql') {
    for (const procedure of procedures) {
      data = await SQLExec(`IF OBJECT_ID('dbo.${procedure}', 'P') IS NOT NULL SELECT 1 as existe `)
      if (!data[0].existe)
        return false
    }
  } else {
    for (const procedure of procedures) {
      data = await SQLExec(`SELECT EXISTS ( SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace   WHERE n.nspname = 'public' \
       AND p.proname = '${procedure}') as existe`)
      if (!data[0].existe)
        return false
    }
  }

  return true
}

const ejecutarQuery = async (vendedores, fechaDesde, fechaHasta) => {
  cargando.value = true;

  if (!await validarStoreProcedure()) {
    cargando.value = false
    return false
  }

  let data1
  let pedidosPorDia
  let cobranzaPorCliente
  let saldosData

  if (bbdd == 'mssql') {
    data1 = await SQLExec(`exec p_inf_pedidos '${JSON.stringify(vendedores)}','${fechaDesde}','${fechaHasta}'`)
    pedidosPorDia = await SQLExec(`exec p_pedidos_dia '${JSON.stringify(vendedores)}','${fechaDesde}','${fechaHasta}'`)
    cobranzaPorCliente = await SQLExec(`exec p_cobranza_cte '${JSON.stringify(vendedores)}','${fechaDesde}','${fechaHasta}'`)
    saldosData = await SQLExec(`exec p_inf_cobranza '${JSON.stringify(vendedores)}','${fechaDesde}','${fechaHasta}'`)
  } else {
    data1 = await SQLExec(`select p_inf_pedidos('${JSON.stringify(vendedores)}','${fechaDesde}','${fechaHasta}')`)
    pedidosPorDia = await SQLExec(`select p_pedidos_dia('${JSON.stringify(vendedores)}','${fechaDesde}','${fechaHasta}')`)
    cobranzaPorCliente = await SQLExec(`select p_cobranza_cte('${JSON.stringify(vendedores)}','${fechaDesde}','${fechaHasta}')`)
    saldosData = await SQLExec(`select p_inf_cobranza('${JSON.stringify(vendedores)}','${fechaDesde}','${fechaHasta}')`)
  }

  kpis.value.forEach((element: any) => {
    switch (element.title) {
      case 'Pedidos tomados':
        element.value = `${formatoNumero(data1[0].pedidos_tomados || 0)}`
        break
      case 'Productos totales':
        element.value = `${formatoNumero(data1[0].producto_total || 0)}`
        break
      case 'Productos surtidos':
        element.value = `${formatoNumero(data1[0].producto_surtido || 0)}`
        break
      case 'Productos por surtir':
        element.value = `${formatoNumero(data1[0].producto_x_surtir || 0)}`
        break
      case 'Prom. productos por pedido':
        element.value = `${formatoNumero(data1[0].promedio_pro_x_pedido || 0)}`
        break
      case 'Venta promedio':
        element.value = `$ ${formatoNumero(data1[0].promedio_ticket || 0)}`
        break
      case 'Monto total de pedidos':
        element.value = `$ ${formatoNumero(data1[0].monto_total || 0)}`
        break
    }
  });

  stats.value.forEach(element => {
    switch (element.label) {
      case 'Clientes':
        element.value = `${formatoNumero(data1[0].total_clientes || 0)}`
        break
      case 'Clientes activos':
        element.value = `${formatoNumero(data1[0].clientes_activos || 0)}`
        break
      case 'Clientes inactivos':
        element.value = `${formatoNumero(data1[0].clietes_inactivos || 0)}`
        break
    }
  })

  if (Array.isArray(pedidosPorDia)) {
    actividad.value = pedidosPorDia.map(item => ({
      v: item.tot_pedidos ?? 0,
      d: formatoFecha(item.fecha)
    }))
  } else {
    console.error('No se pudieron cargar los pedidos por día')
  }

  let accumulated = 0

  metricas.value = cobranzaPorCliente.map(item => {

    accumulated = accumulated + (item.por_s_tot || 0)

    return {
      name: item.nom_nom || '',
      amount: `$ ${formatoNumero(item.imp_tot || 0)}`,
      v: Math.trunc(item.imp_tot || 0),
      percentage: item.por_s_tot,
      accumulated: Math.trunc(accumulated)
    }
  })

  if (Array.isArray(saldosData) && saldosData.length > 0) {
    saldos.value.saldo_vencido = formatoNumero(saldosData[0].saldo_vencido || 0)
    saldos.value.saldo_total = formatoNumero(saldosData[0].saldo_total || 0)
  }

  cargando.value = false;
}


const formatoNumero = (cantidad) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cantidad); // "1,250"
}

const formatoFecha = (fechaStr) => {
  const fecha = new Date(fechaStr)
  const dia = fecha.getUTCDate()
  const mes = fecha.getUTCMonth() + 1
  return `${dia}/${mes}`
}


ejecutarQuery(Object.values(vendedoresSel.value), fechaDesde.value, fechaHasta.value)

</script>

<style scoped>
.card.metrics-card {
  height: 500px;
  overflow-y: auto;
}

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
  min-width: 0;
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

.chart-scroll {
  overflow-x: auto;
  padding-bottom: 8px;
}

.bars {
  display: flex;
  gap: 5px;
  width: max-content;
  min-width: 100%;
  padding: 0 4px;
  box-sizing: border-box;
}

.bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 46px;
}

.bar-plot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 185px;
  border-bottom: 1px solid #e5e7eb;
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

.bar-date {
  font-size: 9px;
  color: #9aa3b2;
  text-align: center;
  margin-top: 8px;
  white-space: nowrap;
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
  width: 200px;
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
