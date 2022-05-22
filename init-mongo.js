db.createUser(
    {
        user: 'dbuser',
        pwd: 'strong_password',
        roles: [
            {
                role: 'readWrite',
                db: 'ridecoGl'
            }
        ]
    }
)