'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  LogOut, Plus, Pencil, Trash2, Search, Package,
  AlertTriangle, CheckCircle, X, Eye, EyeOff, BarChart3,
  ArrowUpDown, ChevronDown,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
}

type SortKey = 'name' | 'category' | 'price' | 'stock';

const CATEGORIES = [
  'Pantallas', 'Baterías', 'Flex', 'Conectores',
  'Chips / IC', 'Herramientas', 'Accesorios', 'Otros',
];

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Pantalla iPhone 13', category: 'Pantallas', brand: 'Apple', model: 'iPhone 13', price: 18500, stock: 5, description: 'Display OLED original', createdAt: new Date().toISOString() },
  { id: '2', name: 'Batería Samsung S21', category: 'Baterías', brand: 'Samsung', model: 'Galaxy S21', price: 4200, stock: 8, description: 'Batería 4000mAh', createdAt: new Date().toISOString() },
  { id: '3', name: 'Pantalla Motorola G9', category: 'Pantallas', brand: 'Motorola', model: 'Moto G9 Plus', price: 6800, stock: 3, description: 'LCD + táctil', createdAt: new Date().toISOString() },
];

const STORAGE_KEY = 'monstergsm_products';
const PASSWORD = 'monster.lomas';

// ─── Empty form ────────────────────────────────────────────────────────────────
const emptyForm = (): Omit<Product, 'id' | 'createdAt'> => ({
  name: '', category: 'Pantallas', brand: '', model: '',
  price: 0, stock: 0, description: '',
});

// ─── Admin Page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterCat, setFilterCat] = useState('');

  const [modal, setModal] = useState<{ open: boolean; edit: Product | null }>({ open: false, edit: null });
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Load products from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setProducts(JSON.parse(stored)); } catch { setProducts(INITIAL_PRODUCTS); }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  const save = useCallback((updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  // Open add modal
  const openAdd = () => {
    setForm(emptyForm());
    setModal({ open: true, edit: null });
  };

  // Open edit modal
  const openEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, brand: p.brand, model: p.model, price: p.price, stock: p.stock, description: p.description });
    setModal({ open: true, edit: p });
  };

  // Save product (add or edit)
  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (modal.edit) {
      const updated = products.map(p => p.id === modal.edit!.id ? { ...p, ...form } : p);
      save(updated);
      showToast('Producto actualizado ✓');
    } else {
      const newP: Product = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
      save([...products, newP]);
      showToast('Producto agregado ✓');
    }
    setModal({ open: false, edit: null });
  };

  // Delete product
  const confirmDelete = (id: string) => setDeleteId(id);
  const doDelete = () => {
    if (!deleteId) return;
    save(products.filter(p => p.id !== deleteId));
    setDeleteId(null);
    showToast('Producto eliminado', 'error');
  };

  // Sort & filter
  const filtered = products
    .filter(p => {
      const q = search.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q);
      const matchCat = filterCat ? p.category === filterCat : true;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      let va: string | number = a[sortKey];
      let vb: string | number = b[sortKey];
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);
  const lowStock = products.filter(p => p.stock <= 2).length;

  // ─── Login screen ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-dark bg-grid flex items-center justify-center px-4">
        <div
          className="w-full max-w-md p-10 rounded-xl relative"
          style={{
            background: '#0d0d0d',
            border: '1px solid rgba(61,255,20,0.3)',
            boxShadow: '0 0 40px rgba(61,255,20,0.15), inset 0 0 30px rgba(61,255,20,0.04)',
          }}
        >
          {/* Corners */}
          <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: '2px solid #3DFF14', borderLeft: '2px solid #3DFF14', boxShadow: '-3px -3px 8px rgba(61,255,20,0.4)' }} />
          <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: '2px solid #3DFF14', borderRight: '2px solid #3DFF14', boxShadow: '3px 3px 8px rgba(61,255,20,0.4)' }} />

          <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-5" style={{ filter: 'drop-shadow(0 0 16px #3DFF14)' }}>
              <Image src="/logo.svg" alt="Monster GSM" fill className="object-contain" />
            </div>
            <h1 className="font-orbitron font-bold text-2xl tracking-widest" style={{ color: '#3DFF14', textShadow: '0 0 10px #3DFF14' }}>
              PANEL ADMIN
            </h1>
            <p className="font-rajdhani text-gray-500 text-sm mt-2 tracking-wider">Monster GSM — Acceso restringido</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-rajdhani text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2 block">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={pwInput}
                  onChange={e => setPwInput(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full px-4 py-3 pr-12 rounded font-rajdhani text-white bg-black/60 outline-none transition-all duration-300 ${
                    pwError ? 'border-red-500' : 'border-neon-green/30 focus:border-neon-green'
                  }`}
                  style={{
                    border: pwError ? '1px solid #ef4444' : '1px solid rgba(61,255,20,0.3)',
                    boxShadow: pwError ? '0 0 10px rgba(239,68,68,0.3)' : undefined,
                  }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon-green transition-colors">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {pwError && (
                <p className="mt-2 font-rajdhani text-sm text-red-400 flex items-center gap-1.5">
                  <X size={14} /> Contraseña incorrecta
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded font-orbitron font-bold text-sm tracking-widest transition-all duration-300"
              style={{
                background: 'rgba(61,255,20,0.1)',
                border: '2px solid #3DFF14',
                color: '#3DFF14',
                textShadow: '0 0 8px #3DFF14',
                boxShadow: '0 0 15px rgba(61,255,20,0.3)',
              }}
            >
              INGRESAR
            </button>
          </form>
          <p className="mt-6 text-center font-rajdhani text-xs text-gray-700">
            <a href="/" style={{ color: 'rgba(61,255,20,0.5)' }}>← Volver al sitio</a>
          </p>
        </div>
      </div>
    );
  }

  // ─── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-dark text-white font-rajdhani">

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-lg font-rajdhani text-sm font-semibold shadow-2xl"
          style={{
            background: toast.type === 'success' ? 'rgba(61,255,20,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${toast.type === 'success' ? '#3DFF14' : '#ef4444'}`,
            color: toast.type === 'success' ? '#3DFF14' : '#ef4444',
            boxShadow: `0 0 20px ${toast.type === 'success' ? 'rgba(61,255,20,0.3)' : 'rgba(239,68,68,0.3)'}`,
          }}
        >
          {toast.type === 'success' ? <CheckCircle size={18} /> : <X size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(61,255,20,0.2)' }}>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8" style={{ filter: 'drop-shadow(0 0 6px #3DFF14)' }}>
            <Image src="/logo.svg" alt="Monster GSM" fill className="object-contain" />
          </div>
          <div>
            <h1 className="font-orbitron font-bold text-base tracking-widest" style={{ color: '#3DFF14', textShadow: '0 0 8px #3DFF14' }}>PANEL ADMIN</h1>
            <p className="font-rajdhani text-xs text-gray-600 tracking-wider -mt-0.5">Monster GSM</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="font-rajdhani text-sm text-gray-500 hover:text-neon-green transition-colors hidden sm:block">← Ver sitio</a>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-all duration-300"
            style={{ border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444' }}
          >
            <LogOut size={15} />
            <span className="hidden sm:block">Salir</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package, label: 'Total productos', value: products.length, color: '#3DFF14' },
            { icon: BarChart3, label: 'Total en stock', value: products.reduce((s, p) => s + p.stock, 0), color: '#3DFF14' },
            { icon: AlertTriangle, label: 'Stock bajo', value: lowStock, color: lowStock > 0 ? '#f59e0b' : '#3DFF14' },
            { icon: CheckCircle, label: 'Valor total', value: `$${totalValue.toLocaleString('es-AR')}`, color: '#1A5CFF' },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div key={i} className="p-5 rounded-lg" style={{ background: '#0d0d0d', border: `1px solid ${color}25`, boxShadow: `0 0 12px ${color}10` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-rajdhani text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">{label}</span>
                <Icon size={16} style={{ color, filter: `drop-shadow(0 0 4px ${color})` }} />
              </div>
              <div className="font-orbitron font-bold text-2xl" style={{ color, textShadow: `0 0 8px ${color}80` }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, marca o modelo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded bg-black/60 text-white outline-none font-rajdhani text-sm transition-all"
              style={{ border: '1px solid rgba(61,255,20,0.2)' }}
              onFocus={e => (e.target.style.border = '1px solid rgba(61,255,20,0.6)')}
              onBlur={e => (e.target.style.border = '1px solid rgba(61,255,20,0.2)')}
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <select
              value={filterCat}
              onChange={e => setFilterCat(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2.5 rounded bg-black/60 text-white font-rajdhani text-sm outline-none cursor-pointer"
              style={{ border: '1px solid rgba(61,255,20,0.2)' }}
            >
              <option value="">Todas las categorías</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Add button */}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-6 py-2.5 rounded font-orbitron font-bold text-xs tracking-widest transition-all duration-300"
            style={{ background: 'rgba(61,255,20,0.1)', border: '2px solid #3DFF14', color: '#3DFF14', textShadow: '0 0 6px #3DFF14', boxShadow: '0 0 12px rgba(61,255,20,0.2)' }}
          >
            <Plus size={16} />
            AGREGAR
          </button>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(61,255,20,0.2)', boxShadow: '0 0 20px rgba(61,255,20,0.06)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(61,255,20,0.06)', borderBottom: '1px solid rgba(61,255,20,0.2)' }}>
                  {[
                    { label: 'Producto', key: 'name' as SortKey },
                    { label: 'Categoría', key: 'category' as SortKey },
                    { label: 'Marca / Modelo', key: null },
                    { label: 'Precio', key: 'price' as SortKey },
                    { label: 'Stock', key: 'stock' as SortKey },
                    { label: 'Acciones', key: null },
                  ].map(({ label, key }) => (
                    <th
                      key={label}
                      className="px-4 py-4 text-left font-orbitron font-bold text-xs tracking-wider text-gray-400 whitespace-nowrap"
                      onClick={key ? () => toggleSort(key) : undefined}
                      style={{ cursor: key ? 'pointer' : 'default' }}
                    >
                      <span className="flex items-center gap-1.5">
                        {label}
                        {key && <ArrowUpDown size={12} style={{ color: sortKey === key ? '#3DFF14' : undefined }} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-600 font-rajdhani">
                      No se encontraron productos
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, i) => (
                    <tr
                      key={p.id}
                      className="transition-colors duration-200"
                      style={{
                        background: i % 2 === 0 ? '#0a0a0a' : '#0d0d0d',
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(61,255,20,0.04)')}
                      onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#0a0a0a' : '#0d0d0d')}
                    >
                      <td className="px-4 py-4">
                        <span className="font-semibold text-white">{p.name}</span>
                        {p.description && <p className="text-gray-600 text-xs mt-0.5 truncate max-w-[180px]">{p.description}</p>}
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(26,92,255,0.12)', color: '#1A5CFF', border: '1px solid rgba(26,92,255,0.3)' }}>
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-400">
                        <span>{p.brand}</span>
                        {p.model && <span className="text-gray-600"> / {p.model}</span>}
                      </td>
                      <td className="px-4 py-4 font-orbitron text-sm" style={{ color: '#3DFF14' }}>
                        ${p.price.toLocaleString('es-AR')}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="font-orbitron font-bold text-sm px-2.5 py-1 rounded"
                          style={{
                            color: p.stock <= 2 ? '#f59e0b' : '#3DFF14',
                            background: p.stock <= 2 ? 'rgba(245,158,11,0.1)' : 'rgba(61,255,20,0.08)',
                            border: `1px solid ${p.stock <= 2 ? 'rgba(245,158,11,0.4)' : 'rgba(61,255,20,0.3)'}`,
                          }}
                        >
                          {p.stock <= 2 && <AlertTriangle size={11} className="inline mr-1" />}
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="p-2 rounded transition-all duration-200 hover:scale-110"
                            style={{ color: '#3DFF14', background: 'rgba(61,255,20,0.08)', border: '1px solid rgba(61,255,20,0.2)' }}
                            title="Editar"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => confirmDelete(p.id)}
                            className="p-2 rounded transition-all duration-200 hover:scale-110"
                            style={{ color: '#ef4444', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(61,255,20,0.1)', background: '#080808' }}>
            <span className="font-rajdhani text-xs text-gray-600">
              {filtered.length} de {products.length} productos
            </span>
            <span className="font-rajdhani text-xs text-gray-700">
              Última actualización: {new Date().toLocaleDateString('es-AR')}
            </span>
          </div>
        </div>
      </main>

      {/* ─── Add/Edit Modal ───────────────────────────────────────────────────── */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div
            className="w-full max-w-lg rounded-xl p-8 relative"
            style={{ background: '#0d0d0d', border: '1px solid rgba(61,255,20,0.4)', boxShadow: '0 0 50px rgba(61,255,20,0.2)' }}
          >
            {/* Corners */}
            <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: '2px solid #3DFF14', borderLeft: '2px solid #3DFF14' }} />
            <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: '2px solid #3DFF14', borderRight: '2px solid #3DFF14' }} />

            <div className="flex items-center justify-between mb-7">
              <h2 className="font-orbitron font-bold text-lg tracking-wider" style={{ color: '#3DFF14', textShadow: '0 0 8px #3DFF14' }}>
                {modal.edit ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
              </h2>
              <button onClick={() => setModal({ open: false, edit: null })} className="text-gray-500 hover:text-white transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block font-rajdhani text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Nombre *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-black/60 text-white font-rajdhani text-sm outline-none"
                    style={{ border: '1px solid rgba(61,255,20,0.3)' }}
                    placeholder="Ej: Pantalla iPhone 14" />
                </div>
                {/* Category */}
                <div>
                  <label className="block font-rajdhani text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Categoría</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-black/60 text-white font-rajdhani text-sm outline-none appearance-none"
                    style={{ border: '1px solid rgba(61,255,20,0.3)' }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {/* Brand */}
                <div>
                  <label className="block font-rajdhani text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Marca</label>
                  <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-black/60 text-white font-rajdhani text-sm outline-none"
                    style={{ border: '1px solid rgba(61,255,20,0.3)' }}
                    placeholder="Ej: Apple" />
                </div>
                {/* Model */}
                <div>
                  <label className="block font-rajdhani text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Modelo</label>
                  <input value={form.model} onChange={e => setForm({ ...form, model: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-black/60 text-white font-rajdhani text-sm outline-none"
                    style={{ border: '1px solid rgba(61,255,20,0.3)' }}
                    placeholder="Ej: iPhone 14 Pro" />
                </div>
                {/* Price */}
                <div>
                  <label className="block font-rajdhani text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Precio ($)</label>
                  <input type="number" min="0" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded bg-black/60 text-white font-rajdhani text-sm outline-none"
                    style={{ border: '1px solid rgba(61,255,20,0.3)' }} />
                </div>
                {/* Stock */}
                <div>
                  <label className="block font-rajdhani text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Stock (unidades)</label>
                  <input type="number" min="0" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded bg-black/60 text-white font-rajdhani text-sm outline-none"
                    style={{ border: '1px solid rgba(61,255,20,0.3)' }} />
                </div>
                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block font-rajdhani text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Descripción</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded bg-black/60 text-white font-rajdhani text-sm outline-none resize-none"
                    style={{ border: '1px solid rgba(61,255,20,0.3)' }}
                    placeholder="Descripción opcional del producto" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false, edit: null })}
                  className="flex-1 py-3 rounded font-orbitron font-bold text-xs tracking-widest text-gray-400 transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  CANCELAR
                </button>
                <button type="submit"
                  className="flex-1 py-3 rounded font-orbitron font-bold text-xs tracking-widest transition-all duration-300"
                  style={{ background: 'rgba(61,255,20,0.12)', border: '2px solid #3DFF14', color: '#3DFF14', textShadow: '0 0 6px #3DFF14', boxShadow: '0 0 15px rgba(61,255,20,0.25)' }}>
                  {modal.edit ? 'GUARDAR' : 'AGREGAR'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Delete confirm modal ──────────────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-sm rounded-xl p-8 text-center" style={{ background: '#0d0d0d', border: '1px solid rgba(239,68,68,0.4)', boxShadow: '0 0 40px rgba(239,68,68,0.2)' }}>
            <Trash2 size={36} className="mx-auto mb-4" style={{ color: '#ef4444', filter: 'drop-shadow(0 0 8px #ef4444)' }} />
            <h3 className="font-orbitron font-bold text-lg mb-2 text-white">¿ELIMINAR?</h3>
            <p className="font-rajdhani text-gray-400 text-sm mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded font-orbitron text-xs font-bold tracking-widest text-gray-400 transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                CANCELAR
              </button>
              <button onClick={doDelete}
                className="flex-1 py-3 rounded font-orbitron text-xs font-bold tracking-widest transition-all"
                style={{ background: 'rgba(239,68,68,0.12)', border: '2px solid #ef4444', color: '#ef4444', boxShadow: '0 0 12px rgba(239,68,68,0.3)' }}>
                ELIMINAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
