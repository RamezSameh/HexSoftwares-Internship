// Book Library Application
class BookLibrary {
    constructor() {
        this.books = [];
        this.borrowingHistory = [];
        this.init();
    }

    // Initialize the application
    init() {
        this.loadData();
        this.setupEventListeners();
        this.render();
    }

    // Setup event listeners
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Book form submission
        document.getElementById('bookForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBook();
        });

        // Search and filters
        document.getElementById('searchInput').addEventListener('input', () => this.filterAndRender());
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterAndRender());
        document.getElementById('statusFilter').addEventListener('change', () => this.filterAndRender());
        document.getElementById('historyFilter').addEventListener('change', () => this.renderHistory());

        // Modal close button
        document.querySelector('.close-btn').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('bookModal');
            if (e.target === modal) this.closeModal();
        });
    }

    // Switch tabs
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');

        // Update statistics when switching to stats tab
        if (tabName === 'stats') {
            this.updateStatistics();
        }

        // Update history when switching to history tab
        if (tabName === 'history') {
            this.renderHistory();
        }
    }

    // Add a new book
    addBook() {
        const formData = {
            id: Date.now(),
            title: document.getElementById('title').value.trim(),
            author: document.getElementById('author').value.trim(),
            category: document.getElementById('category').value,
            year: parseInt(document.getElementById('year').value),
            pages: parseInt(document.getElementById('pages').value) || 0,
            isbn: document.getElementById('isbn').value.trim(),
            status: document.getElementById('status').value,
            rating: parseFloat(document.getElementById('rating').value) || null,
            notes: document.getElementById('notes').value.trim(),
            dateAdded: new Date().toLocaleDateString()
        };

        this.books.push(formData);
        this.saveData();
        this.resetForm();
        this.showNotification('📚 Book added successfully!', 'success');
        this.filterAndRender();
    }

    // Delete a book
    deleteBook(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            this.books = this.books.filter(book => book.id !== id);
            this.saveData();
            this.showNotification('🗑️ Book deleted!', 'success');
            this.filterAndRender();
        }
    }

    // Edit a book
    editBook(id) {
        const book = this.books.find(b => b.id === id);
        if (!book) return;

        // Populate form with book data
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('category').value = book.category;
        document.getElementById('year').value = book.year;
        document.getElementById('pages').value = book.pages || '';
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('status').value = book.status;
        document.getElementById('rating').value = book.rating || '';
        document.getElementById('notes').value = book.notes;

        // Remove the old book
        this.books = this.books.filter(b => b.id !== id);
        this.saveData();

        // Switch to add-book tab
        document.querySelector('[data-tab="add-book"]').click();

        // Scroll to form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    }

    // Filter books based on search and filters
    getFilteredBooks() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        return this.books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                                book.author.toLowerCase().includes(searchTerm) ||
                                book.category.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || book.category === categoryFilter;
            const matchesStatus = !statusFilter || book.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }

    // Filter and render books
    filterAndRender() {
        const filteredBooks = this.getFilteredBooks();
        this.renderBooks(filteredBooks);
    }

    // Render books
    renderBooks(books) {
        const booksGrid = document.getElementById('booksGrid');
        const emptyState = document.getElementById('emptyState');

        if (books.length === 0) {
            booksGrid.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        booksGrid.innerHTML = books.map(book => this.createBookCard(book)).join('');
    }

    // Create book card HTML
    createBookCard(book) {
        const ratingStars = book.rating ? '⭐'.repeat(Math.floor(book.rating)) : 'Not rated';
        const statusClass = book.status.toLowerCase();

        return `
            <div class="book-card">
                <div class="book-cover" onclick="library.showBookDetails(${book.id})">
                    📖
                </div>
                <div class="book-info">
                    <div class="book-title">${this.escapeHtml(book.title)}</div>
                    <div class="book-author">by ${this.escapeHtml(book.author)}</div>
                    <div class="book-meta">
                        <strong>Category:</strong> ${this.escapeHtml(book.category)}
                    </div>
                    <div class="book-meta">
                        <strong>Year:</strong> ${book.year}
                    </div>
                    ${book.rating ? 
                        `<div class="book-rating">${'⭐'.repeat(Math.floor(book.rating))}${book.rating % 1 !== 0 ? '✨' : ''}</div>` :
                        `<div class="book-rating no-rating">Not rated yet</div>`
                    }
                    <span class="book-status ${statusClass}">${book.status}</span>
                    <div class="book-actions">
                        <button class="book-btn edit" onclick="library.editBook(${book.id})">✏️ Edit</button>
                        <button class="book-btn delete" onclick="library.deleteBook(${book.id})">🗑️ Delete</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Show book details in modal
    showBookDetails(id) {
        const book = this.books.find(b => b.id === id);
        if (!book) return;

        const modal = document.getElementById('bookModal');
        const modalBody = document.getElementById('modalBody');

        modalBody.innerHTML = `
            <div class="modal-details">
                <h2>${this.escapeHtml(book.title)}</h2>
                
                <div class="modal-detail-row">
                    <div class="modal-label">Author:</div>
                    <div class="modal-value">${this.escapeHtml(book.author)}</div>
                </div>

                <div class="modal-detail-row">
                    <div class="modal-label">Category:</div>
                    <div class="modal-value">${this.escapeHtml(book.category)}</div>
                </div>

                <div class="modal-detail-row">
                    <div class="modal-label">Publication Year:</div>
                    <div class="modal-value">${book.year}</div>
                </div>

                <div class="modal-detail-row">
                    <div class="modal-label">Pages:</div>
                    <div class="modal-value">${book.pages || 'N/A'}</div>
                </div>

                <div class="modal-detail-row">
                    <div class="modal-label">ISBN:</div>
                    <div class="modal-value">${book.isbn || 'N/A'}</div>
                </div>

                <div class="modal-detail-row">
                    <div class="modal-label">Status:</div>
                    <div class="modal-value"><span class="book-status ${book.status.toLowerCase()}">${book.status}</span></div>
                </div>

                <div class="modal-detail-row">
                    <div class="modal-label">Rating:</div>
                    <div class="modal-value">${book.rating ? book.rating + ' / 5' : 'Not rated'}</div>
                </div>

                <div class="modal-detail-row">
                    <div class="modal-label">Date Added:</div>
                    <div class="modal-value">${book.dateAdded}</div>
                </div>

                ${book.notes ? `
                    <div class="modal-detail-row">
                        <div class="modal-label">Notes:</div>
                        <div class="modal-value">${this.escapeHtml(book.notes)}</div>
                    </div>
                ` : ''}

                <div class="modal-detail-row" style="display: flex; gap: 10px; border-bottom: none; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="library.borrowBook(${book.id})" style="flex: 1;">📤 Borrow</button>
                    <button class="btn btn-secondary" onclick="library.editBook(${book.id}); library.closeModal()" style="flex: 1;">Edit</button>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    // Close modal
    closeModal() {
        document.getElementById('bookModal').style.display = 'none';
    }

    // Borrow a book
    borrowBook(id) {
        const book = this.books.find(b => b.id === id);
        if (!book) return;

        const borrowDate = new Date().toLocaleDateString();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);

        const historyEntry = {
            id: Date.now(),
            bookId: id,
            title: book.title,
            author: book.author,
            action: 'Borrowed',
            borrowDate: borrowDate,
            dueDate: dueDate.toLocaleDateString(),
            returnDate: null
        };

        this.borrowingHistory.push(historyEntry);
        book.status = 'Borrowed';
        this.saveData();
        this.showNotification(`📤 "${book.title}" borrowed! Due: ${dueDate.toLocaleDateString()}`, 'success');
        this.closeModal();
        this.filterAndRender();
    }

    // Return a borrowed book
    returnBook(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        const historyEntry = this.borrowingHistory.find(h => h.bookId === bookId && h.action === 'Borrowed' && !h.returnDate);
        if (historyEntry) {
            historyEntry.returnDate = new Date().toLocaleDateString();
            historyEntry.action = 'Returned';
        }

        book.status = 'Available';
        this.saveData();
        this.showNotification(`📥 "${book.title}" returned!`, 'success');
        this.renderHistory();
    }

    // Render borrowing history
    renderHistory() {
        const historyList = document.getElementById('historyList');
        const emptyHistory = document.getElementById('emptyHistory');
        const filterValue = document.getElementById('historyFilter').value;

        let filteredHistory = this.borrowingHistory;
        if (filterValue) {
            filteredHistory = filteredHistory.filter(h => h.action === filterValue);
        }

        if (filteredHistory.length === 0) {
            historyList.innerHTML = '';
            emptyHistory.style.display = 'block';
            return;
        }

        emptyHistory.style.display = 'none';
        historyList.innerHTML = filteredHistory.map(entry => `
            <div class="history-item ${entry.action === 'Returned' ? 'returned' : ''}">
                <div class="history-header">
                    <div class="history-title">${this.escapeHtml(entry.title)}</div>
                    <span class="history-status ${entry.action.toLowerCase()}">${entry.action}</span>
                </div>
                <div class="history-details">
                    <div class="history-detail">
                        <span class="history-detail-label">Author</span>
                        <span class="history-detail-value">${this.escapeHtml(entry.author)}</span>
                    </div>
                    <div class="history-detail">
                        <span class="history-detail-label">${entry.action === 'Borrowed' ? 'Borrow Date' : 'Borrow Date'}</span>
                        <span class="history-detail-value">${entry.borrowDate}</span>
                    </div>
                    <div class="history-detail">
                        <span class="history-detail-label">Due Date</span>
                        <span class="history-detail-value">${entry.dueDate}</span>
                    </div>
                    ${entry.returnDate ? `
                        <div class="history-detail">
                            <span class="history-detail-label">Return Date</span>
                            <span class="history-detail-value">${entry.returnDate}</span>
                        </div>
                    ` : ''}
                </div>
                ${entry.action === 'Borrowed' ? `
                    <button class="btn btn-secondary" style="margin-top: 10px;" onclick="library.returnBook(${entry.bookId})">
                        📥 Return
                    </button>
                ` : ''}
            </div>
        `).join('');
    }

    // Update statistics
    updateStatistics() {
        const totalBooks = this.books.length;
        const availableBooks = this.books.filter(b => b.status === 'Available').length;
        const readingBooks = this.books.filter(b => b.status === 'Reading').length;
        const borrowedBooks = this.books.filter(b => b.status === 'Borrowed').length;

        const booksWithRating = this.books.filter(b => b.rating);
        const avgRating = booksWithRating.length > 0
            ? (booksWithRating.reduce((sum, b) => sum + b.rating, 0) / booksWithRating.length).toFixed(1)
            : 0;

        const totalPages = this.books.reduce((sum, b) => sum + (b.pages || 0), 0);

        document.getElementById('totalBooks').textContent = totalBooks;
        document.getElementById('availableBooks').textContent = availableBooks;
        document.getElementById('readingBooks').textContent = readingBooks;
        document.getElementById('borrowedBooks').textContent = borrowedBooks;
        document.getElementById('avgRating').textContent = avgRating;
        document.getElementById('totalPages').textContent = totalPages;

        this.renderCategoryStats();
    }

    // Render category statistics
    renderCategoryStats() {
        const categories = {};
        this.books.forEach(book => {
            categories[book.category] = (categories[book.category] || 0) + 1;
        });

        const categoryStats = document.getElementById('categoryStats');
        categoryStats.innerHTML = Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .map(([category, count]) => `
                <div class="category-item">
                    <div class="category-name">${this.escapeHtml(category)}</div>
                    <div class="category-count">${count}</div>
                </div>
            `)
            .join('');
    }

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification show ${type}`;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Reset form
    resetForm() {
        document.getElementById('bookForm').reset();
    }

    // Render all content
    render() {
        this.filterAndRender();
    }

    // Load data from localStorage
    loadData() {
        const storedBooks = localStorage.getItem('bookLibraryBooks');
        const storedHistory = localStorage.getItem('bookLibraryHistory');

        this.books = storedBooks ? JSON.parse(storedBooks) : this.getSampleBooks();
        this.borrowingHistory = storedHistory ? JSON.parse(storedHistory) : [];
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('bookLibraryBooks', JSON.stringify(this.books));
        localStorage.setItem('bookLibraryHistory', JSON.stringify(this.borrowingHistory));
    }

    // Get sample books for initial load
    getSampleBooks() {
        return [
            {
                id: 1,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                category: 'Fiction',
                year: 1925,
                pages: 180,
                isbn: '978-0743273565',
                status: 'Available',
                rating: 4,
                notes: 'A classic American novel about the Jazz Age',
                dateAdded: new Date().toLocaleDateString()
            },
            {
                id: 2,
                title: 'Sapiens',
                author: 'Yuval Noah Harari',
                category: 'Non-Fiction',
                year: 2011,
                pages: 498,
                isbn: '978-0062316097',
                status: 'Reading',
                rating: 4.5,
                notes: 'Fascinating overview of human history',
                dateAdded: new Date().toLocaleDateString()
            },
            {
                id: 3,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                category: 'Fiction',
                year: 1960,
                pages: 324,
                isbn: '978-0061120084',
                status: 'Available',
                rating: 5,
                notes: 'One of the greatest novels in American literature',
                dateAdded: new Date().toLocaleDateString()
            },
            {
                id: 4,
                title: 'A Brief History of Time',
                author: 'Stephen Hawking',
                category: 'Science',
                year: 1988,
                pages: 256,
                isbn: '978-0553380163',
                status: 'Available',
                rating: 3.5,
                notes: 'Complex but accessible introduction to cosmology',
                dateAdded: new Date().toLocaleDateString()
            },
            {
                id: 5,
                title: 'The Midnight Library',
                author: 'Matt Haig',
                category: 'Fiction',
                year: 2020,
                pages: 304,
                isbn: '978-0525559474',
                status: 'Borrowed',
                rating: null,
                notes: 'Philosophical fiction about alternate lives',
                dateAdded: new Date().toLocaleDateString()
            }
        ];
    }

    // Escape HTML special characters
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the library when DOM is loaded
let library;
document.addEventListener('DOMContentLoaded', () => {
    library = new BookLibrary();
});
