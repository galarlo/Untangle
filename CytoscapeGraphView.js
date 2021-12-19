var n = 10
var maxx = 100
var points = RandPoints(10, maxx, maxx, 0, 0)
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
cytoscape({
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
  