// 产品中心页面功能
let currentPage = 1;
const itemsPerPage = 12;
const totalPages = 2;

// 生成产品图片路径
function getPlaceholderImage(index) {
    // 图片路径：images/product1.jpg 到 images/product24.jpg
    return `images/product${index}.jpg`;
}

// 初始化产品页面
function initProductsPage() {
    if (document.getElementById('productsGrid')) {
        loadProducts(currentPage);
        updatePagination();
    }
}

// 加载产品图片
function loadProducts(page) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    
    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = Math.min(page * itemsPerPage, totalPages * itemsPerPage);

    for (let i = startIndex; i <= endIndex; i++) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        const img = document.createElement('img');
        img.src = getPlaceholderImage(i);
        img.alt = `工程机械配件 ${i}`;
        img.onclick = () => openModal(getPlaceholderImage(i));
        
        productItem.appendChild(img);
        productsGrid.appendChild(productItem);
    }
}

// 切换页面
function changePage(direction) {
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        loadProducts(currentPage);
        updatePagination();
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 更新分页显示
function updatePagination() {
    const currentPageEl = document.getElementById('currentPage');
    const totalPagesEl = document.getElementById('totalPages');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (currentPageEl) currentPageEl.textContent = currentPage;
    if (totalPagesEl) totalPagesEl.textContent = totalPages;
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// 打开图片模态框
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
    }
}

// 关闭图片模态框
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// ESC键关闭模态框
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initProductsPage();
});

