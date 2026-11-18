import prisma from '../models/prisma.js';

export const listarItens = async (req, res) => {
  try {
    const itens = await prisma.item.findMany();
    return res.status(200).json(itens);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao procurar itens.' });
  }
};

export const criarItem = async (req, res) => {
  try {
    const { nome, descricao, preco, tipo, imagemUrl } = req.body;
    if (!nome || !preco || !tipo) {
      return res.status(400).json({ erro: 'Nome, preço e tipo são obrigatórios.' });
    }
    const novoItem = await prisma.item.create({
      data: { nome, descricao, preco: parseFloat(preco), tipo, imagemUrl }
    });
    return res.status(201).json(novoItem);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao registar item.' });
  }
};

export const atualizarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, tipo, imagemUrl } = req.body;
    const itemAtualizado = await prisma.item.update({
      where: { id: Number(id) },
      data: { nome, descricao, preco: parseFloat(preco), tipo, imagemUrl }
    });
    return res.status(200).json(itemAtualizado);
  } catch (error) {
    return res.status(404).json({ erro: 'Item não encontrado para atualização.' });
  }
};

export const deletarItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.item.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ erro: 'Item não encontrado para eliminação.' });
  }
};