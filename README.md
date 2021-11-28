# Cinema-Site


Cinema management site for employees. The site exposed different functionalities to different employees permissions, like creating users, listing/adding/deleting/editing movies and subscriptions for customers. Created two separate web services to handle the different logics of the system, one for managing the employees and their permissions and one for managing the customers and their subscriptions and movies they go to. The Client-side talks only with the cinema employees server to
handle and manage permissions to each employee's actions on
the subscriptions server. Each server communicates with a different MongoDB instance
and implements the server logics using controllers, Businesslogics, and models(mongo schemas) to any collection. The employees server is using JSON files to manage the
employees permissions. Used axios in various APIs to communicate with the 3rd party API
for setting up the starting state of the DB. The Client-side is a SPA written in React framework with context- API state management.
