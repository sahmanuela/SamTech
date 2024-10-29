const pool = require('../config/database')
const db = pool

const xuxu = (value) =>  JSON.parse(JSON.stringify(value, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));

const index = async (req, res) => {

    const sql = `
        SELECT
            p.id,
            p.name,
            p.cost_price,
            p.selling_price,
            pt.name as type,
            ca.name as supplier
        FROM products as p
        inner join product_types as pt on pt.id = p.product_type_id 
        inner join contacts as ca on ca.id = p.supplier_id 
        order by p.id asc 
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
        SELECT * from products
        WHERE id = ?
    `;

    try {
        const data = await db.query(sql, [id])
        res.json({ data: xuxu(data)[0] });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const clients = async (request, res) => {
    const sql = `
        SELECT ca.id, ca.name as label from suppliers c inner join contacts as ca on ca.id = c.id order by name
    `;

    try {
        const data = await db.query(sql)
        res.json({ data: xuxu(data) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const types = async (request, res) => {
    const sql = `
        SELECT id, name as label from product_types c order by name
    `;

    try {
        const data = await db.query(sql)
        res.json({ data: xuxu(data) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const save = async (request, response) => {
    const { id, name, description, cost_price, selling_price, product_type_id, supplier_id } = request.body;

    try {
        const params = [name, description, cost_price, selling_price, product_type_id, supplier_id];
        if (id) {
            params.push(id);
            const sql = 'update contacts set name = ?, description = ?, cost_price = ?, selling_price = ?, product_type_id = ?, supplier_id = ? where id = ?'
            await db.query(sql, params);
        } else {
            const sql = 'insert into products (name, description, cost_price, selling_price, product_type_id, supplier_id) values(?,?,?,?,?,?)'
            await db.query(sql, params);
        }
        response.status(201).json({ message: `Produto adicionado`, success: true });    
      } catch (err) {
        response.status(500).json({ error: err.message });
      }
};

const destroy = async (request, response) => {
    const id = parseInt(request.params.id);
    
    try {
        await db.query('delete from products where id = ?', [id],)
        response.status(200).json({ message: 'Produto removido', success: true });
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
};

module.exports = {
    index,
    show,
    save,
    destroy,
    clients,
    types,
};
