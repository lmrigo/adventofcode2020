var input = [
`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0` // 165
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputStrings = input[i].split(/\n+/)
    var mask = ''
    var memory = {}
    for (var m = 0; m < inputStrings.length; m++) {
      var line = inputStrings[m].split(/\s+/)
      if (line[0] === 'mask') {
        mask = line[2]
      } else {
        var memIdx = line[0].split(/\[|\]/)[1]
        var val = Number(line[2])
        var valBinStr = (val >>> 0).toString(2).padStart(36,'0')
        if (valBinStr.length>36) {
          console.log('opaaa', val)
        }
        // apply mask to val
        var newValBinStr = ''
        // for (var b = mask.length - 1; b >= 0; b--) {
        for (var b = 0; b < mask.length; b++) {
          if (mask.charAt(b) === 'X') {
            // newValBinStr = valBinStr.charAt(b) + newValBinStr
            newValBinStr = newValBinStr + valBinStr.charAt(b)
          } else {
            // newValBinStr = mask.charAt(b) + newValBinStr
            newValBinStr = newValBinStr + mask.charAt(b)
          }
        }
        memory[memIdx] = parseInt(newValBinStr,2)
      }
    }
    // console.log(memory)

    // sum memory
    var sum = 0
    $.each(Object.keys(memory), (idx, key) =>{
      sum += memory[key]
    })

    //7817357407588
    var result = sum
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
