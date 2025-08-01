'use strict';

// ------------------------------------------------------
// TABLE OF CONTENTS
// ------------------------------------------------------
// 1 - GENERAL NOTES
// 2 - STEP BY STEP
// 3 - GENERAL GUIDE
// 4 - COMMON PROBLEMS
// ------------------------------------------------------


// ------------------------------------------------------
// GENERAL NOTES
// ------------------------------------------------------



// ------------------------------------------------------
// STEP BY STEP
// ------------------------------------------------------



// ------------------------------------------------------
// GENERAL GUIDE
// ------------------------------------------------------

    // \s+ - A single whitespace character or more
var txt1 = 'Lorem ipsum dolor sit amet, consectetuer adipiscing      elit.',
    rgx1 = /adipiscing\s+elit/, // 'adipiscing elit'

    // ^ - Matches beginning of input
    txt2 = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    rgx2 = /^Lorem/, // 'Lorem'

    // $ - Matches end of input
    txt3 = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    rgx3 = /elit$/, // 'elit'

    // * - Matches zero or more times
    txt4 = 'Lorem ipsum dolor sit ameeeeet.',
    rgx4 = /me*/, // 'ameeeeet'

    // ? - Matches zero or one time
    txt5 = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    rgx5 = /^it?/, // 'ipsum', 'adipiscing', 'sit' and 'elit'

    // + - Matches one or more times
    txt6 = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    rgx6 = /it+/, // 'sit' and 'elit'

    // {n} - Matches exactly n times
    txt7 = 'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
    rgx7 = /l{2}/, // 'Nullam' and 'mollis'

    // {n,} - Matches n or more times
    txt8 = 'Nullam dictum felis eu pede mollllis pretium.',
    rgx8 = /l{2,}/, // 'Nullam' and 'mollllis'

    // {n,m} - Matches at least n, at most m times
    txt9 = 'Nullam dictum felis eu pede mollllis pretium.',
    rgx9 = /l{2,4}/, // 'mollllis'

    // . - Any character except newline
    txt10 = 'Cum sociis natoque penatibus et magnis dus parturient montes, nascetur ridiculus das.',
    rgx10 = /d.s/, // 'dus' and 'das'

    // [...] - Any character within brackets
    txt11 = 'Cum sociis natoque penatibus et magnis dus parturient montes, nascetur ridiculus das.',
    rgx11 = /d[ua]s/, // 'dus' and 'das'

    // [^...] - Any character but those within brackets
    txt12 = 'Nullam iur molier iar.',
    rgx12 = /i[^ua]/, // 'molier'

    // \b Matches on word boundary
    txt14 = 'Nullam lorem ipsum quoquo',
    rgx14 = /\buo/, // first 'uo' in quoquo

    // \B - Matches on nonword boundary
    txt14 = 'Nullam lorem ipsum quoquo',
    rgx14 = /\Buo/, // second 'uo' in quoquo

    // \d - Digits from 0 to 9
    txt15 = 'Lorem ipsum is 123456',
    rgx15 = /\d{3}/, // 123

    // \D - Any nondigit character
    txt15 = 'Lorem ipsum is 123456',
    rgx15 = /\D/, // 'Lorem ipsum is'

    // \w - Matches word character (letters, digits, underscores)
    txt17 = 'JavaScript',
    rgx17 = /\w/, // 'J'

    // \W - Matches any nonword character (not letters, digits, or underscores)
    txt18 = '100%',
    rgx18 = /\W/; // '%'


// ------------------------------------------------------
// COMMON PROBLEMS
// ------------------------------------------------------

// CREATING REGEXES
// ---------------------------

// Constructor
var Reg = new RegExp('Vitor\s+Britto');

// Literal
var reg = /Vitor\s+Britto/;


// SUBSTRING EXISTS
// ---------------------------

// Basic
var cbString = ['bax', 'foo', 'bar', 'baz boo', 'fuu baz', 'foo bax'],
    regTest  = /foo/;

for (var i = 0; i < cbString.length; i++) {
    console.log(cbString[i] + ' ' + regTest.test(cbString[i]));
}

// Case Sensitive
var cbString = ['bax', 'Foo', 'bar', 'baz foo', 'fuu baz', 'Foo bax'],
    regTest  = /foo/i;

for (var i = 0; i < cbString.length; i++) {
    console.log(cbString[i] + ' ' + regTest.test(cbString[i],i));
}

// FIND / HIGHLIGHT A PATTERN - TODO
// ---------------------------

var txt = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    test = /dolor/,
    match, str;
