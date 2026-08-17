import { Request, Response } from 'express';
import { CharactersQueryParams, CharacterIdParam } from '../schemas/characters.schema';
import { getCharacters, getCharacterById } from '../services/characters.service';

export async function charactersController(req: Request, res: Response): Promise<void> {
  const { name, page, status } = req.query as CharactersQueryParams;

  const params: Record<string, string> = {};
  if (name) params.name = name;
  if (page) params.page = String(page);
  if (status) params.status = status;

  const result = await getCharacters(params);
  res.status(result.status).json(result);
}

export async function characterByIdController(req: Request, res: Response): Promise<void> {
  const { id } = req.params as unknown as CharacterIdParam;
  const result = await getCharacterById(id);
  res.status(result.status).json(result);
}
