import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CharactersPage } from '../../features/characters/pages/CharactersPage';
import { CharacterDetailPage } from '../../features/characters/pages/CharacterDetailPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50">
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
