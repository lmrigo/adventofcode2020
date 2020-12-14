var input = [
`939
7,13,x,x,59,x,31,19` // 1068781
,`1
17,x,13,19` // 3417
,`1
67,7,59,61` // 754018
,`1
67,x,7,59,61` // 779210
,`1
67,7,x,59,61` // 1261476
,`1
1789,37,47,1889` // 1202161486
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
    var inputStrings = input[i].split(/\s+/)
    var buses = $.map(inputStrings[1].split(','), (val => {
      if (val !== 'x') {
        return Number(val)
      }
      return val
    }))
    // console.log(buses)

/*
    var maxBus = buses.reduce((acc,val) => {
      if (val === 'x') {
        return acc
      }
      return acc > val ? acc : val
    })
    var maxBusIdx = buses.indexOf(maxBus)

    // Works but it's slow for the giant input
    var foundCombo = false
    var timestamp = -1
    var round = 1
    var timeout = 1*1000*1000
    while (!foundCombo && timeout-- > 0) {
      var time = round*maxBus

      var okCount = 0
      for (var b = 0; b < buses.length; b++) {
        if (buses[b] === 'x'
          || ((time - (maxBusIdx-b)) % buses[b] === 0)) {
          okCount++
        }
      }
      if (okCount === buses.length) {
        foundCombo = true
        timestamp = time - maxBusIdx
      }
      round++
    }
*/

    // heavily based on a solution from reddit (SilverDrake11)
    var timestamp = 1
    var offset = 1
    for (var b = 0; b < buses.length; b++) {
      if (buses[b] === 'x') {
        continue
      }
      var timeout = 1*1000*1000
      while (timeout-- > 0) {
        if ((timestamp + b) % buses[b] === 0) {
          offset *= buses[b]
          break
        }
        timestamp += offset
      }
    }

    var result = timestamp
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
