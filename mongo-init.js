db.auth('root', 'rootpassword')

db = db.getSiblingDB('secret-server-db')
db.createUser(
    {
        user: 'secret-server-user',
        pwd: 'supersecretpassword',
        roles: [
            {
                role: 'readWrite',
                db: 'secret-server-db'
            }
        ]
    }
);