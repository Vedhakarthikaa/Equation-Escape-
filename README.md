# Equation-Escape-Hackathon
A 15-hour coding marathon bringing together developers, designers, and innovators to create exciting, fun, and original projects. 


# [Loci] 

## Basic Details

**Team Name:** [MathCo]

### Team Members
- **Team Lead:** [Sreenandana A S] - [TKM College of Engineering]
- **Member 2:** [Sreya Maxwel] - [TKM College of Engineering]
- **Member 3:** [Sana Safiya] - [TKM College of Engineering]

## Project Description
[ Loki is a Smart Revision Planner helps students study smarter by predicting forgetting and scheduling revision at the right time. It uses AI based quizzes and mathematical memory modeling to improve learning efficiency.]

## The Concept
[1. Memory Retention Modeling (Spaced Repetition)
The project is based on a simplified memory decay model, inspired by the forgetting curve.
Each topic is assigned a memory strength value, which determines how quickly the learner is likely to forget the material. Using this value, the system mathematically estimates the optimal next revision time, ensuring revisions happen just before memory decay becomes significant.

2. Time Prediction Using Mathematical Functions
Revision intervals are calculated using predictive mathematical functions that map memory strength to time gaps.
Stronger memory results in longer intervals, while weaker memory leads to shorter revision cycles. This allows the system to dynamically adapt revision timing instead of using fixed schedules.

3. Optimization of Daily Timetable
The timetable generation uses constraint‑based optimization:
Available time slots are divided into fixed intervals.
Topics are allocated based on urgency (revision time proximity).
Mathematical sorting and prioritization ensure that topics needing revision sooner are scheduled earlier.
This results in an optimized and balanced daily study plan.

5. Adaptive Quiz Logic
Quiz difficulty adapts using conditional logic and scoring thresholds:
Questions are selected based on topic and current memory strength.
User performance (correct/incorrect answers) mathematically updates memory strength.
Future quiz difficulty and revision timing adjust accordingly.
This creates a feedback loop between performance and learning pace.

5. Data‑Driven Decision Making
   
All decisions in the system—revision timing, quiz generation, and timetable creation—are driven by numerical values, comparisons, and calculated outputs, ensuring consistency, objectivity, and personalization.]

## Technical Details

### Technologies Used
- **Languages:** [Python, JavaScript]
- **Frameworks:** [Flask (Backend API),React (Frontend – optional / teammate module)]
- **Libraries/Assets:** [Transformers (Google Flan-T5 for quiz generation),SentencePiece (tokenization for T5),Matplotlib (memory decay visualization),NumPy (numerical operations),JSON (persistent data storage)]
- **Tools:** [Google Colab (development & experimentation),Git & GitHub (version control & collaboration),VS Code (local development),Postman (API testing)]

### Implementation

#### Installation / Setup
[To build and run the project manually from source:]

git clone https://github.com/SreyaMaxwel/Loci.git
cd Loci

## Project Documentation

### Screenshots (Add at least 3)

![[Screenshot1](https://drive.google.com/file/d/1tmcIx2sJPeNJhd-7dtKNkT9gI1nuvG29/view?usp=sharing)](Add screenshot 1 link)  
*This is the homepage of Loci, where we mention the topics studied and also the quiz for the topic*

![Screenshot2]([Add screenshot 2 lin](https://drive.google.com/file/d/198Gqmk9T5UMDRNy8W080480FOebYuNik/view?usp=sharing))  
*This screenshot shows the demo of quiz ,on topic suggestion*

![Screenshot3]([Add screenshot 3 link](https://drive.google.com/file/d/1LC0ouMhhM9hCgJqA7jSBwyo-dD4pb1QC/view?usp=sharing))  
*This is the final outcome where the final customized timetable is provoded with respect to the quiz taken and also from stored db*

### Project Demo

#### Project Video
[[Add link of your project demo](https://drive.google.com/file/d/108-knBNNI4k8vk6ML2C1qpqIcNhiw2Dk/view?usp=sharing)]  

## Deployment
- **Deployed Version (if any):** [Link to web build]
