const db = require("../database");

module.exports = {
  async store(req, res) {
    const { name } = req.body;

    try {
      const text = "INSERT INTO cities(name) VALUES($1) RETURNING *";
      const values = [name];

      const owner = await db.query(text, values);
      
      res.json({ fields: owner.rows });
    } catch (err) {
      console.log(err);
    }
  },

  async index(req, res) {
    try {
      const cities = await db.query("SELECT * FROM cities");

      res.json({ Cidades: cities.rows });
    } catch (error) {
      res.status(500).json({
        erro: "Não foi possivel listar os campos no banco de dados",
      });
    }
  },

  async update(req, res) {
    const { name } = req.body;
    const { id } = req.params;

    try {
      await db.query("UPDATE cities SET name=$1 WHERE id=$2", [name, id]);
      res.send();
    } catch (error) {
      res.status(500).send({
        erro: "Não foi possivel fazer a alteração no banco de dados",
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await db.query("DELETE FROM cities WHERE id=$1", [id]);
      res.send();
    } catch (error) {
      res.status(500).json({
        erro: "Não foi possivel fazer a alteração no banco de dados",
      });
    }
  },
};
