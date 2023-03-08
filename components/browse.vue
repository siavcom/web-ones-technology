<template>
<table-lite
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :messages="table.messages"
    @do-search="doSearch"
    @is-finished="table.isLoading = false"
></table-lite>
</template>

<script setup lang="ts">
import TableLite from "vue3-table-lite/ts"; // TypeScript

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  prop: {
    RowSource: string;
    Disabled: boolean;
    Visible: boolean;
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
    } else doSearch(0, 10, 'recno', 'asc') // Get data first

  },
  { deep: false }
);


const doSearch = async (offset: number, limit: number, order: string, sort: string) => {
  table.rows=[]
  table.columns=[]
  table.isLoading = true;
  // Start use axios to get data from Server
  //let url = 'https://www.example.com/api/some_endpoint?offset=' + offset + '&limit=' + limit + '&order=' + order + '&sort=' + sort;

  const data = await props.db.value.localAlaSql('select * from ' + props.prop.RowSource+' order by '+order+' '+sort)
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

*/
</script>