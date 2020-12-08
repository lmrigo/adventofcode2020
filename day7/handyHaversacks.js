var input = [
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
,`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var tupleStrings = input[i].split(/\n+/)

    var graph = {}

    $.each(tupleStrings, (idx,val)=>{
      var words = val.split(/\s+/)
      var mod = words[0]
      var color = words[1]
      graph[mod+color] = []
      //bags 2
      //contain 3
      for (var w = 4; w < words.length; w++) {
        var number = words[w]
        if (number === 'no') { // no other bags.
          break
        }
        var mod2 = words[++w]
        var color2 = words[++w]
        graph[mod+color].push({
          num: Number(number),
          bag: mod2+color2
        })
        if(words[++w].endsWith('.')) {
          break
        }
      }
    })
    // console.log(graph)

    var graphKeys = Object.keys(graph)
    var initialState = ['shinygold']
    var bags = initialState
    var hashbags = {}
    while (bags.length > 0) {
      var next = bags.shift()
      $.each(graphKeys,(idx,val)=>{
        if(graph[val].filter((x)=>{
          return x.bag === next
        }).length > 0) {
          if (hashbags[val] === undefined) {
            hashbags[val]=true
            bags.push(val)
          }
        }
      })
    }
    // console.log(hashbags)
    var result = Object.keys(hashbags).length
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var tupleStrings = input[i].split(/\n+/)

    var graph = {}

    $.each(tupleStrings, (idx,val)=>{
      var words = val.split(/\s+/)
      var mod = words[0]
      var color = words[1]
      graph[mod+color] = []
      //bags 2
      //contain 3
      for (var w = 4; w < words.length; w++) {
        var number = words[w]
        if (number === 'no') { // no other bags.
          break
        }
        var mod2 = words[++w]
        var color2 = words[++w]
        graph[mod+color].push({
          num: Number(number),
          bag: mod2+color2
        })
        if(words[++w].endsWith('.')) {
          break
        }
      }
    })
    // console.log(graph)

    var calcBags = function(node) {
      if (graph[node].length === 0) {
        return 1
      } else {
        var sum = 1 // the bag itself
        $.each(graph[node], (idx,val)=>{
          sum += val.num * calcBags(val.bag)
        })
        return sum
      }
    }

    // console.log(hashbags)
    var result = calcBags('shinygold')-1 // don't count the shiny gold bag
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
