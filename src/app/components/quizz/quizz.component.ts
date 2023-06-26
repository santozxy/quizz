import { Component, OnInit } from '@angular/core';
import quizz from '../../../assets/data/quizz.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = 'Você seria um super-vilão ou um super-herói ?';

  questions: any;
  questionSelected: any;
  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  answers: string[] = [];
  answerSelected: string = '';
  choice:string = ''
  finished: boolean = false;



  constructor() {}

  ngOnInit(): void {
    if (quizz) {
      this.finished = false;
      this.title = quizz.title;
      this.questions = quizz.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  selectOption(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.choice = finalAnswer;
      this.answerSelected =
        quizz.results[finalAnswer as keyof typeof quizz.results];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previousValue, currentValue, i, arr) => {
      if (
        arr.filter((item) => item === previousValue).length >
        arr.filter((item) => item === currentValue).length
      ) {
        return previousValue;
      } else {
        return currentValue;
      }
    });
    return result;
  }

  reset(): void{
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];
    this.finished = false;
    this.answers = [];
  }
}
