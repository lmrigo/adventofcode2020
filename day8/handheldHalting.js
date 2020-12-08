var input = [
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`
 ,puzzleInput
]

var Computer = function () {
  this.program = []
  this.pc = 0
  this.acc = 0
  this.halted = false
  this.execute = function() {
    var fullop = this.program[this.pc]
    if (fullop === undefined) {
      this.halted = true
    }
    var instruction = fullop.split(/\s+/)
    var op = instruction[0]
    var arg1 = Number(instruction[1])

    if (op === 'acc') {
      this.acc += arg1
      this.pc += 1
    } else if (op === 'jmp') {
      this.pc += arg1
    } else if (op === 'nop') {
      this.pc += 1
    }
  }
}


var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var instructions = input[i].split(/\n+/)
    var com = new Computer()
    com.program = instructions
    var visited = {}
    var v = 1
    while(visited[com.pc] === undefined && !com.halted) {
      visited[com.pc] = v++
      com.execute()
    }
    // console.log(visited)

    var result = com.acc
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
