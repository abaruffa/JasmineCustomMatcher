## Jasmine Custom Matchers

Customer matchers with better error messages.

This uses the concept of [Jasmine Custom Matchers](http://jasmine.github.io/2.0/custom_matcher.html) to format better error messages when a unit test fails because two things are not equal to each other.

### Problem

The standard output when two strings does not match and the unit test fails is **expected _actual _ to equal _expected_ **. This works fine when the subject of the test is not too long or easy to read through.

Many Jasmine users have probably seen a similar scenario too many times:

![Failing unit test](https://s3.amazonaws.com/uploads.hipchat.com/18058/341024/VXUGSwVNFT6i77H/Screen%20Shot%202016-04-25%20at%2012.57.24%20PM.png)

It is almost impossible to tell the difference between the two strings without spending valuable time going through every line and word to spot the error.

### toMatchString

When an expect statement uses the matcher toMatchString and fails, the error message will more clearly show what is the actual output, what was the expected output, and will point out the first difference between the two strings. For example:

````
it("shows an error message when two strings are not equal", function() {
    var testString = "Thes strang es dafferent thin the othar in a fiw plices";
    var expectedString = "This string is different than the other in a few places"
    expect(testString).toMatchString(expectedString);
  });
````

![ErrorMessage](https://s3.amazonaws.com/uploads.hipchat.com/18058/341024/y0HoK9IQVpMx5sG/Screen%20Shot%202016-04-27%20at%208.08.09%20PM.png)