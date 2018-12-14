<template>
  <div style="height: 100%;position: relative;overflow: hidden;">
    <div class="table-head">
      <table class="simple-table" cellspacing="0">
        <colgroup></colgroup>
        <thead>
        <th v-for="(item,index) in tHeadList"  :key="index" @click="sort(index)" :style="{width:item.width}" :title="item.title" :class="{number:useSerialNumber&&index===0}">
          <span class="titleBox" :class="{sortMaxTitle:isSort}" >{{item.title}} </span>
          <span v-show="isSort||item.sort===true" v-if="useSerialNumber!==true&&(useOperate===true&&index!==tHeadList.length-1)" style="position: relative;margin: 0.1em;" >
          <i class="asc" :class="{ascSelected:sortStatus===1&&sortIndex===index}"></i>
        <i class="dsc" :class="{dscSelected:sortStatus===2&&sortIndex===index}"></i>
        <div style="display: inline-block;width: 2em;"></div>
      </span>
          <span v-show="isSort||item.sort===true" v-if="useSerialNumber===true&&index!==0&&(useOperate===true&&index!==tHeadList.length-1)" style="position: relative;margin: 0.1em;" >
        <i class="asc" :class="{ascSelected:sortStatus===1&&sortIndex===index-1}"></i>
        <i class="dsc" :class="{dscSelected:sortStatus===2&&sortIndex===index-1}"></i>
        <div style="display: inline-block;width: 2em;"></div>
      </span>
        </th>
        </thead>
      </table>
    </div>
    <div style="height: calc(100% - 3em);overflow-y: scroll;width: calc(100% + 18px)">
      <div class="table-box">
        <table class="simple-table" cellspacing="0">
          <colgroup></colgroup>
          <thead >
          <th v-for="(item,index) in tHeadList"  :key="index" @click="sort(index)"  :style="{width:item.width}" :class="{number:useSerialNumber&&index===0}" :title="item.title">
          </th>
          </thead>
          <tbody>
          <tr :class="{odd:isZebra===true&&index%2!==0}" v-for="(item,index) in tBodyList" :key="index">
            <td v-if="useSerialNumber" >{{index+1}}</td>
            <td v-for="(item2,index2) in colum" :key="index2" :title="item[item2.data]">{{item[item2.data]}}</td>
            <td v-if="useOperate"><slot :row="item" :data="item"></slot></td>
          </tr>
          </tbody>
        </table>
        <div v-if="tBodyList.length===0" style="text-align: center;padding: 0.5em;">无记录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-simple',
  props: {
    tableData: { data: Array, colum: Array },
    useSerialNumber: true,
    serialNumberName: String,
    useOperate: Boolean,
    operateName: String,
    operateWidth: String,
    useZebra: Boolean
  },
  computed: {
    tData () {
      return this.tableData.data
    }
  },
  watch: {
    tData: {
      handler: function (nV, oV) {
        this.tBodyList = nV
        this.viewData()
      }}
  },
  data () {
    return {
      tHeadList: ['表头1', '表头2', '表头3', '表头4', '表头5', '表头6'],
      tBodyList: this.tableData.data,
      colum: [{ data: '', width: '' }],
      maxNumber: 0,
      oprateText: this.operateName,
      serialNumberText: this.serialNumberName,
      sortStatus: 0, // 0不排序，1，正序，2，倒序
      sortIndex: 0, // 排序的列的序号
      isZebra: false,
      isSort: false
    }
  },
  methods: {
    sort (index) {
      if (!this.isSort) {
        return false
      }
      if (this.useSerialNumber) {
        index = index - 1
      }
      if (this.sortIndex !== index) {
        this.sortStatus = 0
        this.sortIndex = index
      }
      let colum = ''
      try {
        colum = this.colum[index]['data']
      } catch (e) {
        return false
      }
      let data = this.tBodyList.slice(0)
      function compare (property, type) {
        return function (a, b) {
          var x = a[property] === undefined ? '' : a[property]
          var y = b[property] === undefined ? '' : b[property]
          if (type === 1) {
            return x < y ? -1 : x > y ? 1 : 0
          } else {
            return x < y ? 1 : x > y ? -1 : 0
          }
        }
      }
      this.sortStatus += 1
      if (this.sortStatus > 2) {
        this.sortStatus = 0
      }
      switch (this.sortStatus) {
        case 0:
          this.tBodyList = this.tableData.data
          break
        case 1:
          data.sort(compare(colum, 1))
          this.tBodyList = data.slice(0)
          break
        case 2:
          data.sort(compare(colum, 2))
          this.tBodyList = data.slice(0)
          break
        default:
          break
      }
    },
    viewData () {
      let ls = this.tableData.colum
      let headerList = ls.slice(0)
      if (this.useSerialNumber) {
        if (!this.serialNumberName) {
          this.serialNumberText = '编号'
        }
        headerList.unshift({ title: this.serialNumberText })
        this.maxNumber = 0
      }
      if (this.useOperate) {
        if (!this.oprateText) {
          this.oprateText = '操作'
        }
        headerList.push({title: this.oprateText, width: this.operateWidth})
        this.maxNumber = 0
      }
      this.tHeadList = headerList
    }
  },
  mounted () {
    this.tHeadList = []
    this.colum = this.tableData.colum
    this.isZebra = this.useZebra === undefined ? false : this.useZebra
    this.viewData()
  }
}
</script>
<style>
  .table-box {
    width: 100%;
    max-height: 100%;
  }
  .table-head thead th {
    color: #fff;
    font-weight: 500;
    background-color: rgb(25, 30, 62);
    padding: 0.6em 5px;
    text-align: inherit;
    border-top: 1px solid #9c9a9b;
  }
  .sortMaxTitle{
    max-width: calc(100% - 1.3em);
  }
  .simple-table tbody tr {
  }
  .simple-table tbody tr:hover {
    cursor: pointer;
    background:  #33426F;
  }
  .simple-table tbody tr td {
    font-size: 0.95em;
    padding:1.1em 5px 0.4em 5px;
    text-align: inherit;
    background: #ffffff00;
    border-bottom: 1px solid #888888;
  }
</style>
<style scoped>
  .simple-table {
    width: 100%;
    table-layout: fixed;
    word-break: break-all;
  }
  .table-head {
    position: relative;
    height: 3em;
    box-sizing: border-box;
    max-height: 3em;
    overflow: hidden;
    top: 0;
    z-index: 10;
  }
  .simple-table thead {
    vertical-align: middle;
  }
  .simple-table thead th {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    vertical-align: middle;
    min-width: 1em;
  }
  .simple-table thead th .titleBox {
    max-width: 100%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .simple-table tbody tr td {
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
  }
  .asc {
    position: absolute;
    border-left: 0.35em solid transparent;
    border-right: 0.35em solid transparent;
    border-bottom: 0.35em solid #acafb6;
  }
  .ascSelected {
    border-bottom: 0.35em solid #161616;
  }
  .dsc {
    position: absolute;
    bottom: 0;
    border-left: 0.35em solid transparent;
    border-right: 0.35em solid transparent;
    border-top: 0.35em solid #acafb6;
  }
  .dscSelected {
    border-top: 0.35em solid #161616;
  }
  .simple-table .odd {
    /*background: #badafd;*/
  }
  .number{
    width:3em;
  }
</style>
