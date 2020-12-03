var input = [
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var lines = input[i].split(/\n+/)
    var grid = []
    $.each(lines, (idx, l) => {
      grid[idx] = l.split('')
    })
    // printgrid(grid)

    var curx = 0
    var cury = 0

    //slope right 3 down 1
    var trees = 0

    while (cury < grid.length-1) {
      cury += 1
      curx = (curx + 3) % grid[cury].length
      if (grid[cury][curx] === '#') {
        grid[cury][curx] = 'T'
        trees++
      }
    }
    // printgrid(grid)

    var result = trees
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

var printgrid = function(grid) {
  var str = ''
  for (var i = 0; i < grid[0].length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      str += grid[i][j]
    }
    str += '\n'
  }
  console.log(str)
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
