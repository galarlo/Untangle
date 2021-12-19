var n = 3
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
      y: edge.va.y
    }
  }
});

var vbs = diagram.edges.map(edge => {
  return {
    data: {
      id: edge.vb.x + edge.vb.y + "",
      x: edge.vb.x,
      y: edge.vb.y
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
  
    // layout: {
    //   name: 'grid',
    //   rows: 1
    // },
  
    // so we can see the ids
    // style: [
    //   {
    //     selector: 'node',
    //     style: {
    //       'label': 'data(id)'
    //     }
    //   }
    // ]
});

console.log(cy.data)

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