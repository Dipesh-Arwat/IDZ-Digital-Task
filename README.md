# Balloon Burst Game

A fun and interactive balloon inflating and popping game built with **Phaser 3**. The player inflates a balloon by clicking the pump, and when fully inflated, the balloon floats away. Clicking the balloon at the right time will pop it!

## Features 🎈
- **Pump & Inflate**: Click the pump to gradually inflate the balloon.
- **Floating Animation**: Once fully inflated, the balloon floats from right to left while moving upward.
- **Pop Mechanism**: Click the balloon while it's floating to pop it.
- **Automatic Respawn**: A new balloon spawns immediately after the previous one floats away or is popped.
- **Realistic Physics**: Smooth movement using Phaser's physics engine.

## Technologies Used 🛠️
- **Phaser 3** (Game Engine)
- **JavaScript**
- **HTML & CSS**

## Installation & Setup ⚙️
1. **Clone the repository**
   ```sh
   git clone https://github.com/Dipesh-Arwat/IDZ-Digital-Task.git
   cd IDZ-Digital-Task
   ```
2. **Install dependencies** (if needed for local server)
   ```sh
   npm install -g http-server
   ```
3. **Run the project**
   ```sh
   http-server .
   ```
4. Open `http://localhost:8080` in your browser.

## How to Play 🎮
1. Click the **pump button** (bottom-right corner) to inflate the balloon.
2. Once fully inflated, the balloon **automatically starts floating**.
3. Click the **balloon** while it's floating to pop it.
4. A new balloon appears immediately after popping or floating away.

## Game Controls 🕹️
- **Pump Balloon**: Click on the pump image.
- **Pop Balloon**: Click on the floating balloon.

## Assets 📁
- `assets/balloon.png` (Balloon Image)
- `assets/pump.png` (Pump Image)
- `assets/background.png` (Game Background)
- `assets/inflate.mp3` (Inflation Sound)
- `assets/pop.mp3` (Popping Sound)

## Future Enhancements 🚀
- Add **score tracking** for each popped balloon.
- Implement **different balloon sizes & colors**.
- Introduce **levels & challenges**.
- Add **animated pump effects**.

## Contributing 🤝
If you have suggestions or improvements, feel free to fork this repository and submit a pull request!

---
Made with ❤️ using Phaser 3.

