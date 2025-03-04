const fs = require('fs');
const s3 = require('../Config/awsConfig');
const { v4: uuidv4 } = require('uuid');
const imagemRepository = require('../Repository/imagemRepository');

const uploadFile = async (imagem) => {
  try {
    const filePath = imagem.path;
    const fileContent = fs.readFileSync(filePath);

    const bucketName = "bucketmi74";
    const id = uuidv4();

    const params = {
      Bucket: bucketName,
      Key: id,
      Body: fileContent
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, async (err, data) => {
        if (err) {
          console.error('Erro ao fazer upload:', err);
          reject(err);
        } else {
          console.log('Arquivo carregado com sucesso:', data.Location);

          try {
            await imagemRepository.salvarImagem(id, data.Location);
            resolve({ id, url: data.Location });
          } catch (dbError) {
            reject(dbError);
          }
        }
      });
    });
  } catch (error) {
    console.error('Erro no uploadFile:', error);
    throw error;
  }
};

const getImagemById = async (id) => {
  return await imagemRepository.buscarImagemPorId(id);
};

module.exports = { uploadFile, getImagemById };
