var input = [
`0,3,6`//436
,`1,3,2`//1
,`2,1,3`//10
,`1,2,3`//27
,`2,3,1`//78
,`3,2,1`//438
,`3,1,2`//1836
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(',')
    var numbers = $.map(numberStrings, (val => {return Number(val)}))
    var memory = {}
    for (var n = 0; n < numbers.length; n++) {
      memory[numbers[n]] = {
        last:n+1, // turn
        prev: n+1
      }
    }

    var timeout = 1*1000*1000
    var limit = 2020
    var turn = numbers.length+1
    var lastSpoken = numbers[numbers.length-1]
    while (turn <= limit && timeout-- > 0) {
      // decide what to speak based on last spoken
      var speak = undefined
      if (memory[lastSpoken].last === memory[lastSpoken].prev) {
        speak = 0
      } else {
        speak = (turn-1) - memory[lastSpoken].prev
      }

      // actually speak
      if (memory[speak] === undefined) {
        memory[speak] = {}
        memory[speak].last = turn
        memory[speak].prev = turn
      } else if (memory[speak].last === memory[speak].prev) {
        //memory[speak].prev = memory[speak].last
      }
      memory[speak].prev = memory[speak].last
      memory[speak].last = turn
      // console.log(turn,speak)

      lastSpoken = speak
      turn++
    }
    if (timeout < 0) {
      console.log('timeout!')
    }

    var result = lastSpoken
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
