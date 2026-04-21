# 📚 Personal Book Library - Web Application

A modern, fully-featured web application for managing your personal book library with search, categorization, and borrowing history tracking.

## Features

### 📖 Core Features
- **Book Management**: Add, edit, and delete books from your collection
- **Book Search**: Search books by title, author, or category
- **Categorization**: Organize books into categories (Fiction, Non-Fiction, Science, Mystery, Romance, Biography, History, Technology, Self-Help, Poetry)
- **Status Tracking**: Track book status (Available, Reading, Borrowed)
- **Borrowing History**: Keep track of when books are borrowed and returned
- **Ratings System**: Rate books you've read on a 5-star scale

### 📊 Statistics Dashboard
- Total books in library
- Books available, currently reading, and borrowed count
- Average rating of read books
- Total pages in collection
- Category breakdown

### 🎨 User Interface
- Responsive design that works on desktop, tablet, and mobile
- Modern gradient UI with smooth animations
- Intuitive navigation with tab-based layout
- Modal popups for detailed book information
- Toast notifications for user actions

## Installation

1. Extract all files to a directory:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)

3. That's it! No server or installation needed.

## Usage Guide

### Adding a Book
1. Click the **"Add Book"** tab
2. Fill in the book details:
   - Title (required)
   - Author (required)
   - Category (required)
   - Publication Year (required)
   - Number of Pages
   - ISBN
   - Status (Available, Reading, Borrowed)
   - Rating (1-5 stars, optional)
   - Notes
3. Click **"Add Book"** button

### Viewing Your Library
1. Click the **"My Library"** tab
2. Books are displayed as cards with cover image, title, author, and status
3. Hover over cards to see more details

### Searching Books
1. In the **"My Library"** tab, use the search box at the top
2. Search by book title, author name, or category
3. Results update in real-time

### Filtering Books
1. Use the **"Category"** dropdown to filter by book category
2. Use the **"Status"** dropdown to show only Available, Reading, or Borrowed books
3. Filters can be combined

### Viewing Book Details
1. Click on any book card to open the detail modal
2. See complete information including ISBN, publication date, rating, and notes
3. From the modal, you can:
   - Borrow the book
   - Edit the book details

### Borrowing and Returning Books
1. From a book's detail modal, click the **"📤 Borrow"** button
2. The book status changes to "Borrowed" and an entry is added to the history
3. Go to **"Borrowing History"** tab to see borrowed books
4. Click **"📥 Return"** button to return a borrowed book
5. Return date will be recorded in history

### Editing Books
1. Click the **"✏️ Edit"** button on a book card
2. The book details will populate the Add Book form
3. Modify any details and click **"Add Book"** to save changes
4. The old entry is removed and the updated book is added

### Deleting Books
1. Click the **"🗑️ Delete"** button on a book card
2. Confirm deletion in the dialog
3. Book is removed from library

### Viewing Statistics
1. Click the **"Statistics"** tab
2. View:
   - Total books and books by status
   - Average rating and total pages
   - Books per category

### Borrowing History
1. Click the **"Borrowing History"** tab
2. View all borrowing and return records
3. Filter by **"Borrowed"** or **"Returned"** status
4. Each entry shows:
   - Book title and author
   - Borrow date and due date
   - Return date (if returned)

## Data Storage

All data is stored locally in your browser using **localStorage**. This means:
- ✅ Your data persists between sessions
- ✅ No data is sent to any server
- ✅ Works completely offline
- ⚠️ Data is stored only on this device in this browser

**Note**: If you clear your browser cache/history, your data may be lost. Consider exporting data if you have an important collection.

## Sample Data

The app comes with 5 sample books pre-loaded:
- The Great Gatsby by F. Scott Fitzgerald
- Sapiens by Yuval Noah Harari
- To Kill a Mockingbird by Harper Lee
- A Brief History of Time by Stephen Hawking
- The Midnight Library by Matt Haig

You can delete these and add your own books.

## Browser Compatibility

Works with all modern browsers:
- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## Technical Details

### Built With
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid layouts
- **JavaScript (ES6+)**: Object-oriented design with BookLibrary class

### Features
- No external dependencies
- Responsive design with media queries
- Local storage API for data persistence
- XSS protection with HTML escaping
- Smooth animations and transitions

## Tips & Tricks

1. **Keyboard Shortcuts**: Tabs can be clicked to navigate between sections
2. **Quick Search**: Type in the search box to instantly filter books
3. **Bulk Operations**: Use categories and status filters together
4. **Track Reading**: Mark books as "Reading" while you're reading them
5. **Rate As You Read**: You can always update ratings after finishing
6. **Notes Section**: Use notes to remember quotes, recommendations, or thoughts

## Troubleshooting

### Data Not Saving?
- Make sure localStorage is enabled in your browser
- Check if you're in private/incognito mode (data won't persist)

### Search Not Working?
- Refresh the page
- Try clearing filters

### Modal Won't Close?
- Click the X button or click outside the modal

## Future Enhancement Ideas

- Export/Import data as JSON or CSV
- Reading goals and progress tracking
- Book recommendations based on ratings
- Social sharing of library stats
- Reading list creation
- Book cover image upload
- Integration with book APIs for metadata

## License

This project is free to use and modify for personal use.

## Support

For issues or suggestions, review the code comments or check the browser console for any errors.

---

Enjoy managing your book library! 📚✨
