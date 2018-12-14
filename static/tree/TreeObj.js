var TreeObj
TreeObj = function (id) {
  var TimeFn = null// 延时执行函数
  var _id = id
  var $this = this
  var _DelNode = function (d, fun, obj) {
    fun(d, obj)
  }
  var _AddNode = function (d, fun, obj) {
    var id = guid()
    fun(id, d, obj)
  }
  var root = {
    name: 'flare',
    size: 23,
    children: []
  }
  this.margin = {
    top: 20,
    right: 0,
    bottom: 20,
    left: 0
  }
  this.width = window.screen.width - this.margin.right - this.margin.left,
  this.height = window.screen.height - this.margin.top - this.margin.bottom
  this.data = function (ModelData) {
    if (ModelData != undefined && ModelData.length != undefined && ModelData.length != 0) {
      root = toTreeData(ModelData)[0]
      root.x0 = 0
      root.y0 = this.height / 2
      if (root.children) {
        root.children.forEach(collapse)
      } else {
      }

      return root
    } else {
      root.x0 = 0
      root.y0 = this.height / 2
      if (root.children) {
        root.children.forEach(collapse)
      } else {
      }
      return root
    }
  }
  this.newNodeInfo = {
    treeId: '1',
    parentId: '',
    modelId: '',
    isLeaf: 1,
    treeName: '新节点'

  }// id和name必须有，如果不赋值，我默认id为guid,name为新节点
  this.adFlag = true// -------------增加删除节点图标是否显示,true显示，false不显示
  var i = 0, duration = 750, rectW = 55, rectH = 40// 树设置过程中的全局变量

  var tree = d3.layout.tree().nodeSize([90, 40])
  var diagonal = d3.svg.diagonal()
    .projection(function (d) {
      return [d.x + rectW / 2, d.y + rectH / 2]
    })// 划线的位置

  var zm
  var svg = d3.select('#' + _id).append('svg').attr('width', window.screen.width).attr('height', window.screen.height)
    .call(zm = d3.behavior.zoom().scaleExtent([0.1, 3]).on('zoom', redraw)).append('g')
    .attr('transform', 'translate(' + 350 + ',' + 20 + ')')// 添加画布
  // necessary so that zoom knows where to zoom and unzoom from
  zm.translate([350, 20])
  this.Reload = function () {
    update(this.data())
  }
  this.Refresh = function (currentNode) {
    currentNode.text_ = currentNode.name
    document.getElementById('txt_' + currentNode.id_).setAttribute('title', currentNode.name)
    if (currentNode.name.length > 4) {
      document.getElementById('txt_' + currentNode.id_).textContent = currentNode.name.substring(0, 4)
    } else {
      document.getElementById('txt_' + currentNode.id_).textContent = currentNode.name
    }

    update(currentNode)
  }
  this.Init = function () {
    update(this.data())
  }
  d3.select('#body').style('height', '700px')
  // ------------------------私有方法不对用户开放
  // list型数据转换旧方法存在bug：错误顺序时会丢节点
  function toTreeData_old (data) {
    var pos = {}
    var tree = []
    var i = 0
    while (data.length != 0) {
      if (data[i].pid_ === undefined || data[i].id_ === undefined || data[i].text_ === undefined) {
        data = null
        return false
      }
      if (data[i].pid_ === 0 || data[i].pid_ === '0') {
        var tempnode = Object.assign({
          name: data[i].text_
        }, data[i])
        tree.push(tempnode)
        pos[data[i].id_] = [tree.length - 1]
        data.splice(i, 1)
        i--
      } else {
        var posArr = pos[data[i].pid_]
        if (posArr != undefined) {
          var obj = tree[posArr[0]]
          for (var j = 1; j < posArr.length; j++) {
            obj = obj.children[posArr[j]]
          }
          if (obj.children) {
            var tempnode = Object.assign({
              name: data[i].text_
            }, data[i])

            obj.children.push(tempnode)
          } else {
            obj.children = []
            var tempnode = Object.assign({
              name: data[i].text_
            }, data[i])
            obj.children.push(tempnode)
          }

          pos[data[i].id_] = posArr.concat([obj.children.length - 1])
          data.splice(i, 1)
          i--
        } else {
          data.splice(i, 1)
          i--
        }
      }
      i++
      if (i > data.length - 1) {
        i = 0
      }
    }
    return tree
  }

  // list型数据转换
  function toTreeData (list) {
    function exists (list, parentId) {
      for (var i = 0; i < list.length; i++) {
        if (list[i]['id_'] === parentId) return true
      }
      return false
    }

    var nodes = []
    // get the top level nodes
    for (var i = 0; i < list.length; i++) {
      list[i].name = list[i].text_
      var row = list[i]
      if (!exists(list, row['pid_'])) {
        nodes.push(row)
      }
    }

    var toDo = []
    for (var i = 0; i < nodes.length; i++) {
      toDo.push(nodes[i])
    }
    while (toDo.length) {
      var node = toDo.shift()// the parent node
      // get the children nodes
      for (var i = 0; i < list.length; i++) {
        var row = list[i]
        if (row['pid_'] === node['id_']) {
          // var child = {id:row.id,text:row.name};
          if (node.children) {
            node.children.push(row)
          } else {
            node.children = [row]
          }
          toDo.push(row)
        }
      }
    }
    console.log(nodes)
    return nodes
  }

  // 数据基本处理方法
  function collapse (d) {
    if (d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  }

  // 重绘节点方法
  function update (source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes)

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
      d.y = d.depth * 180
    })

    // Update the nodes…
    var node = svg.selectAll('g.node')
      .data(nodes, function (d) {
        return d.id || (d.id = ++i)
      })
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .call(d3.behavior.drag()
        .on('dragstart', function (d) {
          d3.event.sourceEvent.stopPropagation()
        })
        .on('drag', function (d) {
          //  updateTempConnector();
        }).on('dragend', function (d) {
          // addmark(d, 'click');
        }))
      // .css('cursor',"pointer")
      .attr('transform', function (d) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')'
      }).on('mouseenter', function (d, index) {
        document.getElementById('add_' + d.id + _id).style.setProperty('display', 'block')
        document.getElementById('del_' + d.id + _id).style.setProperty('display', 'block')
      }).on('mouseleave', function (d, index) {
        document.getElementById('del_' + d.id + _id).style.setProperty('display', 'none')
        document.getElementById('add_' + d.id + _id).style.setProperty('display', 'none')
      })

    nodeEnter.append('rect')
      .attr('width', rectW)
      .attr('height', rectH)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .style('fill', function (d) {
        return '#0C2377'
      })
      .on('click', function (d) {
        // 取消上次延时未执行的方法
        clearTimeout(TimeFn)
        // 执行延时
        TimeFn = setTimeout(function () {
          $this.NodeClick(d)
        }, 300)
      })// ---------------------------单击事件
      .on('dblclick', function (d) {
        // 取消上次延时未执行的方法
        if (event.stopPropagation) {
          // 针对 Mozilla 和 Opera
          event.stopPropagation()
        } else if (window.event) {
          // 针对 IE
          window.event.cancelBubble = true
        }
        clearTimeout(TimeFn)
        // 执行双击方法
        $this.NodeDbClick(d)
      })// ----------------------------双击事件

    nodeEnter.append('image')
      .attr('class', 'opened')
      .attr('width', 102 * rectW / 100)
      .attr('height', 2 * rectH / 3)

      .style('fill', function (d) {
        return '#152053'
      })
      .attr('xlink:href', function (d) {
        if ($this.adFlag === true && d.depth < 120) {
          if (d._children) {
            return './static/tree/d3-v3/Images/tree_icon_bottom.png'
          } else {
            return './static/tree/d3-v3/Images/tree_icon_bottom_none.png'
          }
        }
      })
      .attr('x', 0)
      .attr('y', rectH)
      .on('click', function (d) {
        // 取消上次延时未执行的方法
        clearTimeout(TimeFn)
        // 执行延时
        TimeFn = setTimeout(function () {
          click(d)
        }, 300)
      })// ---------------------------单击事件
    nodeEnter.append('text')
      .attr('x', rectW / 2)
      .attr('y', rectH / 2)
      .attr('id', function (d) {
        if (d.id_ === undefined) {
          console.log('没有主键')
        }
        return 'txt_' + d.id_
      })
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('title', function (d) {
        return d.name
      })
      .attr('alt', function (d) {
        return d.name
      })
      .on('mouseover', function (d) {
        if (d.name.length > 4) {
          titleMouseOver(this, event, 50)
        }
      })
      .style('fill', function (d) {
        return 'white'
      })
      .on('mouseout', function (d) {
        titleMouseOut(this)
      })
      .text(function (d) {
        if (d.name.length > 4) {
          return d.name.substring(0, 4)
        } else {
          return d.name
        }
      })
      .on('click', function (d) {
        // 取消上次延时未执行的方法
        clearTimeout(TimeFn)
        // 执行延时
        TimeFn = setTimeout(function () {
          $this.NodeClick(d)
        }, 300)
      })// ------------------------------单击事件
      .on('dblclick', function (d) {
        // 取消上次延时未执行的方法
        if (event.stopPropagation) {
          // 针对 Mozilla 和 Opera
          event.stopPropagation()
        } else if (window.event) {
          // 针对 IE
          window.event.cancelBubble = true
        }
        clearTimeout(TimeFn)
        // 执行双击方法
        $this.NodeDbClick(d)
      })// ----------------------------双击事件
    nodeEnter.append('image')
      .attr('class', 'n_add')
      .attr('width', 32)
      .attr('height', 32)

      .style('fill', function (d) {
        return '#152053'
      })
      .attr('xlink:href', function (d) {
        if ($this.adFlag === true && d.depth < 120) {
          return './static/tree/d3-v3/Images/add1.png'
        }
      })
      .attr('id', function (d) {
        return 'add_' + d.id + _id
      })
      .attr('x', function (d) {
        return rectW / 2
      })
      .on('click', function (d) {
        if ($this.adFlag === true) {
          _AddNode(d, $this.AddNode, $this)
        }
      })// -----------------------------------------添加节点操作
      .attr('y', function (d) {
        return -4 * rectH / 5
      })
    nodeEnter.append('image')
      .attr('class', 'n_del')
      .attr('width', 32)
      .attr('height', 32)

      .style('fill', function (d) {
        return '#152053'
      })
      .attr('xlink:href', function (d) {
        if (d.pid_ !== '0' && d.pid_ !== 0 && $this.adFlag === true) {
          return './static/tree/d3-v3/Images/del1.png'
        }
      })
      .attr('id', function (d) {
        return 'del_' + d.id + _id
      })

      .on('click', function (d) {
        if (d.pid_ === '0' || d.pid_ === 0 || $this.adFlag === false) { return false }
        _DelNode(d, $this.DelNode, $this)
        update(root)
        event.stopPropagation()
      })// --------------------------------------------------------------------------------------------------删除节点操作
      .attr('x', function (d) {
        return -rectW / 10
      })
      .attr('y', function (d) {
        return -4 * rectH / 5
      })
    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')'
      })

    nodeUpdate.select('rect')
      .attr('width', rectW)
      .attr('height', rectH)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .style('fill', function (d) {
        return '#0C2377'
      })
    nodeUpdate.select('image.opened')
      .attr('xlink:href', function (d) {
        if ($this.adFlag === true && d.depth < 120) {
          if (d._children) {
            return './static/tree/d3-v3/Images/tree_icon_bottom.png'
          } else {
            return './static/tree/d3-v3/Images/tree_icon_bottom_none.png'
          }
        }
      })

    nodeUpdate.select('text')
      .style('fill-opacity', 1)

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + source.x + ',' + source.y + ')'
      })
      .remove()

    nodeExit.select('rect')
      .attr('width', rectW)
      .attr('height', rectH)
      // .attr("width", bbox.getBBox().width)""
      // .attr("height", bbox.getBBox().height)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)

    nodeExit.select('text')

    // Update the links…
    var link = svg.selectAll('path.link')
      .data(links, function (d) {
        return d.target.id
      })

    // Enter any new links at the parent's previous position.
    link.enter().insert('path', 'g')
      .attr('class', 'link')
      .attr('x', rectW / 2)
      .attr('y', rectH / 2)
      .attr('d', function (d) {
        var o = {
          x: source.y0,
          y: source.x0
        }
        return diagonal({
          source: o,
          target: o
        })
      })

    // Transition links to their new position.
    link.transition()
      .duration(duration)
      .attr('d', diagonal)

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(duration)
      .attr('d', function (d) {
        var o = {
          x: source.x,
          y: source.y
        }
        return diagonal({
          source: o,
          target: o
        })
      })
      .remove()

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.y
      d.y0 = d.x
    })
  }

  // 添加节点
  var index = 100
  this.addSubTable = function (currentNode) {
    var s = guid()
    var o1 = {
      id: s,
      id_: s,
      parentId: currentNode.id_,
      children: null
    }
    var newNode = Object.assign({}, o1, $this.newNodeInfo)
    if (!currentNode.children) {
      if (!currentNode._children) {
        currentNode.children = []
        currentNode.children.push(newNode)
      } else {
        currentNode._children.push(newNode)
      }
    } else {
      currentNode.children.push(newNode)
    }
    var rootNode = currentNode
    while (rootNode.parent) {
      rootNode = rootNode.parent
    }
    update(rootNode)
  }
  // 删除节点
  this.removeTable = function (currentNode) {
    // 删除节点的孩子
    if (currentNode.children) {
      currentNode.children = null
    }
    var currentNodeId = currentNode.id
    var currentNodeParent = currentNode.parent
    if (currentNodeParent) { // 如果节点有父类，删除节点本身，保留其他节点信息
      for (var i = 0; i < currentNodeParent.children.length; i++) {
        if (currentNodeParent.children[i].id === currentNodeId) {
          currentNodeParent.children.splice(i, 1)
        }
      }
    } else {
      currentNode = currentNode
    }
    var rootNode = currentNode
    if (rootNode) {
      while (rootNode.parent) {
        rootNode = rootNode.parent
      }
      update(rootNode)
    }
  }

  // Redraw for zoom放大缩小重绘
  function redraw () {
    // console.log("here", d3.event.translate, d3.event.scale);
    svg.attr('transform', 'translate(' + d3.event.translate + ')' + 'scale(' + d3.event.scale + ')')
  }

  // Toggle children on click.//展开闭合点击
  function click (d) {
    if (d.children) {
      d._children = d.children
      d.children = null
    } else {
      d.children = d._children
      d._children = null
    }
    update(d)
  }

  // 生成GUID做主键
  function guid () {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }

  /**
   * 鼠标悬停显示TITLE
   * @params     obj        当前悬停的标签
   *
   */
  function titleMouseOver (obj, event, words_per_line) {
    try {
      obj.title = obj.attributes['title'].value
    } catch (e) {
      obj.title = ''
    }

    // 无TITLE悬停，直接返回
    if (typeof obj.title === 'undefined' || obj.title === '') return false
    // 不存在title_show标签则自动新建
    var title_show = document.getElementById('title_show')
    if (title_show == null) {
      title_show = document.createElement('div') // 新建Element
      document.getElementsByTagName('body')[0].appendChild(title_show) // 加入body中
      var attr_id = document.createAttribute('id') // 新建Element的id属性
      attr_id.nodeValue = 'title_show' // 为id属性赋值
      title_show.setAttributeNode(attr_id) // 为Element设置id属性

      var attr_style = document.createAttribute('style') // 新建Element的style属性
      attr_style.nodeValue = 'position:absolute;' + // 绝对定位
        'border:solid 1px #999999; background:#0c2377;' + // 边框、背景颜色
        'border-radius:2px;box-shadow:2px 3px #999999;color:red' + // 圆角、阴影
        'line-height:2em;' + // 行间距
        'font-size:12px; padding: 3px 7px;color:white;' // 字体大小、内间距颜色
      try {
        title_show.setAttributeNode(attr_style) // 为Element设置style属性
      } catch (e) {
        // IE6
        title_show.style.position = 'absolute'
        title_show.style.border = 'solid 1px #999999'
        title_show.style.background = '#EDEEF0'
        title_show.style.lineHeight = '2em'
        title_show.style.fontSize = '18px'
        title_show.style.padding = '2px 5px'
      }
    }
    // 存储并删除原TITLE
    document.title_value = obj.title
    obj.title = ''
    // 单行字数未设定，非数值，则取默认值50
    if (typeof words_per_line === 'undefined' || isNaN(words_per_line)) {
      words_per_line = 50
    }
    // 格式化成整形值
    words_per_line = parseInt(words_per_line)
    // 在title_show中按每行限定字数显示标题内容，模拟TITLE悬停效果
    title_show.innerHTML = split_str(document.title_value, words_per_line)
    // 显示悬停效果DIV
    title_show.style.display = 'block'

    // 根据鼠标位置设定悬停效果DIV位置
    var event = event || window.event // 鼠标、键盘事件
    var top_down = -45 // 下移15px避免遮盖当前标签
    // 最左值为当前鼠标位置 与 body宽度减去悬停效果DIV宽度的最小值，否则将右端导致遮盖
    var left = Math.min(event.clientX, document.body.clientWidth - title_show.clientWidth)
    title_show.style.left = event.clientX - 5 + 'px' // 设置title_show在页面中的X轴位置。
    title_show.style.top = (event.clientY + top_down) + 'px' // 设置title_show在页面中的Y轴位置。
  }

  /**
   * 鼠标离开隐藏TITLE
   * @params    obj        当前悬停的标签
   *
   */
  function titleMouseOut (obj) {
    var title_show = document.getElementById('title_show')
    // 不存在悬停效果，直接返回
    if (title_show == null) return false
    // 存在悬停效果，恢复原TITLE
    obj.title = document.title_value
    // 隐藏悬停效果DIV
    title_show.style.display = 'none'
  }

  /**
   * JS字符切割函数
   * @params     string                原字符串
   * @params    words_per_line        每行显示的字符数
   */
  function split_str (string, words_per_line) {
    // 空串，直接返回
    if (typeof string === 'undefined' || string.length === 0) return ''
    // 单行字数未设定，非数值，则取默认值50
    if (typeof words_per_line === 'undefined' || isNaN(words_per_line)) {
      words_per_line = 50
    }
    // 格式化成整形值
    words_per_line = parseInt(words_per_line)
    // 取出i=0时的字，避免for循环里换行时多次判断i是否为0
    var output_string = string.substring(0, 1)
    // 循环分隔字符串
    for (var i = 1; i < string.length; i++) {
      // 如果当前字符是每行显示的字符数的倍数，输出换行
      if (i % words_per_line === 0) {
        output_string += '<br/>'
      }
      // 每次拼入一个字符
      output_string += string.substring(i, i + 1)
    }
    return output_string
  }

  function findChildrens (currentNode) {
    var allNodes = new Array() // 当前结点的子节点数组
    allNodes.push(currentNode)
    var curnodeChildren // 当前结点的子节点数组
    if (currentNode.children) {
      curnodeChildren = currentNode.children
    } else if (currentNode._children) {
      curnodeChildren = currentNode._children
    } else {
      return allNodes
    }
    for (var i in curnodeChildren) {
      var ll = findChildrens(curnodeChildren[i])
      allNodes.push.apply(allNodes, ll)
    }
    return allNodes
  }

  this.CurnodeAndChildrens = function (currentNode) {
    var allnodes = findChildrens(currentNode)
    return allnodes
  }
}// 树对象
TreeObj.prototype = {
  AddNode: function (id, curnode, that) {
    alert('请实现新增方法，当前新生成主键为：' + id + '当前节点信息：请看调试的console' + '---此对话框消失后添加的节点不会存到数据库，刷新页面即可消失')
    that.addSubTable(curnode)
  },
  DelNode: function (curnode, that) {
    alert('请实现删除方法，' + '当前节点信息：请看调试的console' + '---此对话框消失后删除的节点不会从数据库删除，刷新页面即可看到')
    that.removeTable(curnode)
  },
  NodeDbClick: function (d) {
    alert('节点双击')
    console.log(d)
  },
  NodeClick: function (d) {
    alert('节点单击，请在外部实现数据操作')
    console.log(d)
  }
}// 树对象需要外部实现的接口

export default TreeObj

// root是树结构内部使用的数据样例为：

// var root = {
//    name: "flare",
//    "size": 23,
//    "children": [{
//        "name": "analytics",
//        "children": [{
//            "name": "cluster",
//            "children": [{
//                "name": "AgglomerativeCluster",
//                "size": 3938
//            }, {
//                "name": "CommunityStructure",
//                "size": 3812
//            }, {
//                "name": "HierarchicalCluster",
//                "size": 6714
//            }, {
//                "name": "MergeEdge",
//                "size": 743
//            }]
//        }, {
//            "name": "graph",
//            "children": [{
//                "name": "BetweennessCentrality",
//                "size": 3534
//            }, {
//                "name": "LinkDistance",
//                "size": 5731
//            }, {
//                "name": "MaxFlowMinCut",
//                "size": 7840
//            }, {
//                "name": "ShortestPaths",
//                "size": 5914
//            }, {
//                "name": "SpanningTree",
//                "size": 3416
//            }]
//        }, {
//            "name": "optimization",
//            "children": [{
//                "name": "AspectRatioBanker",
//                "size": 7074
//            }]
//        }]
//    }, {
//        "name": "scale",
//        "children": [{
//            "name": "IScaleMap",
//            "size": 2105
//        }, {
//            "name": "LinearScale",
//            "size": 1316
//        }, {
//            "name": "LogScale",
//            "size": 3151
//        }, {
//            "name": "OrdinalScale",
//            "size": 3770
//        }, {
//            "name": "QuantileScale",
//            "size": 2435
//        }, {
//            "name": "QuantitativeScale",
//            "size": 4839
//        }, {
//            "name": "RootScale",
//            "size": 1756
//        }, {
//            "name": "Scale",
//            "size": 4268
//        }, {
//            "name": "ScaleType",
//            "size": 1821
//        }, {
//            "name": "TimeScale",
//            "size": 5833
//        }]
//    }, {
//        "name": "vis",
//        "children": [{
//            "name": "axis",
//            "children": [{
//                "name": "Axes",
//                "size": 1302
//            }, {
//                "name": "Axis",
//                "size": 24593
//            }, {
//                "name": "AxisGridLine",
//                "size": 652
//            }, {
//                "name": "AxisLabel",
//                "size": 636
//            }, {
//                "name": "CartesianAxes",
//                "size": 6703
//            }]
//        }, {
//            "name": "controls",
//            "children": [{
//                "name": "AnchorControl",
//                "size": 2138
//            }, {
//                "name": "ClickControl",
//                "size": 3824
//            }, {
//                "name": "Control",
//                "size": 1353
//            }, {
//                "name": "ControlList",
//                "size": 4665
//            }, {
//                "name": "DragControl",
//                "size": 2649
//            }, {
//                "name": "ExpandControl",
//                "size": 2832
//            }, {
//                "name": "HoverControl",
//                "size": 4896
//            }, {
//                "name": "IControl",
//                "size": 763
//            }, {
//                "name": "PanZoomControl",
//                "size": 5222
//            }, {
//                "name": "SelectionControl",
//                "size": 7862
//            }, {
//                "name": "TooltipControl",
//                "size": 8435
//            }]
//        }, {
//            "name": "data",
//            "children": [{
//                "name": "Data",
//                "size": 20544
//            }, {
//                "name": "DataList",
//                "size": 19788
//            }, {
//                "name": "DataSprite",
//                "size": 10349
//            }, {
//                "name": "EdgeSprite",
//                "size": 3301
//            }, {
//                "name": "NodeSprite",
//                "size": 19382
//            }, {
//                "name": "render",
//                "children": [{
//                    "name": "ArrowType",
//                    "size": 698
//                }, {
//                    "name": "EdgeRenderer",
//                    "size": 5569
//                }, {
//                    "name": "IRenderer",
//                    "size": 353
//                }, {
//                    "name": "ShapeRenderer",
//                    "size": 2247
//                }]
//            }, {
//                "name": "ScaleBinding",
//                "size": 11275
//            }, {
//                "name": "Tree",
//                "size": 7147
//            }, {
//                "name": "TreeBuilder",
//                "size": 9930
//            }]
//        }, {
//            "name": "events",
//            "children": [{
//                "name": "DataEvent",
//                "size": 2313
//            }, {
//                "name": "SelectionEvent",
//                "size": 1880
//            }, {
//                "name": "TooltipEvent",
//                "size": 1701
//            }, {
//                "name": "VisualizationEvent",
//                "size": 1117
//            }]
//        }, {
//            "name": "legend",
//            "children": [{
//                "name": "Legend",
//                "size": 20859
//            }, {
//                "name": "LegendItem",
//                "size": 4614
//            }, {
//                "name": "LegendRange",
//                "size": 10530
//            }]
//        }, {
//            "name": "operator",
//            "children": [{
//                "name": "distortion",
//                "children": [{
//                    "name": "BifocalDistortion",
//                    "size": 4461
//                }, {
//                    "name": "Distortion",
//                    "size": 6314
//                }, {
//                    "name": "FisheyeDistortion",
//                    "size": 3444
//                }]
//            }, {
//                "name": "encoder",
//                "children": [{
//                    "name": "ColorEncoder",
//                    "size": 3179
//                }, {
//                    "name": "Encoder",
//                    "size": 4060
//                }, {
//                    "name": "PropertyEncoder",
//                    "size": 4138
//                }, {
//                    "name": "ShapeEncoder",
//                    "size": 1690
//                }, {
//                    "name": "SizeEncoder",
//                    "size": 1830
//                }]
//            }, {
//                "name": "filter",
//                "children": [{
//                    "name": "FisheyeTreeFilter",
//                    "size": 5219
//                }, {
//                    "name": "GraphDistanceFilter",
//                    "size": 3165
//                }, {
//                    "name": "VisibilityFilter",
//                    "size": 3509
//                }]
//            }, {
//                "name": "IOperator",
//                "size": 1286
//            }, {
//                "name": "label",
//                "children": [{
//                    "name": "Labeler",
//                    "size": 9956
//                }, {
//                    "name": "RadialLabeler",
//                    "size": 3899
//                }, {
//                    "name": "StackedAreaLabeler",
//                    "size": 3202
//                }]
//            }, {
//                "name": "layout",
//                "children": [{
//                    "name": "AxisLayout",
//                    "size": 6725
//                }, {
//                    "name": "BundledEdgeRouter",
//                    "size": 3727
//                }, {
//                    "name": "CircleLayout",
//                    "size": 9317
//                }, {
//                    "name": "CirclePackingLayout",
//                    "size": 12003
//                }, {
//                    "name": "DendrogramLayout",
//                    "size": 4853
//                }, {
//                    "name": "ForceDirectedLayout",
//                    "size": 8411
//                }, {
//                    "name": "IcicleTreeLayout",
//                    "size": 4864
//                }, {
//                    "name": "IndentedTreeLayout",
//                    "size": 3174
//                }, {
//                    "name": "Layout",
//                    "size": 7881
//                }, {
//                    "name": "NodeLinkTreeLayout",
//                    "size": 12870
//                }, {
//                    "name": "PieLayout",
//                    "size": 2728
//                }, {
//                    "name": "RadialTreeLayout",
//                    "size": 12348
//                }, {
//                    "name": "RandomLayout",
//                    "size": 870
//                }, {
//                    "name": "StackedAreaLayout",
//                    "size": 9121
//                }, {
//                    "name": "TreeMapLayout",
//                    "size": 9191
//                }]
//            }, {
//                "name": "Operator",
//                "size": 2490
//            }, {
//                "name": "OperatorList",
//                "size": 5248
//            }, {
//                "name": "OperatorSequence",
//                "size": 4190
//            }, {
//                "name": "OperatorSwitch",
//                "size": 2581
//            }, {
//                "name": "SortOperator",
//                "size": 2023
//            }]
//        }, {
//            "name": "Visualization",
//            "size": 16540
//        }]
//    }]
// };
