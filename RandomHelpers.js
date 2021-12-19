function RandPoints(n, maxx, maxy, minx, miny)
{
    let points = new Array(n)
    for (let i = 0; i < n; i++)
    {
        let x = RandomNumber(minx, maxx)
        let y = RandomNumber(miny, maxy)
        points[i] = {x: x, y: y}
    }

    return points
}

function RandomNumber(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min
}
  
  