import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import AnalyzerPage from '@/pages/AnalyzerPage';
import ProductsPage from '@/pages/ProductsPage';
import IngredientsPage from '@/pages/IngredientsPage';
import AllergyPage from '@/pages/AllergyPage';
import SkinTestPage from '@/pages/SkinTestPage';

type Page = 'home' | 'analyzer' | 'products' | 'ingredients' | 'allergy' | 'skintest';

export default function Index() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: string) => setPage(p as Page);

  return (
    <div className="min-h-screen">
      <Navbar active={page} onNavigate={navigate} />
      {page === 'home'        && <HomePage onNavigate={navigate} />}
      {page === 'analyzer'   && <AnalyzerPage />}
      {page === 'products'   && <ProductsPage />}
      {page === 'ingredients' && <IngredientsPage />}
      {page === 'allergy'    && <AllergyPage />}
      {page === 'skintest'   && <SkinTestPage />}
    </div>
  );
}
