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
