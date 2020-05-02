export const cocktailsStubs = [
  "https://ru.inshaker.com/uploads/cocktail/hires/38/1556446318-mankhetten-image-final1.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/55/1556107543-negroni-image-final.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/1098/1537863520-Aperol_spritz-HiRes.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/29/1556446379-kosmopoliten-image-final.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/416/1540547347-_______________________800.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/881/1556631782-Tiki-Margarita__highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/964/1556717036-Champagne-Cocktail__highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/887/1556113093-Exotic-Sour__highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/137/1557244353-Absinthe-with-Pineapple-Juice__highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/495/1556469311-Connaught-Martini__highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/804/1556113884-Secret-Sour__highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/1030/1556457492-After-Hours.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/1452/1557236414-Chocolate_Ocean_800.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/642/Mint-Lemonade__highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/151/1556310331-English_virgin_2.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/816/1557243864-Schindler_s-List__highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/857/1556457674-Spring-Grass_highres.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/18/1556109137-Classic-whiskey-sour1.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/1269/1556122078-_5_800.jpg",
  "https://ru.inshaker.com/uploads/cocktail/hires/1394/1556718241-Faith___trust_800.jpg",
];

export const ingredientsStubs = [
  "https://ru.inshaker.com/uploads/good/image_ru/1/1550076545-Vodka_230%D1%85600.jpg",
  "https://ru.inshaker.com/uploads/good/image_common/799/1547564665-Gin-230%D1%85600.jpg",
  "https://ru.inshaker.com/uploads/good/image_common/88/1586504624-white_rum_230%D1%85600.jpg",
  "https://ru.inshaker.com/uploads/good/image_common/93/1574246644-Tequila_Casamigos_-_photo.jpg",
  "https://ru.inshaker.com/uploads/good/image_common/40/1559121221-GC-Cognac_230%D1%85600.jpg",
  "https://ru.inshaker.com/uploads/good/image_common/37/1559121601-Scotch_whisky_230%D1%85567.jpg",
  "https://ru.inshaker.com/uploads/good/image_common/62/1587386612-WOODFORD_STRAIGHT_BOURBON_WHISKEY_460%D1%85865.jpg",
  "https://ru.inshaker.com/uploads/good/image_common/113/veoux-pontarlier-absenthe-image.jpg",
];
const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomCocktailImage = () =>
  getRandomArrayElement(cocktailsStubs);

export const getRandomIngredientImage = () =>
  getRandomArrayElement(ingredientsStubs);
