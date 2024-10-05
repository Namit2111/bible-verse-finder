# 📖 Bible Verse Finder

Welcome to the **Bible Verse Finder**! This repository contains code to parse and analyze the Bible using the NLTK Gutenberg corpus. You can search for similar Bible verses based on a theme using a Flask web application.

## 🌟 Features
- Parse the entire Bible into books, chapters, and verses.
- Utilize TF-IDF vectorization to analyze verses.
- Predict similar verses based on user input using KMeans clustering.
- Interactive Flask web interface.

## 🚀 Getting Started

### Prerequisites
- Python 3.x
- Required Python libraries:
  - nltk
  - Flask
  - scikit-learn
  - numpy
  - pickle

### Installation
1. Clone this repository:
    ```sh
    git clone https://github.com/Namit2111/bible-verse-finder.git
    cd bible-verse-finder
    ```

2. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

3. Download the NLTK Gutenberg corpus:
    ```python
    import nltk
    nltk.download('gutenberg')
    ```

### Usage
1. Run the Flask web application:
    ```sh
    python app.py
    ```

2. Open your browser and navigate to `http://localhost:5000`.

3. Enter a theme to find similar Bible verses!

__OR__ 

[TRY IT OUT! ⭐✝️](https://bible-verse-finder-1.onrender.com/)

## 🤝 Contributing
Contributions are welcome! Please read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License
This project is licensed under the terms of the MIT license. See the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgements
- Inspired by the countless hours spent studying and reflecting on the Bible.

---

Feel free to reach out with any questions or suggestions! Enjoy exploring the Bible with the Bible Verse Finder. 🌟
