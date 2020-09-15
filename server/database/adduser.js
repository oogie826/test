db.createUser(
    {
        user: "manager",
        pwd: "manager",
        roles: [
            { role: "readWrite", db: "kinderguard" }
        ]
    }
)