<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="vtl vtl-card">
    <div class="vtl-card-title" v-if="title">{{ title }}</div>
    <div class="vtl-card-body">
      <div class="vtl-row">
        <div class="col-sm-12" :class="{
          'fixed-first-column': isFixedFirstColumn,
          'fixed-first-second-column': isFixedFirstColumn && hasCheckbox,
        }">
          <div v-if="isLoading" class="vtl-loading-mask">
            <div class="vtl-loading-content">
              <span style="color: white">Loading...</span>
            </div>
          </div>
          <table class="vtl-table vtl-table-hover vtl-table-bordered vtl-table-responsive vtl-table-responsive-sm"
            ref="localTable" :style="'max-height: ' + maxHeight + 'px;'">
            <thead class="vtl-thead">
              <tr class="vtl-thead-tr">
                <th v-if="hasCheckbox" class="vtl-thead-th vtl-checkbox-th">
                  <div>
                    <input type="checkbox" class="vtl-thead-checkbox" v-model="setting.isCheckAll" />
                  </div>
                </th>
                <th v-for="(col, index) in (columns as Array<any>)" class="vtl-thead-th" :class="col.headerClasses"
                  :key="index" :style="Object.assign(
                    {
                      width: col.width ? col.width : 'auto',
                    },
                    col.headerStyles
                  )
                    ">



                  <div class="vtl-thead-column" :class="{
                    'vtl-sortable': col.sortable,
                    'vtl-both': col.sortable,
                    'vtl-asc': setting.order === col.field && setting.sort === 'asc',
                    'vtl-desc': setting.order === col.field && setting.sort === 'desc',
                  }" @click.prevent="col.sortable ? doSort(col.field) : false">
                    {{ col.label }}
                  </div>
                  <!--Begin KilloSoft -->
                  <input class='filter' :style="Object.assign({ width: col.width ? col.width : 'auto', },
                    col.headerStyles)" v-model="filterColumns[col.label]" @focusout="filter(col)" />

                  <!--End KilloSoft -->
                </th>

              </tr>
            </thead>
            <template v-if="rows.length > 0">
              <tbody v-if="isStaticMode" class="vtl-tbody"
                :set="(templateRows = groupingKey == '' ? [localRows] : localRows)">
                <template v-for="(rows, groupingIndex) in templateRows" :key="groupingIndex">
                  <tr v-if="groupingKey != ''" class="vtl-tbody-tr vtl-group-tr">
                    <td :colspan="hasCheckbox ? columns.length + 1 : columns.length" class="vtl-tbody-td vtl-group-td">
                      <div class="flex">
                        <div v-if="hasGroupToggle" class="animation">
                          <a :ref="(el: any) => (toggleButtonRefs[groupingIndex] as any) = el" class="cursor-pointer"
                            @click.prevent="toggleGroup(groupingIndex.toString())">▼</a>
                        </div>
                        <div class="ml-2" v-html="groupingDisplay
                          ? groupingDisplay(groupingIndex)
                          : groupingIndex
                          "></div>
                      </div>
                    </td>
                  </tr>
                  <tr v-for="(row, i) in rows" :key="row[setting.keyColumn] ? row[setting.keyColumn] : i" :ref="(el: any) => {
                    if (!groupingRowsRefs[groupingIndex]) {
                      groupingRowsRefs[groupingIndex] = [];
                    }
                    groupingRowsRefs[groupingIndex][i] = el;
                  }
                    " :name="'vtl-group-' + groupingIndex" class="vtl-tbody-tr" :class="typeof rowClasses === 'function' ? rowClasses(row) : rowClasses
                      " @mouseenter="addHoverClassToTr" @mouseleave="removeHoverClassFromTr" @click="$emit('row-clicked', row)">
                    <td v-if="hasCheckbox" class="vtl-tbody-td">
                      <div>
                        <input type="checkbox" class="vtl-tbody-checkbox" :ref="(el: any) => {
                          (rowCheckbox as Array<HTMLElement>).push(el);
                        }
                          " :value="row[setting.keyColumn]" @click="checked(row, $event)" />
                      </div>
                    </td>
                    <td v-for="(col, j) in (columns as Array<any>)" :key="j" class="vtl-tbody-td"
                      :class="col.columnClasses" :style="col.columnStyles">
                      <div v-if="col.display" v-html="col.display(row)"></div>
                      <div v-else>
                        <div v-if="setting.isSlotMode && slots[col.field]">
                          <slot :name="col.field" :value="row"></slot>
                        </div>
                        <span v-else>{{ row[col.field] }}</span>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
              <tbody v-else :set="(templateRows = groupingKey == '' ? [rows] : groupingRows)">
                <template v-for="(rows, groupingIndex) in templateRows" :key="groupingIndex">
                  <tr v-if="groupingKey != ''" class="vtl-tbody-tr vtl-group-tr">
                    <td :colspan="hasCheckbox ? columns.length + 1 : columns.length" class="vtl-tbody-td vtl-group-td">
                      <div class="flex">
                        <div v-if="hasGroupToggle" class="animation">
                          <a :ref="(el: any) => (toggleButtonRefs[groupingIndex] as any) = el" class="cursor-pointer"
                            @click.prevent="toggleGroup(groupingIndex.toString())">▼</a>
                        </div>
                        <div class="ml-2" v-html="groupingDisplay
                          ? groupingDisplay(groupingIndex)
                          : groupingIndex
                          "></div>
                      </div>
                    </td>
                  </tr>
                  <tr v-for="(row, i) in rows" :ref="(el: any) => {
                    if (!groupingRowsRefs[groupingIndex]) {
                      groupingRowsRefs[groupingIndex] = [];
                    }
                    groupingRowsRefs[groupingIndex][i] = el;
                  }
                    " :name="'vtl-group-' + groupingIndex" :key="row[setting.keyColumn] ? row[setting.keyColumn] : i"
                    class="vtl-tbody-tr" :class="typeof rowClasses === 'function' ? rowClasses(row) : rowClasses
                      " @mouseenter="addHoverClassToTr" @mouseleave="removeHoverClassFromTr"
                    @click="$emit('row-clicked', row)">
                    <td v-if="hasCheckbox" class="vtl-tbody-td">
                      <div>
                        <input type="checkbox" class="vtl-tbody-checkbox"
                          :ref="(el: any) => (rowCheckbox as Array<HTMLElement>).push(el)"
                          :value="row[setting.keyColumn]" @click="checked(row, $event)" />
                      </div>
                    </td>
                    <td v-for="(col, j) in (columns as Array<any>)" :key="j" class="vtl-tbody-td"
                      :class="col.columnClasses" :style="col.columnStyles">
                      <div v-if="col.display" v-html="col.display(row)"></div>
                      <div v-else>
                        <div v-if="setting.isSlotMode && slots[col.field]">
                          <slot :name="col.field" :value="row"></slot>
                        </div>
                        <span v-else>{{ row[col.field] }}</span>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </template>
          </table>
        </div>
      </div>
      <div class="vtl-paging vtl-row" v-if="rows.length > 0">
        <template v-if="!setting.isHidePaging">
          <div class="vtl-paging-info col-sm-12 col-md-4">
            <div role="status" aria-live="polite">
              {{
                stringFormat(messages.pagingInfo, setting.offset, setting.limit, total)
              }}
            </div>
          </div>
          <div class="vtl-paging-change-div col-sm-12 col-md-4">
            <span class="vtl-paging-count-label">{{ messages.pageSizeChangeLabel }}</span>
            <select class="vtl-paging-count-dropdown" v-model="setting.pageSize">
              <option v-for="pageOption in (pageOptions as Array<pageOption>)" :value="pageOption.value"
                :key="pageOption.value">
                {{ pageOption.text }}
              </option>
            </select>
            <span class="vtl-paging-page-label">{{ messages.gotoPageLabel }}</span>
            <select class="vtl-paging-page-dropdown" v-model="setting.page">
              <option v-for="n in setting.maxPage" :key="n" :value="parseInt(n.toString())">
                {{ n }}
              </option>
            </select>
          </div>
          <div class="vtl-paging-pagination-div col-sm-12 col-md-4">
            <div class="dataTables_paginate">
              <ul class="vtl-paging-pagination-ul vtl-pagination">
                <li class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-first page-item"
                  :class="{ disabled: setting.page <= 1 }">
                  <a class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-first page-link cursor-pointer"
                    aria-label="Previous" @click.prevent="setting.page = 1">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">First</span>
                  </a>
                </li>
                <li class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-prev page-item"
                  :class="{ disabled: setting.page <= 1 }">
                  <a class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-prev page-link cursor-pointer"
                    aria-label="Previous" @click.prevent="prevPage">
                    <span aria-hidden="true">&lt;</span>
                    <span class="sr-only">Prev</span>
                  </a>
                </li>
                <li class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-number page-item"
                  v-for="n in setting.paging" :key="n" :class="{ disabled: setting.page === n }">
                  <a class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-number page-link cursor-pointer"
                    @click.prevent="movePage(n)">{{ n }}</a>
                </li>
                <li class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-next page-item"
                  :class="{ disabled: setting.page >= setting.maxPage }">
                  <a class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-next page-link cursor-pointer"
                    aria-label="Next" @click.prevent="nextPage">
                    <span aria-hidden="true">&gt;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
                <li class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-last page-item"
                  :class="{ disabled: setting.page >= setting.maxPage }">
                  <a class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-last page-link cursor-pointer"
                    aria-label="Next" @click.prevent="setting.page = setting.maxPage">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Last</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>
      <div class="vtl-row" v-else>
        <div class="vtl-empty-msg col-sm-12 text-center">
          {{ messages.noDataAvailable }}
        </div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">


interface pageOption {
  value: number;
  text: number | string;
}

interface tableSetting {
  isSlotMode: boolean;
  isCheckAll: boolean;
  isHidePaging: boolean;
  keyColumn: string;
  page: number;
  pageSize: number;
  maxPage: number;
  offset: number;
  limit: number;
  paging: Array<number>;
  order: string;
  sort: string;
  pageOptions: Array<pageOption>;
}

interface column {
  isKey: string;
  field: string;
}

export default defineComponent({
  name: "my-table",
  emits: [
    "return-checked-rows",
    "do-search",
    "is-finished",
    "get-now-page",
    "row-clicked",
    "row-toggled",
    "Rows"
  ],
  props: {
    // 是否讀取中 (is data loading)
    isLoading: {
      type: Boolean,
      require: true,
    },
    // 是否執行了重新查詢 (Whether to perform a re-query)
    isReSearch: {
      type: Boolean,
      require: true,
    },
    // 有無Checkbox (Presence of Checkbox)
    hasCheckbox: {
      type: Boolean,
      default: false,
    },
    // Checkbox勾選後返回資料的型態 (Returns data type for checked of Checkbox)
    checkedReturnType: {
      type: String,
      default: "key",
    },
    // 標題 (title)
    title: {
      type: String,
      default: "",
    },
    // 是否鎖定第一欄位位置 (Fixed first column's position)
    isFixedFirstColumn: {
      type: Boolean,
      default: false,
    },
    // 欄位 (Field)
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 資料 (data)
    rows: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 資料列類別 (data row classes)
    rowClasses: {
      type: [Array, Function],
      default: () => {
        return [];
      },
    },
    // 一頁顯示筆數 (Display the number of items on one page)
    pageSize: {
      type: Number,
      default: 10,
    },
    // 總筆數 (Total number of transactions)
    total: {
      type: Number,
      default: 100,
    },
    // 現在頁數 (Current page number)
    page: {
      type: Number,
      default: 1,
    },
    // 排序條件 (Sort condition)
    sortable: {
      type: Object,
      default: () => {
        return {
          order: "id",
          sort: "asc",
        };
      },
    },
    // 顯示文字 (Display text)
    messages: {
      type: Object,
      default: () => {
        return {
          pagingInfo: "Showing {0}-{1} of {2}",
          pageSizeChangeLabel: "Row count:",
          gotoPageLabel: "Go to page:",
          noDataAvailable: "No data",
        };
      },
    },
    // 靜態模式 (Static mode(no refresh server data))
    isStaticMode: {
      type: Boolean,
      default: false,
    },
    // 插槽模式 (V-slot mode)
    isSlotMode: {
      type: Boolean,
      default: false,
    },
    // 是否隱藏換頁資訊 (Hide paging)
    isHidePaging: {
      type: Boolean,
      default: false,
    },
    // 一頁顯示筆數下拉選單 (Dropdown of Display the number of items on one page)
    pageOptions: {
      type: Array,
      default: () => [
        {
          value: 10,
          text: 10,
        },
        {
          value: 25,
          text: 25,
        },
        {
          value: 50,
          text: 50,
        },
      ],
    },
    // 分類條件 (Key of grouping)
    groupingKey: {
      type: String,
      default: "",
    },
    // 是否顯示隱藏分類開關 (Has hide group rows toggle)
    hasGroupToggle: {
      type: Boolean,
      default: false,
    },
    // 客製化分類顯示 (Customize grouping title)
    groupingDisplay: {
      type: Function,
      default: null,
    },
    // 設定表格高度 (Table's max height)
    maxHeight: {
      default: "auto",
    },
    // 預設群組顯示時為折疊 (Grouping collapsed on start)
    startCollapsed: {
      type: Boolean,
      default: false,
    },
    // 保持刷新後折疊狀態 (Keep collapsed status after refresh)
    isKeepCollapsed: {
      type: Boolean,
      default: false,
    },
    columnFilter: null, //Rutinas para filtrar


  },
  setup(props, { emit, slots }) {
    let localTable = ref<HTMLElement | null>(null);

    // 檢查下拉選單中是否包含預設一頁顯示筆數 (Validate dropdown's values have page-size value or not)
    let tmpPageOptions = props.pageOptions as Array<pageOption>;
    let defaultPageSize =
      props.pageOptions.length > 0 ? ref(tmpPageOptions[0].value) : ref(props.pageSize);
    console.log('TableLite const defaultPageSize=', defaultPageSize.value)

    if (tmpPageOptions.length > 0) {
      tmpPageOptions.forEach((v: pageOption) => {
        if (
          Object.prototype.hasOwnProperty.call(v, "value") &&
          Object.prototype.hasOwnProperty.call(v, "text") &&
          props.pageSize == v.value
        ) {
          defaultPageSize.value = v.value;
        }
      });
    }

    // 組件用內部設定值 (Internal set value for components)
    const setting: tableSetting = reactive({
      // 是否啟用Slot模式 (Enable slot mode)
      isSlotMode: props.isSlotMode,
      // 是否全選 (Whether to select all)
      isCheckAll: false,
      // 是否隱藏換頁資訊 (Hide paging)
      isHidePaging: props.isHidePaging,
      // KEY欄位名稱 (KEY field name)
      keyColumn: computed(() => {
        let key = "";
        Object.assign(props.columns).forEach((col: column) => {
          if (col.isKey) {
            key = col.field;
          }
        });
        return key;
      }),
      // 當前頁數 (current page number)
      page: props.page,
      // 每頁顯示筆數 (Display count per page)
      pageSize: defaultPageSize.value,
      // 最大頁數 (Maximum number of pages)
      maxPage: computed(() => {
        if (props.total <= 0) {
          return 0;
        }
        let maxPage = Math.floor(props.total / setting.pageSize);
        let mod = props.total % setting.pageSize;
        if (mod > 0) {
          maxPage++;
        }
        return maxPage;
      }),
      // 該頁數起始值 (The starting value of the page number)
      offset: computed(() => {
        return (setting.page - 1) * setting.pageSize + 1;
      }),
      // 該頁數最大值 (Maximum number of pages0
      limit: computed(() => {
        let limit = setting.page * setting.pageSize;
        return props.total >= limit ? limit : props.total;
      }),
      // 換頁陣列 (Paging array)
      paging: computed(() => {
        let startPage = setting.page - 2 <= 0 ? 1 : setting.page - 2;
        if (setting.maxPage - setting.page <= 2) {
          startPage = setting.maxPage - 4;
        }
        startPage = startPage <= 0 ? 1 : startPage;
        let pages = [];
        for (let i = startPage; i <= setting.maxPage; i++) {
          if (pages.length < 5) {
            pages.push(i);
          }
        }
        return pages;
      }),
      // 組件內用排序 (Sortable for local)
      order: props.sortable.order,
      sort: props.sortable.sort,
      pageOptions: computed(() => {
        const ops: pageOption[] = [];
        props.pageOptions?.forEach((o) => {
          ops.push({
            value: (o as pageOption).value,
            text: (o as pageOption).text,
          });
        });
        return ops;
      }),
    });

    ////////// Killo Soft //////////
    const filterColumns = reactive({});

    for (const colName in props.columns) {
      //console.log('TableLite columna', props.columns[colName].label)
      filterColumns[props.columns[colName].label] = '          '

    }

    /*
        function multiFilter(array:[], filters:[]) {
            return array.filter(o =>
            Object.keys(filters).every(k =>
                [].concat(filters[k]).some(v => o[k].includes(v))));
         }
    
    */
    const filter = (columna: string) => {
      console.log('Entro a TableLite filter')
      const filters = {}
      let sw_filter = false

      for (const name in filterColumns) {

        if (filterColumns[name].trim().length > 0) {
          sw_filter = true
          filters[name] = [filterColumns[name].trim()]
        }
      }
      console.log('TableLite filter ', filters, props.columnFilter)  //, filterColumns[name])

      //let offset = (setting.page - 1) * setting.pageSize;
      // let limit = setting.pageSize;

      props.columnFilter(filters, setting.pageSize);
      setting.page = 1;
      // emit("get-now-page", setting.page);


    };

    ////////// Killo Soft ////////// 

    // 已選擇中的資料 (Checked rows)
    const isChecked = ref<Array<any>>([]);

    // 組件內用資料 (Data rows for local)
    const localRows = computed(() => {
      // sort rows
      let rows = props.rows as Array<any>;
      // refs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare
      var collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
      });
      let sortOrder = setting.sort === "desc" ? -1 : 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rows.sort((a: any, b: any): number => {
        return collator.compare(a[setting.order], b[setting.order]) * sortOrder;
      });

      let result = null;
      if (props.groupingKey) {
        // If have set grouping-key create group temp data
        let tmp = {} as any;
        rows.forEach((v: any) => {
          if (!tmp[v[props.groupingKey]]) {
            tmp[v[props.groupingKey]] = [];
          }
          tmp[v[props.groupingKey]].push(v);
        });

        result = {} as any;
        for (let index = setting.offset - 1; index < setting.limit; index++) {
          result[rows[index][props.groupingKey]] = tmp[rows[index][props.groupingKey]];
        }
      } else {
        result = [];
        for (let index = setting.offset - 1; index < setting.limit; index++) {
          result.push(rows[index]);
        }
      }

      nextTick(function () {
        // 資料完成渲染後回傳私有元件
        callIsFinished();
      });

      return result;
    });






    ////////////////////////////
    //
    //  Checkbox 相關操作
    //  (Checkbox related operations)
    //

    // 定義Checkbox參照 (Define Checkbox reference)
    const rowCheckbox = ref([]);

    /**
     * 重新渲染前執行 (Execute before re-rendering)
     */
    onBeforeUpdate(() => {
      // 每次更新前都把值全部清空 (Clear all values before each update)
      rowCheckbox.value = [];
    });

    /**
     * 監聽全勾選Checkbox (Check all checkboxes for monitoring)
     */
    watch(
      () => setting.isCheckAll,
      (state: boolean) => {
        if (props.hasCheckbox) {
          isChecked.value = [];
          if (state) {
            let tmpRows = (props.isStaticMode) ? props.rows.slice((setting.offset - 1), setting.limit) : props.rows;
            if (props.checkedReturnType == "row") {
              isChecked.value = tmpRows;
            } else {
              tmpRows.forEach((val: any) => {
                isChecked.value.push(val[setting.keyColumn]);
              });
            }
          }
          rowCheckbox.value.forEach((val: HTMLInputElement) => {
            if (val) {
              val.checked = state;
            }
          });
          // 回傳畫面上選上的資料 (Return the selected data on the screen)
          emit("return-checked-rows", isChecked.value);
        }
      }
    );

    /**
     * 監控有無顯示Checkbox變化 (hasCeckbox props for monitoring)
     */
    watch(
      () => props.hasCheckbox,
      (v) => {
        if (!v) {
          setting.isCheckAll = false;
        }
      }
    );

    /**
     * Checkbox點擊事件 (Checkbox click event)
     */
    const checked = (row: any, event: MouseEvent): void => {
      event.stopPropagation();
      let checkboxValue = row[setting.keyColumn];
      if (props.checkedReturnType == "row") {
        checkboxValue = row;
      }
      if ((event.target as HTMLInputElement).checked) {
        isChecked.value.push(checkboxValue);
      } else {
        const index = isChecked.value.indexOf(checkboxValue);
        if (index >= 0) {
          isChecked.value.splice(index, 1);
        }
      }
      if (isChecked.value.length == props.rows.length) {
        setting.isCheckAll = true;
      } else {
        // 回傳畫面上選上的資料 (Return the selected data on the screen)
        emit("return-checked-rows", isChecked.value);
      }
    };

    /**
     * 清空畫面上所有選擇資料 (Clear all selected data on the screen)
     */
    const clearChecked = () => {
      isChecked.value = [];
      rowCheckbox.value.forEach((val: HTMLInputElement) => {
        if (val && val.checked) {
          val.checked = false;
        }
      });
      // 回傳畫面上選上的資料 (Return the selected data on the screen)
      emit("return-checked-rows", isChecked.value);
    };

    ////////////////////////////
    //
    //  排序·換頁等 相關操作
    //  (Sorting, page change, etc. related operations)
    //

    /**
     * 呼叫執行排序 (Call execution sequencing)
     */
    const doSort = (order: string) => {
      let sort = "asc";
      if (order == setting.order) {
        // 排序中的項目時 (When sorting items)
        if (setting.sort == "asc") {
          sort = "desc";
        }
      }
      let offset = (setting.page - 1) * setting.pageSize;
      let limit = setting.pageSize;
      setting.order = order;
      setting.sort = sort;
      emit("do-search", offset, limit, order, sort);

      // 清空畫面上選擇的資料 (Clear the selected data on the screen)
      if (setting.isCheckAll) {
        // 取消全選時自然會清空 (It will be cleared when you cancel all selections)
        setting.isCheckAll = false;
      } else {
        if (props.hasCheckbox) {
          clearChecked();
        }
      }
    };

    /**
     * 切換頁碼 (Switch page number)
     *
     * @param page      number  新頁碼    (New page number)
     * @param prevPage  number  現在頁碼  (Current page number)
     */
    const changePage = (page: number, prevPage: number) => {
      setting.isCheckAll = false;
      if (props.hasCheckbox) {
        isChecked.value = [];
      }
      let order = setting.order;
      let sort = setting.sort;
      let offset = (page - 1) * setting.pageSize;
      let limit = setting.pageSize;
      if (!props.isReSearch || page > 1 || page == prevPage) {
        // 非重新查詢發生的頁碼變動才執行呼叫查詢 (Call query will only be executed if the page number is changed without re-query)
        emit("do-search", offset, limit, order, sort);
      }
    };
    // 監聽頁碼切換 (Monitor page switching)
    watch(() => setting.page, changePage);
    // 監聽手動頁碼切換 (Monitor manual page switching)
    watch(
      () => props.page,
      (val) => {
        if (val <= 1) {
          setting.page = 1;
          emit("get-now-page", setting.page);
        } else if (val >= setting.maxPage) {
          setting.page = setting.maxPage;
          emit("get-now-page", setting.page);
        } else {
          setting.page = val;
        }
      }
    );

    /**
     * 切換顯示筆數 (Switch display number)
     */
    const changePageSize = () => {
      if (setting.page === 1) {
        // 沒自動觸發 changePage()，所以手動觸發
        changePage(setting.page, setting.page);
      } else {
        // 強制返回第一頁,並自動觸發 changePage()
        setting.page = 1;
        setting.isCheckAll = false;
      }
    };
    // 監聽組件內顯示筆數切換 (Monitor display number switch from component)
    watch(() => setting.pageSize, changePageSize);
    // 監聽來自Prop的顯示筆數切換 (Monitor display number switch from prop)
    watch(
      () => props.pageSize,
      (newPageSize) => {
        console.log('TableLite pageSize')
        setting.pageSize = newPageSize;
        console.log('TableLite pageSize', setting.pageSize)
      }
    );

    /**
     * 上一頁 (Previous page)
     */
    const prevPage = () => {
      if (setting.page == 1) {
        // 如果是第一頁，不予執行 (If it is the first page, it will not be executed)
        return false;
      }
      setting.page--;
    };

    /**
     * 移動至指定頁數 (Move to the specified number of pages)
     */
    const movePage = (page: number) => {
      setting.page = page;
    };

    /**
     * 下一頁 (Next page)
     */
    const nextPage = () => {
      if (setting.page >= setting.maxPage) {
        // 如果等於大於最大頁數，不與執行 (If it is equal to or greater than the maximum number of pages, no execution)
        return false;
      }
      setting.page++;
    };

    // 監聽資料變更 (Monitoring data changes)
    watch(
      () => props.rows,
      () => {
        if (props.isReSearch || props.isStaticMode) {
          setting.page = 1;
        }
        nextTick(function () {
          // 資料完成渲染後回傳私有元件 (Return the private components after the data is rendered)
          if (!props.isStaticMode) {
            callIsFinished();
          }
        });
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stringFormat = (template: string, ...args: any[]) => {
      return template.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    };

    // Call 「is-finished」 Method
    const callIsFinished = () => {
      if (localTable.value) {
        let localElement = localTable.value.getElementsByClassName("is-rows-el");
        emit("is-finished", localElement);
      }
      emit("get-now-page", setting.page);
    };

    // Toggle button elements
    const toggleButtonRefs = ref<{ [key: string]: HTMLElement }>({});
    // Grouping rows
    const groupingRowsRefs = ref<{ [key: string]: Array<HTMLElement> }>({});
    // Saved toggle status
    const groupingToggleStatus = ref<{ [key: string]: boolean }>({});

    // Data rows for grouping (Default-mode only)
    const groupingRows = computed(() => {
      let result = {} as any;
      props.rows.forEach((v: any) => {
        if (!result[v[props.groupingKey]]) {
          result[v[props.groupingKey]] = [];
        }
        result[v[props.groupingKey]].push(v);
      });

      nextTick(function () {
        if (props.startCollapsed || props.isKeepCollapsed) {
          for (const [groupIndex, el] of Object.entries(toggleButtonRefs.value)) {
            if (el && el.parentElement) {
              let isOpen = !props.startCollapsed;
              if (
                props.isKeepCollapsed &&
                groupingToggleStatus.value[groupIndex] !== undefined
              ) {
                isOpen = !groupingToggleStatus.value[groupIndex];
              }
              if (
                (isOpen && el.parentElement.classList.contains("rotated-90")) ||
                (!isOpen && !el.parentElement.classList.contains("rotated-90"))
              ) {
                el.parentElement.classList.toggle("rotated-90");
              }
              if (!isOpen) {
                groupingRowsRefs.value[groupIndex].forEach((element) => {
                  if (element) {
                    element.classList.add("hidden");
                  }
                });
              }
            }
          }
        }
        callIsFinished();
      });

      return result;
    });

    /**
     * Toggle Group rows
     *
     * @param {String} groupIndex
     */
    const toggleGroup = (groupIndex: string) => {
      let targetEl = toggleButtonRefs.value[groupIndex];
      if (targetEl && targetEl.parentElement) {
        targetEl.parentElement.classList.toggle("rotated-90");
        const isClose = targetEl.parentElement.classList.contains("rotated-90");
        groupingRowsRefs.value[groupIndex].forEach((element) => {
          if (isClose) {
            element.classList.add("hidden");
          } else {
            element.classList.remove("hidden");
          }
        });
        groupingToggleStatus.value[groupIndex] = isClose;
        emit("row-toggled", groupingRows.value[groupIndex], isClose);
      }
    };

    /**
     * Add hover class to tr
     *
     * @param {MouseEvent} mouseEvent
     */
    const addHoverClassToTr = (mouseEvent: MouseEvent) => {
      if (mouseEvent.target instanceof HTMLElement) {
        mouseEvent.target.classList.add("hover");
      }
    };

    /**
     * Remove hover class from tr
     *
     * @param {HTMLElement} $event
     */
    const removeHoverClassFromTr = (mouseEvent: MouseEvent) => {
      if (mouseEvent.target instanceof HTMLElement) {
        mouseEvent.target.classList.remove("hover");
      }
    };

    /**
     * 組件掛載後事件 (Mounted Event)
     */
    onMounted(() => {



      nextTick(() => {
        if (props.rows.length > 0) {
          callIsFinished();
        }
      });
    });


    return {
      slots,
      localTable,
      localRows,
      setting,
      rowCheckbox,
      checked,
      clearChecked,
      doSort,
      prevPage,
      movePage,
      nextPage,
      stringFormat,
      toggleButtonRefs,
      groupingRowsRefs,
      groupingRows,
      toggleGroup,
      addHoverClassToTr,
      removeHoverClassFromTr,
      filter,
      filterColumns,

    };
  },
  watch: {
    pageSize() {
      this.setting.pageSize = this.pageSize;
    },
  },
});
</script>

<style scoped>
.vtl-checkbox-th {
  width: 1%;
  min-width: 38px;
}

.vtl-checkbox-td {
  width: 1%;
  min-width: 38px;
}

.vtl-both {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC");
}

.vtl-sortable {
  cursor: pointer;
  background-position: right;
  background-repeat: no-repeat;
  padding-right: 30px !important;
}

.vtl-asc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==);
}

.vtl-desc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII=);
}

.vtl-loading-mask {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-flow: column;
  transition: opacity 0.3s ease;
}

.vtl-loading-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vtl-card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
}

select {
  width: auto;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  height: auto;
  padding: 0;
  margin-bottom: 0;
}

.vtl-table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}

th {
  text-align: inherit;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.vtl-table-bordered thead td,
.vtl-table-bordered thead th {
  border-bottom-width: 2px;
}

.vtl-table thead th {
  vertical-align: bottom;
  color: #fff;
  background-color: #343a40;
  border-color: #454d55;
  border-bottom: 2px solid #dee2e6;
}

.vtl-table-bordered td,
.vtl-table-bordered th {
  border: 1px solid #dee2e6;
}

.vtl-table td,
.vtl-table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  vertical-align: middle;
}

.vtl-table-hover tbody tr:hover {
  color: #212529;
  background-color: #ececec;
}

.vtl-table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.vtl-table-responsive>.vtl-table-bordered {
  border: 0;
}

.vtl-row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.vtl-pagination {
  margin: 2px 0;
  white-space: nowrap;
  justify-content: flex-end;
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}

.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

*,
::after,
::before {
  box-sizing: border-box;
}

.col-sm-12 {
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}

.text-center {
  text-align: center;
}

@media (min-width: 576px) {
  .vtl-table-responsive-sm {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .vtl-table-responsive-sm>.table-bordered {
    border: 0;
  }

  .col-md-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}

.vtl-table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}

.vtl-table tbody th {
  position: sticky;
  left: 0;
  z-index: 1;
}

.fixed-first-column {
  overflow-x: auto;
}

.fixed-first-column tr th:first-child {
  position: sticky;
  left: 0;
  z-index: 2;
}

.fixed-first-column tr td:first-child {
  position: sticky;
  left: 0;
}

.fixed-first-column tr th:first-child::before,
.fixed-first-second-column tr th:nth-child(2)::before {
  content: "";
  position: absolute;
  border-right: 1px solid #454d55;
  left: 0;
  top: 0;
  width: 102%;
  height: 102%;
}

.fixed-first-column tr .vtl-checkbox-th:first-child::before {
  content: "";
  position: absolute;
  border-right: 1px solid #454d55;
  left: 0;
  top: 0;
  width: 103%;
  height: 102%;
}

.fixed-first-column tr td:first-child::before,
.fixed-first-column tr td:nth-child(2)::before {
  content: "";
  position: absolute;
  border-right: 1px solid #dee2e6;
  left: 0;
  top: 0;
  width: 102%;
  height: 102%;
}

.fixed-first-column tr .vtl-checkbox-td:first-child::before {
  content: "";
  position: absolute;
  border-right: 1px solid #dee2e6;
  left: 0;
  top: 0;
  width: 103%;
  height: 102%;
}

.fixed-first-second-column tr th:nth-child(2),
.fixed-first-second-column tr td:nth-child(2) {
  position: sticky;
  left: 38px;
}

.fixed-first-second-column tr th:nth-child(2) {
  z-index: 2;
}

.fixed-first-column tr td:first-child,
.fixed-first-second-column tr td:nth-child(2) {
  background-color: white;
}

.fixed-first-column tr.hover td:first-child,
.fixed-first-second-column tr.hover td:nth-child(2) {
  background-color: #ececec;
}

.flex {
  display: flex;
}

.animation {
  transform: rotate(0deg);
  transition: transform 0.3s;
}

.cursor-pointer {
  cursor: pointer;
}

.rotated-90 {
  transform: rotate(-90deg);
}

.hidden {
  display: none;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>