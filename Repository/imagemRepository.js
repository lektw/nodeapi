const db = require('../Config/banco');

const salvarImagem = async (id, url) => {
  try {
    const sql = "INSERT INTO imagens (id, url) VALUES (?, ?)";
    await db.execute(sql, [id, url]);
  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    throw error;
  }
};

const buscarImagemPorId = async (id) => {
  try {
    const [rows] = await db.execute('SELECT url FROM imagens WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Erro ao buscar imagem:', error);
    throw error;
  }
};

module.exports = { salvarImagem, buscarImagemPorId };
