 realperson - NOT
===============

Lately I've been seeing more and more websites use [realperson.js](http://keith-wood.name/realPerson.html) as their captchas. 

This is a bad idea as this captcha is _ridiculously_ easy to defeat -- even if your web automated testing tool does not allow for javascript injection!

Here is a simple script which can solve captchas generated on [realperson.js test page](http://keith-wood.name/realPersonBasics.html).

> **Tip:** Use your automated web testing tool to extract 
> ```
> $('.realperson-text').text()
> ```

