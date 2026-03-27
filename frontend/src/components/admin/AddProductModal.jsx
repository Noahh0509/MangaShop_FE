import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance';

const AddProductModal = ({ isOpen, onClose, onSuccess, editData = null }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Khung xương chuẩn cho 4 ô ảnh (Bìa + 3 phụ)
  const emptyImages = [
    { url: '', isPrimary: true },
    { url: '', isPrimary: false },
    { url: '', isPrimary: false },
    { url: '', isPrimary: false }
  ];

  const [formData, setFormData] = useState({
    name: '',
    basePrice: '',
    stock: '',
    category: '',
    description: '',
    images: emptyImages
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/api/products/categories');
        setCategories(res.data.data || res.data);
      } catch (err) {
        console.error("Lỗi lấy category:", err);
      }
    };
    if (isOpen) fetchCategories();
  }, [isOpen]);

  // 2. Logic đổ dữ liệu cực kỳ an toàn
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        // CHẾ ĐỘ SỬA: Lấy ảnh cũ, nếu thiếu thì bù ô trống cho đủ 4
        const existingImages = editData.images || [];
        const paddedImages = [0, 1, 2, 3].map(i => {
          return existingImages[i] || { url: '', isPrimary: i === 0 };
        });

        setFormData({
          name: editData.name || '',
          basePrice: editData.basePrice || '',
          stock: editData.stock || '',
          category: editData.category?._id || editData.category || '',
          description: editData.description || '',
          images: paddedImages
        });
      } else {
        // CHẾ ĐỘ THÊM: Reset về 4 ô trống, không để mảng rỗng []
        setFormData({
          name: '',
          basePrice: '',
          stock: '',
          category: '',
          description: '',
          images: emptyImages
        });
      }
    }
  }, [isOpen, editData]);

  const handleUploadImage = (index) => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'durcb5nfr',
        uploadPreset: 'mangashop_preset',
        folder: 'products',
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const newImages = [...formData.images];
          // Cập nhật URL vào đúng vị trí index đã chọn
          newImages[index] = { ...newImages[index], url: result.info.secure_url };
          setFormData({ ...formData, images: newImages });
        }
      }
    );
    myWidget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Lọc bỏ ảnh rỗng trước khi gửi lên Server
      const finalImages = formData.images.filter(img => img.url && img.url.trim() !== '');

      const payload = { ...formData, images: finalImages };

      if (editData) {
        // GỌI API SỬA (PUT)
        await api.put(`/api/products/${editData._id}`, payload);
      } else {
        // GỌI API THÊM (POST)
        await api.post('/api/products', payload);
      }

      alert(editData ? "Cập nhật thành công!" : "Thêm truyện mới thành công!");
      onSuccess();
      onClose();
    } catch (err) {
      alert("Lỗi: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-['Cormorant_Garamond'] text-2xl text-[#c9a84c] uppercase tracking-widest">
            {editData ? "Cập nhật tác phẩm" : "Thêm tác phẩm mới"}
          </h2>
          <button onClick={onClose} className="text-[#444] hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* PHOTO GALLERY */}
          <div className="md:col-span-5 space-y-4">
            <label className="text-[10px] text-[#444] uppercase tracking-[0.2em] block">Ảnh Gallery</label>

            {/* Ảnh chính (Index 0) */}
            <div
              onClick={() => handleUploadImage(0)}
              className="aspect-[5/7] bg-[#111] border border-dashed border-[#222] hover:border-[#c9a84c] transition-all cursor-pointer flex items-center justify-center overflow-hidden"
            >
              {formData.images[0]?.url ? (
                <img src={formData.images[0].url} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-[#333] text-[10px] uppercase">Click để chọn ảnh bìa</div>
              )}
            </div>

            {/* 3 ảnh phụ (Index 1, 2, 3) */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  onClick={() => handleUploadImage(i)}
                  className="aspect-square bg-[#111] border border-dashed border-[#222] hover:border-[#c9a84c] cursor-pointer flex items-center justify-center overflow-hidden"
                >
                  {/* Dùng Optional Chaining ?.url để không bao giờ bị crash */}
                  {formData.images[i]?.url ? (
                    <img src={formData.images[i].url} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl opacity-10">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FORM NỘI DUNG */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <label className="text-[10px] text-[#444] uppercase tracking-[0.2em] mb-2 block">Tên truyện</label>
              <input
                required value={formData.name}
                className="w-full bg-transparent border border-[#1a1a1a] p-3 text-sm focus:border-[#c9a84c] outline-none text-[#e8e2d9]"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-[#444] uppercase tracking-[0.2em] mb-2 block">Giá bán</label>
                <input
                  type="number" required value={formData.basePrice}
                  className="w-full bg-transparent border border-[#1a1a1a] p-3 text-sm focus:border-[#c9a84c] outline-none text-[#c9a84c]"
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] text-[#444] uppercase tracking-[0.2em] mb-2 block">Số lượng</label>
                <input
                  type="number" required value={formData.stock}
                  className="w-full bg-transparent border border-[#1a1a1a] p-3 text-sm focus:border-[#c9a84c] outline-none text-[#e8e2d9]"
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#444] uppercase tracking-[0.2em] mb-2 block">Thể loại</label>
              <select
                required value={formData.category}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] p-3 text-sm focus:border-[#c9a84c] outline-none text-[#e8e2d9]"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">-- Chọn thể loại --</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-[#444] uppercase tracking-[0.2em] mb-2 block">Mô tả</label>
              <textarea
                rows="4" value={formData.description}
                className="w-full bg-transparent border border-[#1a1a1a] p-3 text-sm focus:border-[#c9a84c] outline-none text-[#888] resize-none"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-[#c9a84c] text-black font-bold py-4 uppercase tracking-[0.3em] text-[10px] hover:bg-[#a88a3d] transition-all mt-4"
            >
              {loading ? "Đang xử lý..." : (editData ? "Cập nhật ngay" : "Thêm vào thư viện")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;