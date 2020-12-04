var input = [
`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`
,puzzleInput
]

var Passport = function() {
  this.byr = undefined // (Birth Year)
  this.iyr = undefined // (Issue Year)
  this.eyr = undefined // (Expiration Year)
  this.hgt = undefined // (Height)
  this.hcl = undefined // (Hair Color)
  this.ecl = undefined // (Eye Color)
  this.pid = undefined // (Passport ID)
  this.cid = undefined // (Country ID)
}

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var passportStrings = input[i].split(/\n\n/)
    // console.log(passportStrings)
    var passports = []
    $.each(passportStrings, (idx,val) => {
      var elems = val.split(/\s+/)
      var p = new Passport()
      $.each(elems, (idx2,el) => {
        var item = el.split(/\:/)
        p[item[0]] = item[1]
      })
      passports.push(p)
    })
    // console.log(passports)

    var validPassports = passports.reduce((acc,val) =>{
      return acc + ((
        val.byr !== undefined
        && val.iyr !== undefined
        && val.eyr !== undefined
        && val.hgt !== undefined
        && val.hcl !== undefined
        && val.ecl !== undefined
        && val.pid !== undefined
        //&& val.cid !== undefined
        ) ? 1 : 0)
    },0)

    var result = validPassports
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
