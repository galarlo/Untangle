const urlParams = new URLSearchParams(window.location.search);
var layouts = ['cose', 'cose', 'circle', 'concentric', 'random', 'random']
var layout = urlParams.get('layout') || randItem(layouts)
var n = urlParams.get('n') || 10
var maxx = 100
var points = RandPoints(n, maxx, maxx, 0, 0)
var bbox = { xl: 0, xr: maxx, yt: 0, yb: maxx };

const voronoi = new Voronoi();
var diagram = voronoi.compute(points, bbox)
console.log(diagram)

var vas = diagram.edges.map(edge => {
  return {
    data: {
      id: edge.va.x + edge.va.y + "", 
      x: edge.va.x,
      y: edge.va.y,
    }
  }
});

var vbs = diagram.edges.map(edge => {
  return {
    data: {
      id: edge.vb.x + edge.vb.y + "",
      x: edge.vb.x,
      y: edge.vb.y,
    }
  }
});

var vertices = [...new Set(vas.concat(vbs))]
console.log(vertices)

var edges = diagram.edges.map(edge => {
  return {
    data: {
      id: edge.va.x + edge.va.y + edge.vb.x + edge.vb.y,
      source: edge.va.x + edge.va.y + "",
      target: edge.vb.x + edge.vb.y + ""
    }
  }
})
console.log(edges)

var container = document.getElementById('cy')
var cy = cytoscape({
    container,
  
    elements: {
      nodes: vertices,
      edges: edges
    },
  
    layout: {
      name: layout,
    },
});

var colorsPalletes = [
  ["#22577A", "#38A3A5", "#57CC99", "#80ED99"],
  ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
  ["#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8","#48cae4","#90e0ef","#ade8f4", "#caf0f8"]
]
var colors = randItem(colorsPalletes)
for (const vertex of vertices) {
  var color = randItem(colors)
  cy.style().selector(select(vertex.data.id)).style({
    'background-fill': 'radial-gradient',
    'background-gradient-stop-colors': color + " " + shadeColor(color, -10) + " " + shadeColor(color, -50),
    // 'background-gradient-stop-positions': '0% 95%'
  }).update()
}

cy.style().selector("edge").style({
  'line-fill': 'linear-gradient',
  'line-gradient-stop-colors': edge =>
  {
    return getColor(edge.data().source) + " " + getColor(edge.data().target)
  }
}).update()
console.log(cy.style().json())

cy.on('dragfreeon', 'node', e => {
  if (isWin())
  {
    alert("you won!!")
  }
})

function isWin()
{
  var edges = cy.edges()
  for (const edge1 of edges) {
    var a1 = cy.nodes("[id = \"" + edge1.data().source.replace('.', '\.') + "\"]").renderedPosition()
    var b1 = cy.nodes("[id = \"" + edge1.data().target.replace('.', '\.') + "\"]").renderedPosition()
    for (const edge2 of edges) {
      if (edge1 == edge2) continue
      
      var a2 = cy.nodes("[id = \"" + edge2.data().source.replace('.', '\.') + "\"]").renderedPosition()
      var b2 = cy.nodes("[id = \"" + edge2.data().target.replace('.', '\.') + "\"]").renderedPosition()
      if (intersect(a1.x, a1.y, b1.x, b1.y, a2.x, a2.y, b2.x, b2.y) != false)
      {
        return false
      }
    }
  }
  return true
}

function getColor(nodeId)
{
  var nodecolors = cy.$(select(nodeId)).style('background-gradient-stop-colors').split(' ')
  var lastColor = nodecolors[1]
  console.log(lastColor)
  return lastColor
}