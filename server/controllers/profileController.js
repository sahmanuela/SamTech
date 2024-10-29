const pool = require('../config/database')
const db = pool

const xuxu = (value) =>  JSON.parse(JSON.stringify(value, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));

const index = async (req, res) => {
    const id = parseInt(req.query.id);

    const sql = `
        SELECT
            u.id,
            u.name,
            u.email
        FROM users as u
        where id = ?
    `
    try {
        const data = await db.query(sql, [id])
        res.json({ data: xuxu(data[0]) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const save = async (request, response) => {
    const { id, name, email, password } = request.body;

    try {
        const hasPassword = password && password.trim().length > 0;
        const params = [name, email];
        if (hasPassword) {
            params.push(password);
        }
        params.push(id);
        const data = await db.query(`UPDATE users SET name = ?, email = ? ${hasPassword ? ', password = ?' : '' } WHERE id = ?`, params)
        response.status(201).send('User updated');
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
};
module.exports = {
    index,
    save,
};
