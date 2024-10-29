const pool = require('../config/database')
const db = pool

const xuxu = (value) =>  JSON.parse(JSON.stringify(value, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));

const index = async (req, res) => {

    const sql = `
        SELECT
            id,
            name,
            CASE WHEN is_digital = 1 THEN 'Sim' ELSE 'Não' END AS digital
        FROM product_types
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
        SELECT * from product_types
        WHERE id = ?
    `;

    try {
        const data = await db.query(sql, [id])
        res.json({ data: xuxu(data)[0] });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const save = async (request, response) => {
    const { id, name, is_digital } = request.body;

    const sql = id
        ? 'UPDATE product_types SET name = ?, is_digital = ? WHERE id = ? '
        : 'INSERT INTO product_types (name, is_digital) VALUES (?,?) '

    try {
        const params = [name, is_digital]
        if (id) {
            params.push(id);
        }

        const data = await db.query(sql, params)
        response.status(201).send(`Product type added`);    
      } catch (err) {
        response.status(500).json({ error: err.message });
      }
};

const destroy = async (request, response) => {
    const id = parseInt(request.params.id);
    
    try {
        const data = await db.query('delete from product_types where id = ?', [id],)
        response.status(200).json({ message: 'Product typedeleted', success: true });
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
