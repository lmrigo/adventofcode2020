var input = [
`1721
979
366
299
675
1456`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)
    var numbers = $.map(numberStrings, (val => {return Number(val)}))

    var num1 = -1
    var num2 = -1
    for (var n = 0; n < numbers.length; n++) {
      var num1 = numbers[n]
      var other = 2020 - num1
      var found = numbers.find((x)=>{return x===other})
      if (found === other) {
        num2 = other
        break
      }
    }

    var numsMult = num1 * num2
    console.log(num1,num2,numsMult)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(numsMult)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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
