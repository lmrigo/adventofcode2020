var input = [
`16
10
15
5
1
11
7
19
6
12
4`
,`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var adapterStrings = input[i].split(/\s+/)
    var adapters = $.map(adapterStrings, (val => {return Number(val)}))
    adapters.sort((a,b)=>{return a-b})
    // var highest = adapters[adapters.length-1] + 3
    var joltCount = [0,0,0,0]
    joltCount[adapters[0]-0]++
    for (var a = 0; a < adapters.length-1; a++) {
      joltCount[adapters[a+1]-adapters[a]]++
    }
    joltCount[3]++
    // console.log(joltCount)

    var result = joltCount[1]*joltCount[3]
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var adapterStrings = input[i].split(/\s+/)
    var adapters = $.map(adapterStrings, (val => {return Number(val)}))
    adapters.sort((a,b)=>{return a-b})
    adapters.unshift(0)
    var highest = adapters[adapters.length-1] + 3
    adapters.push(highest)
    console.log(adapters)

/*
    var combinations = []

    for (var a = 0; a < adapters.length; a++) {
      if (adapters[a+1]-adapters[a] === 3) { // x 3
        combinations[a] = 1
      } else if (adapters[a+1]-adapters[a] === 2) { // x 2 -
        if (adapters[a+2]-adapters[a] === 3) { // x 2 3
          combinations[a] = 2
        } else { // x 2 N
          combinations[a] = 1
        }
      } else if (adapters[a+1]-adapters[a] === 1) { // x 1 - -
        if (adapters[a+2]-adapters[a] === 2) { // x 1 2 -
          if (adapters[a+3]-adapters[a] === 3) { // x 1 2 3
            combinations[a] = 3
          } else { // x 1 2 N
            combinations[a] = 2
          }
        } else if (adapters[a+2]-adapters[a] === 3) { // x 1 3
          combinations[a] = 2
        } else { // x 1 N N
          combinations[a] = 1
        }
      }
    }
    console.log(combinations)

*/

    var cache = {}

    // works but takes too long
    var generateStates = function(st) {
      var newStates = []
      var firstDiff = adapters[st.remaining]-st.elem
      if (firstDiff === 3) {
        // first
        var newSt = clone(st)
        newSt.elem = adapters[st.remaining]
        newSt.remaining++
        newSt.hist += newSt.elem
        if (!cache[newSt.hist]) {
          newStates.push(newSt)
        }
      } else if (firstDiff === 2) {
        // first
        var newSt = clone(st)
        newSt.elem = adapters[st.remaining]
        newSt.remaining++
        newSt.hist += newSt.elem
        if (!cache[newSt.hist]) {
          newStates.push(newSt)
        }
        if (st.remaining < adapters.length-1) {
          var secondDiff = adapters[st.remaining+1]-st.elem
          if (secondDiff === 3) {
            // second
            var newSt = clone(st)
            newSt.elem = adapters[st.remaining+1]
            newSt.remaining += 2
            if (!cache[newSt.hist]) {
              newStates.push(newSt)
            }
          }
        }
      } else if (firstDiff === 1) {
        // first
        var newSt = clone(st)
        newSt.elem = adapters[st.remaining]
        newSt.remaining++
        newSt.hist += newSt.elem
        if (!cache[newSt.hist]) {
          newStates.push(newSt)
        }
        if (st.remaining < adapters.length-1) {
          var secondDiff = adapters[st.remaining+1]-st.elem
          if (secondDiff === 3) {
            // second
            var newSt = clone(st)
            newSt.elem = adapters[st.remaining+1]
            newSt.remaining += 2
            newSt.hist += newSt.elem
            if (!cache[newSt.hist]) {
              newStates.push(newSt)
            }
          } else if (secondDiff === 2 && st.remaining < adapters.length-2) {
            // second
            var newSt = clone(st)
            newSt.elem = adapters[st.remaining+1]
            newSt.remaining += 2
            newSt.hist += newSt.elem
            if (!cache[newSt.hist]) {
              newStates.push(newSt)
            }
            var thirdDiff = adapters[st.remaining+2]-st.elem
            if (thirdDiff === 3) {
              //third
              var newSt = clone(st)
              newSt.elem = adapters[st.remaining+2]
              newSt.remaining += 3
              newSt.hist += newSt.elem
              if (!cache[newSt.hist]) {
                newStates.push(newSt)
              }
            }
          }
        }
      }
      return newStates
    }

    var clone = function(st) {
      var cloned = {
        elem: st.elem,
        remaining: st.remaining,
        hist: st.hist
      }
      return cloned
    }

    var initialState = {elem:0, remaining:1, hist:'0'}
    console.log('tamanho: ',adapters.length)
    var states = [initialState]
    var combinations = 0
    var timeout = 10*1000*1000
    while(states.length > 0 && timeout-- > 0) {
      var next = states.pop()
      if (timeout <= 1611370  && timeout % (1*1) === 0) {
        console.log(timeout, states.length, next.remaining, next.hist)
      }
      if (cache[next.hist]) {
        continue
      } else {
        cache[next.hist] = true
      }
      if (next.remaining === adapters.length-1) {
        combinations++
      } else {
        //verify elem and the next 3 elements
        //generate possible new states
        states.push(...generateStates(next))
      }
    }


    /*
    // works but goes out of memory
    var createNode = function (idx) {
      return {
          val: adapters[idx],
          idx: idx,
          children: []
        }
    }
    var root = createNode(0)

    var build = function(node) {
      var a = node.idx
      if (adapters[a+1]-adapters[a] >= 3) { // x 3
        var child = createNode(a+1)
        node.children.push(child)
        build(child)
      } else if (adapters[a+1]-adapters[a] === 2) { // x 2 -
        if (adapters[a+2]-adapters[a] === 3) { // x 2 3
          var child1 = createNode(a+1)
          node.children.push(child1)
          build(child1)
          var child2 = createNode(a+2)
          node.children.push(child2)
          build(child2)
        } else { // x 2 N
          var child = createNode(a+1)
          node.children.push(child)
          build(child)
        }
      } else if (adapters[a+1]-adapters[a] === 1) { // x 1 - -
        if (adapters[a+2]-adapters[a] === 2) { // x 1 2 -
          if (adapters[a+3]-adapters[a] === 3) { // x 1 2 3
            var child1 = createNode(a+1)
            node.children.push(child1)
            build(child1)
            var child2 = createNode(a+2)
            node.children.push(child2)
            build(child2)
            var child3 = createNode(a+3)
            node.children.push(child3)
            build(child3)
          } else { // x 1 2 N
            var child1 = createNode(a+1)
            node.children.push(child1)
            build(child1)
            var child2 = createNode(a+2)
            node.children.push(child2)
            build(child2)
          }
        } else if (adapters[a+2]-adapters[a] === 3) { // x 1 3
          var child1 = createNode(a+1)
          node.children.push(child1)
          build(child1)
          var child2 = createNode(a+2)
          node.children.push(child2)
          build(child2)
        } else { // x 1 N N
          var child = createNode(a+1)
          node.children.push(child)
          build(child)
        }
      }
    }
    build(root)
    // console.log(root)

    // count leaves

    var countLeaves = function(node) {
      if (node.children.length === 0) {
        return 1
      } else {
        var sum = 0
        for (var c = 0; c < node.children.length; c++) {
          sum += countLeaves(node.children[c])
        }
        return sum
      }
    }

    var combinations = countLeaves(root)

    */
    /*
    So, dispensing with the adapters conceit - you have an array of numbers which you've probably sorted. Each of those numbers is only 1 or 3 away from the preceding number.
    The first thing I figured out from there was that on every possible route, you must visit every number on either side of a change of 3.
    e.g. if your numbers were [0,1,2,3,6,7,8,11,12,15], you know that every route must include numbers 0,3,6,8,11,12,15.
    So, I used that knowledge to group the numbers into blocks;
    e.g. for the example above, [[0,1,2,3],[6,7,8],[11,12],[15]]
    Then I worked out how many routes there were through each block, given that each step can only increase by 1, 2 or 3.
    Block size / Possible routes
    1/1
    2/1
    3/2
    4/4
    5/7
    I didn't have any blocks of more than 5 numbers in my dataset - but it looks like the data is following a "Tribonacci" sequence (i.e. each number is the sum of the previous three).
    Anyway, I then replaced the number in each block with the number of possible routes for that block, and multiplied them together to get the total number of routes for the whole set of data.
    e.g. for my example above = 4 * 2 * 1 * 1 = 8 possible routes.
    */
    var groups = []
    var group = false
    var str = ''
    for (var a = 0; a < adapters.length; a++) {
      if (adapters[a+1]-adapters[a] === 3) { // x 3
        str += adapters[a]+''
        if (group) {
          str += ')'
        }
        group = false
      } else if (adapters[a+1]-adapters[a] === 2) { // x 2 -
        if (adapters[a+2]-adapters[a] === 3) { // x 2 3
          if (!group) {
            group = true
            str += '('
          }
          str += adapters[a]+''
        } else { // x 2 N
          str += adapters[a]+''
        }
      } else if (adapters[a+1]-adapters[a] === 1) { // x 1 - -
        if (adapters[a+2]-adapters[a] === 2) { // x 1 2 -
          if (!group) {
            group = true
            str += '('
          }
          if (adapters[a+3]-adapters[a] === 3) { // x 1 2 3
            str += adapters[a]+''
          } else { // x 1 2 N
            str += adapters[a]+''
          }
        } else if (adapters[a+2]-adapters[a] === 3) { // x 1 3
          if (!group) {
            group = true
            str += '('
          }
          str += adapters[a]+''
        } else { // x 1 N N
          str += adapters[a]+''
        }
      }
    }
    console.log(str)

    var result = combinations
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
