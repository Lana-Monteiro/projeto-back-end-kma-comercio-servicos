import { Router } from 'express';
import { listarItens, criarItem, atualizarItem, deletarItem } from '../controllers/itemController.js';

const router = Router();

router.get('/itens', listarItens);
router.post('/itens', criarItem);
router.put('/itens/:id', atualizarItem);
router.delete('/itens/:id', deletarItem);

export default router;