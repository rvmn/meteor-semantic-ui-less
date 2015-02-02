##Semantic UI package for meteor using less

###What is this?
This is a wrapper for Semantic UI for Meteor using less. It links to the official repo, so it's always updated to the latest fresh release.

###What is Semantic UI?
Semantic is a set of specifications for sharing UI elements between developers. Semantic is also a UI library to make front end development simpler and easier to learn. 

[http://semantic-ui.com](http://www.semantic-ui.com/)  
[https://github.com/Semantic-Org/Semantic-UI](https://github.com/Semantic-Org/Semantic-UI)

###Install
`meteor add rvmn:semantic-ui-less`

####issues:
Javascript elements like dropdowns are not active by default. 
You will have to activate them 'manually' in the `template.rendered` function like: 

```javascript
Template.hello.rendered = function(){
	$('.ui.dropdown').dropdown();
}
```
###Examples
See the examples folder
