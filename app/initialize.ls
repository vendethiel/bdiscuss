require! <[application routes]>

# Initialize the application on DOM ready event.
<-! $
new application {
	title: 'Bdiscuss'
	controller-suffix: '-controller'
	routes
}