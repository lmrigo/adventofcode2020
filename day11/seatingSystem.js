var input = [
`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var seatStrings = input[i].split(/\s+/)
    var grid=[]
    $.each(seatStrings, (idx,line)=>{
      grid[idx]=line.split('')
    })
    // console.log(grid)

    var calcAdj = function(si,sj) {
      var adj = ''
        + (si > 0 ? (grid[si-1][sj-1] + grid[si-1][sj] + grid[si-1][sj+1]) : '')
        + grid[si][sj-1] +  grid[si][sj+1]
        + (si < grid.length-1 ? (grid[si+1][sj-1] + grid[si+1][sj] + grid[si+1][sj+1]) : '')
      return adj
    }

    var iterations = 0
    var limit = 5000
    var lastOcc = 0
    var repetitions = 0
    while (iterations++ < limit && repetitions < 50) {
      var newGrid=[]
      $.each(grid, (idx,line)=>{
        newGrid[idx]=line.slice()
      })
      var occ = 0
      for (var si = 0; si < grid.length; si++) {
        for (var sj = 0; sj < grid.length; sj++) {
          if (grid[si][sj] === 'L') {
          // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
            var adjacency = calcAdj(si,sj)
            if (!adjacency.includes('#')) {
              newGrid[si][sj] = '#'
              occ++
            }
          } else if (grid[si][sj] === '#') {
          // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
            var adjacency = calcAdj(si,sj)
            if ((adjacency.match(/#/g) || []).length >= 4) {
              newGrid[si][sj] = 'L'
            } else {
              occ++
            }
          } else {
            // Otherwise, the seat's state does not change.
          }
        }
      }
      if (occ === lastOcc) {
        repetitions++
      }
      lastOcc = occ
      grid = newGrid
      newGrid = null
    }

    if (iterations > limit) {
      console.log('estourou!')
    }

    var occupied = grid.reduce((acc1,val1)=>{
      return acc1 + val1.reduce((acc2,val2)=>{
        return acc2 + (val2 === '#' ? 1 : 0)
      },0)
    },0)

    var result = occupied
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
