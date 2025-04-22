import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

@Component({
  selector: 'app-test',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,UserNavbarComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  currentQuestionIndex: number = 0;
  completed: boolean = false;
  userResponses: string[] = [];

  // Psychometric Test Questions
  questions = [
    { 
      question: "What type of task do you enjoy the most?", 
      options: ["Solving complex problems", "Creating designs & visuals", "Managing and planning tasks", "Interacting & working with people"]
    },
    { 
      question: "How do you approach a technical challenge?", 
      options: ["Analyze and research", "Think creatively", "Follow structured steps", "Discuss with others"]
    },
    { 
      question: "Which environment do you prefer working in?", 
      options: ["Fast-paced and challenging", "Creative and flexible", "Structured and organized", "Collaborative and people-focused"]
    },
    { 
      question: "How do you handle multiple tasks?", 
      options: ["Prioritize and solve systematically", "Adapt as needed", "Organize everything efficiently", "Communicate with the team"]
    },
    { 
      question: "Which of these best describes your work style?", 
      options: ["Independent and analytical", "Creative and experimental", "Organized and efficient", "Team-oriented and persuasive"]
    },
    { 
      question: "What kind of projects excite you the most?", 
      options: ["Coding and software development", "Graphic design or video editing", "Managing teams and projects", "Marketing and public relations"]
    },
    { 
      question: "How do you solve a difficult problem?", 
      options: ["Use logic and research", "Think outside the box", "Break it down into manageable steps", "Discuss it with a group"]
    },
    { 
      question: "What skills do you want to improve the most?", 
      options: ["Technical and coding skills", "Design and creativity", "Leadership and management", "Communication and persuasion"]
    },
    { 
      question: "What is your ideal career?", 
      options: ["Software Engineer / Data Scientist", "Graphic Designer / UI-UX Developer", "Business Analyst / Project Manager", "Marketing / HR / Sales"]
    },
    { 
      question: "What is your strongest trait?", 
      options: ["Logical thinking", "Creativity", "Leadership", "Empathy and communication"]
    }
  ];

  selectOption(option: string) {
    this.userResponses[this.currentQuestionIndex] = option;
  }

  isSelected(option: string): boolean {
    return this.userResponses[this.currentQuestionIndex] === option;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.completed = true;
      this.calculateRecommendation();
    }
  }

  recommendations: string = "";

  calculateRecommendation() {
    let techSkills = ["Solving complex problems", "Analyze and research", "Fast-paced and challenging", "Coding and software development", "Use logic and research", "Technical and coding skills", "Software Engineer / Data Scientist", "Logical thinking"];
    let creativeSkills = ["Creating designs & visuals", "Think creatively", "Creative and flexible", "Graphic design or video editing", "Think outside the box", "Design and creativity", "Graphic Designer / UI-UX Developer", "Creativity"];
    let managementSkills = ["Managing and planning tasks", "Follow structured steps", "Structured and organized", "Managing teams and projects", "Break it down into manageable steps", "Leadership and management", "Business Analyst / Project Manager", "Leadership"];
    let peopleSkills = ["Interacting & working with people", "Discuss with others", "Collaborative and people-focused", "Marketing and public relations", "Discuss it with a group", "Communication and persuasion", "Marketing / HR / Sales", "Empathy and communication"];

    let techScore = this.userResponses.filter(resp => techSkills.includes(resp)).length;
    let creativeScore = this.userResponses.filter(resp => creativeSkills.includes(resp)).length;
    let managementScore = this.userResponses.filter(resp => managementSkills.includes(resp)).length;
    let peopleScore = this.userResponses.filter(resp => peopleSkills.includes(resp)).length;

    if (techScore >= creativeScore && techScore >= managementScore && techScore >= peopleScore) {
      this.recommendations = "You have strong **Technical & Analytical Skills**. Recommended careers: **Software Engineer, Data Scientist, AI Developer**.";
    } else if (creativeScore >= techScore && creativeScore >= managementScore && creativeScore >= peopleScore) {
      this.recommendations = "You have **Creative & Design Skills**. Recommended careers: **Graphic Designer, UI/UX Developer, Animator**.";
    } else if (managementScore >= techScore && managementScore >= creativeScore && managementScore >= peopleScore) {
      this.recommendations = "You have **Strong Leadership & Organizational Skills**. Recommended careers: **Business Analyst, Project Manager, Operations Manager**.";
    } else if (peopleScore >= techScore && peopleScore >= creativeScore && peopleScore >= managementScore) {
      this.recommendations = "You have **Excellent People & Communication Skills**. Recommended careers: **Marketing, HR, Public Relations, Sales**.";
    } else {
      this.recommendations = "Your skills are diverse! Consider exploring careers in **multiple fields based on your interests.**";
    }
  }

}
