# NOCFO homework assignment - Plant Photo App

**Objective:**  
The goal is to assess your technical skills, ability to design a well-structured application architecture, and user interface design skills. The app should be clear, maintainable, and modern.

---

## **App Features**

The app consists of two mandatory views and one optional view:

1. **List View** *(mandatory)*  
   - The default view where users can see all added plants in a list.  
   - Each list item displays the plant's name and the date it was added.  
   - Includes a button to add a new plant, navigating to the Scan View.  

2. **Scan View** *(mandatory)*  
   - Allows users to add a new plant by taking a photo with the camera, providing a name, and optionally adding notes.  
   - Once saved, the plant appears in the List View.  

3. **Detail View** *(optional)*  
   - Users can view and edit the plant's details, such as its name, photo, and notes.  

---

## **Navigation**

The app should implement a bottom navigation bar with three tabs:
- **List**: View for browsing and adding plants.  
- **Settings** *(empty)*: A simple navigable view.  
- **Profile** *(empty)*: A simple navigable view.  

This navigation structure allows you to demonstrate how you organize app components.

---

## **Technical Requirements**

- The app can be implemented using React Native or Flutter.  
- **State Management**: Use a simple and scalable solution like React Context, Redux, or Flutter's Provider.  
- **Data Storage**: Temporary storage is sufficient, and data can reset when the app restarts.  
- **User Interface**: Design a clear and modern UI. Implementing dark and light themes is optional.  

---

## **Submission**

Submit your completed app by providing a link to a **public GitHub repository**. The repository should include:

1. **README file**, containing:  
   - Instructions to run the app.  
   - A brief description of the architecture and technical decisions.  

2. Screenshots of:  
   - The List View.  
   - The Scan View.  
   - The bottom navigation bar.  

---

## **Evaluation Criteria**

1. Code clarity and maintainability.  
2. Logical and scalable app architecture.  
3. Usability and visual design of the UI.  
4. Clarity of documentation.  
5. Bonus points: Implementing the Detail View and dark/light themes.  

---

**Note:** We recommend spending no more than 6 hours on this task. Focus on the essentials – a functional and clear implementation is more important than perfection.
