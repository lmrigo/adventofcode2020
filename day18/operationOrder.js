var input = [
`1 + 2 * 3 + 4 * 5 + 6`//71
,`2 * 3 + (4 * 5)`//26
,`5 + (8 * 3 + 9 + 3 * 4 * 3)`//437
,`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`//12240
,`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`//13632
,`2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`//26335
// Part 2
,`1 + 2 * 3 + 4 * 5 + 6`//231
,`1 + (2 * 3) + (4 * (5 + 6))`// 51
,`2 * 3 + (4 * 5)`// 46
,`5 + (8 * 3 + 9 + 3 * 4 * 3)`// 1445
,`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`// 669060
,`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`// 23340
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

  for (var i = 6; i < input.length; i++) {
    var numopsStrings = input[i].split(/\n+/)
    var total = 0
    $.each(numopsStrings, (eidx,expr)=> {

      // build tree
      var start = 0
      var end = expr.length
      var group = function(start, end) {
        var node = {exp: '', children: [], lastIdx:start}
        for (var e = start; e < end; e++) {
          var nChar = expr[e]
          if (nChar === ' ') {
            continue
          } else if (nChar === '(') {
            node.exp += 'g['+node.children.length+']'
            node.children.push(group(e+1,end))
            e = node.children[node.children.length-1].lastIdx
          } else if (nChar === ')') {
            node.lastIdx = e
            e = end
          } else {
            node.exp += nChar
          }
        }
        return node
      }
      var root = group(0,expr.length)
      // console.log(root)

      var evalExpr = function(exp) {
        // build array
        var expArray = []
        for (var e = 0; e < exp.length; e++) {
          if (exp[e] === '+' ||exp[e] === '*' ) {
            expArray.push(exp[e])
          } else {
            var numAcc = exp[e]
            while(e+1 < exp.length && exp[e+1] !== '+' && exp[e+1] !== '*') {
              numAcc += exp[e+1]
              e++
            }
            expArray.push(Number(numAcc))
          }
        }
        // console.log(expArray)
        // eval plus
        var nextPlus = expArray.indexOf('+')
        while (nextPlus > 0) {
          var sum = expArray[nextPlus-1] + expArray[nextPlus+1]
          expArray.splice(nextPlus-1,3,sum)
          nextPlus = expArray.indexOf('+')
        }
        // eval mult
        var nextMult = expArray.indexOf('*')
        while (nextMult > 0) {
          var mult = expArray[nextMult-1] * expArray[nextMult+1]
          expArray.splice(nextMult-1,3,mult)
          nextMult = expArray.indexOf('*')
        }
        return expArray[0]
      }

      var solveTree = function(node) {
        if (node.children.length > 0) {
          var childrenResults = []
          for (var c = 0; c < node.children.length; c++) {
            var childRes = solveTree(node.children[c])
            node.exp = node.exp.replace('g['+c+']',childRes+'')
          }
        }
        return evalExpr(node.exp)
      }

      total += solveTree(root)
    })

    var result = total
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
