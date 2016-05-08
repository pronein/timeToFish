# Time To Fish

This application is a full-stack MEAN implementation of my personal website. The website is used to track my yearly fishing trip results (currently).

## Database Design
* db.users
    - __username__: String
    - __passwordHash__: String
    - __firstName__: String
    - __middleName__: String
    - __lastName__: String
    - __email__: String
    - __roles__: [] (ObjectId of role) <-- Populate
* db.roles
    - __name__: String
    - __permissions__: [] (ObjectId of permission) <-- Populate
* db.permissions
    - __name__: String
* db.menuItems
    - __menuId__: Number
    - __permissionRequired__: ObjectId (permission) <-- Populate
    - __name__: {state: String, display: String}
    - __owner__: String