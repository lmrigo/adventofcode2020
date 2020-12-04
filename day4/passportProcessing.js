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
,`eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`
,`pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`
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

    var validPassports = 0
    $.each(passports, (idx, val) => {
      if (val.byr !== undefined) {
        var byrn = Number(val.byr)
        if (byrn < 1920 || 2002 < byrn) {
          return true
        }
      } else {
        return true
      }
      if (val.iyr !== undefined) {
        var iyrn = Number(val.iyr)
        if (iyrn < 2010 || 2020 < iyrn) {
          return true
        }
      } else {
        return true
      }
      if (val.eyr !== undefined) {
        var eyrn = Number(val.eyr)
        if (eyrn < 2020 || 2030 < eyrn) {
          return true
        }
      } else {
        return true
      }
      if (val.hgt !== undefined) {
        var hgtn = Number(val.hgt.substr(0,val.hgt.length-2))
        if (val.hgt.includes('cm')) {
          if (hgtn < 150 || 193 < hgtn) {
            return true
          }
        } else if (val.hgt.includes('in')) {
          if (hgtn < 59 || 76 < hgtn) {
            return true
          }
        } else {
          return true
        }
      } else {
        return true
      }
      if (val.hcl !== undefined) {
        var match = val.hcl.match(/#[0-9a-f]{6}/)
        if (match === null || match[0] !== val.hcl) {
          return true
        }
      } else {
        return true
      }
      if (val.ecl !== undefined) {
        if (!'amb blu brn gry grn hzl oth'.includes(val.ecl)) {
          return true
        }
      } else {
        return true
      }
      if (val.pid !== undefined) {
        var match = val.pid.match(/\d{9}/)
        var pidn = Number(val.pid)
        if (match == null || match[0] !== val.pid) {
          return true
        }
      } else {
        return true
      }
      validPassports++
    })

    var result = validPassports
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
