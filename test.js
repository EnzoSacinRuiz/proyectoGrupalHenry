const a = false;
const b = null;

console.log("FALSE: ", a==false);
console.log("NULL: ", b==false);

if(b!=falsey) console.log("b!=false");


//const array = [0, 2, 3, 4];
// console.log("array.length: ", array.length);
// console.log(Math.ceil( 9 / 4 ));

/* CartasPorPáginas, CartasTotales, Math.ceil */

// const cardsPerPage = 10;
// const totalCards = 11;

// const Pages = Math.ceil( totalCards / cardsPerPage );

// console.log("Pages: ", Pages);

/* doble &&     -->      ( a && b ) && ejecutar esto */

// const a = 5;
// const b = 10;

// ( a > 0 && b > 5 ) && console.log("Ambos están en lo correcto.");



// includes + toLower + push + Set()

// const a = ['salsa de PEScado', 'te de hierbas', 'tu hermana', 'capaz tu tia', 'pescado rabioso', 'pescado rabioso', 'pescado rabioso'];
// const b = 'PesCAdo';

// const buscaBusca = (input, data) =>
// {
//     let inputToLower = input.toLowerCase();
//     let found = [];
//     data.map( x => x.toLowerCase().includes(inputToLower) && found.push(x) );
//     found = [ ...new Set(found) ];
//     return found;
// }

// console.log(buscaBusca(b, a));


// toUpper, toLower, concat both

// const a = 'HOlA';

// console.log("a: ", a);
// console.log("a.toUpperCase(): ", a.toUpperCase());
// console.log("a.toLowerCase(): ", a.toLowerCase());
// console.log("a.slice(0,1): ", a.slice(0,1));
// console.log("a.slice(1): ", a.slice(1));
// console.log("charAt(0) + slice(1) : ", a.charAt(0).toUpperCase() + a.slice(1).toLowerCase() );

// algo, no me acuerdo jajaja

// let userId = '';
// let activityId = '';
// let suppId = '123156asd-123-xv';
// let indumentaryId = '';
// let fitnessId = '';

// let active = '';
// userId ? active = "userId" : activityId ? active = "activityId" : suppId ? active = "suppId" : indumentaryId
// ? active = "indumentaryId" : fitnessId ? active = "fitnessId" : false;

// switch(active)
// {
//     case "userId":
//         {
//             console.log("Encontró userId");
//             break;
//         }
//     case "activityId":
//         {
//             console.log("Encontró activityId");
//             break;
//         }
//     case "suppId":
//     {
//         console.log("Encontró suppId");
//         break;
//     }
//     case "indumentaryId":
//     {
//         console.log("Encontró indumentaryId");
//         break;
//     }
//     case "fitnessId":
//     {
//         console.log("Encontró fitnessId");
//         break;
//     }
// }






// // let x = 1;
// // let y = 2;

// // x > 10 || y >1
// // ? y==2
// //     ? (console.log('Todavía'), console.log("baka"))
// //     : console.log("No se la banca")
// // : console.log("no");