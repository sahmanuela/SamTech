const pool = require('../config/database')
const db = pool

const xuxu = (value) =>  JSON.parse(JSON.stringify(value, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));

const index = async (req, res) => {
console.log(req.params)
    const sql = `
        SELECT
            u.id,
            u.name,
            u.email
        FROM users as u
        order by id asc 
    `

    try {
        const data = await db.query(sql)
        res.json({
            totalElements: data.lenght,
            custom_filters: [],
            data: xuxu(data)
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const show = async (request, res) => {
    const id = parseInt(request.params.id);

    const sql = `
        SELECT
            u.id,
            u.name,
            u.email
        FROM users as u
        WHERE u.id = ?
    `;

    try {
        const a = await db.query(sql, [id])
        res.json({ data: xuxu(a[0]) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const save = async (request, response) => {
    const { id, name, email, password } = request.body;

    const hasPassword = password && password.trim().lenght > 0;
    let query, params;
    if (id) {
        query = hasPassword
            ? 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? '
            : 'UPDATE users SET name = ?, email = ? WHERE id = ? ';

        params = hasPassword 
            ? [name, email, password, id] 
            : [name, email, id];
    } else {
        query = hasPassword
            ? 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
            : 'INSERT INTO users (name, email) VALUES (?, ?)';

        params = hasPassword 
            ? [name, email, password, id] 
            : [name, email, id];
    }

    try {
        await db.query(query, params)
        response.status(201).send(`User added`);
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
};


const destroy = async (request, response) => {
    const id = parseInt(request.params.id);
    
    try {
        const data = await db.query('delete from users where id = ?', [id],)
        response.status(200).json({ message: 'Usuario deletado', success: true });
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
};

module.exports = {
    index,
    show,
    save,
    destroy,
};
