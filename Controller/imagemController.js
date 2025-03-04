const uploadService = require('../Service/imagemService');

const uploadHandler = async (req, res) => {
  const imagem = req.file;

  if (!imagem) {
    return res.status(400).json({ message: 'Nenhuma imagem foi enviada!' });
  }

  try {
    const { id, url } = await uploadService.uploadFile(imagem);
    res.json({ message: 'Upload realizado com sucesso!', id, url });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer upload', error });
  }
};

const getImagemByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const imagem = await uploadService.getImagemById(id);
    if (!imagem) {
      return res.status(404).json({ message: 'Imagem não encontrada' });
    }
    res.json(imagem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar imagem', error });
  }
};

module.exports = { uploadHandler, getImagemByIdHandler };
