var customMatcher = require('../src/toMatchString.js');

describe('Custom matcher: toMatchString', function() {

  beforeEach(function() {
    jasmine.addMatchers(customMatcher);
  });

  it('passes if two strings are equal', function() {
    var testString = 'I am a test string';
    var expectedString = 'I am a test string';
    expect(testString).toMatchString(expectedString);
  });

  it('can be negated', function() {
    var testString = 'Thes strang es dafferent thin the othar in a fiw plices';
    var expectedString = 'This string is different than the other in' +
      ' a few places';
    expect(testString).not.toMatchString(expectedString);
  });

  describe('error messaging', function() {

    beforeEach(function() {
      var util = {
        equals: jasmine.createSpy().and.returnValue(false)
      };
      this.matcher = customMatcher.toMatchString(util);
    });

    it('shows an error message when two strings are not equal', function() {
      var testString = 'Almost the same';
      var expectedString = 'Almist the same';
      var expectedResult = 'Expected: \n\tAlmost the same\nto equal: ' +
      '\n\tAlmist the same\nFirst Difference:\n\tAlmost the same\n\t   ^\n';
      var message = this.matcher.compare(testString, expectedString).message;
      expect(message).toEqual(expectedResult);
    });

    it('can handle when the expected string is longer', function() {
      var testString = 'Almist the same';
      var expectedString = 'Almost the samehello';
      var message = this.matcher.compare(testString, expectedString).message;
      var messageArray = message.split('\n');
      expect(messageArray[0]).toEqual('Expected: ');
      expect(messageArray[1]).toEqual('\tAlmist the same');
      expect(messageArray[2]).toEqual('to equal: ');
      expect(messageArray[3]).toEqual('\tAlmost the samehello');
      expect(messageArray[4]).toEqual('First Difference:');
      expect(messageArray[5]).toEqual('\tAlmist the same');
      expect(messageArray[6]).toEqual('\t   ^');
    });

    it('can handle when the expected string is longer and the error is at ' +
        ' the end', function() {
      var testString = 'Almost the same';
      var expectedString = 'Almost the samehello';
      var message = this.matcher.compare(testString, expectedString).message;
      var messageArray = message.split('\n');
      expect(messageArray[0]).toEqual('Expected: ');
      expect(messageArray[1]).toEqual('\tAlmost the same');
      expect(messageArray[2]).toEqual('to equal: ');
      expect(messageArray[3]).toEqual('\tAlmost the samehello');
      expect(messageArray[4]).toEqual('First Difference:');
      expect(messageArray[5]).toEqual('\tAlmost the same');
      expect(messageArray[6]).toEqual('\t              ^');
    });
  });
});