var input = [
`.#.
..#
###`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var cubeStrings = input[i].split(/\s+/)

    var x1,x2,y1,y2,z1,z2
    x1 = x2 = y1 = y2 = z1 = z2 = 0

    var grid=[]
    $.each(cubeStrings, (idx,line)=>{
      var cells = line.split('')
      grid[idx] = []
      $.each(cells,(idx2,cell)=> {
        if (cell === '#') {
          grid[idx][idx2] = ['#']
          if (idx < x1) x1 = idx
          if (idx > x2) x2 = idx
          if (idx2 < y1) y1 = idx2
          if (idx2 > y2) y2 = idx2
        } else {
          grid[idx][idx2] = ['.']
        }
      })
    })
    // console.log(grid)
    // console.log(x1,x2,y1,y2,z1,z2)

    var calcAdj = function(ci,cj,ck) {
      var adj = ''
       for (var ai = ci-1; ai <= ci+1; ai++) {
        if (grid[ai] === undefined) {
          grid[ai] = []
        }
        for (var aj = cj-1; aj <= cj+1; aj++) {
          if (grid[ai][aj] === undefined) {
            grid[ai][aj] = []
          }
          for (var ak = ck-1; ak <= ck+1; ak++) {
            if ((ai === ci) && (aj === cj) && (ak === ck)) {
              continue // skip the source position
            }
            if (grid[ai][aj][ak] !== undefined) {
              adj += grid[ai][aj][ak]
            } else {
              adj += ''
            }
          }
        }
      }
      return adj
    }

    //TODO: ajustar limites dos fors. por exemplo length + 1
    var cycle = function (i1,i2,j1,j2,k1,k2) {
      var newGrid = []
      for (var si = i1; si < i2; si++) {
        newGrid[si] = []
        if (grid[si] === undefined) {
          grid[si] = []
        }
        newGrid[si] = []
        for (var sj = j1; sj < j2; sj++) {
          newGrid[si][sj] = []
          if (grid[si][sj] === undefined) {
            grid[si][sj] = []
          }
          for (var sk = k1; sk < k2; sk++) {
            // console.log(si,sj,sk)
            var adjacency = calcAdj(si,sj,sk)
            var activeNeighbours = (adjacency.match(/#/g) || []).length
            // If a cube is active
            if (grid[si][sj][sk] === '#') {
              //  and exactly 2 or 3 of its neighbors are also active,
              if (activeNeighbours === 2 || activeNeighbours === 3) {
                // the cube remains active.
                newGrid[si][sj][sk] = '#'
              } else {
                // Otherwise, the cube becomes inactive.
                newGrid[si][sj][sk] = '.'
              }
            } else { // If a cube is inactive
              // but exactly 3 of its neighbors are active,
              if (activeNeighbours === 3) {
                // the cube becomes active.
                newGrid[si][sj][sk] = '#'
              } else {
                // Otherwise, the cube remains inactive.
                newGrid[si][sj][sk] = '.'
              }
            }

          }
        }
      }
      return newGrid
    }

    var totalCycles = 6
    var c = 0
    while (c++ < totalCycles) {
      grid = cycle(x1-c,x2+c+1,y1-c,y2+c+1,z1-c,z2+c+1)
    }
    // console.log(grid)

    var printZ0 = function() {
      var str = ''
      for (var gi = x1-c+1; gi < grid.length; gi++) {
        for (var gj = y1-c+1; gj < grid[gi].length; gj++) {
          str += grid[gi][gj][0]
        }
        str += '\n'
      }
      console.log(str)
    }
    // printZ0()

    var sum = 0
    for (var gi = x1-c+1; gi < grid.length; gi++) {
      for (var gj = y1-c+1; gj < grid[gi].length; gj++) {
        for (var gk = z1-c+1; gk < grid[gi][gj].length; gk++) {
          sum += (grid[gi][gj][gk] === '#' ? 1 : 0)
        }
      }
    }

    var result = sum
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)
    var numbers = $.map(numberStrings, (val => {return Number(val)}))

    var result = 0
    // console.log(result)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
