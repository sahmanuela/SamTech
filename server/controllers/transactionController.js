const pool = require('../config/database')
const db = pool

const xuxu = (value) =>  JSON.parse(JSON.stringify(value, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));

const index = async (req, res) => {

    const sql = `
        SELECT
            t.id,
            t.total_amount,
            t.discount,
            ts.name as status,
            ca.name as client
        FROM transactions as t
        inner join transaction_status as ts on ts.id = t.status_id 
        inner join contacts as ca on ca.id = t.client_id 
        order by t.id desc 
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
        SELECT * from transactions WHERE id = ?
    `;

    try {
        const data = await db.query(sql, [id])
        const produtos = await db.query(`select * from transaction_product where transaction_id = ?`, [id]);
        res.json({ data: xuxu(data)[0], produtos: xuxu(produtos) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const clients = async (request, res) => {
    const sql = `
        SELECT ca.id, ca.name as label from clients c inner join contacts as ca on ca.id = c.id order by name
    `;

    try {
        const data = await db.query(sql)
        res.json({ data: xuxu(data) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const produtos = async (request, res) => {
    const sql = `
        SELECT id, name as label from products order by name
    `;

    try {
        const data = await db.query(sql)
        res.json({ data: xuxu(data) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const status = async (request, res) => {
    const sql = `
        SELECT id, name as label from transaction_status c order by name
    `;

    try {
        const data = await db.query(sql)
        res.json({ data: xuxu(data) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const save = async (request, response) => {
    let { id, description, client_id, discount, status_id, products } = request.body;

    try {
        const params = [description, client_id, discount, status_id];
        let total = 0;
        for (const p of products) {
            const [result] = await db.query(
                'SELECT selling_price * ? AS total FROM products WHERE id = ?',
                [p.count, p.product_id]
            );
            total += result.total ?? 0;
        }

        const totalWithDiscount = total - (total * (discount / 100));

        if (id) {
            params.push(totalWithDiscount);
            params.push(id);
            const sql = 'update transactions set description = ?, client_id = ?, discount = ?, status_id = ?, total_amount = ? where id = ?'
            await db.query(sql, params);
        } else {
            params.push(totalWithDiscount);
            const sql = 'insert into transactions (description, client_id, discount, status_id, total_amount) values(?,?,?,?,?)'
            const data = await db.query(sql, params);   
            id = data.insertId;
        }
        await db.query('delete from transaction_product where transaction_id = ?', [id]);
        products.forEach(async produto => {
            await db.query('insert into transaction_product (count, transaction_id, product_id, selling_price) values(?,?,?,  (SELECT selling_price FROM products as p WHERE p.id = ?))', [produto.count, id, produto.product_id, produto.product_id]);
        })

        response.status(201).json({ message: `Transação adicionado`, success: true });    
      } catch (err) {
        response.status(500).json({ error: err.message });
      }
};

const destroy = async (request, response) => {
    const id = parseInt(request.params.id);
    
    try {
        await db.query('delete from transaction_product where transaction_id = ?', [id]);
        await db.query('delete from transactions where id = ?', [id],)
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
    status,
    produtos,
};
