var MAX_STR_LENGTH = 20;

function toMatchString(util, customEqualityTesters) {
  customEqualityTesters = customEqualityTesters || [];

  return {
    compare: function(actual, expected) {

      var result = {
        pass: util.equals(actual, expected, customEqualityTesters)
      };

      if (!result.pass) {
        var firstDifference = findFirstDifference(actual, expected);
        var output = formatOutput(firstDifference, actual);
        result.message = 'Expected: \n\t' + actual + '\nto equal: \n\t' +
          expected + '\nFirst Difference:\n\t' + output;
      }
      return result;
    }
  };
}

function findFirstDifference(actual, expected) {
  var diffIndex;
  var actualString = actual.split('');
  var expectedString = expected.split('');

  actualString.some(function(character, index) {
    if(character !== expectedString[index]){
      diffIndex = index;
      return false;
    }
  });

  return diffIndex || actualString.length;
}

function formatOutput(differenceLocation, actual) {
  var newString = '\t';
  var actualString = actual.split('');
  var startingIndex = Math.max(differenceLocation - MAX_STR_LENGTH, 0);
  var endingIndex = Math.min(differenceLocation + MAX_STR_LENGTH,
    actualString.length);

  if(differenceLocation === actualString.length) {
    differenceLocation--;
  }

  for(var i = startingIndex; i < actualString.length; i++) {
    if(i === differenceLocation) {
      newString += '^';
      break;
    }
    else {
      newString += ' ';
    }
  }

  return actualString.slice(startingIndex, endingIndex)
    .join('') + '\n' + newString + '\n';
}

module.exports.toMatchString = toMatchString;