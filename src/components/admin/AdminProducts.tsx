import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Tag, 
  Image as ImageIcon, 
  DollarSign, 
  Check, 
  X, 
  Sparkles, 
  Package,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { TrouserProduct, ProductCategory, SizeNumber, ShirtSize, CategoryItem } from '../../types';

interface AdminProductsProps {
  products: TrouserProduct[];
  categories?: CategoryItem[];
  onAddProduct: (product: TrouserProduct) => void;
  onUpdateProduct: (product: TrouserProduct) => void;
  onDeleteProduct: (id: string) => void;
}

const PANT_SIZES: SizeNumber[] = [28, 30, 32, 34, 36, 38, 40];
const SHIRT_SIZES: ShirtSize[] = ['M', 'L', 'XL', 'XXL'];

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  categories = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TrouserProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<TrouserProduct | null>(null);

  const categoryNames = categories && categories.length > 0
    ? categories.map(c => c.name)
    : ['Pant', 'Shirt', 'Others'];

  const [selectedBadgeFilter, setSelectedBadgeFilter] = useState<string>('all');

  // Form State
  const [formName, setFormName] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Pant');
  const [formPrice, setFormPrice] = useState<number | string>('');
  const [formOriginalPrice, setFormOriginalPrice] = useState<number | string>('');
  const [formColorName, setFormColorName] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formGallery1, setFormGallery1] = useState('');
  const [formGallery2, setFormGallery2] = useState('');
  const [formGallery3, setFormGallery3] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStockStatus, setFormStockStatus] = useState('In Stock');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['28', '30', '32', '34', '36', '38']);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSubtitle('');
    setFormCategory('Pant');
    setFormPrice('');
    setFormOriginalPrice('');
    setFormColorName('');
    setFormBadge('');
    setFormImageUrl('');
    setFormGallery1('');
    setFormGallery2('');
    setFormGallery3('');
    setFormDescription('');
    setFormStockStatus('In Stock');
    setSelectedSizes(['28', '30', '32', '34', '36', '38', '40']);
    setIsAddModalOpen(true);
  };

  const openEditModal = (prod: TrouserProduct) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormSubtitle(prod.subtitle || '');
    setFormCategory(prod.category || 'Pant');
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice || prod.price);
    setFormColorName(prod.colorName);
    setFormBadge(prod.badge || '');
    setFormImageUrl(prod.imageUrl);
    setFormGallery1(prod.galleryImages && prod.galleryImages[1] ? prod.galleryImages[1] : '');
    setFormGallery2(prod.galleryImages && prod.galleryImages[2] ? prod.galleryImages[2] : '');
    setFormGallery3(prod.galleryImages && prod.galleryImages[3] ? prod.galleryImages[3] : '');
    setFormDescription(prod.description);
    setFormStockStatus(prod.stockStatus);
    setSelectedSizes(prod.availableSizes.map(String));
    setIsAddModalOpen(true);
  };

  const handleToggleSize = (sizeStr: string) => {
    if (selectedSizes.includes(sizeStr)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter(s => s !== sizeStr));
      }
    } else {
      setSelectedSizes([...selectedSizes, sizeStr]);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formImageUrl.trim()) return;

    const allGalleries = [
      formImageUrl.trim(),
      formGallery1.trim(),
      formGallery2.trim(),
      formGallery3.trim()
    ].filter(Boolean);

    if (editingProduct) {
      const updated: TrouserProduct = {
        ...editingProduct,
        name: formName.trim(),
        subtitle: formSubtitle.trim(),
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        colorName: formColorName.trim(),
        badge: formBadge.trim(),
        imageUrl: formImageUrl.trim(),
        galleryImages: allGalleries.length > 0 ? allGalleries : [formImageUrl.trim()],
        description: formDescription.trim(),
        stockStatus: formStockStatus,
        availableSizes: selectedSizes.map(s => (isNaN(Number(s)) ? s : Number(s)) as any)
      };
      onUpdateProduct(updated);
    } else {
      const newProd: TrouserProduct = {
        id: `prod-${Date.now()}`,
        name: formName.trim(),
        subtitle: formSubtitle.trim(),
        category: formCategory,
        badge: formBadge.trim(),
        badgeType: 'bestseller',
        colorName: formColorName.trim(),
        colorHex: '#1f2937',
        colorFamily: 'obsidian',
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        stockStatus: formStockStatus,
        stockNote: 'Ready for delivery',
        imageUrl: formImageUrl.trim(),
        galleryImages: allGalleries.length > 0 ? allGalleries : [formImageUrl.trim()],
        description: formDescription.trim(),
        fabricSpecs: [
          'High recovery poly-viscose elastane blend',
          'Internal silicon shirt-gripper waistband',
          'Wrinkle-resistant luxury weave'
        ],
        availableSizes: selectedSizes.map(s => (isNaN(Number(s)) ? s : Number(s)) as any)
      };
      onAddProduct(newProd);
    }

    setIsAddModalOpen(false);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.colorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.badge && p.badge.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCat = 
      selectedCategoryFilter === 'all' || 
      (p.category && p.category.toLowerCase() === selectedCategoryFilter.toLowerCase()) ||
      (!p.category && selectedCategoryFilter === 'pant');

    const matchesBadge = 
      selectedBadgeFilter === 'all' ||
      (p.badge && p.badge.toLowerCase().includes(selectedBadgeFilter.toLowerCase()));

    return matchesSearch && matchesCat && matchesBadge;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Products & Inventory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            পণ্য যোগ, সম্পাদনা, মূল্য, সাইজ ও স্টক পরিচালনা করুন (Total Products: {products.length})
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title, color, SKU..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', ...categoryNames].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedCategoryFilter.toLowerCase() === cat.toLowerCase()
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pl-2 border-l border-gray-200">
            <span className="text-[10px] font-bold uppercase text-gray-400 mr-1">Badge:</span>
            {['all', 'New', 'Best'].map((bdg) => (
              <button
                key={bdg}
                onClick={() => setSelectedBadgeFilter(bdg)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedBadgeFilter.toLowerCase() === bdg.toLowerCase()
                    ? 'bg-[#725b38] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {bdg === 'all' ? 'All' : bdg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Product Image & Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price & Discount</th>
                <th className="py-3.5 px-4">Available Sizes</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-14 rounded-lg object-cover border border-gray-200 shrink-0 bg-gray-100"
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{product.name}</div>
                        <div className="text-[11px] text-gray-500">{product.colorName} • {product.subtitle}</div>
                        {product.badge && (
                          <span className="inline-block mt-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#725b38]/10 text-[#725b38]">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-md font-semibold text-xs">
                      {product.category || 'Pant'}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-900 text-sm">৳{product.price.toLocaleString()}</div>
                    {product.originalPrice > product.price && (
                      <div className="text-gray-400 line-through text-[11px]">
                        ৳{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {product.availableSizes.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      product.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800' :
                      product.stockStatus === 'Fast Moving' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stockStatus}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductToDelete(product)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 bg-[#151821] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#fedeb2]" />
                <h2 className="font-bold text-base">
                  {editingProduct ? 'Edit Product' : 'Add New Luxury Product'}
                </h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* Product Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. The Sovereign Charcoal Slim"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Subtitle / Cut
                  </label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    placeholder="e.g. Export Spec Executive Cut"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Category, Color, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black cursor-pointer"
                  >
                    {categoryNames.map((catName) => (
                      <option key={catName} value={catName}>{catName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Color Name
                  </label>
                  <input
                    type="text"
                    value={formColorName}
                    onChange={(e) => setFormColorName(e.target.value)}
                    placeholder="e.g. Charcoal Black"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-gray-700 uppercase tracking-wider">
                      Badge Text
                    </label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setFormBadge('New')}
                        className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                          formBadge === 'New' ? 'bg-[#725b38] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        + New
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormBadge('Best')}
                        className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                          formBadge === 'Best' ? 'bg-[#725b38] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        + Best
                      </button>
                      {formBadge && (
                        <button
                          type="button"
                          onClick={() => setFormBadge('')}
                          className="px-1.5 py-0.5 text-[10px] font-bold text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="Click +New / +Best or type custom badge"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Pricing (Sale Price & Original Price) & Stock Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Sale Price (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 1650"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Original Price (৳)
                  </label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    placeholder="e.g. 2250"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Stock Status
                  </label>
                  <select
                    value={formStockStatus}
                    onChange={(e) => setFormStockStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Fast Moving">Fast Moving</option>
                    <option value="Limited Batch">Limited Batch</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Size Multi-Select: 28-40 for Pants & M-XXL for Shirts */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-gray-800 uppercase tracking-wider">
                    Select Available Sizes (Size 28-40 / M-XXL)
                  </label>
                  <span className="text-[10px] text-gray-500">Click to toggle sizes</span>
                </div>

                {/* Pant Sizes 28-40 */}
                <div className="mb-3">
                  <div className="text-[11px] font-semibold text-gray-500 mb-1.5">Pant Waist Sizes (28 to 40):</div>
                  <div className="flex flex-wrap gap-2">
                    {PANT_SIZES.map((sz) => {
                      const szStr = String(sz);
                      const isSelected = selectedSizes.includes(szStr);
                      return (
                        <button
                          type="button"
                          key={szStr}
                          onClick={() => handleToggleSize(szStr)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-black text-white shadow-xs'
                              : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          Size {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Shirt Sizes M-XXL */}
                <div>
                  <div className="text-[11px] font-semibold text-gray-500 mb-1.5">Shirt Sizes (M to XXL):</div>
                  <div className="flex flex-wrap gap-2">
                    {SHIRT_SIZES.map((sz) => {
                      const isSelected = selectedSizes.includes(sz);
                      return (
                        <button
                          type="button"
                          key={sz}
                          onClick={() => handleToggleSize(sz)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#725b38] text-white shadow-xs'
                              : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Image URL & Gallery Angle Images */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <label className="block font-bold text-gray-800 uppercase tracking-wider">
                  Product Images (3-4 Angle Pictures / Gallery)
                </label>
                
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 block mb-1">Primary Image (Main View) *</span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="https://... (Main Product Image)"
                      className="flex-1 px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                    />
                    {formImageUrl && (
                      <img src={formImageUrl} alt="Main" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-gray-500 block mb-1">Gallery Image 2 (Side / Angle 2)</span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formGallery1}
                      onChange={(e) => setFormGallery1(e.target.value)}
                      placeholder="https://... (Optional 2nd angle)"
                      className="flex-1 px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                    />
                    {formGallery1 && (
                      <img src={formGallery1} alt="Gallery 2" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-gray-500 block mb-1">Gallery Image 3 (Detail / Angle 3)</span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formGallery2}
                      onChange={(e) => setFormGallery2(e.target.value)}
                      placeholder="https://... (Optional 3rd angle)"
                      className="flex-1 px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                    />
                    {formGallery2 && (
                      <img src={formGallery2} alt="Gallery 3" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-gray-500 block mb-1">Gallery Image 4 (Back / Angle 4)</span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formGallery3}
                      onChange={(e) => setFormGallery3(e.target.value)}
                      placeholder="https://... (Optional 4th angle)"
                      className="flex-1 px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black"
                    />
                    {formGallery3 && (
                      <img src={formGallery3} alt="Gallery 4" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detailed product fabric, craftsmanship, and styling notes..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Delete Product</h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to delete <span className="font-bold text-gray-800">"{productToDelete.name}"</span>? This will remove it from the store and Supabase database.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
