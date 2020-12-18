var input = [
`1 + 2 * 3 + 4 * 5 + 6`
,`2 * 3 + (4 * 5)`//26
,`5 + (8 * 3 + 9 + 3 * 4 * 3)`//437
,`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`//12240
,`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`//13632
,`2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`//26335
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numopsStrings = input[i].split(/\n+/)
    var total = 0
    $.each(numopsStrings, (eidx,expr)=> {

      var partial = 0
      var initial = {acc: null, op: null}
      var states = [initial]
      var idx = 0
      while (states.length > 0) {
        var next = states.pop()
        var nChar = expr[idx]
        if (nChar === undefined) {
          partial = next.acc
        } else if (nChar === ' ') {
          idx++
          states.push(next)
          continue
        } else if (nChar.match(/\d/) !== null) {
          var num = Number(nChar)
          if (next.acc === null) {
            next.acc = num
          } else {
            if (next.op === '+') {
              next.acc += num
            } else { // *
              next.acc *= num
            }
            next.op = null
          }
          idx++
          states.push(next)
        } else if (nChar.match(/\+|\*/) !== null) {
          next.op = nChar
          idx++
          states.push(next)
        } else if (nChar === '(') {
          states.push(next)
          idx++
          var newGroup = {acc: null, op: null}
          states.push(newGroup)
        } else if (nChar === ')') {
          var prev = states.pop()
          if (prev.acc === null) {
            prev.acc = next.acc
          } else {
            if (prev.op === '+') {
              prev.acc += next.acc
            } else { // *
              prev.acc *= next.acc
            }
            prev.op = null
          }
          idx++
          states.push(prev)
        }
      }
      total += partial

    })

    var result = total
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
