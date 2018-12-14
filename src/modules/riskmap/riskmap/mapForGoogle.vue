<template>
  <div style="width: 100%;height: 100%;position: absolute;top:0;overflow: hidden;">
    <div id="viewDiv" class="riskMap-content" style="position: absolute;top:0;left: 0;width: 100%;height: 100%"> </div>
    <div id="baseMapChangePanelForGoogle" class="baseMapChangePanel"><ul>
      <li v-for="(item,index) in mapServices" :key="index" :title="item.name" @click="changeBaseMap(index)">{{item.name}}</li>
    </ul></div>
  </div>
</template>

<script>
import esriLoader from 'esri-loader'

const config = require('../../../config/config')
const baseURL = config.api.baseURL
export default {
  components: {},
  data: function () {
    return {
      LONGITUDE: 116.23,
      lat: 34,
      X: 499790.98456298374,
      Y: 500591.2177234292,
      map: null,
      baseMaps: [],
      carPoints: [
        {
          id: '0002',
          SIMCODE: '00002', // SIM卡号，代表车辆唯一信息
          POSITION_MESSAGE: '0001车位置',
          ONLINE_TIME_LENGTH: '2小时',
          LONGITUDE: '116.590881',
          LATITUDE: '40.069930',
          SPEED: '20km/h',
          DIRECTION: '啊啦啦啦就',
          POSITIONING_STATE: '1',
          X: '212',
          Y: '23'
        },
        {
          id: '0001',
          SIMCODE: '00001', // SIM卡号，代表车辆唯一信息
          POSITION_MESSAGE: '0001车位置',
          ONLINE_TIME_LENGTH: '2小时',
          LONGITUDE: 116.23,
          LATITUDE: 34,
          SPEED: '20km/h',
          DIRECTION: -78,
          POSITIONING_STATE: '1',
          X: '499790.88456298374',
          Y: '500591.2177234292'
        }
      ],
      airPoints: [
        {
          id: '0003',
          SIMCODE: '00003', // SIM卡号，代表车辆唯一信息
          POSITION_MESSAGE: '0001车位置',
          ONLINE_TIME_LENGTH: '2小时',
          LONGITUDE: '116.607737',
          LATITUDE: '40.083390',
          SPEED: '20km/h',
          DIRECTION: 90,
          POSITIONING_STATE: '1',
          X: '212',
          Y: '23'
        },
        {
          id: '0003',
          SIMCODE: '00004', // SIM卡号，代表车辆唯一信息
          POSITION_MESSAGE: '0001车位置',
          ONLINE_TIME_LENGTH: '2小时',
          LONGITUDE: 116.23,
          LATITUDE: 44,
          SPEED: '20km/h',
          DIRECTION: -78,
          POSITIONING_STATE: '1',
          X: '212',
          Y: '23'
        }
      ],
      alarmPoints: [
        {
          id: '0005',
          SIMCODE: '00005', // SIM卡号，代表车辆唯一信息
          POSITION_MESSAGE: '0001车位置',
          ONLINE_TIME_LENGTH: '2小时',
          LONGITUDE: '110.3232',
          LATITUDE: '33.3232',
          SPEED: '20km/h',
          DIRECTION: 0,
          POSITIONING_STATE: '1',
          X: '212',
          Y: '23'
        },
        {
          id: '0006',
          SIMCODE: '00006', // SIM卡号，代表车辆唯一信息
          POSITION_MESSAGE: '0001车位置',
          ONLINE_TIME_LENGTH: '2小时',
          LONGITUDE: 106.23,
          LATITUDE: 34,
          SPEED: '20km/h',
          DIRECTION: 0,
          POSITIONING_STATE: '1',
          X: '212',
          Y: '23'
        }
      ],
      pointGraphics: {}, // 所有画好的点
      carGraphics: {}, // 所有汽车点位
      warnGraphics: {}, // 所有告警点位
      planeGraphics: {}, // 所有飞机点位
      Point: null, // 地图的点工具
      Graphic: null, // 地图盛点的工具
      view: null, // 地图的view工具
      mapServices: [], // 地图服务地址
      ws: null
    }
  },
  methods: {
    createMap () {
      let _this = this
      const options = {
        url: baseURL + 'arcgis_js_api/library/4.90/4.9/init.js'
      }
      esriLoader.loadCss(
        baseURL + 'arcgis_js_api/library/4.90/4.9/esri/css/main.css'
      )
      esriLoader
        .loadModules(
          [
            'esri/config',
            'esri/layers/TileLayer',
            'esri/map',
            'esri/views/MapView',
            'esri/Basemap',
            'esri/Ground',
            'esri/layers/FeatureLayer',
            'esri/geometry/Extent',
            'esri/Graphic',
            'esri/geometry/Point',
            'dojo/domReady!'
          ],
          options
        )
        .then(
          ([
            esriConfig,
            TileLayer,
            Map,
            MapView,
            Basemap,
            Ground,
            FeatureLayer,
            Extent,
            Graphic,
            Point,
            doReady
          ]) => {
            let layers = []
            // 测试用地图服务
            for (let i = 0; i < _this.mapServices.length; i++) {
              var layer = null
              try {
                layer = new TileLayer({
                  url: _this.mapServices[i].url
                })
                layers.push(layer)
              } catch (e) {
                layer = new TileLayer({
                  url:
                    'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
                })
                layers.push(layer)
              }
              _this.baseMaps.push(
                new Basemap({
                  baseLayers: [layer],
                  title: 'Custom Basemap',
                  id: 'myBasemap' + i
                })
              )
            }
            var customBasemap = _this.baseMaps[0]
            _this.map = new Map({
              basemap: customBasemap
            })
            _this.MapUtil = Map
            var view = new MapView({
              container: 'viewDiv',
              map: _this.map,
              center: [0, 0],
              zoom: 0,
              minScale: 0,
              maxScale: 3000
            })
            view.when(function () {
              _this.view = view
              console.log(view)
              _this.Point = Point
              _this.Graphic = Graphic
              _this.viewReady()
              view.on('click', function (event) {
                var screenPoint = {
                  x: event.x,
                  y: event.y
                }
                // Search for graphics at the clicked location
                view.hitTest(screenPoint).then(function (response) {
                  var result = response.results[0]
                  if (result) {
                    /* var lon = result.mapPoint.longitude
                    var lat = result.mapPoint.latitude */
                    var popupTrailheads = {
                      title: 'Trailhead'
                    }

                    // Create the layer and set the popup
                    var trailheads = new FeatureLayer({
                      popupTemplate: popupTrailheads
                    })

                    // Add the layer
                    _this.map.add(trailheads)
                  }
                })
              })
            })
          }
        )
    },
    changeBaseMap (index) {
      this.view.map = new this.MapUtil({
        basemap: this.baseMaps[index]
      })
      this.view.extent = this.baseMaps[index].baseLayers.items[0].fullExtent
      this.view.scale = 0
    },
    createMapServerPanel () {
      let mapServices = []
      mapServices.push({
        name: 'test1',
        url:
          'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'
      })
      mapServices.push({
        name: 'test2',
        url:
          ' http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer'
      })
      mapServices.push({
        name: 'test3',
        url:
          'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
      })
      mapServices.push({
        name: '机场大环境',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/DCJ_BASE_ZBAA_XC/MapServer'
      })
      mapServices.push({
        name: '室内1',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T1F1_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内2',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T1F2_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内3',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T1F3_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内4',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T2B1_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内5',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T2F1_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内6',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T2F2_BASE_ZBAA_new/MapServer'
      })
      mapServices.push({
        name: '室内7',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T2F3_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内8',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/newZBAA_T3CB1_BASE/MapServer'
      })
      mapServices.push({
        name: '室内9',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3CB2_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内10',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/ZBAA_T3CF1_BASE/MapServer'
      })
      mapServices.push({
        name: '室内11',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3CF2_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内12',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/ZBAA_T3CF3_BASE/MapServer'
      })
      mapServices.push({
        name: '室内13',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3CF4_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内14',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3CF4J_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内15',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3DB1_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内16',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3DB2_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内17',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3DF1_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内18',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3DF2_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内18',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3DF3_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内19',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3EB1_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内20',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3EB2_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内21',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3EB3_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内22',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3EF1_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内23',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3EF2_BASE_ZBAA/MapServer'
      })
      mapServices.push({
        name: '室内24',
        url:
          'http://10.40.12.23:6080/arcgis/rest/services/BASEMAP/T3EF3_BASE_ZBAA/MapServer'
      })

      this.mapServices = null
      this.mapServices = mapServices
    },
    addCarPointToView (Points, symbol, title, content) {
      let _this = this
      for (let i in Points) {
        let Point = Points[i]
        content = '<div>卡号：' + Point.SIMCODE + '</div>' + '<div>经度：' + Point.X + '</div>' + '<div>纬度：' + Point.Y + '</div>'
        var point = new _this.Point({
          longitude: Point.X,
          latitude: Point.Y,
          spatialReference: _this.view.spatialReference
        })
        // Create a symbol for drawing the point
        var markerSymbol = {
          type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
          declaredClass: 'airClass',
          /* angle: Point.DIRECTION === undefined ? 0 : parseInt(Point.DIRECTION), */
          angle: 0,
          url:
            baseURL +
            'arcgis_js_api/library/4.90/4.9/esri/themes/base/images/' +
            symbol +
            '.png',
          width: '40px',
          height: '40px'
        }
        // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new _this.Graphic({
          geometry: point,
          symbol: markerSymbol,
          popupTemplate: {
            title: title,
            content: content
          }
        })

        if (_this.carGraphics[Point.SIMCODE] === undefined) {
          _this.carGraphics[Point.SIMCODE] = pointGraphic
        } else {
          _this.view.graphics.remove(_this.carGraphics[Point.SIMCODE])
          _this.carGraphics[Point.SIMCODE] = pointGraphic
        }
        // Add the graphic to the view
        _this.view.graphics.add(pointGraphic)
      }
    },
    addPlanePointToView (Points, symbol, title, content) {
      let _this = this
      for (let i in Points) {
        let Point = Points[i]
        content = '<div>飞机号：' + Point.id + '</div>' + '<div>经度：' + Point.X + '</div>' + '<div>纬度：' + Point.Y + '</div>'
        var point = new _this.Point({
          longitude: Point.X,
          latitude: Point.Y,
          spatialReference: _this.view.spatialReference
        })
        // Create a symbol for drawing the point
        var markerSymbol = {
          type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
          declaredClass: 'airClass',
          /* angle: Point.DIRECTION === undefined ? 0 : parseInt(Point.DIRECTION), */
          angle: 0,
          url:
            baseURL +
            'arcgis_js_api/library/4.90/4.9/esri/themes/base/images/' +
            symbol +
            '.png',
          width: '40px',
          height: '40px'
        }
        // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new _this.Graphic({
          geometry: point,
          symbol: markerSymbol,
          popupTemplate: {
            title: title,
            content: content
          }
        })
        if (_this.planeGraphics[Point.id] === undefined) {
          _this.planeGraphics[Point.id] = pointGraphic
        } else {
          _this.view.graphics.remove(_this.planeGraphics[Point.id])
          _this.planeGraphics[Point.id] = pointGraphic
        }
        // Add the graphic to the view
        _this.view.graphics.add(pointGraphic)
      }
    },
    addWarnPointToView (Points, symbol, title, content) {
      let _this = this
      for (let i in Points) {
        let Point = Points[i]
        content = '<div>告警编号：' + Point.id + '</div>' + '<div>经度：' + Point.X + '</div>' + '<div>纬度：' + Point.Y + '</div>'
        var point = new _this.Point({
          longitude: Point.X,
          latitude: Point.Y,
          spatialReference: _this.view.spatialReference
        })
        // Create a symbol for drawing the point
        var markerSymbol = {
          type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
          declaredClass: 'airClass',
          /*
          angle: Point.DIRECTION === undefined ? 0 : parseInt(Point.DIRECTION),
*/
          angle: 0,
          url:
            baseURL +
            'arcgis_js_api/library/4.90/4.9/esri/themes/base/images/' +
            symbol +
            '.png',
          width: '40px',
          height: '40px'
        }
        // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new _this.Graphic({
          geometry: point,
          symbol: markerSymbol,
          popupTemplate: {
            title: title,
            content: content
          }
        })
        if (_this.warnGraphics[Point.id] === undefined) {
          _this.warnGraphics[Point.id] = pointGraphic
        } else {
          _this.view.graphics.remove(_this.warnGraphics[Point.id])
          _this.warnGraphics[Point.id] = pointGraphic
        }
        // Add the graphic to the view
        _this.view.graphics.add(pointGraphic)
      }
    },
    viewReady () {
      let _this = this
      /* let addPointToView = function (Point, symbol, title, content) {
        var point = new _this.Point({
          longitude: Point.LONGITUDE,
          latitude: Point.LATITUDE
        })
        // Create a symbol for drawing the point
        var markerSymbol = {
          type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
          declaredClass: 'airClass',
          angle: Point.DIRECTION,
          url:
            baseURL +
            'arcgis_js_api/library/4.90/4.9/esri/themes/base/images/' +
            symbol +
            '.png',
          width: '240px',
          height: '240px'
        }
        // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new _this.Graphic({
          geometry: point,
          symbol: markerSymbol,
          popupTemplate: {
            title: title,
            content: content
          }
        })
        if (Point.SIMCODE === undefined) {
          return false
        }
        if (_this.pointGraphics[Point.SIMCODE] === undefined) {
          _this.pointGraphics[Point.SIMCODE] = pointGraphic
        } else {
          _this.view.graphics.remove(_this.pointGraphics[Point.SIMCODE])
          _this.pointGraphics[Point.SIMCODE] = pointGraphic
        }
        // Add the graphic to the view
        _this.view.graphics.add(pointGraphic)
      } */
      _this.addPlanePointToView(_this.airPoints, 'car4', '车辆信息')
      _this.addCarPointToView(_this.carPoints, 'airplane', '飞机信息')
      _this.addWarnPointToView(_this.warnPoints, 'alarn_circle', '告警信息')
      /* for (let i in _this.airPoints) {

        addPointToView(
          _this.airPoints[i],
          'raster-symbology-editor-band-combination-color-infrared',
          '飞机信息',
          '飞机信息：' + i
        )
      }
      for (let i in _this.carPoints) {
        addPointToView(
          _this.carPoints[i],
          'raster-symbology-editor-band-combination-color-infrared',
          '车辆信息',
          '车辆信息：' + i
        )
      }
      for (let i in _this.alarmPoints) {
        addPointToView(
          _this.alarmPoints[i],
          'raster-symbology-editor-band-combination-color-infrared',
          '告警',
          'waring'
        )
      } */
    },
    connectWebSocket () {
      let _this = this
      // 初始化一个 WebSocket 对象
      this.ws = new WebSocket(
        'ws://192.168.215.180:8010/Handler1.ashx?user=li'
      )

      // 建立 web socket 连接成功触发事件
      this.ws.onopen = function () {
        // 使用 send() 方法发送数据
        _this.ws.send('发送数据')
      }

      // 接收服务端数据时触发事件
      this.ws.onmessage = function (evt) {
        // var received_msg = evt.data
        let data = JSON.parse(evt.data)
        switch (data.type) {
          case 'car':
            _this.addCarPointToView(data.points, 'car4', '车辆位置')
            break
          case 'plane':
            _this.addPlanePointToView(data.points, 'airplane', '飞机信息')
            break
          case 'warn':
            _this.addWarnPointToView(data.points, 'alarm_circle', '告警信息')
            break
          default:
            break
        }
      }

      // 断开 web socket 连接成功触发事件
      this.ws.onclose = function () {}
    }
  },
  mounted () {
    window.drag(document.getElementById('baseMapChangePanelForGoogle'))
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    } else {
      this.createMapServerPanel()
      this.createMap()
      this.connectWebSocket()
    }

    /*  let _this = this
   setInterval(function () {
      _this.onMessageArrived()
    }, 3000) */
  },
  destroyed () {
    this.ws.close()
  }
}
</script>

<style scoped>
.baseMapChangePanel {
  position: absolute;
  top: 10px;
  right: 5px;
  width: 20em;
  border: 1px solid whitesmoke;
  background: none;
  box-shadow: -3px 3px 2px 2px #907575;
}
.baseMapChangePanel ul {
  text-align: left;
  list-style: none;
  margin: 0;
  padding: 0;
}
.baseMapChangePanel ul li {
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  margin: 5px;
  width: 4em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 2em;
  height: 2em;
  cursor: pointer;
  border: 1px solid whitesmoke;
  box-shadow: -3px 3px 2px 2px #907575;
  background: #10193a7d;
}
</style>
