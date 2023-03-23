<template>
  <div v-if="prop.Visible" class="divi" :style="style">
    <div style="text-align: left">
      <img src="/Iconos/svg/bx-search.svg" class="bx bx-search">

      <!--label>SearchBy:</label-->
      <input v-model="searchTerm" />
    </div>
    <input type="text" :placeholder="searchPlaceholder" @input="$emit('search-input-emit', $event.target.value)">
    <span class="tooltip">{{ searchTooltip }}</span>





    <table-lite :is-loading="table.isLoading" :columns="table.columns" :rows="table.rows" :total="table.totalRecordCount"
      :sortable="table.sortable" :messages="table.messages" :title="props.prop.Label" :is-hide-paging="true"
      @do-search="doSearch" @is-finished="table.isLoading = false">
    </table-lite>
  </div>
</template>

<script setup lang="ts">
//////////////////////////////////////
// https://vue3-lite-table.vercel.app/
//////////////////////////////////////




import TableLite from "vue3-table-lite/ts"; // TypeScript

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
  db: null

}>()

const table = reactive({
  isLoading: false,
  columns: [
    /*    {
          label: "ID",
          field: "id",
      //    width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        }, */
  ],
  rows: [],
  totalRecordCount: 0,



  sortable: {
    order: "recno",
    sort: "asc",
  },
})

////////////////////////////////////////
// RowSource
///////////////////////////////////////

watch(
  () => props.prop.RowSource,
  (new_val, old_val) => {
    if (new_val == '') {
      table.columns = []
      table.rows = []
    } else doSearch(0, 10, '', '') // Get data first

  },
  { deep: false }
);


const doSearch = async (offset: number, limit: number, order: string, sort: string) => {
  table.rows = []
  table.columns = []
  table.isLoading = true;
  // Start use axios to get data from Server
  //let url = 'https://www.example.com/api/some_endpoint?offset=' + offset + '&limit=' + limit + '&order=' + order + '&sort=' + sort;
  const sql_order = order == '' ? '' : ' order by ' + order + ' ' + sort

  const data = await props.db.value.localAlaSql('select * from ' + props.prop.RowSource + sql_order)
  const rows = []
  if (data.length > 0) {
    const recno = {
      label: 'Recno',
      field: 'recno',
      isKey: true,
      //width: "10%",
      sortable: true,
    }
    table.columns.push(recno)
    for (let i = 0; i < data.length; i++) {
      const row = { id: i + 1 }
      for (const field in data[i]) {
        if (i == 0) { // Genera header
          const column = {
            label: field,
            field: field,
            //width: "10%",
            sortable: true,
          }
          if (field != 'recno')
            table.columns.push(column)
        }
        row[field] = data[i][field]

      }
      rows.push(row) // inserta celda
    }

    table.rows = rows
    table.totalRecordCount = data.length //response.count;
    table.sortable.order = order;
    table.sortable.sort = sort;
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
  console.log('browse final', data.length, order,)

  // End use axios to get data from Server
}


/*
const tableLoadingFinish = (elements) => {
  table.isLoading = false;
};




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



  const tableLoadingFinish = (elements) => {
    
    table.isLoading = false;
    console.log('tableLoadingFinish ', elements)


  };

  const isFinished = (elements) => {
  
    
    console.log('isFinished', elements)


  };

  const returnChequedRow = (rowData: []) => {
    console.log('returnChequedRows ', rowData)
  };

  const rowClicked = (rowData: []) => {
    console.log('Clik in row ', rowData)
  };


  const rowToggled = (rows, isCollapsed) = {
    console.log('RowToggled')

  }

</script>