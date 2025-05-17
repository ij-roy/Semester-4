console.log("Welcome to Javascript Lecture");
console.log("How are you project going");
console.log("What are you doing here")

name = "IJ Roy"
console.log(name)

// lecture 5 35min  Foreach in array

// username = prompt("Enter your name")
// lenght = username.length
// userid = `@${username}${lenght}`
// console.log(userid)

let heroes = ["ironman", "spiderman","thor","hulk","batman","superman","wonderwoman","blackwidow","captainamerica","greenlantern","shaktiman","heeman"]
let num = [85,97,44,37,76,60]

for(let hero of heroes){
    console.log(hero.toUpperCase())
}

let sum = 0;
for (const i in num) {
    sum += num[i];
}
console.log(sum/num.length)

const countVowels = (str) => {
    let count = 0;
    for (const element of str) {
        if (element == 'a' || element == 'e' || element == 'i' || element == 'o' || element == 'u') {
            count++
        }
    }
    return count
}

str = prompt("Enter a string to count its number of vowels")
let count = countVowels(str)
console.log(`The number of vewels in ${str} is ${count}`)



let arr = [1,2,3,4,5,6,7,8,9,10]

arr.forEach(function printVal(val)){
    console.log(val)
}
