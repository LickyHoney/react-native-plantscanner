# Plant Photo App

A simple and intuitive mobile app that allows users to capture photos of plants, add their details (name, notes), and view them in a list. Built with **React Native** and **Expo**, the app supports both **portrait** and **landscape orientations** for a smooth user experience.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Technical Decisions](#architecture-and-technical-decisions)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Plant Photo App** enables users to:
- Capture photos of plants using the device camera.
- Add details such as the plant’s name and notes.
- View a list of plants stored in the app, and access detailed information about each one.
- Support for both portrait and landscape orientations for a responsive layout.

Built with **React Native**, **Expo**, and **React Context API**, the app is designed for scalability and simplicity, focusing on usability and a minimalistic design.

---

## Features
- **Capture photos**: Take pictures of plants directly using the device camera.
- **Add details**: Enter plant name and notes.
- **View plants list**: See a list of all added plants.
- **Responsive UI**: Supports both portrait and landscape orientations with scrollable content.
- **Navigation**: Easy navigation between the `List`, `Scan`, and `Detail` screens using React Navigation.

---

## Tech Stack

- **Frontend**: React Native, Expo
- **State Management**: React Context API
- **Navigation**: React Navigation
- **Camera & Image Picker**: Expo ImagePicker
- **Icons**: Ionicons
- **UUID**: For generating unique plant IDs

---

## Architecture and Technical Decisions

### Frontend (React Native with Expo)
- **React Native & Expo**: Chosen for cross-platform support and fast development. Expo simplifies the use of native features like camera functionality and image picking without requiring additional configuration.
- **Modular Components**: The app’s UI is divided into small, reusable components to ensure scalability and maintainability.
- **Screens**:
  - **List Screen**: Displays a list of plants with images, names, and the date added.
  - **Scan Screen**: Captures plant photos, allows users to input plant name and notes, and saves the data.
  - **Detail Screen**: Displays detailed information about a selected plant.

### State Management
- **React Context API** is used to manage the global state of plant data, ensuring the app is simple and easy to scale. Plant data is handled centrally by the `PlantContext` provider, which allows for easy data sharing across screens.

### Navigation
- **React Navigation**: Used for managing navigation between the `List`, `Scan`, and `Detail` screens. Bottom tab navigation provides a clear and user-friendly way to switch between sections.

### Image Storage
- **Local Image Storage**: Images are stored locally using URI paths, avoiding the need for an external server or database for image storage. This approach is ideal for apps focusing on local data and lightweight functionality.

### Device Orientation & Responsiveness
- The app supports both **portrait** and **landscape orientations** to ensure responsiveness across various screen sizes.
- **ScrollView** is used to allow users to scroll when content exceeds the screen space, particularly in landscape mode.

### Form Validation
- Basic form validation ensures that users provide essential details (e.g., plant name) before saving.

### UI/UX Design
- **Minimalistic Design**: A clean and modern user interface focused on simplicity and usability.
- **Ionicons** are used to enhance the visual appeal of buttons and input fields.
- Responsive layouts are created with **Flexbox** to ensure elements are properly sized across different screen sizes.

### Data Management
- The app uses **React Context API** to manage plant data temporarily in memory. The data is not persisted beyond app usage, suitable for small-scale apps without a need for cloud storage or external databases.

### Error Handling
- Basic error handling includes camera access verification, image picker cancellations, and alerts for incomplete form submissions.

---

## Screenshots

![Plant List](./assets/screenshots/list-screen.png)
*List Screen displaying all plants*

![Scan Screen](./assets/screenshots/scan-screen.png)
*Scan Screen to add new plants*

![Detail Screen](./assets/screenshots/detail-screen.png)
*Detail Screen displaying plant information*

---

## Installation

To get the app running locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/plant-photo-app.git
    cd plant-photo-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the app**:
    ```bash
    expo start
    ```

4. Open the app in your simulator or device by scanning the QR code with the Expo Go app.

---

## Usage

1. Open the app on your device or simulator.
2. On the **Scan Screen**, take a photo of your plant and enter its name and any notes.
3. Press "Save Plant" to add it to the list.
4. View your saved plants on the **List Screen** and tap on any plant to view its details on the **Detail Screen**.

---

## Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
