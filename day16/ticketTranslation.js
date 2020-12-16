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
,`class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`//row,class,seat
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

  for (var i = 1; i < input.length; i++) {    var ticketStrings = input[i].split(/\n+/)
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
        var idx = 0
        var name = elems[idx]
        if (name === 'departure' || name === 'arrival') {
          idx++
          name += ' ' + elems[idx]
        }
        rules[name] = [Number(elems[idx+1]), Number(elems[idx+2]), Number(elems[idx+4]), Number(elems[idx+5])]
      } else if (section === 1) {
        yourTicket = $.map(line.split(','),Number)
      } else if (section === 2) {
        nearbyTickets.push($.map(line.split(','),Number))
      }
    })
    // console.log(rules)
    // console.log(yourTicket)
    // console.log(nearbyTickets)

    var tickets = [] // only valid tickets
    $.each(nearbyTickets, (idx,t)=>{
      var goodTicket = true
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
          goodTicket = false
        }
      })
      if (goodTicket) {
        tickets.push(t)
      }
    })
    tickets.push(yourTicket)

    // determine possible rules for each field
    var possibleRules = []
    $.each(tickets, (ti,t)=>{
      possibleRules[ti] = []
      $.each(t,(vi,val)=>{
        possibleRules[ti][vi] = []
        $.each(Object.keys(rules),(ri,r) =>{
          if ((val >= rules[r][0]
              && val <= rules[r][1])
            || (val >= rules[r][2]
              && val <= rules[r][3])) {
            possibleRules[ti][vi].push(r)
          }
        })
      })
    })
    // console.log(possibleRules)

    var fieldsLen = yourTicket.length
    var finalCandidates = []
    for (var f = 0; f < fieldsLen; f++) {
      var fCandidates = possibleRules[0][f]
      for (var t = 0; t < possibleRules.length; t++) {
        fCandidates = possibleRules[t][f].filter( el => fCandidates.includes(el) )
      }
      finalCandidates[f] = fCandidates
    }
    // console.log(finalCandidates)

    var finalRules = []
    var r = 0
    while (r < fieldsLen) {
      var singleIndex = finalCandidates.findIndex(el => el.length === 1)
      var singleVal = finalCandidates[singleIndex][0]
      finalRules[singleIndex] = singleVal
      var remIdx = -1
      for (var c = 0; c < finalCandidates.length; c++) {
        var sidx = finalCandidates[c].indexOf(singleVal)
        if (sidx >= 0) {
          finalCandidates[c].splice(sidx,1)
        }
      }
      r++
      // console.log(r)
    }
    // console.log(finalRules)

    var departureMult = 1
    if (i > 1) { // puzzle input
      $.each(yourTicket, (idx,val) => {
        if (finalRules[idx].startsWith('departure')) {
          departureMult *= val
        }
      })
    }
    var result = departureMult

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
