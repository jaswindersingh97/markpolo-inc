const users = require("./../data/users.json");

const getUser = async (req, res) => {
    try {
        let { page = 1, limit = 50, search = "" } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: "Invalid page or limit" });
        }

        let filteredUsers = users;

        if (search) {
            search = search.toLowerCase();
            filteredUsers = users.filter(user => 
                user.name.toLowerCase().includes(search) || 
                user.email.toLowerCase().includes(search)
            );
        }

        const total = filteredUsers.length;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        res.json({
            data: paginatedUsers,
            total,
            page,
            limit,
        });
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

module.exports = { getUser };
