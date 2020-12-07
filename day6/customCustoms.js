var input = [
`abc

a
b
c

ab
ac

a
a
a
a

b`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var groupStrings = input[i].split(/\n\n/)
    // console.log(groupStrings)
    var yesCount = 0
    for (var g = 0; g < groupStrings.length; g++) {
      var gMembers = groupStrings[g].split(/\s+/)
      var answers = {}
      $.each(gMembers, (idx,val) => {
        var member = val.split(/\s+/)
        $.each(member, (idx2,m) => {
          var questions = m.split('')
          $.each(questions,(idx3,q) => {
            answers[q] = true
          })
        })
      })
      yesCount += Object.keys(answers).length
    }

    var result = yesCount
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
