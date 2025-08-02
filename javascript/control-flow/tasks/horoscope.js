// Horoscope Sign Checker
// Write a program that prints the zodiac sign(Aries, Taurus, Gemini, etc.) based on a person’s birth month. Make it month bases, not date based. Like March and April borns are Aries, Aplil and May born are Taurus, and so on. Do not use if-else.

function getZodiacSign(month) {
  switch (month.toLowerCase()) {
    case "march":
    case "april":
      console.log("Zodiac sign: Aries");
      break;
    case "may":
      console.log("Zodiac sign: Taurus");
      break;
    case "june":
      console.log("Zodiac sign: Gemini");
      break;
    case "july":
      console.log("Zodiac sign: Cancer");
      break;
    case "august":
      console.log("Zodiac sign: Leo");
      break;
    case "september":
      console.log("Zodiac sign: Virgo");
      break;
    case "october":
      console.log("Zodiac sign: Libra");
      break;
    case "november":
      console.log("Zodiac sign: Scorpio");
      break;
    case "december":
      console.log("Zodiac sign: Sagittarius");
      break;
    case "january":
      console.log("Zodiac sign: Capricorn");
      break;
    case "february":
      console.log("Zodiac sign: Aquarius");
      break;
    default:
      console.log("Invalid month");
  }
}

getZodiacSign("April"); // Zodiac sign: Aries
getZodiacSign("May"); // Zodiac sign: Taurus
