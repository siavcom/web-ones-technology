<template>
  <div v-if="visible" class="divi" :style="props.prop.style">
    <vue-good-table
      :columns="table.columns" 
      :rows="table.rows" 
      v-on:row-click="onRowClick"
      v-on:cell-click="onCellClick"
      :pagination-options="{
          enabled: true,
          perPage: 40,
      }"
      />
  </div>
</template>

<script setup lang="ts">


/*
      :pagination-options :
          enabled: true,
          mode: 'records',
          perPage: 5,
          position: 'top',
          perPageDropdown: [3, 7, 9],
          dropdownAllowAll: false,
          setCurrentPage: 2,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
          infoFn: (params) => `my own page ${params.firstRecordOnPage}`,}"

   Eventos :
      @on-row-dblclick="onRowDoubleClick"
      @on-cell-click="onCellClick"
      @on-row-mouseenter="onRowMouseover"
      @on-search="onSearch"
*/
//////////////////////////////////////
// https://xaksis.github.io/vue-good-table/guide/
//////////////////////////////////////


////////////////// Fix Vue 3 vue-good-table /////////////////
// npm i --save-dev @types/vue-good-table-next
// Without claiming to understand much of all this, I did get it working by
// in a folder of node_modules 
// Create file
// node_modules/vue-good-table-next/src/index.d.ts
// only this line 
//  declare module 'vue-good-table';

// other fix
// creating a folder src/types/vue-good-table
// creating a file src/types/vue-good-table/index.d.ts
// containing
// declare module 'vue-good-table';

// Make sure typescript is set to include that file. My tsconfig.json says

// "include": [
//    "src/**/*.ts"]
////////////////////////////////////

// Necesitos el import ya que nux no lo importa automaticamente
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';

// import the styles

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  prop: {
    RowSource: string;
    Disabled: boolean;
    Visible: boolean;
    Label: string;
  };

  style: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "500px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  Recno: 0;
  Component: null;

}>()

// Valores componente padre
const Component = ref(props.Component)
const This = Component.value
console.log('browse This',This)



const table = reactive({
  columns: [
    /*    {
          label: "ID",
          field: "id",
          width: "3%", px 
          type :number - right aligned
                decimal - right aligned, 2 decimal places
                percentage - expects a decimal like 0.03 and formats it as 3.00%
                boolean - right aligned
                date - expects a string representation of date eg '20170530'. You should also specify 
          sortable: true,
          firstSortType: 'desc' 'asc'
          formatFn: formatFn -Funcion de formato
              // in methods //
              formatFn: function(value) {
                  return '$' + value;
              }

          hidden: false
          thClass: 'custom-th-class', // class table header
          tdClass: 'custom-td-class', // class cell header
          tooltip: 'A simple tooltip',
          filterOptions: {
	            styleClass: 'class1', // class to be added to the parent th element
  	          enabled: true, // enable filter for this column
              placeholder: 'Filter This Thing', // placeholder for filter input
              filterValue: 'Jane', // initial populated value for this filter
              filterDropdownItems: [], // dropdown (with selected values) instead of text input
              filterFn: this.columnFilterFn, //custom filter function that
              trigger: 'enter', //only trigger on enter not on keyup 
              },

    }, */
  ],
  rows: []
  
})

const visible=ref()
visible.value=false
////////////////////////////////////////
// RowSource
///////////////////////////////////////

watch(
  () => props.prop.RowSource,
  (new_val, old_val) => {
    if (new_val == '') {
      visible.value=false
      table.columns = []
      table.rows = []
    } else doSearch() // Get data first

  },
  { deep: false }
);


const doSearch = async () => {
  table.rows = []
  table.columns = []
  
  // Start use axios to get data from Server
  //let url = 'https://www.example.com/api/some_endpoint?offset=' + offset + '&limit=' + limit + '&order=' + order + '&sort=' + sort;

  const data = await This.Form.db.localAlaSql('select * from ' + props.prop.RowSource)
  const rows = []
  if (data.length > 0) {
    visible.value=true
    // generamos la columna recno 
    const recno = {
      label: 'Recno',
      field: 'recno',
      sortable: true,
      type : 'number',
      with : '20px'
    }
    table.columns.push(recno)
    for (let i = 0; i < data.length; i++) {
      const row = {}
      for (const field in data[i]) {
        if (i == 0) { // Genera header
           let type=typeof data[i][field] // asignamos su tipo
            /*  number - right aligned
                decimal - right aligned, 2 decimal places
                percentage - expects a decimal like 0.03 and formats it as 3.00%
                boolean - right aligned
                date - expects a string representation of date eg '20170530'. You should also specify dateInputFormat and dateOutputFormat
            */
          const column = {
            label: field,
            field: field,
            sortable: true,
            type :type,
            filterOptions: {
	             //styleClass: 'class1', // class to be added to the parent th element
  	          enabled: true, // enable filter for this column
              //placeholder: 'Filter This Thing', // placeholder for filter input
              //filterValue: 'Jane', // initial populated value for this filter
              //filterDropdownItems: [], // dropdown (with selected values) instead of text input
              //filterFn: this.columnFilterFn, //custom filter function that
              //trigger: 'enter', //only trigger on enter not on keyup 
            },


          }
          if (field != 'recno')
            table.columns.push(column)
        }
        row[field] = data[i][field]

      }
      rows.push(row) // inserta celda
    }

    table.rows = rows
 //   table.totalRecordCount = data.length //response.count;
 //   table.sortable.order = order;
//    table.sortable.sort = sort;
  }
  // Point: your response is like it on this example.
  //   {
  //   rows: [{
  //     id: 1,
  //     name: 'jack',
  //     email: 'example@example.com'
  //   },{
  //     id: 2,
  //     name: 'rose',
  //     email: 'example@example.com'
  //   }],
  //   count: 2,
  //   ...something
  // }

  // refresh table rows
  // table.rows =data.length //response.rows;
  console.log('browse final length', data.length)
  console.log('browse final columns',table.columns)
  console.log('browse final rows',table.rows)
  // End use axios to get data from Server
}


/*
      @on-row-dblclick="onRowDoubleClick"
      @on-cell-click="onCellClick"
      @on-row-mouseenter="onRowMouseover"
      @on-row-mouseleave="onRowMouseleave"
      @on-search="onSearch"
      @on-page-change="onPageChange"
      @on-per-page-change="onPageChange"
      @on-sort-change="onSortChange"
      @on-column-filter="onColumnFilter"
      @on-select-all="onSelectAll"
      @on-selected-rows-change="selectionChanged"

*/
 

  const onRowClick = (param) => {
    console.log('table onRowClick ', param)
  };

  const onCellClick = (param) => {
    console.log('table  Clik in row ', param)
  };


  const onRowMouseover = (param) => {
    console.log('table  onRowMouseover',param)
  }
  const onSearch = (param) => {
    console.log('table onSearch',param)
  }

</script>