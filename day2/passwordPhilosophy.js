var input = [
`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputStrings = input[i].split(/\n/)
    var valid = 0
    $.each(inputStrings, (idx,val) => {
      var splitted = val.split(/\s+/)
      var policy = splitted[0].split(/-+/)
      var pmin = Number(policy[0])
      var pmax = Number(policy[1])
      var letter = splitted[1].substr(0,1)
      var password = splitted[2].split('')
      var filtered = password.filter((x)=>{return x==letter})
      var occurrences = filtered.length
      if (pmin <= occurrences && occurrences <= pmax) {
        valid++
      }
    })

    var result = valid
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
