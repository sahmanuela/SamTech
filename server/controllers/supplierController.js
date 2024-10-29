const pool = require('../config/database')
const db = pool

const xuxu = (value) =>  JSON.parse(JSON.stringify(value, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));

const index = async (req, res) => {

    const sql = `
        SELECT
            c.id,
            c.name,
            c.phone,
            c.email
        FROM suppliers as s
        inner join contacts as c on c.id = s.id 
        order by c.id asc 
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
        SELECT contacts.* from suppliers inner join contacts on contacts.id = suppliers.id
        WHERE contacts.id = ?
    `;

    try {
        const data = await db.query(sql, [id])
        res.json({ data: xuxu(data)[0] });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const documents = async (request, res) => {
    const sql = `
        SELECT * from contact_document_types
    `;

    try {
        const data = await db.query(sql)
        res.json({ data: xuxu(data) });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const save = async (request, response) => {
    const { id, name, email, phone, document, document_type_id } = request.body;

    try {
        const params = [name, email, phone, document, document_type_id];
        if (id) {
            params.push(id);
            const sql = 'update contacts set name = ?, email = ?, phone = ?, document = ?, document_type_id = ? where id = ?'
            await db.query(sql, params);
        } else {
            const sql = 'insert into contacts (name, email, phone, document, document_type_id) values(?,?,?,?,?)'
            const newContact = await db.query(sql, params);
            await db.query('insert into suppliers (id) values(?)', [newContact.insertId]);
        }
        response.status(201).json({ message: `Fornecedor adicionado`, success: true });    
      } catch (err) {
        response.status(500).json({ error: err.message });
      }
};

const destroy = async (request, response) => {
    const id = parseInt(request.params.id);
    
    try {
        await db.query('delete from suppliers where id = ?', [id],)
        await db.query('delete from contacts where id = ?', [id],)
        response.status(200).json({ message: 'Fornecedor removido', success: true });
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
};

module.exports = {
    index,
    show,
    save,
    destroy,
    documents,
};
