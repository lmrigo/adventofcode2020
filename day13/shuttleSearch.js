var input = [
`939
7,13,x,x,59,x,31,19`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputStrings = input[i].split(/\s+/)
    var earliest = Number(inputStrings[0])
    var buses = inputStrings[1].split(',').reduce((acc,val) => {
      if (val !== 'x') {
        acc.push(Number(val))
      }
      return acc
    },[])
    buses.sort((a,b)=>{return a-b})
    // console.log(buses)
    var minBusId = null
    var minDiff = Number.MAX_SAFE_INTEGER
    for (var b = 0; b < buses.length; b++) {
      var foundBus = false
      var round = 1
      var busId = null
      var diff = null
      while (!foundBus) {
        if (buses[b]*round - earliest >= 0) {
          foundBus = true
          busId = buses[b]
          diff = (busId*round - earliest)
          break
        }
        round++
      }
      if (minDiff > diff) {
        minDiff = diff
        minBusId = busId
      }
    }

    var result = minDiff * minBusId
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
