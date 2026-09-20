import React, { useState } from 'react';
import { Layers, Plus, Edit, Trash2, Check, X, Package } from 'lucide-react';
import { CategoryItem, TrouserProduct } from '../../types';

interface AdminCategoriesProps {
  categories: CategoryItem[];
  products: TrouserProduct[];
  onAddCategory: (cat: CategoryItem) => void;
  onUpdateCategory: (cat: CategoryItem) => void;
  onDeleteCategory: (id: string) => void;
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({
  categories,
  products,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const openAdd = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop');
    setIsModalOpen(true);
  };

  const openEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImageUrl(cat.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCategory) {
      onUpdateCategory({
        ...editingCategory,
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/\s+/g, '-'),
        description: description.trim(),
        imageUrl: imageUrl.trim()
      });
    } else {
      onAddCategory({
        id: `cat-${Date.now()}`,
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/\s+/g, '-'),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        productCount: 0
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Categories Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            কালেকশন ক্যাটাগরি (Shirt, Pant, Others) পরিচালনা করুন
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2.5 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = products.filter(p => (p.category || 'Pant').toLowerCase() === cat.name.toLowerCase()).length;

          return (
            <div 
              key={cat.id} 
              className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {cat.imageUrl ? (
                    <img src={cat.imageUrl} alt={cat.name} className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-base">
                      {cat.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (categories.length <= 1) {
                          alert('At least one category must remain.');
                          return;
                        }
                        setCategoryToDelete(cat);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-sans font-bold text-lg text-gray-900 mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed min-h-[36px]">
                  {cat.description || 'Premium curated collection for modern gentlemen.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Slug: <code className="text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">{cat.slug}</code></span>
                <span className="font-bold text-[#725b38] bg-[#725b38]/10 px-2.5 py-1 rounded-full">
                  {count} Products
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add/Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                  }}
                  placeholder="e.g. Pant, Shirt, Others"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. pant, shirt, others"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this collection..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Category Image URL *</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-black"
                  />
                  {imageUrl && (
                    <img src={imageUrl} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl font-bold uppercase transition-all shadow-md cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-xs text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-1">Permanently Delete Category?</h3>
            <p className="text-gray-500 mb-5">
              Are you sure you want to delete <strong className="text-gray-800">"{categoryToDelete.name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteCategory(categoryToDelete.id);
                  setCategoryToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold uppercase transition-all shadow-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
