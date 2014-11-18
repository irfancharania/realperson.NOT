/// Grabbed charset gen from realperson.js 
var ALPHABETIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var ALPHANUMERIC = ALPHABETIC + '0123456789';
var dots = [
    ['   *   ', '  * *  ', '  * *  ', ' *   * ', ' ***** ', '*     *', '*     *'],
    ['****** ', '*     *', '*     *', '****** ', '*     *', '*     *', '****** '],
    [' ***** ', '*     *', '*      ', '*      ', '*      ', '*     *', ' ***** '],
    ['****** ', '*     *', '*     *', '*     *', '*     *', '*     *', '****** '],
    ['*******', '*      ', '*      ', '****   ', '*      ', '*      ', '*******'],
    ['*******', '*      ', '*      ', '****   ', '*      ', '*      ', '*      '],
    [' ***** ', '*     *', '*      ', '*      ', '*   ***', '*     *', ' ***** '],
    ['*     *', '*     *', '*     *', '*******', '*     *', '*     *', '*     *'],
    ['*******', '   *   ', '   *   ', '   *   ', '   *   ', '   *   ', '*******'],
    ['      *', '      *', '      *', '      *', '      *', '*     *', ' ***** '],
    ['*     *', '*   ** ', '* **   ', '**     ', '* **   ', '*   ** ', '*     *'],
    ['*      ', '*      ', '*      ', '*      ', '*      ', '*      ', '*******'],
    ['*     *', '**   **', '* * * *', '*  *  *', '*     *', '*     *', '*     *'],
    ['*     *', '**    *', '* *   *', '*  *  *', '*   * *', '*    **', '*     *'],
    [' ***** ', '*     *', '*     *', '*     *', '*     *', '*     *', ' ***** '],
    ['****** ', '*     *', '*     *', '****** ', '*      ', '*      ', '*      '],
    [' ***** ', '*     *', '*     *', '*     *', '*   * *', '*    * ', ' **** *'],
    ['****** ', '*     *', '*     *', '****** ', '*   *  ', '*    * ', '*     *'],
    [' ***** ', '*     *', '*      ', ' ***** ', '      *', '*     *', ' ***** '],
    ['*******', '   *   ', '   *   ', '   *   ', '   *   ', '   *   ', '   *   '],
    ['*     *', '*     *', '*     *', '*     *', '*     *', '*     *', ' ***** '],
    ['*     *', '*     *', ' *   * ', ' *   * ', '  * *  ', '  * *  ', '   *   '],
    ['*     *', '*     *', '*     *', '*  *  *', '* * * *', '**   **', '*     *'],
    ['*     *', ' *   * ', '  * *  ', '   *   ', '  * *  ', ' *   * ', '*     *'],
    ['*     *', ' *   * ', '  * *  ', '   *   ', '   *   ', '   *   ', '   *   '],
    ['*******', '     * ', '    *  ', '   *   ', '  *    ', ' *     ', '*******'],
    ['  ***  ', ' *   * ', '*   * *', '*  *  *', '* *   *', ' *   * ', '  ***  '],
    ['   *   ', '  **   ', ' * *   ', '   *   ', '   *   ', '   *   ', '*******'],
    [' ***** ', '*     *', '      *', '     * ', '   **  ', ' **    ', '*******'],
    [' ***** ', '*     *', '      *', '    ** ', '      *', '*     *', ' ***** '],
    ['    *  ', '   **  ', '  * *  ', ' *  *  ', '*******', '    *  ', '    *  '],
    ['*******', '*      ', '****** ', '      *', '      *', '*     *', ' ***** '],
    ['  **** ', ' *     ', '*      ', '****** ', '*     *', '*     *', ' ***** '],
    ['*******', '     * ', '    *  ', '   *   ', '  *    ', ' *     ', '*      '],
    [' ***** ', '*     *', '*     *', ' ***** ', '*     *', '*     *', ' ***** '],
    [' ***** ', '*     *', '*     *', ' ******', '      *', '     * ', ' ****  ']
];

//-----------------------------

var dotStringWidth = 7; // num chars in dot string
var spacerLength = 2; // gap between generated characters
var numGeneratedCharacters = 6;

// holds "hash" value of each generated character
// used to convert dots to character
var alphanumericHash = {};


function SolveCaptcha(strDots) {
    // Initialize hash set
    buildCharacterSetHash();

    // convert dots to numeric hash
    var charHash = dotsToNumArray(strDots);
    var captcha = '';

    // convert each numeric hash to character value
    for (var i = 0; i < charHash.length; i++) {
        captcha += (alphanumericHash[charHash[i]]);
    }

    return captcha;
}


//-----------------------------

// Convert string of dots to array of "hash" values
// each array index holding a different character
function dotsToNumArray(strDots) {
    var charHash = []; // array of character hashes
    var currChar = 0;
    var rowNum = 0;

    // initial loop to go over string
    for (var i = 0; i < strDots.length;) {
        if (charHash[currChar] == null) {
            charHash[currChar] = '';
        }
        var item = strDots.substr(i, dotStringWidth);

        // gen number
        var number = generateRowHash(rowNum, item);

        // update currWord
        charHash[currChar] = charHash[currChar] + number;

        // incr currWord
        if (currChar < numGeneratedCharacters - 1) {
            currChar += 1;
        } else {
            rowNum += 1;
            currChar = 0;
        }

        // get next set        
        i += dotStringWidth + spacerLength;
    }

    return charHash;
}

//-----------------------------

// generate hash values for entire character set
function buildCharacterSetHash() {
    var charset = ALPHANUMERIC;
    for (var i = 0; i < charset.length; i++) {
        // add to hash table
        var c = charset.charAt(i);
        var h = generateCharacterHash(charset, c);
        alphanumericHash[h] = c;
    }
}

// generate "hash" for passed in character
function generateCharacterHash(charset, character) {
    var strDots = '';
    var hashValue = '';

    // generate rows of dots
    for (var i = 0; i < dotStringWidth; i++) {
        strDots = dots[charset.indexOf(character)][i];
        hashValue += generateRowHash(i, strDots);
    }

    return hashValue;
}

// generate "hash" per row of dots
function generateRowHash(rowNum, str) {
    rowNum = ("00" + rowNum).slice(-3); // pad values
    var result = ''

    for (var i = 0; i < str.length; i++) {
        if (str[i] === '*') {
            var number = ("00" + i).slice(-3); // pad values
            result += rowNum + number;
        }
    }

    return result;
}