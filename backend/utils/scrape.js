result = `[
   {
        ownerId:1,
        address:"${document.querySelector("._9xiloll").innerText}",
        name:"${document.querySelector("._fecoyn4").innerText}",
        price:${document.querySelectorAll("._tyxjp1").innerText},
        description:"${document.querySelector(".ll4r2nl.dir.dir-ltr").innerText.split('\n')[0].replaceAll('"', "'")}"
   }
    ]
`
console.log(result)

ratings = Array.from(document.querySelectorAll(".wt-grid__item-xs-12 [name='rating']")).map(review => review.value)
reviews = Array.from(document.querySelectorAll(".wt-text-truncate--multi-line")).map(review => review.innerText).slice(0, ratings.length)
users = ["brian", "caitlynn", "derrik", "elizabeth"]

ratings.forEach((rating, i) => {
    result += `
        Review(
            buyer=${users[i]},
            product=product,
            rating=${rating},
            review="${reviews[i].replaceAll('"', "'")}"
        ),
    `
})

result += '])'

result += '\n\n    db.session.commit()'

console.log(result)
