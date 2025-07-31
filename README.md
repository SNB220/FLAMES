# 💖 FLAMES Relationship Finder

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://SNB220.github.io/FLAMES)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/FLAMES.svg)](https://github.com/SNB220/FLAMES/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/FLAMES.svg)](https://github.com/SNB220e/FLAMES/network)

A fun and interactive relationship compatibility calculator based on the classic FLAMES game! Built with vanilla HTML, CSS, JavaScript, and Python.

## 🎮 What is FLAMES?

FLAMES stands for:
- **F** - Friendship 👫
- **L** - Love ❤️  
- **A** - Affection 💕
- **M** - Marriage 💍
- **E** - Enemy 😈
- **S** - Siblings 👩‍👦

## 📸 Screenshots
<img width="1080" height="1920" alt="Screenshot_20250801-001437 Brave" src="https://github.com/user-attachments/assets/40d3d542-c3eb-4707-b84f-c6c34ece78a2" />
<img width="734" height="735" alt="Screenshot 2025-07-31 234025" src="https://github.com/user-attachments/assets/e84c2be2-926a-4a0c-8136-6e8a8571112e" />

## 🌟 Features

### Web Version
- **Beautiful UI**: Modern, responsive design with animated gradients
- **Real-time Validation**: Input validation as you type
- **Loading Animations**: Smooth animations and loading states
- **Accessibility**: ARIA labels and keyboard navigation support
- **Mobile Friendly**: Responsive design that works on all devices

### Python Version
- **Interactive CLI**: User-friendly command-line interface
- **Calculation History**: Keep track of all your FLAMES calculations
- **Error Handling**: Robust input validation and error messages
- **Object-Oriented Design**: Clean, maintainable code structure

## 🚀 How to Use

### 🌐 Web Version (Recommended)
1. **Online**: Visit the [live demo](https://SNB220.github.io/FLAMES)
2. **Local**: Clone the repo and open `index.html` in any modern web browser
3. Enter two names in the input fields
4. Click "Find Result 🔮" to see your FLAMES result
5. Use "Restart 🔄" to try again with different names

### 🐍 Python Version
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FLAMES.git
   cd FLAMES
   ```
2. Run the Python script:
   ```bash
   python flames_calculator.py
   ```
3. Follow the interactive prompts
4. Type 'history' to see past calculations
5. Type 'quit' to exit

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/FLAMES.git

# Navigate to the project directory
cd FLAMES

# For web version - just open index.html in your browser
# For Python version
python flames_calculator.py
```

## 🔧 How It Works

The FLAMES algorithm works by:

1. **Cleaning Input**: Remove spaces and convert to lowercase
2. **Removing Common Letters**: Eliminate letters that appear in both names
3. **Counting Remaining Letters**: Sum up the letters left after removal
4. **Circular Elimination**: Use the count to eliminate FLAMES letters one by one
5. **Final Result**: The last remaining letter determines your relationship!

### Example:
- Names: "John" and "Jane"
- After removing common letters: "oh" and "ae" 
- Remaining letters: 4
- FLAMES elimination process determines the final result

## 📁 Project Structure

```
FLAMES/
├── index.html          # Main web interface
├── script.js           # JavaScript logic and animations
├── styles.css          # CSS styling and animations
├── flames_calculator.py # Python implementation
└── README.md           # This documentation
```

## 🎨 Customization

### Styling
- Edit `styles.css` to change colors, fonts, and animations
- Modify CSS variables for quick theme changes
- Add new animations using CSS keyframes

### Functionality
- Modify `script.js` to add new features or change behavior
- Update `flames_calculator.py` for new CLI features
- Add new FLAMES meanings or emojis

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📱 Mobile Support

The web version is fully responsive and works great on:
- Smartphones
- Tablets
- Desktop computers

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Ideas for contributions:
- Add new themes/color schemes
- Implement sound effects
- Add more languages support
- Create mobile app version
- Add social sharing features
- Improve animations

## 🐛 Issues

Found a bug? Have a suggestion? Please [open an issue](https://github.com/SNB220/FLAMES/issues/new).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you or if you found it interesting!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author
- GitHub: [@SNB220](https://github.com/SNB220)

## 🙏 Acknowledgments

- Thanks to everyone who plays the classic FLAMES game
- Inspired by childhood memories and nostalgic games
- Built with love for the developer community

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/SNB220/FLAMES)
![GitHub last commit](https://img.shields.io/github/last-commit/SNB220/FLAMES)
![GitHub issues](https://img.shields.io/github/issues/SNB220/FLAMES)
![GitHub pull requests](https://img.shields.io/github/issues-pr/SNB220/FLAMES)

## 🎉 Fun Facts

- FLAMES is a popular game played by children and teenagers worldwide
- The algorithm has been around for decades
- Each letter represents a different type of relationship
- The game is purely for entertainment and fun!

---

**Made with ❤️ for fun and learning!**
