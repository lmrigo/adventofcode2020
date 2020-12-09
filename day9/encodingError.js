var input = [
`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
// ,`20
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 21
// 22
// 23
// 24
// 25
// 45
// 65
// 64`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)
    var numbers = $.map(numberStrings, (val => {return Number(val)}))
    var preamble = i === 0 ? 5 : 25
    var errorNumber = -1
    for (var n = preamble; n < numbers.length; n++) {
      var next = numbers[n]
      var check = false
      for (var ni = n-preamble; ni < n; ni++) {
        for (var nj = n-preamble+1; nj < n; nj++) {
          if (ni===nj) {
            continue
          }
          if (numbers[ni] + numbers[nj] === next) {
            check = true
            break
          }
        }
        if (check) {
          break
        }
      }
      if (!check) {
        errorNumber = next
        break
      }
    }

    var result = errorNumber
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
    var preamble = i === 0 ? 5 : 25
    var errorNumber = -1
    for (var n = preamble; n < numbers.length; n++) {
      var next = numbers[n]
      var check = false
      for (var ni = n-preamble; ni < n; ni++) {
        for (var nj = n-preamble+1; nj < n; nj++) {
          if (ni===nj) {
            continue
          }
          if (numbers[ni] + numbers[nj] === next) {
            check = true
            break
          }
        }
        if (check) {
          break
        }
      }
      if (!check) {
        errorNumber = next
        break
      }
    }
    var startIdx = 0
    var endIdx = 0
    var sum = 0
    var n = 0
    while (n < numbers.length && numbers[n] < errorNumber) {
      if (sum > errorNumber) {
        sum -= numbers[startIdx]
        startIdx++
      } else {
        sum += numbers[n]
        endIdx = n
        n++
      }
      if (sum === errorNumber) {
        break
      }
    }
    var list = numbers.slice(startIdx,endIdx+1)
    list.sort((a,b)=>{return a-b})
    // console.log(list)
    // console.log(list.reduce((acc,val)=>{
    //   return acc + val
    // }))

    var result = list[0] + list[list.length-1]
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
