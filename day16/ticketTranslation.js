var input = [
`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var ticketStrings = input[i].split(/\n+/)
    var section = 0 // 0 rules, 1 your ticket, 2 nearby tickets
    var rules = {}
    var yourTicket = []
    var nearbyTickets = []
    $.each(ticketStrings,(idx,line)=>{
      if (line.startsWith('your')) {
        section = 1
        return true
      } else if (line.startsWith('nearby')) {
        section = 2
        return true
      }
      if (section === 0) {
        var elems = line.split(/\:\s|\s+|\-/)
        var name = elems[0]
        rules[name] = [Number(elems[1]), Number(elems[2]), Number(elems[4]), Number(elems[5])]
      } else if (section === 1) {
        yourTicket = $.map(line.split(','),Number)
      } else if (section === 2) {
        nearbyTickets.push($.map(line.split(','),Number))
      }
    })
    // console.log(rules)
    // console.log(yourTicket)
    // console.log(nearbyTickets)

    var sum = 0 // ticket scanning error rate
    $.each(nearbyTickets, (idx,t)=>{
      $.each(t,(idx2,val)=>{
        var valid = false
        $.each(Object.keys(rules),(idx3,r) =>{
          if ((val >= rules[r][0]
              && val <= rules[r][1])
            || (val >= rules[r][2]
              && val <= rules[r][3])) {
            valid = true
          }
        })
        if (!valid) {
          sum += val
        }
      })
    })

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
