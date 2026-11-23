<template>
  <div class="dashboard" :id="Id">
    <div class="welcome">
      Bienvenido(a), <b>{{ user }}</b>
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

<script lang="ts" setup vapor>
/*
                  <component v-if="ThisForm[compFooter].prop.Visible" :id="Id + 'FooterComponent_' + compFooter"
                    :is="impComponent(ThisForm[compFooter].prop.BaseClass)"
                    v-model:Value="ThisForm[compFooter].prop.Value" v-model:Status="ThisForm[compFooter].prop.Status"
                    :Registro="ThisForm[compFooter].Recno" :prop="ThisForm[compFooter].prop"
                    :style="ThisForm[compFooter].style" :position="ThisForm[compFooter].position" />

*/

import { storeToRefs } from 'pinia'

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

// Datos forma por forma . En app.vue esta useHead
useSeoMeta({
  title: ThisForm.prop.Name,
  ogTitle: 'Dessing and programing with web-ones-technology',
  //  description: 'This is my amazing site, let me tell you all about it.',
  //  ogDescription: 'This is my amazing site, let me tell you all about it.',
  //ogImage: '/public/favicon.ico',
  //  twitterCard: 'summary_large_image',
})
ThisForm.user = user.value
ThisForm.nom_emp = nom_emp.value
ThisForm.fpo_pge = fpo_pge.value

ThisForm.cargaDatos()

</script>
