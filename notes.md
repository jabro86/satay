# Create a new project
* DB entry with project id and settings
* setup new prisma project with docker and port
    * prisma init, deploy and auto-generate on changes


## Resources for project

* each resource ends in a data entity for prisma
* all data entities are merged in datamodel.prisma
** this datamodel is used to generate graphql CRUD and filter operations

* to model a resource use form-designer
** string and number fields
* on save: resource is stored in db joined with projectId


* deploy project -> prisma project gets update/migrated with resources from db -> when ready, it can be used

* use form 
* on submit, use graphl mutations