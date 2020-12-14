var input = [
`F10
N3
F7
R90
F11`
 ,puzzleInput
]

var Ship = function() {
  this.ns = 0
  this.we = 0
  this.pos = 'E'
  this.directions = ['N','E','S','W']
  this.left = function() {
    var idx = this.directions.indexOf(this.pos) - 1
    if (idx < 0) {
      idx += this.directions.length
    }
    this.pos = this.directions[idx]
  }
  this.right = function() {
    var idx = (this.directions.indexOf(this.pos) + 1) % this.directions.length
    this.pos = this.directions[idx]
  }
  this.turnAround = function() {
    var idx = (this.directions.indexOf(this.pos) + 2) % this.directions.length
    this.pos = this.directions[idx]
  }
}

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var posStrings = input[i].split(/\s+/)
    var ship = new Ship()
    $.each(posStrings,(idx,val)=>{
      var op = val.substr(0,1)
      var num = Number(val.substr(1))
      switch(op) {
        case 'N': ship.ns += num;break;
        case 'S': ship.ns -= num;break;
        case 'E': ship.we += num;break;
        case 'W': ship.we -= num;break;
        case 'L': {
          switch(num) {
            case 90: ship.left();break;
            case 180: ship.turnAround();break;
            case 270: ship.right();break;
            default: console.log('opa!',op,num)
          }
        }; break;
        case 'R': {
          switch(num) {
            case 90: ship.right();break;
            case 180: ship.turnAround();break;
            case 270: ship.left();break;
            default: console.log('opa!',op,num)
          }
        }; break;
        case 'F': {
          switch(ship.pos) {
            case 'N': ship.ns += num;break;
            case 'S': ship.ns -= num;break;
            case 'E': ship.we += num;break;
            case 'W': ship.we -= num;break;
            default: console.log('opa!',op,num)
          }
        }; break;
        default: console.log('opa!',op,num)
      }
    })

    var result = Math.abs(ship.ns) + Math.abs(ship.we)
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
