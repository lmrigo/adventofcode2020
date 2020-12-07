var input = [
`FBFBBFFRLR`
,`BFFFBBFRRR`
,`FFFBBBFRRR`
,`BBFFBBFRLL`
,`FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`
,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var seatsStrings = input[i].split(/\s+/)
    var seatsIds = []

    $.each(seatsStrings,(idx,seat)=>{
      var s = seat.split('')
      // row
      var rtop = 127
      var rbottom = 0
      for (var y = 0; y < 7; y++) {
        var l = s.shift()
        if (l === 'F') {
          rtop -= Math.ceil((rtop-rbottom) / 2)
        } else if (l === 'B') {
          rbottom += Math.ceil((rtop-rbottom) / 2)
        }
      }
      // col
      var ctop = 7
      var cbottom = 0
      for (var y = 0; y < 3; y++) {
        var l = s.shift()
        if (l === 'L') {
          ctop -= Math.ceil((ctop-cbottom) / 2)
        } else if (l === 'R') {
          cbottom += Math.ceil((ctop-cbottom) / 2)
        }
      }
      var sid = (rbottom*8) + cbottom
      // console.log(rbottom,cbottom,sid)
      seatsIds.push(Number(sid))

    })
    seatsIds.sort((a,b)=>{return b-a})
    // console.log(seatsIds)
    var result = seatsIds[0]
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
