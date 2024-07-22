<template>
  <div v-if="table.isLoading" class="splash-screen">
    <div class="splash-screen">
      <div class="spinner-wrapper">
        <div class="spinner">
          <p>..Loading Data..</p>
        </div>
      </div>
    </div>

  </div>

  <div class="diviBrowse" v-if="prop.Visible && This.prop.RowSource > ' '" :style="This.style">
    <div class="wraper" style="width:100%;height:100%">
      <table-lite :is-loading="table.isLoading" :columns="table.columns" :rows="table.rows"
        :total="table.totalRecordCount" :sortable="table.sortable" :title="This.Form.prop.textLabel"
        :has-checkbox="table.checkBox" :has-group-toggle="table.groupToggle" :grouping-key="table.groupingKey"
        :messages="table.messages" :page-size="10"
        :page-options="[{ value: 10, text: 10 }, { value: 25, text: 25 }, { value: 50, text: 50 }]"
        @do-search="doSearch" @return-checked-rows="returnChequedRows" :column-filter="filter"
        @is-finished="table.isLoading = false">
      </table-lite>
    </div>
  </div>
</template>

<script setup lang="ts">
/*


   :page-size="15"
        :page-options="pageOptions"
      
        :columns="table.columns" 
        :rows="table.rows" 
        :total="table.totalRecordCount"
        :sortable="table.sortable" 
        :title="This.Form.prop.textLabel" 
        :has-checkbox="table.checkBox"
        :has-group-toggle="table.groupToggle" 
        :grouping-key="table.groupingKey" 
        :messages="table.messages"
       
        @do-search="doSearch" 
        @is-finished="isFinished"
        @return-checked-rows="returnChequedRows" :column-filter="filter">





  :page-size="table.pageSize" 
 :grouping-display="table.groupingDisplay" 
:is-loading="table.isLoading"
 :max-height="table.maxheight"
    <div style="text-align: left">
      <nuxt-img src="/Iconos/svg/bx-search.svg" class="bx bx-search">

      <label>SearchBy:</label>
      <input v-model="searchTerm" />
    </div>
    <input type="text" :placeholder="searchPlaceholder" @input="$emit('search-input-emit', $event.target.value)">
    <span class="tooltip">{{ searchTooltip }}</span>

      :is-loading="table.isLoading" 
      :messages="table.messages"


*/


//////////////////////////////////////
// https://vue3-lite-table.vercel.app/
//////////////////////////////////////

//import tableLite from "vue3-table-lite/ts"; // TypeScript
import TableLite from "@/components/TableLiteTs.vue"  // TypeScript


///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////

const pageOptions = [
  {
    value: 15,
    text: 15
  },
  {
    value: 30,
    text: 30
  }
]

const props = defineProps<{
  Value: any;
  Registro: number;  // Se pone para el manejo de grid

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

  //Component: null;
}>()

// Valores componente padre
const Component = ref(props.prop.This)
const This = Component.value
This.style.maxWidth = "1200px"


const table = This.table

//const isLoading = ref(false)
const isStatic = ref(false)

/*
const table = reactive({
  pageSize:10,  //Default display the number of items on one page. In most cases no set required.
  //maxheight:'15px',  // Table Max height Default "auto"
  checkBox:true,
  groupToggle:true,
 
  isLoading: false,
  groupingKey:'',
  columns: [
  
  ],
  rows: [],
  oriRows:[],
  totalRecordCount: 0,



  sortable: {
    order: "recno",
    sort: "asc",
  },
  messages: {
        pagingInfo: "Showing {0}-{1} of {2}",
        pageSizeChangeLabel: "Row count:",
        gotoPageLabel: "Go to page:",
        noDataAvailable: "No data",
      },
      groupingDisplay: function (key) {
        return (
          '<span style="background: darkgray; padding: 5px; border-radius: 5px;">' +
          key +
          "</span>"
        );
      },


})

*/
////////////////////////////////////////
// RowSource
///////////////////////////////////////


watch(
  () => table.checkBox,
  (new_val, old_val) => {

    console.log('browseLite watch chequed===>', new_val)
  },
  { deep: false }
);




///////////////////////////

watch(
  () => props.prop.RowSource,
  async (new_val, old_val) => {
    // console.log('browseLite watch RowSource===>', new_val, props.prop.RowSource)
    console.log('browseLite table', table.columns, 'This.table.columns', This.table.columns)

    //table.columns = []
    table.rows = []
    table.oriRows = []
    table.totalRecordCount = 0
    table.filters = {}


    if (new_val == '') {
      return

    } else {
      // obtiene el primer registro para obtener logitudes y descripcion de variables
      const result = await This.Form.db.localAlaSql('select * from ' + props.prop.RowSource + ' limit 1')
      if (result.length > 0 && table.columns.length == 0) {


        const Id = {
          label: 'Id',
          field: 'recno',
          isKey: true,
          width: '40px',
          sortable: true,
        }
        table.columns.push(Id)

        // genera el header 


        for (const field in result[0]) {

          let width = '16'
          if (typeof result[0][field] == 'string') {
            const long = result[0][field].length * 13
            // console.log('browseLite field long', long.toString() + 'px')
            width = long.toString() + 'px'
          }
          const column = {
            label: field,
            field: field,
            width: width,
            sortable: true,
          }

          table.columns.push(column)

        }

        // await doSearch(0, 10, 'id', 'asc') // busca los primeros datos
      }
      table.columns[0].isKey = true
      const field = table.columns[0].field
      await doSearch(0, 10, field, 'asc') // busca los primeros datos


    }
  },
  { deep: false }
);

const doSearch = async (offset: number, limit: number, order: string, sort: string) => {
  // console.log('browseLite llenara los datos')
  table.isLoading = true
  table.rows = []  // limpiamos rows
  table.oriRows = []
  table.totalRecordCount = 0


  // Start use axios to get data from Server
  //let url = 'https://www.example.com/api/some_endpoint?offset=' + offset + '&limit=' + limit + '&order=' + order + '&sort=' + sort;
  const sql_order = (order == '' || order.trim() == 'id') ? ' ' : ' order by ' + order + ' ' + sort
  //console.log('browseLite Order =',sql_order,await This.Form.db.localAlaSql('select * from ' + props.prop.RowSource )) 

  const datos = await This.Form.db.localAlaSql('select * from ' + props.prop.RowSource + sql_order)

  if (datos.length > 0) {
    table.totalRecordCount = datos.length

    for (let i = 0; i < datos.length; i++) {
      const row = { id: i + 1 }
      for (const field in datos[i]) { // Recorre columnas
        row[field] = datos[i][field]
      }
      table.oriRows.push(row) // inserta columnas del renglon 

    }

    // table.oriRows = rows  // Rows originales para cuando se hacen lo filtros
    let sw_filters = false
    for (const elements in table.filters)
      sw_filters = true


    //  console.log('doSearch  table.filters=',table.filters,'sw_filers=',sw_filters)
    const rows = sw_filters ?
      await multiFilter(table.oriRows, table.filters) :
      // else 
      table.oriRows

    // obtenemos los renglones a mostrar  

    table.isReSearch = offset == undefined ? true : false
    // limit es la cantidad de renglones a leer
    //if (offset >= 10 || limit >= 20) {
    //      limit = 20;
    //}
    if (offset + limit > table.totalRecordCount) {
      limit = table.totalRecordCount - offset
    }

    console.log('browseLite doSearch offset=', offset, 'limit=', limit, 'order=', order, 'oriRows=', table.oriRows)

    for (let i = offset; i < offset + limit; i++) {

      table.rows.push(rows[i])
    }


    //This.rows = ref(table.rows)
    table.totalRecordCount = datos.length
  }

  table.sortable.order = order;
  table.sortable.sort = sort;
}


/*

row-clicked

    Description: You can get row data from this function after row clicked.
    Type: (rowData) => void




*/

/**
     * Trigger after initail component
    
const initTable = ({ el: tableComponent }) => {
  let headerTr = tableComponent.getElementsByClassName("vtl-thead-tr");
  if (!headerTr[0]) {
    return;
  }
  let cloneTr = headerTr[0].cloneNode(true); // Clone first <tr>
  let childTh = cloneTr.getElementsByClassName("vtl-thead-th");
  for (let i = 0; i < childTh.length; i++) {
    // Clear <th>'s HTML
    childTh[i].innerHTML = "";
  }
  // Create a input element and append to first <th>
  //      createApp(
 defineComponent({
    setup() {
      return () =>
        h("input", {
          value: searchTerm.value,
          onInput: (e) => {
            searchTerm.value = e.target.value;
          },
        });
    },
  })
  //      ).mount(childTh[1]);


  //      createApp(
 defineComponent({
    setup() {
      return () =>
        h("input", {
          value: searchTerm2.value,
          onInput: (e) => {
            searchTerm2.value = e.target.value;
          },
        });
    },
  })
  //    ).mount(childTh[2]);
  // append cloned element to the header after first <tr>
  headerTr[0].after(cloneTr)

  }

*/

/*

const tableLoadingFinish = (elements) => {

  isLoading.value = false;
  console.log('tableLoadingFinish ', elements)


};
*/

const returnChequedRows = (rowData: []) => {
  console.log('returnChequedRows ', rowData, 'This.prop.oneClick', This.prop.oneClick)
  if (This.prop.oneClick && rowData.length > 0) {
    This.prop.Value = rowData[0]
    This.close()

  }
};

const rowClicked = (rowData: []) => {
  console.log('Click in row ', rowData)
};


const rowToggled = (rows, isCollapsed) => {
  console.log('RowToggled')

}


////////// Killo Soft //////////
//let PropsRows = ref(props.rows)

//const RowsValue = reactive(props.rows)
/*
function multiFilter(array, filters) {
  return array.filter(o =>
    Object.keys(filters).every(k =>
      [].concat(filters[k]).some(v => o[k].includes(v))));
}
*/


const filter = async (filters?: {}, limit: number) => {

  const filtro = {}
  if (!filters)
    filters = table.filters
  else
    table.filters = filters


  let sw_filters = false
  for (const elements in filters)
    sw_filters = true

  //console.log('TableLite en browseLite filters=', filters)  //, filterColumns[name])

  console.log('0) filters ', 'Tabla origen', table.oriRows, 'Columnas', table.columns)

  console.log('1) filters', filters, 'Tabla origen', table.oriRows)

  for (const fil in filters) {
    console.log('1.1) filters filtro=', fil)

    for (let i = 0; i < table.columns.length; i++) {
      console.log('1.2) filters filtro=', table.columns[i].label)

      if (fil === table.columns[i].label) {

        if (!filtro[table.columns[i].field])
          filtro[table.columns[i].field] = []

        filtro[table.columns[i].field].push(filters[fil])

      }
    }
  }

  console.log('2)Filters filtro=', filtro, 'Filters=', filters)
  table.rows = []

  //  const NewRows = sw_filters ? await multiFilter(table.oriRows, filters) :

  const NewRows = sw_filters ? await multiFilter(table.oriRows, filtro) :
    table.oriRows


  console.log('browseLite doSearch offset=', 'limit=', limit, NewRows)
  limit = (limit > NewRows.length) ? NewRows.length : limit
  table.totalRecordCount = NewRows.length

  for (let i = 0; i < limit; i++) {

    table.rows.push(NewRows[i])
  }

  // nextTick(() => {
  //   PropsRows.value = Rows.value;
  //   emit("Rows", PropsRows);
  //    console.log('TableLite en browseLite filter NewRows==>>', NewRows)


  //     table.rows=NewRows  // asignamos Nuevos renglones
  //    This.rows=table.rows // exportamos rows al componente
  // });


};

const isFinished = () => {
  table.isLoading = false

  console.log('isFinished', table.isLoading)


  /*
  Array.prototype.forEach.call(elements, function (element) {
    if (element.classList.contains("name-btn")) {
      element.addEventListener("click", function () {
        console.log(this.dataset.id + " name-btn click!!");
      });
    }
    if (element.classList.contains("quick-btn")) {
      element.addEventListener("click", function () {
        console.log(this.dataset.id + " quick-btn click!!");
      });
    }
  });

  */
};




////////// Killo Soft ////////// 


</script>

<style scoped>
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #fff;
  background-color: #42b983;
  border-color: #42b983;
}

::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
}

::v-deep(.vtl-paging-info) {
  color: rgb(172, 0, 0);
}

::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(172, 0, 0);
}

::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}
</style>