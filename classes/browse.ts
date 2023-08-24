//////////////////////////////////////////////

// BaseClass : browseLite
// Class : browse
// Description : Contenedor de resultado de obtener datos
// Author : El Fer Blocks
// Creation : 2023-08-03
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class browse extends COMPONENT {
    //table = {}  // Datos de la tabla
    rows=null // renglones resultantes por referencia
    table = {
        isLoading:false, 
        pageSize:10,  //Default display the number of items on one page. In most cases no set required.
        //maxHeigth:'15px',  // Table Max Heigth Default "auto"
        checkBox:true,
        filters:{},
 
        columns: [
          /*    {
                label: "ID",
                field: "id",
                width: "3%",
                sortable: true,
                isKey: true,
              },
          */
        ],
        rows: [],
        oriRows:[],
        totalRecordCount: 0,
      
        sortable: {
          order: "recno",
          sort: "asc",
        },
        groupToggle:false, 
        groupingKey:'',

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
      
      
      }


    constructor() {
        super()
        this.prop.BaseClass = 'browse'
        this.prop.RowSource = ''
    }
}
