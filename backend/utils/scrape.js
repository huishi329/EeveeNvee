result = `[
   {
        ownerId:1,
        street:"${document.querySelector("._9xiloll").innerText}",
        title:"${document.querySelector("._fecoyn4").innerText}",
        price:${document.querySelectorAll("._tyxjp1").innerText},
        description:"${document.querySelector(".ll4r2nl.dir.dir-ltr").innerText.split('\n')[0].replaceAll('"', "'")}"
   }
    ]
`
console.log(result)

// spotImage
result = ''
Array.from(document.querySelectorAll("._6tbg2q")).map(ele => ele.src).forEach((url, i) =>
    result += `{
        spotId:10,
        url: await uploadImageFromUrl("${url}"),
        position: ${i}
    },
    `
)
console.log(result)
