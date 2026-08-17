import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CharactersPage } from './features/characters/pages/CharactersPage';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <CharactersPage />
      </main>
      <Footer />
    </div>
  );
}
